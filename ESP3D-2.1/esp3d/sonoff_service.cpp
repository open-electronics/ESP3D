/*
  Sonoff_service.cpp -  notifications service functions class

  Copyright (c) 2014 Luc Lebosse. All rights reserved.

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

#include "config.h"
#include "sonoff_service.h"
#include "wificonf.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>



SonoffService sonoffservice;

HTTPClient http; 
WiFiClient client;


SonoffService::SonoffService(){
    _started = false; 
    _sonoffType = 0;	
}



SonoffService::~SonoffService(){
    end();
}



bool SonoffService::started(){
    return _started;
}





/*
bool SonoffService::SetStatus(String P, String status){

const char* serverName = "http://192.168.1.31:8081/zeroconf/switch";
bool result = false;

if(WiFi.status()== WL_CONNECTED){
      
      WiFiClient client;
      HTTPClient http;

      http.begin(client, serverName);
      http.addHeader("Content-Type", "application/json");	
	  
	    int httpResponseCode = http.POST("{\"data\":{\"switch\":\"on\"}}");

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
        
	  result  = true;	
		
      // Free resources
      http.end();
	  
    }else {
      Serial.println("WiFi Disconnected");
    }
	
return result;
}
*/



bool SonoffService::SetStatus(String P, String status){
   String payload;
   int port = 8081;
   StaticJsonDocument<100> doc;
   bool result = false;
   String IP;
   byte ip_buf[4];
   char endpoint_url [100];
  
   IPAddress ip;
   int httpResponseCode;
   DynamicJsonDocument response_doc(200);
   DeserializationError error;
   const char *stato;

   //Serial.print("Sonoff Type: ");
   //Serial.println( _sonoffType);
   
   try {

   if (P == "1"){        
   if (CONFIG::read_buffer (ESP_SONOFF_IP1, ip_buf, IP_LENGTH) ) {      
       ip = IPAddress (ip_buf);         
       IP = ip.toString().c_str();
     } 
     
     //Serial.print("IP1:");
     //Serial.println(IP);     
   }

   if (P == "2"){       
     if (CONFIG::read_buffer (ESP_SONOFF_IP2, ip_buf, IP_LENGTH) ) {  
       ip = IPAddress (ip_buf);            
       IP = ip.toString().c_str();    
     } 
     
     //Serial.print("IP2:");
     //Serial.println(IP);   
   }

  
   
if(WiFi.status()== WL_CONNECTED){
    
    http.setTimeout(5000);

    if (_sonoffType==1){
      // Example:
      //payload = "{\"data\":{\"switch\":\"on\"}}";
      JsonObject jsondata  = doc.createNestedObject("data"); 
      jsondata["switch"] = status;  
      serializeJson(doc, payload);
    }
    
    
    if (_sonoffType==1){
      sprintf (endpoint_url, "http://%d.%d.%d.%d:%d:/zeroconf/switch", ip[0], ip[1], ip[2], ip[3] , port);       
    }

    if (_sonoffType==2){
      sprintf (endpoint_url, "http://%d.%d.%d.%d/cm?cmnd=Power+%s", ip[0], ip[1], ip[2], ip[3] , status);  
    }
    
   
    //Serial.print("endpoint_url:[");
    //Serial.print(endpoint_url);
    //Serial.println("]");

 
 
    if (_sonoffType==1){
      http.addHeader("User-Agent", "insomnia"); 
      http.addHeader("Content-Type", "application/json");
      http.addHeader("Accept" , "*/*");
      http.addHeader("Content-Length", String(payload.length()) );
    
      http.begin(client , endpoint_url ); 

      http.setConnectTimeout(5000);
      
      httpResponseCode = http.POST(payload);
    }
    

    if (_sonoffType==2){
       http.addHeader("User-Agent", "insomnia"); 
       http.addHeader("Accept" , "*/*"); 
               
       http.begin(client , endpoint_url );
       
       http.setConnectTimeout(5000);
       
       httpResponseCode = http.GET();
    }



    if(httpResponseCode == 200){ 
    
       if (_sonoffType==1){
        
         error = deserializeJson(response_doc, http.getStream()); 
         //serializeJsonPretty(response_doc, Serial);
         
         if (error) {
          
           return false;
           
         } else {
          
            if (response_doc["error"].as<int>() == 0){
                result  = true;
            }
            
         }
         
       }


       if (_sonoffType==2){    
                  
              String payloadr = "{}"; 
              payloadr = http.getString();
              
              //Serial.print("payloadr:"); 
              //Serial.println(payloadr); 
              
              error = deserializeJson(response_doc, payloadr);

              if (error) {
                
                return false;
                
              } else {
                
                  stato = response_doc["POWER"];
                  
                  Serial.print("stato:"); 
                  Serial.println(stato);
                    
                  if(strcmp(stato, "ON") == 0){
                     result  = true;
                  }
              
                  if(strcmp(stato, "OFF") == 0){
                      result  = true;
                  }   
                      
              }
              
                                                                  
          }
    
    }else { 
      Serial.printf("Error occurred while sending HTTP POST: %s\n", http.errorToString(httpResponseCode).c_str());   
    }
    
  
   http.end();

   }else {
      Serial.println("WiFi Disconnected");
   }


   }catch(const std::exception& ex) {
     Serial.printf("Error:%s", ex.what());  
   }

   return result;

}





String SonoffService::GetStatus(String P){   
    String payload;
    int port = 8081;
    String result = "on";
    String IP;
    byte ip_buf[4];
    IPAddress ip;
    char endpoint_url [100];
    int httpResponseCode;
    DynamicJsonDocument response_doc(200);
    DeserializationError error;
    const char *stato;

    Serial.print("Sonoff Type: ");
    Serial.println( _sonoffType);

    try {

     if (P == "1"){        
       if (CONFIG::read_buffer (ESP_SONOFF_IP1, ip_buf, IP_LENGTH) ) {      
         ip = IPAddress (ip_buf);         
         IP = ip.toString().c_str();
       }  
       
       Serial.print("IP 1:");
       Serial.println(IP);
     }


     

  
     if (P == "2"){       
       if (CONFIG::read_buffer (ESP_SONOFF_IP2, ip_buf, IP_LENGTH) ) {  
         ip = IPAddress (ip_buf);            
         IP = ip.toString().c_str();    
       }  

       Serial.print("IP 2:");
       Serial.println(IP);
     }


 
  
   
if(WiFi.status()== WL_CONNECTED){
    
 
    if (_sonoffType==1){
      sprintf (endpoint_url, "http://%d.%d.%d.%d:%d:/zeroconf/info", ip[0], ip[1], ip[2], ip[3] , port);
    }

    if (_sonoffType==2){
      sprintf (endpoint_url, "http://%d.%d.%d.%d/cm?cmnd=Power", ip[0], ip[1], ip[2], ip[3] );
    }

    //Serial.print("endpoint_url:[");
    //Serial.print(endpoint_url);
    //Serial.println("]");


    if (_sonoffType==1){
      // Example:
      //{"deviceid": "", "data":{}}
      StaticJsonDocument<100> doc;
      JsonObject root = doc.to<JsonObject>();
      root["deviceid"] = "";
      JsonObject data = root.createNestedObject("data");
      serializeJson(root, payload);
    }
    
 
   
    if (_sonoffType==1){
     http.begin(client , endpoint_url ); 
      
	   http.addHeader("User-Agent", "insomnia"); 
     http.addHeader("Content-Type", "application/json");
     http.addHeader("Accept" , "*/*");
     http.addHeader("Content-Length", String(payload.length()));
    }
  

    if (_sonoffType==1){
       httpResponseCode = http.POST(payload);
    }
    

    if (_sonoffType==2){
       http.addHeader("User-Agent", "insomnia"); 
       http.addHeader("Accept" , "*/*");
       http.begin(client , endpoint_url ); 
       httpResponseCode = http.GET();
    }


    //Serial.print("httpResponseCode:"); 
    //Serial.println(httpResponseCode);
    
    if(httpResponseCode == 200){ 
 
          if (_sonoffType==1){
          
              error = deserializeJson(response_doc, http.getStream());  
              //serializeJsonPretty(response_doc, Serial);

             if (!error) {
                           
                  //Serial.print("seq:"); 
                  //Serial.println(response_doc["seq"].as<int>());
                  
                  //Serial.print("error:");
                  //Serial.println(response_doc["error"].as<int>());
                  
                  //Serial.print("switch:");
                  //Serial.println(response_doc["data"]["switch"].as<char*>());
                      
                  stato = response_doc["data"]["switch"];
                  
                  if(strcmp(stato, "on") == 0){
                    result = "on";
                  }
                  
                  if(strcmp(stato, "off") == 0){
                    result = "off";
                  }

             }        
          }

          
          if (_sonoffType==2){    
                  
              String payloadr = "{}"; 
              payloadr = http.getString();
              //Serial.print("payloadr:"); 
              //Serial.println(payloadr); 
              
              error = deserializeJson(response_doc, payloadr);
              
              if (!error) {                            
                  stato = response_doc["POWER"];
    
                  //Serial.print("stato:"); 
                  //Serial.println(stato);
                  
                  if(strcmp(stato, "ON") == 0){
                     result = "on";
                  }
                  
                  if(strcmp(stato, "OFF") == 0){
                    result = "off";
                  }            
              }
                                                     
          }


    }else { 
      Serial.printf("Error occurred while sending HTTP POST: %s\n", http.errorToString(httpResponseCode).c_str());      
    }
    
    
    http.end();
    
    
 
   }else {
      Serial.println("WiFi Disconnected");
   }



   }catch(const std::exception& ex) {
     Serial.printf("Error:%s", ex.what());  
   }

   return result;

}








bool SonoffService::begin(){
    bool res = true;  
    Serial.println("SonoffService BEGIN");
    end();

    byte bbuf = 0;
    char sbuf[MAX_DATA_LENGTH + 1];

    if (CONFIG::read_byte (ESP_SONOFF_TYPE, &bbuf ) ) {
        _sonoffType =bbuf;
    }


   if (!res) {
        end();
   }

    _started = res;

    return _started;
}




void SonoffService::end(){
    if(!_started) {
        Serial.println("SonoffService END");
        return;
    }
    _started = false; 
}



void SonoffService::handle(){
    if (_started) {
    }
}
