
#ifndef _GLOBALS_h
#define _GLOBALS_h

// global variables
extern char CAM_IP[32];

#define ONBOARD_LED  2
#define POWER_CAM    23

//global routines
char *getCAM_IP();

void  setCAM_IP(char *arg);

#endif /*_GLOBALS_h*/
