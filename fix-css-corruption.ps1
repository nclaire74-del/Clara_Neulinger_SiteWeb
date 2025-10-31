# Script PowerShell pour nettoyer le fichier CSS corrompu
# Lit le fichier jusqu'à la ligne de corruption et sauvegarde une version propre

$inputFile = "c:\wamp64\www\Clara_Neulinger\01_SITE_PRODUCTION\desktop\style.css"
$outputFile = "c:\wamp64\www\Clara_Neulinger\01_SITE_PRODUCTION\desktop\style-clean.css"
$backupFile = "c:\wamp64\www\Clara_Neulinger\01_SITE_PRODUCTION\desktop\style-corrupted.css"

# Sauvegarder le fichier corrompu
Copy-Item $inputFile $backupFile -Force

# Lire toutes les lignes
$lines = Get-Content $inputFile

# Trouver la ligne où commence la corruption (les espaces entre caractères)
$cleanLines = @()
$corruptionStart = -1

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    
    # Détecter la corruption : espaces entre chaque caractère
    if ($line -match " [a-zA-Z] [a-zA-Z] [a-zA-Z]" -or $line -match " / \* .* \* /" -or $line -match " \. [a-zA-Z] [a-zA-Z]") {
        $corruptionStart = $i
        Write-Host "Corruption détectée à la ligne $i : $line"
        break
    }
    
    $cleanLines += $line
}

if ($corruptionStart -gt 0) {
    Write-Host "Suppression de $($lines.Count - $corruptionStart) lignes corrompues"
    
    # Ajouter une fin propre
    $cleanLines += ""
    $cleanLines += "/* === FIN PROPRE DU FICHIER CSS === */"
    $cleanLines += "/* Fichier nettoyé automatiquement le $(Get-Date) */"
    
    # Écrire le fichier propre
    $cleanLines | Out-File -FilePath $outputFile -Encoding utf8
    
    Write-Host "Fichier nettoyé créé : $outputFile"
    Write-Host "Sauvegarde du fichier corrompu : $backupFile"
    Write-Host "Lignes conservées : $($cleanLines.Count)"
} else {
    Write-Host "Aucune corruption détectée dans le fichier"
}