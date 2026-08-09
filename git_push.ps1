$git = "C:\Program Files\Git\cmd\git.exe"
& $git init
& $git add .
& $git config user.name "Abhinav"
& $git config user.email "abhinav19abhinav@gmail.com"
& $git commit -m "Initial commit of portfolio"
& $git branch -M main
& $git remote add origin https://github.com/Abhinav-2006-ux/abhinav-.git
Write-Host "Pushing to GitHub..."
& $git push -u origin main
