#!/bin/sh

npm install;

if [ $(printenv MODE) == "local" ]
then
    while ! nc -z database 3306; do sleep 3; done
fi

npm start --port 8080;
