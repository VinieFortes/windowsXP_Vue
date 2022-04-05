#!/bin/bash

cd ..
rm -r docs
mkdir "docs"
mv  -v dist/* docs/

git add -A
git commit -m "Novo Commit"
git remote add origin "https://github.com/VinieFortes/windowsXP_Vue.git"
git push "https://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@github.com/vinieFortes/windowsXP_Vue.git"

echo "==================================================================================="
echo "                              C O N C L U Í D O "
echo "==================================================================================="
