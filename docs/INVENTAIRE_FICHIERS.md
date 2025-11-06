# 🗂️ INVENTAIRE COMPLET DES FICHIERS

## 📁 STRUCTURE ORGANISÉE PAR PRIORITÉ

### 🟢 FICHIERS PRODUCTION CRITIQUES (NE PAS MODIFIER)

#### Desktop Principal
```
/01_SITE_PRODUCTION/desktop/
├── index.html                     # Page principale (311 lignes)
├── index-cache-bust.html          # Version anti-cache (ajoutée récemment)
├── /css/
│   └── style.css                  # Styles principaux
├── /js/
│   ├── script.js                  # Point d'entrée (5.9KB) ✅ OPTIMISÉ
│   ├── portfolio-manager.js       # Manager collectibles (20KB) ✅ CLEAN
│   ├── navigation-manager.js      # Navigation (21KB)
│   ├── contact-manager.js         # Page contact (3KB)
│   ├── loading-manager.js         # Écran chargement (8KB)
│   └── options-manager.js         # Options (6KB)
└── /assets/
    └── /images/                   # Images projets ✅ COMPLÈTES
        ├── /Arch/preview.jpg      ✅
        ├── /Cirucs/preview.jpg    ✅  
        ├── /Gun/preview.jpg       ✅
        ├── /Kitchen/preview.jpg   ✅
        ├── /Room/preview.jpg      ✅ CRÉÉ RÉCEMMENT
        └── /Telephone/preview.jpg ✅
```

#### Mobile Principal  
```
/01_SITE_PRODUCTION/mobile/
├── index.html                     # Page mobile principale
├── /pages/                        # Architecture modulaire
│   ├── /home/navigation-manager.js
│   ├── /portfolio/portfolio-manager.js
│   ├── /contact/magnifier-manager-simple.js
│   └── /loading/loading-manager.js
├── /js/
│   └── translations.js            # Système traduction
└── style*.css                    # Multiples versions CSS
```

### 🟡 FICHIERS BACKUP/ALTERNATIVES (ATTENTION)

#### Versions Portfolio Manager
```
/01_SITE_PRODUCTION/desktop/js/
├── portfolio-manager.js           # UTILISÉ (20KB)
├── portfolio-manager-clean.js     # IDENTIQUE (20KB) 
└── portfolio-manager-backup.js    # BACKUP LOURD (108KB)
```

#### Versions Magnifier
```
/01_SITE_PRODUCTION/desktop/js/
├── magnifier-manager.js           # Version complète (23KB)
└── magnifier-manager-simple.js    # Version simple (9KB)
```

### 🔴 FICHIERS OBSOLÈTES/DOUBLONS (À NETTOYER)

#### Scripts Root (OBSOLÈTES)
```
/js/
├── portfolio-manager.js           ❌ DOUBLON OBSOLÈTE
├── navigation-manager.js          ❌ DOUBLON OBSOLÈTE  
├── magnifier-manager-*.js         ❌ MULTIPLES VERSIONS
├── script.js                      ❌ VERSION ANCIENNE
└── *-backup.js                    ❌ BACKUPS NON UTILISÉS
```

#### Fichiers Test (À ARCHIVER)
```
/ (root)
├── test-*.html                    ❌ 15+ fichiers de test
├── diagnostic-*.html              ❌ Diagnostics temporaires
├── cache-buster.html              ❌ Test cache
└── solution-finale.html           ❌ Tests performance
```

### 📊 STATISTIQUES PAR CATÉGORIE

#### Fichiers JavaScript (production)
- **Critiques** : 6 fichiers (total: ~65KB)
- **Backups** : 4 fichiers (total: ~140KB)  
- **Obsolètes** : 12+ fichiers (total: ~300KB+)

#### Fichiers HTML  
- **Production** : 3 fichiers (desktop + mobile + redirect)
- **Tests** : 20+ fichiers (à archiver)
- **Diagnostics** : 8 fichiers (temporaires)

#### Fichiers CSS
- **Desktop** : 2 fichiers principaux
- **Mobile** : 6+ versions différentes
- **Test** : 3+ fichiers diagnostics

---

## 🏗️ ARCHITECTURE RECOMMANDÉE

### Structure cible (après nettoyage)
```
/01_SITE_PRODUCTION/
├── /desktop/                      # VERSION DESKTOP
│   ├── index.html
│   ├── /css/style.css
│   ├── /js/                       # TOUS LES SCRIPTS DESKTOP
│   └── /assets/images/            # IMAGES PROJETS
├── /mobile/                       # VERSION MOBILE  
│   ├── index.html
│   ├── /css/
│   ├── /js/
│   └── /pages/                    # MODULES MOBILES
├── /shared/                       # ASSETS PARTAGÉS (à créer)
│   ├── /fonts/
│   ├── /sounds/
│   └── /configs/
└── index.html                     # REDIRECTEUR

/99_ARCHIVE_INUTILISE/             # ARCHIVES
├── /Tests_Experimentations/       # Tests déplacés
├── /Versions_Precedentes/         # Anciens scripts
└── /Documentation_Ancienne/       # Docs obsolètes

/docs/                             # DOCUMENTATION
├── README_DOCUMENTATION_COMPLETE.md
├── AUDIT_TECHNIQUE.md
├── GUIDE_DEPANNAGE.md
└── INVENTAIRE_FICHIERS.md (ce fichier)
```

---

## 🔍 COMMANDES D'ANALYSE

### Audit tailles fichiers
```bash
# Scripts JS desktop
Get-ChildItem "01_SITE_PRODUCTION\desktop\js" | Select-Object Name, Length

# Images preview existantes  
Get-ChildItem "01_SITE_PRODUCTION\desktop\assets\images\*\preview.jpg"

# Doublons potentiels
Get-ChildItem -Recurse -Name "*manager*.js" | Group-Object { Split-Path $_ -Leaf }
```

### Recherche doublons fonctions
```bash
# Fonction openPortfolioCollectibles
grep -r "openPortfolioCollectibles" --include="*.js" --include="*.html"

# Classes Manager
grep -r "class.*Manager" --include="*.js"
```

---

## 🎯 ACTIONS DE NETTOYAGE PRIORITAIRES

### Phase 1 - Suppression doublons
1. Supprimer `/js/portfolio-manager.js` (obsolète)
2. Supprimer `/js/navigation-manager.js` (obsolète)
3. Supprimer multiples versions magnifier-manager

### Phase 2 - Archivage tests
1. Déplacer `test-*.html` vers `/99_ARCHIVE_INUTILISE/`
2. Déplacer `diagnostic-*.html` vers archives
3. Nettoyer fichiers temporaires root

### Phase 3 - Unification
1. Une seule fonction `openPortfolioCollectibles`
2. Chemins images standardisés
3. Structure CSS cohérente

---

## 📈 MÉTRIQUES ACTUELLES

### Espace disque utilisé
- **Production** : ~50MB (images + scripts)
- **Archives** : ~200MB (anciennes versions)
- **Tests/Diagnostics** : ~30MB (à nettoyer)

### Performance code
- **Scripts critiques** : 65KB total ✅ OPTIMAL
- **Images** : Toutes preview présentes ✅
- **Cache-busting** : Implémenté ✅

### Santé codebase
- **Doublons** : 9 fonctions critiques ❌ À CORRIGER
- **Obsolètes** : 12+ fichiers JS ❌ À NETTOYER  
- **Structure** : Incohérente ❌ À RÉORGANISER

---

*Inventaire réalisé le 5 novembre 2025*  
*État : FONCTIONNEL mais nécessite nettoyage*