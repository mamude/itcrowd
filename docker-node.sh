#!/bin/sh

set -e

yarn
PORT=8080 pm2 start /var/www/client/node_modules/react-scripts/scripts/start.js --name itcrowd
envsubst '$${NGINX_PROXY_CLIENT},$${NGINX_PROXY_SERVER}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'pid /tmp/nginx.pid; daemon off;'
