#!/bin/sh

if [ $(printenv MODE) == "local" ]
then
    while ! nc -z database 3306; do sleep 3; done
fi

node game_filler.js;
node tarif_filler.js;
node creneau_filler.js;
node role_filler.js
