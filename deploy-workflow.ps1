# Script para ativar o deploy do GitHub Pages
# Execute este script apos autorizar o escopo 'workflow' no GitHub

Write-Host "1. Autorize o escopo 'workflow' executando:" -ForegroundColor Yellow
Write-Host "   gh auth refresh --hostname github.com --scopes workflow,repo" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Abra https://github.com/login/device e insira o codigo exibido" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Depois de autorizar, execute o push:" -ForegroundColor Yellow
Write-Host "   git add .github/workflows/deploy-pages.yml" -ForegroundColor Cyan
Write-Host "   git commit -m 'ci: workflow deploy GitHub Pages'" -ForegroundColor Cyan
Write-Host "   git push" -ForegroundColor Cyan
Write-Host ""
Write-Host "Alternativa - enviar via API (sem gh auth):" -ForegroundColor Yellow
Write-Host "   Crie um Personal Access Token em https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host "   Com escopo 'workflow' e use para fazer o push manualmente." -ForegroundColor Cyan
