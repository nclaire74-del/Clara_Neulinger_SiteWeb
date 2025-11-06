# 🔍 AUDIT FICHIERS RESTANTS - 6 novembre 2025

## 📊 FICHIERS À LA RACINE DU PROJET (31 fichiers)

### Fichiers test-* (12 fichiers) ❌ À ARCHIVER
```
test-archway-final.html (7.4 KB)
test-corrections.html (10.7 KB)
test-detection.html (3.6 KB)
test-final.html (7.5 KB)
test-fonctionnement.html (7.4 KB)
test-hebergement.html (821 octets)
test-js.html (1 KB)
test-mobile.html (10.8 KB)
test-portfolio.html (0 octets - VIDE!)
test-responsivite.html (9.3 KB)
test-translations.html (5.9 KB)
test.html (265 octets)
```
**Action** : Tous à archiver

### Fichiers diagnostic-* (4 fichiers) ❌ À ARCHIVER
```
diagnostic-archway.html (7.8 KB)
diagnostic-final.html (7.5 KB)
diagnostic-responsivite.html (14.5 KB)
diagnostic-translation.html (1.7 KB)
```
**Action** : Diagnostics temporaires, à archiver

### Fichiers solution/cache/redirect (3 fichiers) ⚠️ À VÉRIFIER
```
solution-finale.html (9.5 KB)
cache-buster.html (9 KB)
auto-redirect.html (4.7 KB)
redirect.js (1.3 KB)
```
**Action** : Vérifier si utilisés, sinon archiver

### Scripts PowerShell (2 fichiers) ⚠️ À VÉRIFIER
```
fix-css-corruption.ps1 (0 octets - VIDE!)
fix-marmoset-viewers.ps1 (7.4 KB)
```
**Action** : Script vide à supprimer, l'autre à archiver si obsolète

### Fichiers documentation/rapports (6 fichiers) ✅ À CONSERVER (mais déplacer)
```
CORRECTIONS_MOBILES_RAPPORT.md (4.3 KB)
CORRECTION_MARMOSET_TERMINEE.md (5.5 KB)
NETTOYAGE_ARCHITECTURE.md (4.8 KB)
RAPPORT_OPTIMISATION_PERFORMANCES.md (5.9 KB)
RAPPORT_RESPONSIVITE.md (6 KB)
SYSTEME_TRADUCTION_README.md (4.6 KB)
```
**Action** : Déplacer vers `/docs/` pour centraliser la documentation

### Templates (1 fichier) ⚠️ À VÉRIFIER
```
marmoset-viewer-template.html (5 KB)
contact-window.html (7.9 KB)
```
**Action** : Vérifier si utilisés comme templates

### Fichiers système (1 fichier) ✅ GARDER
```
.gitignore (93 octets)
```

---

## 📁 FICHIERS DANS /01_SITE_PRODUCTION/desktop/ (6 fichiers)

### Fichiers production ✅ GARDER
```
index.html (16.4 KB) - Page principale
style.css (324 KB) - CSS principal
```

### Fichiers à archiver/supprimer ❌
```
index-cache-bust.html (5.7 KB) - Version test cache
test-images.html (2.5 KB) - Test
test.php (212 octets) - Test
style_new.css (4.4 KB) - Doublon? À vérifier
```

---

## 📱 FICHIERS DANS /01_SITE_PRODUCTION/mobile/ (11 fichiers)

### Fichiers production ✅ GARDER (minimum)
```
index.html (150 KB) - Page principale (avec JS inline)
style.css (324 KB) - CSS principal
```

### Doublons CSS ❌ À ARCHIVER (5 versions!)
```
style-backup.css (322 KB)
style-complete-mobile.css (337 KB)
style-mobile-optimized.css (15 KB)
style-mobile.css (327 KB)
mobile-fix.css (29 KB)
```
**Problème** : 6 fichiers CSS différents! Besoin de savoir lequel est utilisé

### Scripts JS à vérifier ⚠️
```
cv-buttons-manager.js (4.9 KB)
cv-mobile-optimized.js (1.8 KB)
mobile-optimizations.js (1.4 KB)
video-mobile-fix.js (654 octets)
```
**Action** : Vérifier s'ils sont chargés par index.html

---

## 📊 RÉSUMÉ DES ACTIONS

### Fichiers à archiver immédiatement
1. **Racine** : 12 test-* + 4 diagnostic-* = **16 fichiers**
2. **Desktop** : 3 fichiers test/cache = **3 fichiers**
3. **Total minimum** : **19 fichiers** à archiver

### Fichiers à déplacer vers /docs/
- 6 rapports markdown de la racine

### Fichiers à vérifier avant décision
1. Solution/cache/redirect (4 fichiers racine)
2. Scripts PowerShell (2 fichiers)
3. Templates (2 fichiers)
4. Doublons CSS mobile (5 fichiers)
5. Scripts JS mobile (4 fichiers)
6. style_new.css desktop

### Fichiers vides à supprimer
- test-portfolio.html (0 octets)
- fix-css-corruption.ps1 (0 octets)

---

## 🎯 PLAN D'ACTION RECOMMANDÉ

### Phase 7A : Archiver les tests/diagnostics évidents
```powershell
# Racine - fichiers test
Get-ChildItem "c:\wamp64\www\website" -Filter "test-*.html" | Move-Item -Destination "99_ARCHIVE/Tests_Racine_2025-11-06/"

# Racine - fichiers diagnostic
Get-ChildItem "c:\wamp64\www\website" -Filter "diagnostic-*.html" | Move-Item -Destination "99_ARCHIVE/Diagnostics_Racine_2025-11-06/"

# Desktop tests
Move-Item "01_SITE_PRODUCTION/desktop/test-images.html" "99_ARCHIVE/Desktop_Tests_2025-11-06/"
Move-Item "01_SITE_PRODUCTION/desktop/test.php" "99_ARCHIVE/Desktop_Tests_2025-11-06/"
Move-Item "01_SITE_PRODUCTION/desktop/index-cache-bust.html" "99_ARCHIVE/Desktop_Tests_2025-11-06/"
```

### Phase 7B : Déplacer rapports vers /docs/
```powershell
Move-Item "*_RAPPORT*.md" "docs/"
Move-Item "*_TERMINEE.md" "docs/"
Move-Item "*_README.md" "docs/"
```

### Phase 7C : Vérifier utilisations avant archivage
1. Analyser index.html mobile pour voir quel CSS est chargé
2. Vérifier si les scripts JS mobile sont chargés
3. Vérifier références aux fichiers solution/cache/redirect

### Phase 7D : Supprimer fichiers vides
```powershell
Remove-Item "test-portfolio.html"
Remove-Item "01_SITE_PRODUCTION/desktop/js/fix-css-corruption.ps1"
```

---

## 📈 GAIN POTENTIEL

### Avant
- Racine : 31 fichiers
- Desktop : 6 fichiers
- Mobile : 11 fichiers

### Après nettoyage estimé
- Racine : ~5-8 fichiers (système + quelques utilitaires)
- Desktop : 2 fichiers (index.html + style.css)
- Mobile : 2-6 fichiers (index.html + CSS utilisé + scripts nécessaires)

**Estimation** : ~25-30 fichiers supplémentaires à nettoyer

---

*Audit réalisé le 6 novembre 2025*  
*Besoin de validation utilisateur avant archivage massif*
