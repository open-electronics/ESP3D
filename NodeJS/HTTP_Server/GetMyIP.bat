@echo off
Title Get IP and MAC Address
@for /f "delims=[] tokens=2" %%a in ('ping -4 -n 1 %ComputerName% ^| findstr [') do (
    set "MY_IP=%%a"
)

@For /f %%a in ('getmac /NH /FO Table') do  (
    @For /f %%b in ('echo %%a') do (
        If /I NOT "%%b"=="N/A" (
            Set "MY_MAC=%%b"
        )
    )
)
echo Network IP : %MY_IP%
echo MAC Address : %MY_MAC%
pause>nul & exit