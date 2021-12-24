#!/bin/bash
while true; do
    sleep 1;
    if [[ `git status origin master --porcelain` ]]; then
        git pull origin master;
    fi
done