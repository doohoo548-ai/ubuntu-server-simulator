#!/bin/bash
#start a sample service
sudo chmod 755 index.html
sudo chmod 755 script.js
sudo chmod 755 style.css
sudo chmod 755 set.sh
sudo chmod 755 service.sh
sudo chmod 755 server.log
sudo chmod 755 server.pid
sudo ./set.sh
./service.sh start
echo "Open browser: http://localhost:8080"

