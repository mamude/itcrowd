#!/bin/sh

set -e

if [ -f /var/www/server/tmp/pids/server.pid ]; then
  rm /var/www/server/tmp/pids/server.pid
fi

echo 'Migrate tables...'
bundle exec rake db:migrate

echo 'Adding fake data...'
bundle exec rake db:seed

echo 'Running server'
bundle exec rails server -p ${PORT:-3000}
