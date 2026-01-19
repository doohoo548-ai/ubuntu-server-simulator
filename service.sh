#!/bin/bash
SERVER_PORT=8080
LOG_FILE="server.log"
PID_FILE="server.pid"

start_server() {
    echo "Starting Ubuntu Server Simulator..."
    python3 -m http.server $SERVER_PORT > $LOG_FILE 2>&1 &
    echo $! > $PID_FILE
    echo "Server running on http://localhost:$SERVER_PORT"
}

stop_server() {
    if [ -f "$PID_FILE" ]; then
        kill $(cat $PID_FILE)
        rm $PID_FILE
        echo "Server stopped"
    else
        echo "Server is not running"
    fi
}

case "$1" in
    start)
        start_server
        ;;
    stop)
        stop_server
        ;;
    restart)
        stop_server
        start_server
        ;;
    status)
        if [ -f "$PID_FILE" ]; then
            echo "Server is running (PID: $(cat $PID_FILE))"
        else
            echo "Server is not running"
        fi
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac
