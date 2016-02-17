#!/bin/bash

$1 
#run command to send mail to recipient
echo `curl http://textbelt.com/text -d number=$1 -d message="remember to take out the trash, have a trashy one!"`