#!/bin/bash
if [[ `git status origin master --porcelain` ]]; then
    git pull origin master;
fi