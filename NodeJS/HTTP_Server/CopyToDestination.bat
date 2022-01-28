
@echo off


echo.
echo    ##############################################################################
echo    #                         FUTURA ELETTRONICA                                 #
echo    #                                                                            #
echo    #     Spostamento file da server NodeJS a cartella WebInterface              #
echo    #                                                                            #
echo    #                                                                            #
echo    ##############################################################################

echo.
echo.

echo.
echo.
@echo OFF
SET /P yesno=VUOI PROCEDERE ? [Y/N]:
IF "%yesno%"=="y" GOTO Confirm
IF "%yesno%"=="Y" GOTO Confirm
GOTO Exit

:Confirm


:Begin



set Origin_Path="D:\Lavori\Futura Elettronica\ESP32-3D\NodeJS\HTTP_Server\"
set Origin_Path_Switch="D:\Lavori\Futura Elettronica\ESP32-3D\NodeJS\HTTP_Server\switch\"


set Destination_Path="D:\Lavori\Futura Elettronica\ESP32-3D\ESP3D-WEBUI-2.1\"



rmdir %Destination_Path%"www\" /S /Q


Xcopy   %Origin_Path%"www\*.*"  %Destination_Path%"www\" /E /K /D /H /Y 

copy  %Origin_Path_Switch%"index.html"    %Destination_Path%"www\index.html" /Y


copy  %Origin_Path_Switch%"sub\dashtab.html"  %Destination_Path%"www\sub\dashtab.html" /Y
copy  %Origin_Path_Switch%"sub\navbar.html"   %Destination_Path%"www\sub\navbar.html" /Y


copy  %Origin_Path_Switch%"images\jogdial.svg"   %Destination_Path%"www\images\jogdial.svg" /Y
copy  %Origin_Path_Switch%"images\printer.tpl.htm"   %Destination_Path%"www\images\printer.tpl.htm" /Y
copy  %Origin_Path_Switch%"images\repetier.htm"   %Destination_Path%"www\images\repetier.htm" /Y
REM copy  %Origin_Path_Switch%"images\logo.png"   %Destination_Path%"www\images\logo.png" /Y


echo.
echo.

:End


echo Copia dei file eseguita 
echo.
echo.


Pause 

cmd /k


:Exit
echo.




REM Xcopy   "D:\Lavori\Futura Elettronica\ESP32-3D\NodeJS\HTTP_Server\www\*.*"  "D:\Lavori\Futura Elettronica\ESP32-3D\WEB-Interface\www\" /E /K /D /H /Y


