FROM ruby:2.6.5-alpine AS dev

ARG RAILS_ROOT=/var/www/server

ENV BUNDLER_VERSION=2.1.4
ENV BUNDLE_APP_CONFIG="$RAILS_ROOT/.bundle"

RUN apk add --update --no-cache \
  binutils-gold \
  build-base \
  curl \
  file \
  g++ \
  gcc \
  git \
  less \
  libstdc++ \
  libffi-dev \
  libc-dev \
  linux-headers \
  libgcrypt-dev \
  make \
  netcat-openbsd \
  openssl \
  pkgconfig \
  postgresql-dev \
  python \
  tzdata \
  zsh

WORKDIR $RAILS_ROOT
COPY server/Gemfile server/Gemfile.lock ./
COPY . ./

RUN gem install bundler
RUN bundle check || bundle install

EXPOSE 3000