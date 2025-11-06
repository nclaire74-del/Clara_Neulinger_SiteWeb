# Plan de Standardisation des Chemins d'Images

**Date**: 6 novembre 2025  
**Objectif**: Remplacer tous les chemins absolus `/Clara_Neulinger/` par des chemins relatifs pour rendre le site portable

---

## Analyse des Chemins Actuels

### Structure des Chemins Absolus
```
/Clara_Neulinger/
├── 01_SITE_PRODUCTION/desktop/font/ (fonts)
├── 05_PROJETS_3D/
    ├── projets_portfolio/ (vidéos, viewers Marmoset, images projets)
    └── Images_Portfolio/ (CV, Logos)
```

### Structure Relative Cible
```
Desktop: /website/01_SITE_PRODUCTION/desktop/
  → ../../05_PROJETS_3D/
  → ../../05_PROJETS_3D/projets_portfolio/
  → ../../05_PROJETS_3D/Images_Portfolio/
  → ../font/ (pour les fonts locales)

Mobile: /website/01_SITE_PRODUCTION/mobile/
  → ../../05_PROJETS_3D/
  → ../../05_PROJETS_3D/projets_portfolio/
  → ../../05_PROJETS_3D/Images_Portfolio/
  → ../../01_SITE_PRODUCTION/desktop/font/ (fonts partagées)
```

---

## Inventaire des Occurrences

### 📁 Desktop (17 occurrences)

#### `desktop/index.html` (10 occurrences)
| Ligne | Type | Chemin Actuel | Chemin Relatif |
|-------|------|---------------|----------------|
| 24 | video | `/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Cirucs/...mp4` | `../../05_PROJETS_3D/projets_portfolio/Cirucs/...mp4` |
| 73 | img CV | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg` | `../../05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg` |
| 88 | img CV | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/2.svg` | `../../05_PROJETS_3D/Images_Portfolio/Cv/2.svg` |
| 97 | img CV | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg` | `../../05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg` |
| 101 | img CV | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/2.svg` | `../../05_PROJETS_3D/Images_Portfolio/Cv/2.svg` |
| 113 | img CV | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg` | `../../05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg` |
| 132 | img logo | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/pngwing.com.png` | `../../05_PROJETS_3D/Images_Portfolio/Logos/pngwing.com.png` |
| 135 | img logo | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/—Pngtree—linkedin...png` | `../../05_PROJETS_3D/Images_Portfolio/Logos/—Pngtree—linkedin...png` |
| 138 | img logo | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/The_Rookies.jpg` | `../../05_PROJETS_3D/Images_Portfolio/Logos/The_Rookies.jpg` |
| 141 | img logo | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/Contact.png` | `../../05_PROJETS_3D/Images_Portfolio/Logos/Contact.png` |

#### `desktop/js/magnifier-manager-simple.js` (5 occurrences)
| Ligne | Type | Chemin Actuel | Chemin Relatif |
|-------|------|---------------|----------------|
| 252 | variable | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg` | `../../05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg` |
| 258 | variable | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/2.svg` | `../../05_PROJETS_3D/Images_Portfolio/Cv/2.svg` |
| 357 | replace | `magnifiedImage.src.replace('../../', '/Clara_Neulinger/')` | ⚠️ **LOGIQUE À INVERSER** |
| 359 | condition | `magnifiedImage.src.includes('/Clara_Neulinger/')` | ⚠️ **LOGIQUE À SUPPRIMER** |
| 360 | replace | `magnifiedImage.src.replace('/Clara_Neulinger/', '../../')` | ⚠️ **LOGIQUE À SUPPRIMER** |

**Note**: Lignes 357-360 contiennent une conversion bidirectionnelle absolu ↔ relatif qui doit être **supprimée** après standardisation.

#### `desktop/js/portfolio-manager.js` (2 occurrences)
| Ligne | Type | Chemin Actuel | Chemin Relatif |
|-------|------|---------------|----------------|
| 395 | iframe viewer | `/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/${project.folder}/...` | `../../05_PROJETS_3D/projets_portfolio/${project.folder}/...` |
| 653 | iframe viewer | `/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/${project.folder}/...` | `../../05_PROJETS_3D/projets_portfolio/${project.folder}/...` |

---

### 📱 Mobile (43 occurrences dans index.html)

#### Fonts et Preload (3 occurrences)
| Ligne | Type | Chemin Actuel | Chemin Relatif |
|-------|------|---------------|----------------|
| 12 | preload font | `/Clara_Neulinger/01_SITE_PRODUCTION/desktop/font/kindergarten.ttf` | `../desktop/font/kindergarten.ttf` |
| 13 | prefetch | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/pngwing.com.png` | `../../05_PROJETS_3D/Images_Portfolio/Logos/pngwing.com.png` |
| 19 | @font-face | `/Clara_Neulinger/01_SITE_PRODUCTION/desktop/font/kindergarten.ttf` | `../desktop/font/kindergarten.ttf` |

#### Vidéo et Logos Page Principale (5 occurrences)
| Ligne | Type | Chemin Actuel | Chemin Relatif |
|-------|------|---------------|----------------|
| 1525 | video source | `/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Cirucs/...mp4` | `../../05_PROJETS_3D/projets_portfolio/Cirucs/...mp4` |
| 1580 | img logo | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/pngwing.com.png` | `../../05_PROJETS_3D/Images_Portfolio/Logos/pngwing.com.png` |
| 1583 | img logo | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/—Pngtree—linkedin...png` | `../../05_PROJETS_3D/Images_Portfolio/Logos/—Pngtree—linkedin...png` |
| 1586 | img logo | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/The_Rookies.jpg` | `../../05_PROJETS_3D/Images_Portfolio/Logos/The_Rookies.jpg` |
| 1589 | img logo | `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/Contact.png` | `../../05_PROJETS_3D/Images_Portfolio/Logos/Contact.png` |

#### Configuration Projets Portfolio (19 occurrences - lignes 1683-1786)
6 projets × 2-4 chemins chacun :
- Circus: image, video, viewerFiles.environment, viewerFiles.character
- Archway: image, video, viewer
- Room: image, viewer
- Kitchen: image, viewer
- Telephone: image, viewer
- Gun: image, viewer

**Remplacement systématique**: `/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/` → `../../05_PROJETS_3D/projets_portfolio/`

#### JavaScript Inline (16 occurrences - lignes 2092-3125)
| Ligne | Type | Contexte |
|-------|------|----------|
| 2092 | onerror fallback | Image Gun par défaut |
| 2256 | img preview | Arch asset preview |
| 2291 | img preview | Gun asset preview |
| 2327 | img preview | Room asset preview |
| 2362 | img preview | Telephone asset preview |
| 2407 | baseDir variable | Construction chemins portfolio |
| 2430 | template string | Logos dans HTML |
| 2437 | baseDir variable | Construction chemins collectibles |
| 2575 | imagePath variable | Chargement images dynamiques |
| 2606 | template string | Logos dans HTML |
| 2649-2652 | object paths | Map types assets Arch (4 chemins) |
| 2767 | src dynamique | Gun asset preview |
| 2831 | src dynamique | Telephone asset preview |
| 2897 | src dynamique | Room asset preview |
| 2938-2939 | array paths | CV recto/verso (2 chemins) |
| 3125 | link href | Gun fallback image |

---

## Stratégie de Remplacement

### Étape 1: Desktop HTML
**Fichier**: `01_SITE_PRODUCTION/desktop/index.html`
- Remplacement global: `/Clara_Neulinger/05_PROJETS_3D/` → `../../05_PROJETS_3D/`
- 10 occurrences modifiées
- Test: Vérifier affichage CV, logos, vidéo

### Étape 2: Desktop JS - portfolio-manager.js
**Fichier**: `01_SITE_PRODUCTION/desktop/js/portfolio-manager.js`
- Ligne 395 et 653: viewers Marmoset
- Remplacement: `/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/` → `../../05_PROJETS_3D/projets_portfolio/`
- Test: Vérifier ouverture viewers 3D

### Étape 3: Desktop JS - magnifier-manager-simple.js
**Fichier**: `01_SITE_PRODUCTION/desktop/js/magnifier-manager-simple.js`
- Lignes 252, 258: Chemins CV → relatifs
- **Lignes 357-360**: Supprimer logique conversion absolu/relatif (obsolète après standardisation)
- Test: Vérifier loupe sur CV

### Étape 4: Mobile HTML - Fonts et Preload
**Fichier**: `01_SITE_PRODUCTION/mobile/index.html`
- Lignes 12, 19: `/Clara_Neulinger/01_SITE_PRODUCTION/desktop/font/` → `../desktop/font/`
- Ligne 13: `/Clara_Neulinger/05_PROJETS_3D/` → `../../05_PROJETS_3D/`
- Test: Vérifier chargement font

### Étape 5: Mobile HTML - Page Principale
**Fichier**: `01_SITE_PRODUCTION/mobile/index.html`
- Lignes 1525-1589: Vidéo + 4 logos
- Remplacement: `/Clara_Neulinger/05_PROJETS_3D/` → `../../05_PROJETS_3D/`
- Test: Vérifier affichage page home

### Étape 6: Mobile HTML - Configuration Projets
**Fichier**: `01_SITE_PRODUCTION/mobile/index.html`
- Lignes 1683-1786: 19 chemins dans objets portfolio
- Remplacement global dans cette section
- Test: Vérifier projets portfolio (ouvrir chaque projet)

### Étape 7: Mobile HTML - JavaScript Inline
**Fichier**: `01_SITE_PRODUCTION/mobile/index.html`
- Lignes 2092-3125: 16 occurrences
- Remplacement global dans section `<script>`
- Test: Vérifier assets, galeries, CV mobile

---

## Commandes de Remplacement

### Desktop
```powershell
# index.html desktop
(Get-Content "desktop/index.html") -replace '/Clara_Neulinger/05_PROJETS_3D/', '../../05_PROJETS_3D/' | Set-Content "desktop/index.html"

# portfolio-manager.js
(Get-Content "desktop/js/portfolio-manager.js") -replace '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/', '../../05_PROJETS_3D/projets_portfolio/' | Set-Content "desktop/js/portfolio-manager.js"

# magnifier-manager-simple.js (nécessite modifications manuelles lignes 357-360)
```

### Mobile
```powershell
# mobile/index.html - Remplacement global en 2 passes
(Get-Content "mobile/index.html") -replace '/Clara_Neulinger/01_SITE_PRODUCTION/desktop/font/', '../desktop/font/' | Set-Content "mobile/index.html"
(Get-Content "mobile/index.html") -replace '/Clara_Neulinger/05_PROJETS_3D/', '../../05_PROJETS_3D/' | Set-Content "mobile/index.html"
```

---

## Tests de Validation

### ✅ Desktop
1. Ouvrir http://localhost/website/01_SITE_PRODUCTION/desktop/
2. Vérifier vidéo background Circus
3. Ouvrir Contact → Vérifier CV recto/verso
4. Tester loupe sur CV
5. Vérifier logos (ArtStation, LinkedIn, Rookies, Contact)
6. Ouvrir Portfolio → Tester viewers Marmoset (Circus, Archway, etc.)

### ✅ Mobile
1. Ouvrir http://localhost/website/01_SITE_PRODUCTION/mobile/
2. Vérifier font Kindergarten chargée
3. Vérifier vidéo background Circus
4. Vérifier logos footer
5. Ouvrir chaque projet portfolio (Circus, Archway, Gun, Room, Kitchen, Telephone)
6. Vérifier asset switchers (ALBEDO, AO, METALLIC, ROUGHNESS)
7. Tester galeries d'images
8. Ouvrir CV → Vérifier recto/verso

---

## Risques et Mitigations

### 🚨 Risques Identifiés
1. **Chemins encodés URL** (ex: `BASE%20COLOR`) → Vérifier après remplacement
2. **Logique magnifier desktop** (lignes 357-360) → Suppression nécessaire
3. **Cache navigateur** → Forcer rafraîchissement (Ctrl+F5)
4. **Viewers Marmoset externes** → Tester chaque iframe

### ✅ Mitigations
1. Commit Git avant modifications
2. Tests après chaque étape
3. Remplacement progressif fichier par fichier (pas global)
4. Vérification visuelle complète

---

## Bénéfices Attendus

✅ **Portabilité**: Site déplaçable sans modification chemins  
✅ **Maintenance**: Chemins cohérents et lisibles  
✅ **Performance**: Pas de changement (même résolution navigateur)  
✅ **Hébergement**: Prêt pour déploiement externe  

---

## Timeline

| Étape | Fichier | Occurrences | Temps estimé |
|-------|---------|-------------|--------------|
| 1 | desktop/index.html | 10 | 5 min |
| 2 | desktop/js/portfolio-manager.js | 2 | 3 min |
| 3 | desktop/js/magnifier-manager-simple.js | 5 | 10 min (logique à modifier) |
| 4-7 | mobile/index.html | 43 | 15 min |
| Tests | Desktop + Mobile | - | 15 min |
| **TOTAL** | 4 fichiers | 60 chemins | **~50 min** |

---

**Prêt à démarrer la standardisation** ✅
