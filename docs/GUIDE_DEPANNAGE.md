# 🎯 GUIDE DE DÉPANNAGE RAPIDE

## 🚨 PROBLÈMES FRÉQUENTS & SOLUTIONS

### 1. 📸 Images collectibles disparues après vider le cache

**Symptômes :**
- Page collectibles vide/blanche
- Console error 404 sur images
- Thumbnails projets non affichés

**Diagnostic :**
```bash
# Vérifier présence images
Test-Path "01_SITE_PRODUCTION\desktop\assets\images\Cirucs\preview.jpg"
Test-Path "01_SITE_PRODUCTION\desktop\assets\images\Room\preview.jpg"
```

**Solutions :**
1. **Cache navigateur** : Utiliser `index-cache-bust.html`
2. **Preview manquant** : Copier image existante vers `preview.jpg`
3. **Chemins cassés** : Vérifier `assets/images/` vs chemins absolus

### 2. 🐌 Performance dégradée (2 FPS au lieu de 60)

**Symptômes :**
- Lag sur collectibles
- Navigation lente
- Animations saccadées

**Diagnostic :**
```bash
# Vérifier tailles fichiers JS
Get-ChildItem "01_SITE_PRODUCTION\desktop\js" | Select-Object Name, Length
```

**Solutions :**
1. **Portfolio trop lourd** : Utiliser version 20KB au lieu de 185KB
2. **Monitoring performance** : Supprimer de script.js
3. **Effects lourds** : Vérifier effects-manager-gribouillage.js

### 3. ⚠️ Erreurs JavaScript console

**Symptômes :**
- TypeError: Cannot read property
- Function not defined
- Module import errors

**Solutions :**
1. **UTF-16 corruption** : Réencoder fichiers en UTF-8
2. **Doublons fonctions** : Unifier `openPortfolioCollectibles`
3. **Chemins relatifs** : Vérifier structure dossiers

### 4. 🔄 Navigation cassée entre pages

**Symptômes :**
- Boutons non fonctionnels
- Pages ne s'affichent pas
- Retour menu impossible

**Solutions :**
1. **Navigation manager** : Utiliser version `/01_SITE_PRODUCTION/desktop/js/`
2. **Event listeners** : Vérifier DOMContentLoaded
3. **CSS display** : Forcer `display: block !important`

### 5. 📱 Mobile non responsive

**Symptômes :**
- Layout cassé mobile
- Touch events ne marchent pas
- Images déformées

**Solutions :**
1. **Version mobile** : Utiliser `/01_SITE_PRODUCTION/mobile/`
2. **Viewport meta** : Vérifier `viewport` tag
3. **Touch CSS** : Vérifier `-webkit-touch-callout`

---

## 🔧 COMMANDES DE RÉPARATION EXPRESS

### Restaurer version stable
```bash
# Desktop stable (pré-traduction)
git checkout 989461d -- 01_SITE_PRODUCTION/desktop/

# Mobile stable (avec traduction)  
git checkout 3590d35 -- 01_SITE_PRODUCTION/mobile/
```

### Réparer images manquantes
```bash
# Créer preview Room manquant
Copy-Item "01_SITE_PRODUCTION\desktop\assets\images\Room\Neulinger_Clara_Room_Renders_1.jpg" "01_SITE_PRODUCTION\desktop\assets\images\Room\preview.jpg"

# Vérifier tous les previews
Get-ChildItem "01_SITE_PRODUCTION\desktop\assets\images\*\preview.jpg"
```

### Optimiser performance
```bash
# Utiliser version légère portfolio
Copy-Item "01_SITE_PRODUCTION\desktop\js\portfolio-manager-clean.js" "01_SITE_PRODUCTION\desktop\js\portfolio-manager.js" -Force

# Vérifier tailles
Get-ChildItem "01_SITE_PRODUCTION\desktop\js\portfolio-manager*.js" | Select-Object Name, Length
```

---

## 🏥 DIAGNOSTIC AVANCÉ

### Test complet images
Créer et ouvrir : `/desktop/test-images.html`
```html
<!-- Teste toutes les images preview -->
<img src="assets/images/Cirucs/preview.jpg" onload="console.log('✅ Circus')" onerror="console.log('❌ Circus')">
```

### Test performance JavaScript
```javascript
// Dans DevTools Console
console.time('portfolio-load');
// Naviguer vers collectibles
console.timeEnd('portfolio-load');
// Doit être < 100ms
```

### Test cache-busting
```javascript
// Vérifier URLs avec timestamp
document.querySelectorAll('img[src*="?v="]');
// Doit retourner images avec paramètres cache
```

---

## 📋 CHECKLIST DE SANTÉ

### ✅ Site opérationnel
- [ ] Page d'accueil charge < 3s
- [ ] Collectibles s'affichent toutes
- [ ] Navigation fluide (60 FPS)
- [ ] Aucune erreur console
- [ ] Images visibles (cache vide)
- [ ] Mobile responsive
- [ ] Contact CV interactif

### ⚙️ Code propre
- [ ] portfolio-manager.js = 20KB max
- [ ] Aucun doublon fonction critique
- [ ] Cache-busting implémenté
- [ ] Chemins images cohérents
- [ ] Scripts UTF-8 encodés

### 🔒 Backups disponibles
- [ ] portfolio-manager-backup.js (108KB)
- [ ] Commits stables documentés
- [ ] Files preview.jpg tous présents
- [ ] Version cache-bust HTML

---

## 🆘 CONTACTS D'URGENCE

### Versions stables testées
- **Desktop** : Commit `989461d` (04 nov 2025)
- **Mobile** : Commit `3590d35` (04 nov 2025)  
- **Performance** : portfolio-manager 20KB

### Fichiers critiques sauvegardés
- `portfolio-manager-backup.js` (version complète)
- `portfolio-manager-clean.js` (version optimisée)
- `script_ultra_simple.js` (version minimale)

### URLs de test fonctionnelles
- `http://localhost/Clara_Neulinger/01_SITE_PRODUCTION/desktop/`
- `http://localhost/Clara_Neulinger/01_SITE_PRODUCTION/desktop/index-cache-bust.html`

---

*Guide mis à jour : 5 novembre 2025*  
*En cas de problème majeur : restaurer commits stables*