#!/bin/sh
echo "env = ${ENV}"
if [ "${ENV}" = "develop" ]; then
    npm run build_and_start:dev
else
    npm run build_and_start

fi