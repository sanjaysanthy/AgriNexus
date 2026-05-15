@echo off
git config user.email "sanjaysanthy2607@gmail.com"
git config user.name "Sanjay"
git add .
git commit -m "AgriNexus"
git branch -M main
git remote add origin https://github.com/sanjaysanthy/AgriNexus.git
git push -u origin main
echo Done!
pause
