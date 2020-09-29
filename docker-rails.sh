#!/bin/sh

set -e

if [ -f /var/www/server/tmp/pids/server.pid ]; then
  rm /var/www/server/tmp/pids/server.pid
fi

bundle check || bundle install
bundle exec rails server -p 3000 -b 0.0.0.0
