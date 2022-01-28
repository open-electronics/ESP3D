/*
	ESP3D

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


   https://circuits4you.com/2018/12/31/esp32-hardware-serial2-example/


*/



#include "esp3d.h"
#include <SerialCommand.h>
#include "globals.h"
#include "config.h"


//#define  RX 16
//#define  TX 17


Esp3D myesp3d;
SerialCommand sCmd;

char sbuf[MAX_DATA_LENGTH+1];
char pwd[MAX_DATA_LENGTH+1];




void processCommand() {
  char *arg;
  bool get_ip = false;
  Serial.println("We're in processCommand");
  arg = sCmd.next();
  
  if (arg != NULL) {

    if(strcmp(arg, "IP") == 0) {  
      get_ip = true;
    }
      
  }else {
    Serial.println("No arguments");
  }

  arg = sCmd.next();
  if (arg != NULL) {  
    if (get_ip) {         
      setCAM_IP(arg);
      Serial.print("IP Received:");
      Serial.println(CAM_IP);
    }  
  }else {
    Serial.println("No second argument");
  } 
  
}



void unrecognized(const char *command) {
  Serial.println("What?");
  //Serial.println(command);
}





void ReturnWiFiParam() {
    
  if(WiFi.status() == WL_CONNECTED) {

    if (!CONFIG::read_string (EP_STA_SSID, sbuf, MAX_SSID_LENGTH) ) {     
    }
   
    if (!CONFIG::read_string (EP_STA_PASSWORD, pwd, MAX_PASSWORD_LENGTH) ) {      
    }
   
    Serial.println("CREDENZIALI WI-FI:");

    
    Serial.print("P SSID ");
    Serial.println(sbuf);
     
    Serial.print("P PWD ");
    Serial.println(pwd);

   
    Serial2.print("P SSID ");
    Serial2.println(sbuf); 
   
    delay(20); 
     
    Serial2.print("P PWD ");
    Serial2.println(pwd);
    
    
  }

 /*
  Serial2.print("P SSID ");
  Serial2.println(SSID); 
    
  delay(20); 
     
  Serial2.print("P PWD ");
  Serial2.println(PASS);
 */
  
  
}





void setup(){

   pinMode(ONBOARD_LED, OUTPUT);  
   pinMode(POWER_CAM, OUTPUT);   

   digitalWrite(ONBOARD_LED, LOW);  

   // Disabilito GATE MOS per Power ESP32-CAM
   digitalWrite(POWER_CAM, LOW); 
   
   Serial.begin(115200);

   //Serial2.begin(115200, SERIAL_8N1, RX, TX);
   Serial2.begin(115200);
   sCmd.begin(Serial2);

   sCmd.addCommand("P",  processCommand);  
   sCmd.addCommand("WIFI?",  ReturnWiFiParam);  
   
   sCmd.setDefaultHandler(unrecognized);  

   digitalWrite(ONBOARD_LED, HIGH); 
   delay(500);
   digitalWrite(ONBOARD_LED, LOW); 

   Serial.println("SETUP COMPLETE");
   
   myesp3d.begin();

}





void loop(){

    myesp3d.process();

    sCmd.readSerial();

}
