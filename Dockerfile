# Build the bakery site with a python image.
FROM python:3.8-alpine AS builder

LABEL Description="Deployment container for bakery"

RUN apk add --update \
 git \
 make

COPY . /data/bakery

# Install dependencies.
RUN cd /data/bakery \
 && pip install -r requirements.txt

WORKDIR /data/bakery

RUN cd /data/bakery \
 && tinker --build

# Build a small nginx container with just the static site in it.
FROM nginx:1.15-alpine

# Copy built docs into the webroot.
COPY --from=builder /data/bakery/blog/html /usr/share/nginx/html

# Copy configuration file, enable module loading and make deployment directory
COPY nginx.conf /etc/nginx/conf.d/default.conf
