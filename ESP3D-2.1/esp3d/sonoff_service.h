/*
  notifications_service.h -  notifications service functions class

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



#ifndef _SONOFF_SERVICE_H
#define _SONOFF_SERVICE_H

#include "Arduino.h"

class SonoffService{

public:
    SonoffService();
    ~SonoffService();
    bool begin();
    void end();
    void handle();
    bool started();
    bool SetStatus(String IP, String status);
    String GetStatus(String IP);
private:
    bool _started;
	uint8_t _sonoffType;
};

extern SonoffService sonoffservice;

#endif //_SONNOFF_SERVICE_H

