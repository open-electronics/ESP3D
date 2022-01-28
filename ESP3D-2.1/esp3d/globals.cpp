#include <Arduino.h>
#include "globals.h"

// global variables
char CAM_IP[32] = "";




//global routines
char *getCAM_IP() {
  return CAM_IP;
}


void setCAM_IP(char *arg) {
   strcpy(CAM_IP, arg);
}


