#!/bin/bash

git add -A
git commit -m "Add file"
git pull --no-commit origin gh-pages
git push origin gh-pages


