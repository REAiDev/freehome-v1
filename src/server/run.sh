#!/bin/bash

# Create cache directory for Next.js
[ ! -d '/tmp/cache' ] && mkdir -p /tmp/cache

# Start the Next.js server
HOSTNAME=0.0.0.0 exec node server.js