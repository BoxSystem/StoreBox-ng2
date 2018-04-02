#!/bin/bash

git config --global user.name "sam's Travis CI"
git config --global user.email "sam5372@foxmail.com"
git remote add origin-pages https://${GH_TOKEN}@github.com/BoxSystem/StoreBox-ng2.git > /dev/null 2>&1
git add -f ./dist
git commit -m "Travis build: $TRAVIS_BUILD_NUMBER"
git push -f origin-pages HEAD:master
