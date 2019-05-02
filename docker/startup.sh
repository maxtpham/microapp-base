#!/bin/bash
set -e
cat /config-template.js | \
    sed "s/\${BASE_URL}/$BASE_URL/g" | \
    sed "s/\${ARG1}/$ARG1/g" | \
    sed "s/\${ARG2}/$ARG2/g" | \
    sed "s/\${ARG3}/$ARG3/g" | \
    sed "s/\${ARG4}/$ARG4/g" | \
    sed "s/\${ARG5}/$ARG5/g" | \
    sed "s/\${ARG6}/$ARG6/g" | \
    sed "s/\${ARG7}/$ARG7/g" | \
    sed "s/\${ARG8}/$ARG8/g" | \
    sed "s/\${ARG9}/$ARG9/g" > \
    /usr/share/nginx/html/config.js
nginx -g 'daemon off;'