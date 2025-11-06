# 📋 PLAN DE NETTOYAGE PROGRESSIF - 6 novembre 2025

## 🎯 OBJECTIF
Nettoyer méthodiquement le projet en archivant les doublons et fichiers obsolètes **sans casser le site fonctionnel**.

## ⚠️ PRINCIPES DE SÉCURITÉ

1. **✅ Commit Git avant CHAQUE phase**
2. **✅ Archiver (ne JAMAIS supprimer définitivement)**
3. **✅ Tester après CHAQUE action**
4. **✅ Documenter chaque décision**
5. **✅ Une phase à la fois, pas de précipitation**

---

## 📊 RÉSUMÉ DES ACTIONS

| Phase | Actions | Fichiers concernés | Risque |
|-------|---------|-------------------|--------|
| Phase 0 | Commit initial | Tout le projet | ✅ Aucun |
| Phase 1 | Archiver /js/ racine | 14 fichiers | 🟢 Faible |
| Phase 2 | Archiver /index.html racine | 1 fichier | 🟢 Faible |
| Phase 3 | Archiver /css/ et /assets/ racine | Multiples | 🟡 Moyen |
| Phase 4 | Archiver tests mobile | 30+ fichiers | 🟢 Faible |
| Phase 5 | Nettoyer doublons desktop/js/ | 4 fichiers | 🟢 Faible |
| Phase 6 | Vérification finale | - | ✅ Aucun |

---

## 🚀 PHASE 0 : PRÉPARATION

### Actions préliminaires

#### 1. Commit Git de l'état actuel
```bash
cd c:\wamp64\www\website
git add .
git commit -m "État avant nettoyage - Analyse complète terminée (6 nov 2025)"
git push origin main
```

#### 2. Créer la structure d'archive
```bash
# Créer les dossiers d'archive si nécessaire
New-Item -ItemType Directory -Path "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Racine_Obsolete_2025-11-06" -Force
New-Item -ItemType Directory -Path "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Mobile_Tests_2025-11-06" -Force
New-Item -ItemType Directory -Path "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Desktop_JS_NonUtilises_2025-11-06" -Force
```

#### 3. Documenter l'état initial
✅ Fichiers créés :
- `docs/ANALYSE_REELLE.md`
- `docs/AUDIT_DOUBLONS_DETAILLE.md`
- `docs/CARTOGRAPHIE_CHEMINS_ASSETS.md`
- `docs/PLAN_NETTOYAGE_PROGRESSIF.md` (ce fichier)

---

## 📦 PHASE 1 : ARCHIVER /js/ RACINE (Obsolète)

**Raison** : Ces fichiers sont des doublons complets de `/01_SITE_PRODUCTION/desktop/js/`

### Fichiers à archiver (14 fichiers)
```
/js/button-parallax-manager.js
/js/config.js
/js/cv-mobile-manager.js
/js/dual-paper-manager.js
/js/effects-manager-gribouillage.js
/js/loading-manager.js
/js/magnifier-manager.js
/js/magnifier-manager-debug.js
/js/magnifier-manager-simple.js
/js/navigation-manager.js
/js/portfolio-manager.js (182 KB - version énorme)
/js/portfolio-manager-backup.js (108 KB)
/js/script.js
/js/video-manager.js
```

### Commandes PowerShell
```powershell
# Déplacer le dossier /js/ entier
Move-Item -Path "c:\wamp64\www\website\js" -Destination "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Racine_Obsolete_2025-11-06\js"
```

### Tests post-action
1. Vérifier que `/js/` n'existe plus à la racine
2. Tester desktop : `http://localhost/website/01_SITE_PRODUCTION/desktop/`
3. Tester mobile : `http://localhost/website/01_SITE_PRODUCTION/mobile/`
4. Vérifier navigation, portfolio, contact

### Commit
```bash
git add .
git commit -m "Phase 1: Archivé /js/ racine obsolète vers 99_ARCHIVE"
git push origin main
```

---

## 📄 PHASE 2 : ARCHIVER /index.html RACINE

**Raison** : Ce fichier n'est pas utilisé, les versions production sont dans `/01_SITE_PRODUCTION/`

### Fichiers à archiver
```
/index.html
```

### Commandes PowerShell
```powershell
Move-Item -Path "c:\wamp64\www\website\index.html" -Destination "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Racine_Obsolete_2025-11-06\index.html"
```

### Tests post-action
1. Vérifier que `/index.html` n'existe plus à la racine
2. Tester les deux URLs de production (desktop et mobile)

### Commit
```bash
git add .
git commit -m "Phase 2: Archivé index.html racine obsolète"
git push origin main
```

---

## 🎨 PHASE 3 : ARCHIVER /css/ ET /assets/ RACINE

**Raison** : Possibles doublons des versions dans `/01_SITE_PRODUCTION/desktop/`

### 3A. Vérifier avant d'archiver
```powershell
# Comparer les contenus
Get-ChildItem "c:\wamp64\www\website\css" -Recurse
Get-ChildItem "c:\wamp64\www\website\assets" -Recurse
```

### 3B. Si doublons confirmés, archiver
```powershell
# CSS
Move-Item -Path "c:\wamp64\www\website\css" -Destination "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Racine_Obsolete_2025-11-06\css"

# Assets (si doublon)
Move-Item -Path "c:\wamp64\www\website\assets" -Destination "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Racine_Obsolete_2025-11-06\assets"

# Font (doublon confirmé)
Move-Item -Path "c:\wamp64\www\website\font" -Destination "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Racine_Obsolete_2025-11-06\font"
```

### Tests post-action
1. Tester desktop et mobile
2. Vérifier chargement CSS
3. Vérifier affichage images

### Commit
```bash
git add .
git commit -m "Phase 3: Archivé css/assets/font racine obsolètes"
git push origin main
```

---

## 🧪 PHASE 4 : ARCHIVER TESTS MOBILE

**Raison** : Violation de la règle "Un fichier = un nom définitif"

### Fichiers à archiver (30+ fichiers)

#### Tests HTML
```
/01_SITE_PRODUCTION/mobile/test-assets-portfolio.html
/01_SITE_PRODUCTION/mobile/test-complet-assets.html
/01_SITE_PRODUCTION/mobile/test-correction-circus-gun.html
/01_SITE_PRODUCTION/mobile/test-cv-buttons.html
/01_SITE_PRODUCTION/mobile/test-diagnostic.html
/01_SITE_PRODUCTION/mobile/test-final-suppression-marmoset.html
/01_SITE_PRODUCTION/mobile/test-images.html
/01_SITE_PRODUCTION/mobile/test-loading-debug.html
/01_SITE_PRODUCTION/mobile/test-loading-minimal.html
/01_SITE_PRODUCTION/mobile/test-loading-simple.html
/01_SITE_PRODUCTION/mobile/test-loading-stable.html
/01_SITE_PRODUCTION/mobile/test-loading.html
/01_SITE_PRODUCTION/mobile/test-logos-debug.html
/01_SITE_PRODUCTION/mobile/test-logos-viewers.html
/01_SITE_PRODUCTION/mobile/test-logos.html
/01_SITE_PRODUCTION/mobile/test-message-stable.html
/01_SITE_PRODUCTION/mobile/test-organisation.html
/01_SITE_PRODUCTION/mobile/test-structure-finale.html
/01_SITE_PRODUCTION/mobile/test-tv-centered.html
/01_SITE_PRODUCTION/mobile/test-tv-exit-debug.html
/01_SITE_PRODUCTION/mobile/test-tv-exit.html
/01_SITE_PRODUCTION/mobile/test-tv-overlay-centered.html
/01_SITE_PRODUCTION/mobile/test-tv-simple.html
/01_SITE_PRODUCTION/mobile/test-viewers-corriges.html
```

#### Versions index multiples
```
/01_SITE_PRODUCTION/mobile/index-backup.html
/01_SITE_PRODUCTION/mobile/index-clean.html
/01_SITE_PRODUCTION/mobile/index-complete.html
/01_SITE_PRODUCTION/mobile/index-fixed.html
/01_SITE_PRODUCTION/mobile/index-simple.html
```

### Commandes PowerShell
```powershell
# Archiver tous les test-*.html
Get-ChildItem -Path "c:\wamp64\www\website\01_SITE_PRODUCTION\mobile" -Filter "test-*.html" | 
    Move-Item -Destination "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Mobile_Tests_2025-11-06\"

# Archiver les versions index multiples
Get-ChildItem -Path "c:\wamp64\www\website\01_SITE_PRODUCTION\mobile" -Filter "index-*.html" | 
    Move-Item -Destination "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Mobile_Tests_2025-11-06\"
```

### Tests post-action
1. Vérifier que seul `index.html` reste dans mobile/
2. Tester mobile : `http://localhost/website/01_SITE_PRODUCTION/mobile/`
3. Vérifier toutes les fonctionnalités

### Commit
```bash
git add .
git commit -m "Phase 4: Archivé 30+ fichiers test mobile vers 99_ARCHIVE"
git push origin main
```

---

## 🧹 PHASE 5 : NETTOYER DOUBLONS DESKTOP/JS/

**Raison** : Multiples versions non utilisées

### 5A. Magnifier Manager (archiver 3 versions, garder 1)

**À garder** : `magnifier-manager-simple.js` (utilisé par index.html)

**À archiver** :
```
/01_SITE_PRODUCTION/desktop/js/magnifier-manager.js
/01_SITE_PRODUCTION/desktop/js/magnifier-manager-debug.js
/01_SITE_PRODUCTION/desktop/js/magnifier-manager-simple-backup.js
```

```powershell
Move-Item "c:\wamp64\www\website\01_SITE_PRODUCTION\desktop\js\magnifier-manager.js" "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Desktop_JS_NonUtilises_2025-11-06\"
Move-Item "c:\wamp64\www\website\01_SITE_PRODUCTION\desktop\js\magnifier-manager-debug.js" "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Desktop_JS_NonUtilises_2025-11-06\"
Move-Item "c:\wamp64\www\website\01_SITE_PRODUCTION\desktop\js\magnifier-manager-simple-backup.js" "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Desktop_JS_NonUtilises_2025-11-06\"
```

### 5B. Portfolio Manager (supprimer fichier vide, garder 2)

**À garder** :
- `portfolio-manager.js` (93 KB - UTILISÉ)
- `portfolio-manager-backup.js` (108 KB - backup légitime)

**À SUPPRIMER** :
```
/01_SITE_PRODUCTION/desktop/js/portfolio-manager-clean.js (0 octets - VIDE!)
```

```powershell
Remove-Item "c:\wamp64\www\website\01_SITE_PRODUCTION\desktop\js\portfolio-manager-clean.js"
```

### 5C. Script (archiver version test)

**À garder** : `script.js` (utilisé)

**À archiver** :
```
/01_SITE_PRODUCTION/desktop/js/script_ultra_simple.js
```

```powershell
Move-Item "c:\wamp64\www\website\01_SITE_PRODUCTION\desktop\js\script_ultra_simple.js" "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\Desktop_JS_NonUtilises_2025-11-06\"
```

### Tests post-action
1. Tester desktop complet
2. Vérifier magnifier (loupe)
3. Vérifier portfolio/collectibles
4. Vérifier toutes les pages

### Commit
```bash
git add .
git commit -m "Phase 5: Nettoyé doublons desktop/js/ - 4 fichiers archivés/supprimés"
git push origin main
```

---

## ✅ PHASE 6 : VÉRIFICATION FINALE

### Checklist complète

#### Structure finale attendue
```
/website/
├── /01_SITE_PRODUCTION/          ✅ PRODUCTION
│   ├── /desktop/
│   │   ├── index.html
│   │   ├── /js/ (14 fichiers utilisés)
│   │   ├── /css/
│   │   ├── /assets/
│   │   └── /font/
│   └── /mobile/
│       ├── index.html (SEUL fichier HTML)
│       ├── /pages/
│       ├── /js/
│       └── /assets/
│
├── /05_PROJETS_3D/               ✅ PROJETS EXTERNES
│   ├── /Images_Portfolio/
│   └── /projets_portfolio/
│
├── /99_ARCHIVE_INUTILISE/        ✅ ARCHIVES
│   ├── /Racine_Obsolete_2025-11-06/
│   │   ├── /js/ (14 fichiers)
│   │   ├── /css/
│   │   ├── /assets/
│   │   ├── /font/
│   │   └── index.html
│   ├── /Mobile_Tests_2025-11-06/ (30+ fichiers)
│   └── /Desktop_JS_NonUtilises_2025-11-06/ (4 fichiers)
│
└── /docs/                        ✅ DOCUMENTATION
    ├── Rules.md
    ├── ANALYSE_REELLE.md
    ├── AUDIT_DOUBLONS_DETAILLE.md
    ├── CARTOGRAPHIE_CHEMINS_ASSETS.md
    └── PLAN_NETTOYAGE_PROGRESSIF.md
```

#### Tests fonctionnels
- [ ] Desktop : Navigation fonctionne
- [ ] Desktop : Portfolio/Collectibles s'affiche
- [ ] Desktop : Contact + CV interactif
- [ ] Desktop : Options (langue, volume)
- [ ] Desktop : Loupe fonctionne
- [ ] Desktop : Exit + Try Again
- [ ] Mobile : Navigation fonctionne
- [ ] Mobile : Portfolio s'affiche
- [ ] Mobile : Viewers Marmoset chargent
- [ ] Mobile : Logos sociaux cliquables

#### Vérifications techniques
- [ ] Aucune erreur console
- [ ] Toutes les images chargent
- [ ] Vidéo de fond joue
- [ ] Font Kindergarten charge
- [ ] Scripts JS chargent sans erreur 404

### Commit final
```bash
git add .
git commit -m "Nettoyage complet terminé - Site opérationnel et propre (6 nov 2025)"
git push origin main
```

---

## 📊 RÉSUMÉ DES ACTIONS

### Fichiers archivés
- **Racine obsolète** : 14 JS + 1 HTML + CSS + Assets + Font = ~20 fichiers
- **Tests mobile** : 30+ fichiers test + 5 versions index = ~35 fichiers
- **Desktop non utilisés** : 4 fichiers (3 magnifier + 1 script) = 4 fichiers

### Total : ~59 fichiers archivés
### Fichiers supprimés : 1 (portfolio-manager-clean.js vide)

### Gain en clarté
- ✅ Structure simple et claire
- ✅ Un seul emplacement par type de fichier
- ✅ Plus de doublons confusants
- ✅ Respect des règles du projet

---

## 🚨 EN CAS DE PROBLÈME

### Si quelque chose ne fonctionne plus

1. **Identifier la phase problématique**
   ```bash
   git log --oneline
   ```

2. **Revenir en arrière**
   ```bash
   git revert HEAD  # Annule le dernier commit
   # OU
   git reset --hard <commit_avant_probleme>
   ```

3. **Restaurer depuis l'archive**
   ```powershell
   Copy-Item -Path "c:\wamp64\www\website\99_ARCHIVE_INUTILISE\..." -Destination "..." -Recurse
   ```

4. **Analyser le problème** avant de réessayer

---

## ⏱️ DURÉE ESTIMÉE

- Phase 0 : 5 minutes
- Phase 1 : 10 minutes (+ tests)
- Phase 2 : 5 minutes (+ tests)
- Phase 3 : 15 minutes (+ vérifications + tests)
- Phase 4 : 10 minutes (+ tests)
- Phase 5 : 15 minutes (+ tests)
- Phase 6 : 20 minutes (vérifications complètes)

**Total** : ~1h30 à 2h (en prenant le temps de bien tester)

---

*Plan créé le 6 novembre 2025*  
*À exécuter progressivement, phase par phase, avec tests entre chaque étape*
