# Dossier Projet Circus 3D

## ✅ FICHIERS UTILISÉS PAR LE SITE

### `index.html`
- **Statut**: ✅ ACTIF - Page principale du projet Circus 3D
- **Utilisé par**: Portfolio principal via iframe
- **Dépendances**:
  - `../js/marmoset.js` - Script pour viewer 3D
  - `../font/kindergarten.ttf` - Police personnalisée
  - `../assets/images/Cirucs/ok.mview` - Modèle 3D
  - `../assets/images/Cirucs/*.jpg` - 18 images du projet

### Dépendances externes vérifiées:
- ✅ `../js/marmoset.js` - EXISTE
- ✅ `../font/kindergarten.ttf` - EXISTE  
- ✅ `../assets/images/Cirucs/ok.mview` - EXISTE
- ✅ Images Circus (18 fichiers) - EXISTENT

## 🗂️ FICHIERS NON UTILISÉS (dans /pas_utiliser/)

### `projet-circus-3d.html`
- **Statut**: ❌ INACTIF - Ancienne version avec erreurs JavaScript
- **Problèmes**: Erreurs de syntaxe, code corrompu
- **Remplacé par**: `index.html`

### `test-viewer.html`
- **Statut**: ❌ INACTIF - Fichier de test
- **Usage**: Tests de développement uniquement

### `viewer-3d-alternatif.html`
- **Statut**: ❌ INACTIF - Version alternative non utilisée
- **Usage**: Prototype abandonné

### `viewer-3d-simple.html`
- **Statut**: ❌ INACTIF - Version simplifiée non utilisée
- **Usage**: Test de concept

## 🎯 STRUCTURE ACTUELLE

```
circus-3d/
├── index.html              ✅ PAGE PRINCIPALE
├── pas_utiliser/           📁 FICHIERS ARCHIVÉS
│   ├── projet-circus-3d.html
│   ├── test-viewer.html
│   ├── viewer-3d-alternatif.html
│   └── viewer-3d-simple.html
└── README.md               📖 CE FICHIER
```

## 🔧 CONFIGURATION PORTFOLIO

Le portfolio principal (`../js/portfolio-manager.js`) pointe vers:
```javascript
src="circus-3d/index.html"
```

## 🎪 FONCTIONNALITÉS ACTIVES

- ✅ Galerie d'images (18 renders Circus)
- ✅ Viewer Marmoset 3D 
- ✅ Lightbox pour images
- ✅ Onglet informations pliable
- ✅ Design responsive
- ✅ Navigation clavier

## 🐛 DÉPANNAGE

Si le viewer ne s'affiche pas:
1. Vérifier console JavaScript (F12)
2. Vérifier que `marmoset.js` se charge
3. Vérifier accès au fichier `.mview`
4. Tester les chemins relatifs

---
*Généré le 17 octobre 2025*