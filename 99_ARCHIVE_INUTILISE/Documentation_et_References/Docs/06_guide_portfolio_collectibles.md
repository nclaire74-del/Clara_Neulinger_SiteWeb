# Guide d'utilisation - Portfolio "Collectibles"

## 🎮 Vue d'ensemble

Le système de portfolio est conçu comme une interface de jeu vidéo "Collectibles" permettant de naviguer facilement entre les projets sans avoir besoin de coder à chaque fois.

## 🚀 Comment utiliser le portfolio

### Navigation
- **Boutons fléchés** : Navigation entre les projets
- **Dots** : Accès direct à un projet spécifique  
- **Clavier** :
  - `←` / `→` : Naviguer entre les projets
  - `↑` / `↓` : Changer de catégorie
  - `Échap` : Retour au menu principal

### Interface
- **Collectibles Header** : Affiche la catégorie actuelle avec navigation
- **Project Showcase** : Zone d'affichage 3D du projet (placeholder pour l'instant)
- **Project Info** : Titre, description et tags du projet
- **Navigation Dots** : Indicateurs visuels de position dans la liste

## ⚙️ Ajouter des projets (Développeur)

### Méthode 1 : Via JavaScript (facile)
```javascript
// Ajouter un nouveau projet
portfolioManager.addProject({
    title: "Mon Nouveau Projet",
    description: "Description détaillée du projet...",
    tags: ["3D", "Animation", "Character"],
    category: "Projets 3D"
});
```

### Méthode 2 : Modifier le fichier portfolio-manager.js
Localiser le tableau `this.projects` dans le constructeur et ajouter :
```javascript
{
    id: 6, // Numéro suivant
    title: "Titre du Projet",
    description: "Description complète du projet avec détails techniques et artistiques.",
    tags: ["Tag1", "Tag2", "Tag3"],
    category: "Projets 3D"
}
```

## 🎨 Structure d'un projet

```javascript
{
    id: Number,              // ID unique du projet
    title: String,           // Titre affiché
    description: String,     // Description complète
    tags: Array<String>,     // Tags/technologies
    category: String         // Catégorie du projet
}
```

## 📂 Catégories disponibles

- "Projets 3D" (par défaut)
- "Animations"  
- "Environnements"
- "Personnages"

## 🛠️ Personnalisation avancée

### Ajouter une nouvelle catégorie
```javascript
// Dans portfolio-manager.js, modifier :
this.categories = [
    "Projets 3D", 
    "Animations", 
    "Environnements", 
    "Personnages",
    "Nouvelle Catégorie"  // Ajouter ici
];
```

### Modifier l'affichage des projets
Le rendu des projets se fait dans la méthode `createProjectElement()`. 
Personnaliser le HTML généré selon vos besoins.

### Ajouter des images/médias
Pour l'instant le système utilise des placeholders. Pour ajouter des images :
1. Stocker les images dans `assets/images/projects/`
2. Ajouter le chemin dans la structure du projet
3. Modifier `createProjectElement()` pour afficher l'image

## 🎯 Fonctionnalités implémentées

✅ Navigation fluide entre projets  
✅ Interface game-like avec animations  
✅ Ajout facile de projets via JavaScript  
✅ Navigation clavier  
✅ Système de catégories  
✅ Tags interactifs  
✅ Dots de navigation  
✅ Animations d'entrée/sortie  

## 🚧 À venir

- [ ] Intégration d'images/vidéos dans le showcase 3D
- [ ] Système de filtrage par tags
- [ ] Sauvegarde des projets en JSON
- [ ] Interface admin pour ajouter/modifier des projets
- [ ] Lightbox pour voir les projets en détail
- [ ] Son et effets audio

## 💡 Conseils

1. **Cohérence** : Utilisez des descriptions de longueur similaire
2. **Tags** : Limitez à 3-4 tags par projet pour l'affichage
3. **Catégories** : Regroupez logiquement les projets
4. **Performance** : Évitez d'ajouter trop de projets d'un coup (optimisation future)

## 🐛 Debug

Pour débugger ou voir les logs :
- Ouvrir la console développeur (F12)
- Les messages commencent par 🎮, 📂, 🎨
- Vérifier que `portfolioManager` existe globalement

## 📞 Support

Le système est conçu pour être extensible. 
Consultez les commentaires dans `portfolio-manager.js` pour plus de détails techniques.