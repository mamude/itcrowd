#!/bin/sh

set -e

PORT=8080 pm2 start /var/www/client/node_modules/react-scripts/scripts/start.js --name itcrowd
nginx -g 'pid /tmp/nginx.pid; daemon off;'
