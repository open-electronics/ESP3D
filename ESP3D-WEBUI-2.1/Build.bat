#
# https://www.horstmuc.de/wbat32.htm#inifile
# https://www.itechtics.com/3-ways-to-prevent-command-prompt-from-closing-after-running-commands/
#



cd /d %~dp0

cls

@echo off


echo.
echo    ##############################################################################
echo    #                         FUTURA ELETTRONICA                                 #
echo    #                                                                            #
echo    #     Minimizzazione con Gulp dei sorgenti Interfaccia web ESP3D WEBUI       #
echo    #     al termine, i file saranno dentro la cartella "build"                  #
echo    #                                                                            #
echo    ##############################################################################

echo.
echo.
@echo OFF
SET /P yesno=VUOI PROCEDERE ? [Y/N]:
IF "%yesno%"=="y" GOTO Confirm
IF "%yesno%"=="Y" GOTO Confirm
GOTO Exit

:Confirm


:Begin

cmd.exe /c gulp package

echo.


:End
echo.
@echo OFF
SET /P yesno=VUOI ESEGUIRE NUOVAMENTE? [Y/N]:
IF "%yesno%"=="y" GOTO Confirm
IF "%yesno%"=="Y" GOTO Confirm
GOTO Exit


cmd /k


:Exit
echo.








