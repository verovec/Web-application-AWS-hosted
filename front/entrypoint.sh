#!/bin/sh

npm install;

if [ $(printenv MODE) == "local" ]
then
    while ! nc -z api 8080; do sleep 3; done
fi

npm start --port 3000;
