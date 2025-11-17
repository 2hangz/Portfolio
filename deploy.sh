#!/bin/bash
npm run build
echo "" > out/.nojekyll
cd out
git init
git add -A
git commit -m "deploy"
git branch -M gh-pages
git remote add origin https://2hangz@github.com/2hangz/Portfolio.git
git push -f origin gh-pages
cd ..