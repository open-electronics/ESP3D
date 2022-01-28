/*

Comandi:

ON

OFF

WIFI_on

WIFI_off

WIFI_reset

P SSID VALORE_SSID

P PWD VALORE_PWS
 
*/


#include <WiFi.h>
#include <SerialCommand.h>

#include "esp_camera.h"
#include "esp_timer.h"
#include "img_converters.h"
#include "Arduino.h"
#include "fb_gfx.h"
#include "soc/soc.h" //disable brownout problems
#include "soc/rtc_cntl_reg.h"  //disable brownout problems
#include "esp_http_server.h"


extern "C" {
 #include <esp_wifi.h>
}


//#define DEBUG  

#define ONBOARD_LED  4


#define PART_BOUNDARY "123456789000000000000987654321"


#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

static const char* _STREAM_CONTENT_TYPE = "multipart/x-mixed-replace;boundary=" PART_BOUNDARY;
static const char* _STREAM_BOUNDARY = "\r\n--" PART_BOUNDARY "\r\n";
static const char* _STREAM_PART = "Content-Type: image/jpeg\r\nContent-Length: %u\r\n\r\n";

httpd_handle_t stream_httpd = NULL;




#ifdef DEBUG
 #define DEBUG_PRINT(x)    Serial.print (x)
 #define DEBUG_PRINTLN(x)  Serial.println (x)
#else
 #define DEBUG_PRINT(x)
 #define DEBUG_PRINTLN(x)  
#endif



char ssid[32] = "";
char password[32] = "";


int max_attempt = 30;
int cur_attempt = 0;
int period = 10000;
unsigned long time_now = 0;
bool wifi_data_received = false;
bool camera_started = false;


SerialCommand sCmd;




static esp_err_t stream_handler(httpd_req_t *req){
  camera_fb_t * fb = NULL;
  esp_err_t res = ESP_OK;
  size_t _jpg_buf_len = 0;
  uint8_t * _jpg_buf = NULL;
  char * part_buf[64];

  res = httpd_resp_set_type(req, _STREAM_CONTENT_TYPE);
  if(res != ESP_OK){
    return res;
  }

  while(true){
    fb = esp_camera_fb_get();
    if (!fb) {
      //Serial.println("Camera capture failed");
      DEBUG_PRINTLN("Camera capture failed")
      res = ESP_FAIL;
    } else {
      if(fb->width > 400){
        if(fb->format != PIXFORMAT_JPEG){
          bool jpeg_converted = frame2jpg(fb, 80, &_jpg_buf, &_jpg_buf_len);
          esp_camera_fb_return(fb);
          fb = NULL;
          if(!jpeg_converted){
            //Serial.println("JPEG compression failed");
            DEBUG_PRINTLN("JPEG compression failed");
            res = ESP_FAIL;
          }
        } else {
          _jpg_buf_len = fb->len;
          _jpg_buf = fb->buf;
        }
      }
    }
    if(res == ESP_OK){
      size_t hlen = snprintf((char *)part_buf, 64, _STREAM_PART, _jpg_buf_len);
      res = httpd_resp_send_chunk(req, (const char *)part_buf, hlen);
    }
    if(res == ESP_OK){
      res = httpd_resp_send_chunk(req, (const char *)_jpg_buf, _jpg_buf_len);
    }
    if(res == ESP_OK){
      res = httpd_resp_send_chunk(req, _STREAM_BOUNDARY, strlen(_STREAM_BOUNDARY));
    }
    if(fb){
      esp_camera_fb_return(fb);
      fb = NULL;
      _jpg_buf = NULL;
    } else if(_jpg_buf){
      free(_jpg_buf);
      _jpg_buf = NULL;
    }
    if(res != ESP_OK){
      break;
    }
    //Serial.printf("MJPG: %uB\n",(uint32_t)(_jpg_buf_len));
  }
  return res;
}


void startCameraServer(){
  httpd_config_t config = HTTPD_DEFAULT_CONFIG();
  config.server_port = 80;

  httpd_uri_t index_uri = {
    .uri       = "/",
    .method    = HTTP_GET,
    .handler   = stream_handler,
    .user_ctx  = NULL
  };
  
  //Serial.printf("Starting web server on port: '%d'\n", config.server_port);
  if (httpd_start(&stream_httpd, &config) == ESP_OK) {
    httpd_register_uri_handler(stream_httpd, &index_uri);
  }

  camera_started = true;
}






void WiFiEventHandler(WiFiEvent_t event){
  
    //Serial.printf("[WiFi-event] event: %d\n", event);

    switch (event) {
        case SYSTEM_EVENT_WIFI_READY: 
            DEBUG_PRINTLN("WiFi interface ready");
            break;
        case SYSTEM_EVENT_SCAN_DONE:
            DEBUG_PRINTLN("Completed scan for access points");
            break;
        case SYSTEM_EVENT_STA_START:
            DEBUG_PRINTLN("WiFi client started");
            break;
        case SYSTEM_EVENT_STA_STOP:
            DEBUG_PRINTLN("WiFi clients stopped");
            break;
        case SYSTEM_EVENT_STA_CONNECTED:
            DEBUG_PRINTLN("Connected to access point");
            break;
        case SYSTEM_EVENT_STA_DISCONNECTED:
            DEBUG_PRINTLN("Disconnected from WiFi access point");
            break;
        case SYSTEM_EVENT_STA_AUTHMODE_CHANGE:
            DEBUG_PRINTLN("Authentication mode of access point has changed");
            break;
        case SYSTEM_EVENT_STA_GOT_IP:
            DEBUG_PRINT("Obtained IP address: ");
            DEBUG_PRINTLN(WiFi.localIP());            
            break;
        case SYSTEM_EVENT_STA_LOST_IP:
            DEBUG_PRINTLN("Lost IP address and IP address is reset to 0");
            break;
        case SYSTEM_EVENT_STA_WPS_ER_SUCCESS:
            DEBUG_PRINTLN("WiFi Protected Setup (WPS): succeeded in enrollee mode");
            break;
        case SYSTEM_EVENT_STA_WPS_ER_FAILED:
            DEBUG_PRINTLN("WiFi Protected Setup (WPS): failed in enrollee mode");
            break;
        case SYSTEM_EVENT_STA_WPS_ER_TIMEOUT:
            DEBUG_PRINTLN("WiFi Protected Setup (WPS): timeout in enrollee mode");
            break;
        case SYSTEM_EVENT_STA_WPS_ER_PIN:
            DEBUG_PRINTLN("WiFi Protected Setup (WPS): pin code in enrollee mode");
            break;
        case SYSTEM_EVENT_AP_START:
            DEBUG_PRINTLN("WiFi access point started");
            break;
        case SYSTEM_EVENT_AP_STOP:
            DEBUG_PRINT("WiFi access point  stopped");
            break;
        case SYSTEM_EVENT_AP_STACONNECTED:
            DEBUG_PRINT("Client connected");
            break;
        case SYSTEM_EVENT_AP_STADISCONNECTED:
            DEBUG_PRINTLN("Client disconnected");
            break;
        case SYSTEM_EVENT_AP_STAIPASSIGNED:
            DEBUG_PRINTLN("Assigned IP address to client");
            break;
        case SYSTEM_EVENT_AP_PROBEREQRECVED:
            DEBUG_PRINTLN("Received probe request");
            break;
        case SYSTEM_EVENT_GOT_IP6:
            DEBUG_PRINT("IPv6 is preferred");
            break;
        case SYSTEM_EVENT_ETH_START:
            DEBUG_PRINTLN("Ethernet started");
            break;
        case SYSTEM_EVENT_ETH_STOP:
            DEBUG_PRINTLN("Ethernet stopped");
            break;
        case SYSTEM_EVENT_ETH_CONNECTED:
            DEBUG_PRINTLN("Ethernet connected");
            break;
        case SYSTEM_EVENT_ETH_DISCONNECTED:
            DEBUG_PRINTLN("Ethernet disconnected");
            break;
        case SYSTEM_EVENT_ETH_GOT_IP:
            DEBUG_PRINTLN("Obtained IP address");
            break;
        default: break;
      }
}



void WiFiStationConnected(WiFiEvent_t event, WiFiEventInfo_t info){
  //Serial.println("Connected to AP successfully!");
  DEBUG_PRINTLN("Connected to AP successfully!");
}


void WiFiStationDisconnected(WiFiEvent_t event, WiFiEventInfo_t info){
  //Serial.println("Disconnected from WiFi access point");
  //Serial.print("WiFi lost connection. Reason: ");
  //Serial.println(info.disconnected.reason);
  //Serial.println("Trying to Reconnect");
  
  DEBUG_PRINTLN("Disconnected from WiFi access point");
  DEBUG_PRINT("WiFi lost connection. Reason: ");
  DEBUG_PRINTLN(info.disconnected.reason);
  DEBUG_PRINTLN("Trying to Reconnect");
  
  
  //WiFi.setSleep(false);
  
  WiFi.begin(ssid, password);
  
}



void WiFiGotIP(WiFiEvent_t event, WiFiEventInfo_t info){
    DEBUG_PRINT("WiFi connected");
    DEBUG_PRINT("IP address: ");
    DEBUG_PRINTLN(IPAddress(info.got_ip.ip_info.ip.addr));
    GiveIP();
}




void WiFiStationTimeout(WiFiEvent_t event, WiFiEventInfo_t info){
    DEBUG_PRINT("WiFi connection Timeout");
    //delay(1000);
    ESP.restart();    
}






void connectToNetwork() {
  
   if ( !wifi_data_received || (strlen(ssid) == 0 || strlen(password) ==0 ) ){
     sCmd.readSerial();
   }


  if ( wifi_data_received && strlen(ssid) != 0 && strlen(password) !=0 && WiFi.status()!= WL_CONNECTED ){  
    
    if (cur_attempt == 0){
     WiFi.begin(ssid, password);
     cur_attempt = 1;
     DEBUG_PRINTLN();
     DEBUG_PRINTLN("Wait for WiFi... ");
    }

     /*
     while ( cur_attempt <= max_attempt) {              
        delay(1000);
        DEBUG_PRINT("Establishing connection to WiFi.. ");
        DEBUG_PRINTLN(cur_attempt);
        cur_attempt ++;      
     } 
     */
     
     //if ( cur_attempt > max_attempt) {
       
       //DEBUG_PRINTLN("Give up!");
       //DEBUG_PRINTLN("Reboot Device in 2 seconds");
       //delay(2000);
       //ESP.restart();
       
       //if ( (millis() - time_now)  >= period ){
         //Serial.println ("WIFI?");
         //time_now = millis(); 
       //}
                 
     //}

   
  }



  if ( !wifi_data_received || WiFi.status()!= WL_CONNECTED ){  
    if (millis() - time_now >= period ){
         time_now = millis(); 
         Serial.println ("WIFI?");     
    }
  }

  

}






void LED_on() {
  DEBUG_PRINTLN("LED on");
  digitalWrite(ONBOARD_LED, HIGH);
}

void LED_off() {
  DEBUG_PRINTLN("LED off");
  digitalWrite(ONBOARD_LED, LOW);
}

void WIFI_on() {
  DEBUG_PRINTLN("WI-FI on");
  connectToNetwork();
}

void WIFI_off() {
  DEBUG_PRINTLN("WI-FI off");
  esp_wifi_disconnect();  
}






void GiveIP(){
  Serial.print ("P IP ");
  Serial.println(WiFi.localIP());

  digitalWrite(ONBOARD_LED, HIGH);
  delay(500);
  digitalWrite(ONBOARD_LED, LOW);
  delay(500);
  digitalWrite(ONBOARD_LED, HIGH);
  delay(500);
  digitalWrite(ONBOARD_LED, LOW);
  delay(500);
  digitalWrite(ONBOARD_LED, HIGH);
  delay(500);
  digitalWrite(ONBOARD_LED, LOW);
  
  
  //Serial.println("CAM-READY");
  DEBUG_PRINTLN("CAM-READY")
}



   
void processCommand() {
  int aNumber;
  char *arg;
  bool get_ssid = false;
  bool get_password = false;
  
  DEBUG_PRINTLN("We're in processCommand");
  
  arg = sCmd.next();
  
  if (arg != NULL) {
    if(strcmp(arg, "SSID") == 0) {   
      get_ssid = true; 
      get_password = false; 
    }

    if(strcmp(arg, "PWD") == 0) {  
      get_password = true; 
      get_ssid = false;
    }
      
  }else {
    DEBUG_PRINTLN("No arguments");
  }


  arg = sCmd.next();
  if (arg != NULL) {
    
    if (get_ssid) {    
      strcpy(ssid, arg);
    }

    if (get_password) {  
      strcpy(password, arg);
      wifi_data_received = true;
    }
    
  }else {
    DEBUG_PRINTLN("No second argument");
  } 
  
}




void unrecognized(const char *command) {
  DEBUG_PRINTLN("What?");
}








void setup() {
  
  //disable brownout detector
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); 
 
  pinMode(ONBOARD_LED, OUTPUT);      // Configure the onboard LED for output
  digitalWrite(ONBOARD_LED, LOW);    // default to LED off

  Serial.begin(115200);
  Serial.setDebugOutput(false);
  
  sCmd.begin(Serial);


  // Delete old config
  WiFi.disconnect(true);
  //delay(1000);


  // Setup callbacks for SerialCommand commands
  sCmd.addCommand("ON",LED_on);          // Turns LED on
  sCmd.addCommand("OFF",LED_off);        // Turns LED off

  sCmd.addCommand("WIFI_on",WIFI_on);          
  sCmd.addCommand("WIFI_off",WIFI_off); 

  sCmd.addCommand("IP?",GiveIP);        
  
  sCmd.addCommand("P",processCommand);  // Converts two arguments to integers and echos them back
  sCmd.setDefaultHandler(unrecognized); // Handler for command that isn't matched  (says "What?")
  

  //WiFi.onEvent(WiFiEventHandler);

  WiFi.onEvent(WiFiStationConnected, SYSTEM_EVENT_STA_CONNECTED);
 
  WiFi.onEvent(WiFiGotIP, WiFiEvent_t::SYSTEM_EVENT_STA_GOT_IP);

  WiFi.onEvent(WiFiStationDisconnected, WiFiEvent_t::SYSTEM_EVENT_STA_DISCONNECTED);

  WiFi.onEvent(WiFiStationTimeout, WiFiEvent_t::SYSTEM_EVENT_STA_WPS_ER_TIMEOUT);

   



  time_now = millis();


  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000; //16500000; //20000000;
  config.pixel_format = PIXFORMAT_JPEG; 

  /*
  FRAMESIZE_UXGA (1600 x 1200)
  FRAMESIZE_QVGA (320 x 240)
  FRAMESIZE_CIF (352 x 288)
  FRAMESIZE_VGA (640 x 480)
  FRAMESIZE_SVGA (800 x 600)
  FRAMESIZE_XGA (1024 x 768)
  FRAMESIZE_SXGA (1280 x 1024)
  */


  if(psramFound()){
    DEBUG_PRINTLN("psram Found");
    config.frame_size = FRAMESIZE_VGA; //FRAMESIZE_UXGA;
    config.jpeg_quality = 8;
    config.fb_count = 2;
    
  } else {
    DEBUG_PRINTLN("psram NOT Found");
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }
  

  

  // Camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }



  digitalWrite(ONBOARD_LED, HIGH);
  delay(100);
  digitalWrite(ONBOARD_LED, LOW);
  delay(100);

  //Serial.println("SETUP-COMPLETED");

  DEBUG_PRINTLN("SETUP-COMPLETED")
 
}






void loop() {
  
  connectToNetwork();

  if (WiFi.status() == WL_CONNECTED && !camera_started ){  
     startCameraServer();  
  }
 
}
