# Script PowerShell pour corriger tous les viewers Marmoset
# Corrige les erreurs "Cannot read properties of null (reading 'postRender')"

# Template HTML corrigé
$template = @'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>{{TITLE}}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #2a2a2a;
            overflow: hidden;
        }
        
        #marmoset-container {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #loading-message {
            color: white;
            font-family: Arial, sans-serif;
            font-size: 16px;
            text-align: center;
        }
        
        #error-message {
            color: #ff6b6b;
            font-family: Arial, sans-serif;
            font-size: 14px;
            text-align: center;
            padding: 20px;
            display: none;
        }
    </style>
</head>
<body>
    <div id="marmoset-container">
        <div id="loading-message">Chargement du viewer 3D...</div>
    </div>
    
    <div id="error-message">
        <h3>Erreur de chargement du viewer 3D</h3>
        <p>Le viewer Marmoset n'a pas pu se charger correctement.</p>
        <p>Veuillez rafraîchir la page ou vérifier votre connexion internet.</p>
    </div>

    <script>
        let marmosetLoaded = false;
        let loadingTimeout;
        
        function showError(message) {
            console.error('Marmoset Error:', message);
            document.getElementById('loading-message').style.display = 'none';
            document.getElementById('error-message').style.display = 'block';
        }
        
        loadingTimeout = setTimeout(() => {
            if (!marmosetLoaded) {
                showError('Timeout - Le viewer a pris trop de temps à se charger');
            }
        }, 15000);
        
        function initMarmoset() {
            try {
                if (typeof marmoset === 'undefined') {
                    throw new Error('Marmoset library not loaded');
                }
                
                const config = {
                    width: 720,
                    height: 450,
                    autoStart: true,
                    fullFrame: true,
                    pagePreset: false,
                    onLoad: function() {
                        marmosetLoaded = true;
                        clearTimeout(loadingTimeout);
                        document.getElementById('loading-message').style.display = 'none';
                        console.log('Marmoset viewer loaded successfully');
                    },
                    onError: function(error) {
                        clearTimeout(loadingTimeout);
                        showError('Failed to load .mview file: ' + error);
                    }
                };
                
                marmoset.embed('{{MVIEW_PATH}}', config);
                
            } catch (error) {
                clearTimeout(loadingTimeout);
                showError('Initialization error: ' + error.message);
            }
        }
        
        function loadMarmosetScript() {
            const script = document.createElement('script');
            script.src = 'https://viewer.marmoset.co/main/marmoset.js';
            script.async = true;
            
            script.onload = function() {
                console.log('Marmoset script loaded');
                setTimeout(initMarmoset, 100);
            };
            
            script.onerror = function() {
                showError('Failed to load Marmoset script from CDN');
            };
            
            document.head.appendChild(script);
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadMarmosetScript);
        } else {
            loadMarmosetScript();
        }
        
        window.addEventListener('error', function(event) {
            if (event.message && event.message.includes('marmoset')) {
                showError('Script error: ' + event.message);
            }
        });
        
        window.addEventListener('beforeunload', function() {
            if (loadingTimeout) {
                clearTimeout(loadingTimeout);
            }
        });
    </script>
</body>
</html>
'@

Write-Host "🔧 Début de la correction des viewers Marmoset..." -ForegroundColor Cyan

# Fonction pour extraire le chemin .mview depuis l'ancien fichier
function Extract-MviewPath {
    param($content)
    
    if ($content -match "marmoset\.embed\(\s*'([^']+)'") {
        return $matches[1]
    } elseif ($content -match 'marmoset\.embed\(\s*"([^"]+)"') {
        return $matches[1]
    }
    return ""
}

# Fonction pour extraire le titre depuis l'ancien fichier  
function Extract-Title {
    param($content)
    
    if ($content -match "<title>([^<]+)</title>") {
        return $matches[1]
    }
    return "Marmoset_Viewer"
}

# Rechercher tous les fichiers *_Viewer.html
$viewerFiles = Get-ChildItem -Path "C:\wamp64\www\Clara_Neulinger" -Filter "*_Viewer.html" -Recurse

$correctedCount = 0
$skippedCount = 0

foreach ($file in $viewerFiles) {
    Write-Host "📁 Traitement: $($file.FullName)" -ForegroundColor Yellow
    
    try {
        # Lire le contenu actuel
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Vérifier s'il contient déjà notre correction
        if ($content -match "showError\(message\)") {
            Write-Host "   ✅ Déjà corrigé - ignoré" -ForegroundColor Green
            $skippedCount++
            continue
        }
        
        # Extraire les informations de l'ancien fichier
        $mviewPath = Extract-MviewPath $content
        $title = Extract-Title $content
        
        if ([string]::IsNullOrEmpty($mviewPath)) {
            Write-Host "   ❌ Impossible d'extraire le chemin .mview" -ForegroundColor Red
            continue
        }
        
        Write-Host "   📄 Titre: $title" -ForegroundColor Gray
        Write-Host "   🎯 Chemin: $mviewPath" -ForegroundColor Gray
        
        # Créer le nouveau contenu
        $newContent = $template -replace "{{TITLE}}", $title -replace "{{MVIEW_PATH}}", $mviewPath
        
        # Sauvegarder le fichier corrigé
        $newContent | Out-File -FilePath $file.FullName -Encoding UTF8
        
        Write-Host "   ✅ Corrigé avec succès!" -ForegroundColor Green
        $correctedCount++
        
    } catch {
        Write-Host "   ❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Correction terminée!" -ForegroundColor Green
Write-Host "   ✅ Fichiers corrigés: $correctedCount" -ForegroundColor Green
Write-Host "   ⏭️  Fichiers ignorés: $skippedCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔍 Les viewers Marmoset ne devraient plus avoir d'erreurs JavaScript!" -ForegroundColor Cyan