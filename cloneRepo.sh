#!/bin/bash


#git clone https://github.com/fomi/javascript.git temp
#mv temp/.git javascript/.git
#rm -rf temp

#cd /home/giorgio/javascript

git init .
git remote add origin https://github.com/fomi/javascript.git 
git pull origin gh-pages
