#!/bin/bash

cd ..
rm -r docs
mkdir "docs"
mv  -v dist/* docs/

git add .
git commit -m "Novo Commit"
git push origin branch-name

echo "==================================================================================="
echo "                              C O N C L U Í D O "
echo "==================================================================================="
