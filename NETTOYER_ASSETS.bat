@echo off
echo 🧹 Nettoyage final du dossier assets en conflit...
echo.
echo Fermeture des processus qui peuvent verrouiller le dossier...
taskkill /f /im explorer.exe >nul 2>&1
taskkill /f /im chrome.exe >nul 2>&1
taskkill /f /im firefox.exe >nul 2>&1
taskkill /f /im edge.exe >nul 2>&1
timeout /t 2 >nul

echo Tentative de suppression du dossier assets...
rmdir /s /q "assets" 2>nul
if exist "assets" (
    echo ❌ Le dossier assets est encore verrouillé.
    echo 💡 Solution: Redémarrer l'ordinateur puis relancer ce script.
    echo.
    echo Contenu du dossier:
    dir assets /s
) else (
    echo ✅ Dossier assets supprimé avec succès !
)

echo.
echo Redémarrage de l'explorateur...
start explorer.exe

echo.
echo 📋 Structure finale:
dir /b
echo.
echo ✨ Nettoyage terminé !
pause