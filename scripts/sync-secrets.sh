#!/usr/bin/env bash

# cd to root dir of project
cd $(dirname $0)/..

for secret in "secrets"/*
do
    sops -d ${secret} > tmp/${secret}
    echo $(basename ${secret})
done
