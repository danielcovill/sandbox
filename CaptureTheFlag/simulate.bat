@ECHO OFF
REM Run this script if you'd like to visualize the CTF game 


set COMPETITORS=examples.GreedyCommander dancommander.Dan
CALL game\run.bat "%~dp0simulate.py" %COMPETITORS%

PAUSE
