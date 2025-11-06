# 🗺️ CARTOGRAPHIE DES CHEMINS D'ACCÈS - 6 novembre 2025

## 📊 ANALYSE COMPLÈTE DES CHEMINS UTILISÉS

Cette analyse documente tous les chemins d'accès aux ressources (images, vidéos, scripts, fonts) utilisés dans les versions production du site.

---

## 🎯 DEUX TYPES DE CHEMINS IDENTIFIÉS

### 1. Chemins RELATIFS (depuis le contexte du fichier)
Exemple : `assets/images/Gun/preview.jpg`
- ✅ **Avantage** : Portable, fonctionne partout
- ⚠️ **Contexte** : Relatif au fichier qui l'appelle

### 2. Chemins ABSOLUS (depuis la racine du serveur)
Exemple : `/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/...`
- ⚠️ **Problème** : Dépend de la structure du serveur
- ⚠️ **Non portable** : Ne fonctionnera pas si on change le dossier racine

---

## 📍 VERSION DESKTOP - Chemins utilisés

### Index.html (`/01_SITE_PRODUCTION/desktop/index.html`)

#### CSS (RELATIF ✅)
```html
<link rel="stylesheet" href="css/style.css">
```
✅ Chemin relatif correct

#### Scripts JS (RELATIFS ✅)
```html
<script src="js/translations.js"></script>
<script src="js/config.js"></script>
<script src="js/loading-manager.js"></script>
<script src="js/video-manager.js"></script>
<script src="js/navigation-manager.js"></script>
<script src="js/effects-manager-gribouillage.js"></script>
<script src="js/button-parallax-manager.js"></script>
<script src="js/dual-paper-manager.js"></script>
<script src="js/cv-mobile-manager.js"></script>
<script src="js/magnifier-manager-simple.js"></script>
<script src="js/portfolio-manager.js"></script>
<script src="js/options-manager.js"></script>
<script src="js/contact-manager.js"></script>
<script src="js/script.js"></script>
```
✅ Tous les scripts en chemins relatifs corrects

#### Vidéo d'arrière-plan (ABSOLU ⚠️)
```html
<source src="/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Cirucs/Neulinger_Clara_3B3D_Circus_Render_Video.mp4">
```
⚠️ Chemin absolu - Devrait être : `assets/videos/Circus_Video.mp4`

#### Images CV (ABSOLUES ⚠️)
```html
<img src="/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg">
<img src="/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/2.svg">
```
⚠️ Chemins absolus - Devraient être : `assets/images/Contact/Cv_fr.svg`

#### Logos sociaux (ABSOLUS ⚠️)
```html
<img src="/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/pngwing.com.png">
<img src="/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/—Pngtree—linkedin social media icon_3609691.png">
<img src="/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/The_Rookies.jpg">
<img src="/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/Contact.png">
```
⚠️ Tous en chemins absolus - Devraient être : `assets/images/Logos/`

---

### Portfolio Manager (`/01_SITE_PRODUCTION/desktop/js/portfolio-manager.js`)

#### Images projets (RELATIFS ✅)
```javascript
src: 'assets/images/Cirucs/Neulinger_Clara_3B3D_Circus_Render_Video.mp4'
src: 'assets/images/Arch/Neulinger_Clara_3B3D_Archway_Render_Video.mp4'
src: 'assets/images/Gun/NEULINGER_Clara_2B3DArt_Rendu_Texture.jpg'
src: 'assets/images/Kitchen/preview.jpg'
src: 'assets/images/Room/Untitled_Camera 1_FullQuality.jpg'
src: 'assets/images/Telephone/NEULINGER_CLARA_2B3DART_TELEPHONE_5.jpg'
```
✅ Tous en chemins relatifs corrects

#### Preview images avec cache-busting (RELATIFS ✅)
```javascript
src: `assets/images/${folderConfig.folder}/preview.jpg?v=${Date.now()}`
```
✅ Chemin relatif avec versioning

#### Viewers Marmoset (ABSOLUS ⚠️)
```javascript
src="/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/${project.folder}/${project.viewerFiles?.environment}"
src="/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/${project.folder}/${project.viewerFiles.character}"
```
⚠️ Chemins absolus - Nécessaires car les viewers Marmoset sont externes

#### Logos logiciels (RELATIFS ✅)
```javascript
'Maya': { src: 'Maya.png', alt: 'Maya' }
// Compilé en :
`<img src="assets/images/Logos/${logo.src}">`
```
✅ Chemin relatif correct

---

## 📱 VERSION MOBILE - Chemins utilisés

### Index.html (`/01_SITE_PRODUCTION/mobile/index.html`)

⚠️ **Attention** : Le mobile utilise **TOUS LES CHEMINS EN ABSOLU**

#### Fonts (ABSOLUES ⚠️)
```html
<link rel="preload" href="/Clara_Neulinger/01_SITE_PRODUCTION/desktop/font/kindergarten.ttf">
```
⚠️ Fait référence au dossier desktop pour la font

#### Vidéo (ABSOLU ⚠️)
```html
<source src="/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Cirucs/Neulinger_Clara_3B3D_Circus_Render_Video.mp4">
```

#### Logos (ABSOLUS ⚠️)
```html
<img src="/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/pngwing.com.png">
<img src="/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/—Pngtree—linkedin social media icon_3609691.png">
<img src="/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/The_Rookies.jpg">
<img src="/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Logos/Contact.png">
```

#### Projets portfolio (ABSOLUS ⚠️ - inline dans JS)
```javascript
projects: [
    {
        image: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Cirucs/Neulinger_Clara_3B3D_Circus_Enviro_Renders_1.jpg',
        video: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Cirucs/Neulinger_Clara_3B3D_Circus_Render_Video.mp4',
        viewers: {
            environment: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Cirucs/Circus_Viewer.html',
            character: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Cirucs/Chara_Circus_Viewer.html'
        }
    },
    // ... autres projets similaires
]
```

#### Assets projets inline (ABSOLUS ⚠️)
```javascript
const baseDir = `/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/${project.folder}/`;
```

---

## 🔍 ANALYSE DES DOUBLONS D'ASSETS

### Dossier `/01_SITE_PRODUCTION/desktop/assets/`

Vérifions si les ressources existent localement :

```
/01_SITE_PRODUCTION/desktop/assets/
├── /images/              ← DEVRAIT contenir les images
│   ├── /Arch/
│   ├── /Cirucs/
│   ├── /Gun/
│   ├── /Kitchen/
│   ├── /Room/
│   ├── /Telephone/
│   ├── /Contact/        ← Pour CV
│   └── /Logos/          ← Pour logos sociaux et logiciels
└── /videos/             ← DEVRAIT contenir la vidéo de fond
```

### Dossier `/05_PROJETS_3D/` (externe)

```
/05_PROJETS_3D/
├── /Images_Portfolio/
│   ├── /Cv/             ← CV en SVG
│   └── /Logos/          ← Logos sociaux
└── /projets_portfolio/
    ├── /Cirucs/         ← Viewer + assets Circus
    ├── /Arch/           ← Viewer + assets Archway
    ├── /Gun/            ← Viewer + assets Gun
    ├── /Kitchen/        ← Viewer + assets Kitchen
    ├── /Room/           ← Viewer + assets Room
    └── /Telephone/      ← Viewer + assets Telephone
```

---

## 🎯 PROBLÈMES IDENTIFIÉS

### 1. Chemins absolus dans HTML
❌ **Problème** : Les chemins absolus `/Clara_Neulinger/...` dans l'HTML ne sont pas portables
- Si on renomme le dossier racine, tout casse
- Si on déploie sur un autre serveur, les chemins sont invalides

### 2. Incohérence Desktop vs Mobile
❌ **Problème** :
- Desktop : Mix de relatifs (scripts, portfolio-manager) et absolus (HTML)
- Mobile : Tout en absolu

### 3. Ressources dupliquées potentiellement
❌ **Possible** : Les images existent à deux endroits :
- `/01_SITE_PRODUCTION/desktop/assets/images/`
- `/05_PROJETS_3D/projets_portfolio/`

### 4. Référence croisée mobile → desktop
❌ **Problème** : Mobile charge la font depuis :
```html
/Clara_Neulinger/01_SITE_PRODUCTION/desktop/font/kindergarten.ttf
```
Mobile devrait avoir sa propre copie ou utiliser un chemin partagé

---

## ✅ SOLUTIONS RECOMMANDÉES

### Phase 1 : Vérifier l'existence des assets locaux
```bash
# Vérifier si assets/images existe et contient les projets
Get-ChildItem "01_SITE_PRODUCTION/desktop/assets/images" -Recurse

# Vérifier les viewers Marmoset
Get-ChildItem "05_PROJETS_3D/projets_portfolio" -Recurse -Filter "*_Viewer.html"
```

### Phase 2 : Stratégie de chemins recommandée

#### Pour Desktop :
1. **HTML (index.html)** :
   - Remplacer chemins absolus par relatifs
   - Vidéo : `assets/videos/circus_video.mp4`
   - CV : `assets/images/Contact/Cv_fr.svg`
   - Logos : `assets/images/Logos/artstation.png`

2. **Portfolio Manager (JS)** :
   - ✅ Garder chemins relatifs actuels : `assets/images/`
   - ⚠️ Exception viewers Marmoset : garder absolus (externes)

3. **Structure assets cible** :
```
/01_SITE_PRODUCTION/desktop/assets/
├── /images/
│   ├── /Arch/              ← Images preview + assets projet
│   ├── /Cirucs/            ← Images preview + assets projet
│   ├── /Gun/               ← Images preview + assets projet
│   ├── /Kitchen/           ← Images preview + assets projet
│   ├── /Room/              ← Images preview + assets projet
│   ├── /Telephone/         ← Images preview + assets projet
│   ├── /Contact/           ← CV (Cv_fr.svg, 2.svg)
│   └── /Logos/             ← Logos sociaux + logiciels
├── /videos/
│   └── circus_video.mp4    ← Vidéo de fond
└── /fonts/
    └── kindergarten.ttf    ← Font locale
```

#### Pour Mobile :
1. **Créer structure assets similaire**
2. **Remplacer tous les chemins absolus par relatifs**
3. **Copier font localement** au lieu de référencer desktop

---

## 📊 RÉSUMÉ QUANTITATIF

### Chemins à corriger dans Desktop
- ❌ 1 vidéo (fond) : chemin absolu → relatif
- ❌ 6 images CV : chemins absolus → relatifs
- ❌ 4 logos sociaux : chemins absolus → relatifs
- ✅ 14 scripts : déjà en relatifs
- ✅ Portfolio images : déjà en relatifs
- ⚠️ Viewers Marmoset : garder absolus (externes)

### Chemins à corriger dans Mobile
- ❌ 1 font : chemin absolu vers desktop → local
- ❌ 1 vidéo : chemin absolu → relatif
- ❌ 4 logos : chemins absolus → relatifs
- ❌ Tous les projets inline JS : chemins absolus → relatifs

---

## 🚨 PROCHAINES ÉTAPES

1. **Vérifier** si `/01_SITE_PRODUCTION/desktop/assets/images/` contient les images
2. **Copier** les ressources manquantes depuis `/05_PROJETS_3D/`
3. **Remplacer** les chemins absolus par relatifs (phase par phase)
4. **Tester** après chaque changement
5. **Documenter** les viewers Marmoset externes (légitimes)

---

*Cartographie réalisée le 6 novembre 2025*  
*Méthode : Analyse grep de tous les src/href dans index.html et managers JS*
