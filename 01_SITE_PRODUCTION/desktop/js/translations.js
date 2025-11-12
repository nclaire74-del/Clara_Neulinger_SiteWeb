// Système de traduction pour le portfolio Clara Neulinger
class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'fr';
        this.translations = {
            fr: {
                // Navigation et menus
                'portfolio': 'Portfolio',
                'collectibles': 'Collectibles',
                'contact': 'Contact',
                'informations_networks': 'Informations & Réseaux',
                'sound_language': 'Son & Langue',
                'quit': 'Quitter',
                'return_to_menu': 'Retour au Menu',
                'return_collectibles': 'Retour Collectibles',
                'return_home': 'Retour Accueil',
                'main_page': 'Page principale',
                'portfolio_main': 'Portfolio principal',
                'options': 'Options',
                'language': 'Langue',
                'close': 'Fermer',
                'previous': '◀ Précédent',
                'next': 'Suivant ▶',
                'reset_papers': 'Remettre à zéro',
                
                // Instructions Contact
                'click_logos_visit_profiles': 'Cliquez sur les logos pour visiter mes profils',
                'paper_manipulation_instructions': 'Chaque feuille est manipulable : Cliquez + glissez pour tourner • Double-clic pour retourner • Molette pour zoomer',
                'magnifier_instructions': 'Cliquez pour activer la loupe et zoomer sur les détails des papiers',
                
                // Interface portfolio
                'double_click_explore': 'Double-cliquez pour explorer',
                'touch_explore': 'Touchez pour explorer',
                'double_click_access_viewer': 'Double-cliquez sur {media} pour accéder au viewer 3D interactif',
                'double_click_video': 'Double-cliquez sur la vidéo pour accéder au viewer 3D interactif',
                'double_click_image': 'Double-cliquez sur l\'image pour accéder au viewer 3D interactif',
                'video': 'la vidéo',
                'image': 'l\'image',
                'click_enlarge': 'Cliquez sur une image pour l\'agrandir',
                'use_arrows_navigate': 'Utilisez les flèches pour naviguer',
                'loading_preview': 'Preview en cours...',
                'gallery': 'Galerie',
                'gallery_instructions': 'Cliquez sur une image pour l\'agrandir • Utilisez les flèches pour naviguer',
                'images_preparing': 'Images en cours de préparation...',
                
                // Projets
                'project_title': 'Projet',
                'software': 'Logiciels :',
                'gallery': 'Galerie',
                'story_title': 'L\'Histoire du Projet',
                'viewer_3d': 'Viewer 3D',
                'viewer_3d_character': 'Viewer 3D - Personnage',
                'viewer_3d_environment': 'Viewer 3D - Environnement',
                'viewer_3d_title': 'Viewer 3D -',
                'video_dash': 'Video -',
                'loading_character_viewer': 'Chargement du viewer Marmoset personnage...',
                'loading_environment_viewer': 'Chargement du viewer Marmoset environnement...',
                'loading_marmoset_viewer': 'Chargement du viewer Marmoset...',
                'loading_3d_viewer': 'Chargement du viewer 3D...',
                'loading_preview': 'Preview en cours...',
                'viewer_3d_marmoset': 'Viewer 3D Marmoset',
                'video_title': 'Vidéo',
                'character': 'Personnage',
                'environment': 'Environnement',
                'work_in_progress': 'Work In Progress',
                
                // Descriptions des projets
                'circus_desc': 'Ce projet personnel combine création d\'environnement et de personnage. Basé sur un concept art de Yuri Gvozdenko, la scène raconte une histoire à travers atmosphère, éclairage et textures.',
                'archway_desc': 'Un projet personnel dédié à la création d\'une arche inspirée du style celtique. Dans le cadre de ce projet, j\'ai décidé de réinterpréter une arche réalisée en 3D par Jonatan Österberg, tout en développant un environnement complet autour de cette structure.',
                'gun_desc': 'Pistolet à plasma selon la référence conceptuelle de Robert Simons | Concept Art World.',
                'kitchen_desc': 'PITCH : In a supernatural and post-apocalypse world, we find a simple carrot, orange and alive. Crawling on the kitchen plan she tries to survive by fleeing the killings of her family. (WIP - Work In Progress)',
                'room_desc': 'Creation d\'un environment stylé en 3D d\'après la référence de Thanh DO etc... (WIP - Work In Progress)',
                'telephone_desc': 'Modélisation d\'un téléphone rétro avec matériaux réalistes.',
                
                // Titres des projets
                'circus_title': 'Projet : Circus',
                'archway_title': 'Projet : Archway',
                'gun_title': 'Projet : Plasma Pistol',
                'kitchen_title': 'Projet : The Last Meal',
                'room_title': 'Projet : Room',
                'telephone_title': 'Projet : Telephone Booth',
                
                // Visualiseurs
                'visualizer_archway': 'Visualiseur - Archway',
                'visualizer_plasma': 'Visualiseur - Plasma Pistol',
                'visualizer_telephone': 'Visualiseur - Telephone Booth',
                'visualizer_room': 'Visualiseur - Room',
                'back_to_collectibles': '← Retour Collectibles',
                'back_collectibles_subtitle': 'Portfolio principal',
                'loading_subtitle': 'Chargement... Veuillez patienter',
                'shader_compilation': 'Compilation du shader...',
                'creating_world': 'Création du monde...',
                'building_universe': 'Construction de l\'univers...',
                'preparing_experience': 'Préparation de l\'expérience...',
                'ready_for_exploration': 'Prêt pour l\'exploration !',
                'albedo': 'Albedo',
                'ambient_occlusion': 'Ambient Occlusion',
                'metallic': 'Metallic',
                'roughness': 'Roughness',
                'full_quality': 'Full Quality',
                'topology': 'Topology',
                'normal': 'Normal',
                
                // Mentions légales
                'legal_notice': 'Mentions Légales',
                'legal_editor': 'Éditeur',
                'legal_editor_info': 'Clara Neulinger',
                'legal_hosting': 'Hébergement',
                'legal_hosting_info': 'Ionos - claraneulinger.com',
                'legal_intellectual_property': 'Propriété intellectuelle',
                'legal_content_rights': 'Tout le contenu (projets 3D, modèles, textures, images) est la propriété de Clara Neulinger. Reproduction interdite sans autorisation.',
                'legal_personal_data': 'Données personnelles',
                'legal_no_data_collection': 'Aucune donnée collectée. Préférences stockées localement (localStorage).',
                'legal_cookies': 'Cookies',
                'legal_no_cookies': 'Aucun cookie utilisé.',
                'legal_contact_section': 'Contact',
                'legal_contact_info': 'Contactez-moi via les réseaux sociaux (page Contact).',
                
                // CV Download
                'download_cv': 'Télécharger mon CV',
                
                // Histoire Kitchen (français)
                'kitchen_story': `Au fin fond d'une ruelle sombre se trouve cachée entre des murs de béton une petite cuisine clandestine, lugubre et remplie de saletés ne donnant aucune envie d'y passer la porte.

Mais une fois la porte ouverte, une triste réalité s'offre à nos yeux. Dans cette pièce, un mur fait de carrelage probablement devenu jaunâtre par le manque de propreté est accompagné de taches d'un orange sombre décimée un peu par tout sur ce mur froid s'y trouve. Le plan de travail n'est pas en meilleur état, c'est un bois brute qui nous accueille oû réside des taches orange annonçant l'horreur de cette cuisine.

Quand nos yeux se plissent d'avantage, les objets disposés deviennent nets. Couteaux, et casseroles trouvent leur place sur ce plan de travail. Cette vue qui se peint devant nos yeux à travers cette porte entre ouverte annonce quelque chose de mauvais, mais ce n'est qu'une fois que notre pied, doucement et faiblement franchit la porte afin de se retrouver à l'intérieur que la vérité éclate au grand jour.

Une fois rentré pleinement dans la pièce, face à nos yeux l'enfer se trouve. Cette cuisine n'est pas que sombre et lugubre c'est aussi le repère des cuisiniers dénués de conscience, abattant des carottes sans peine et remord.

Une boucherie s'affiche face à nous, où les ustensiles de cuisine se transforment en objet de torture.

Partout où nos yeux se posent, nous pouvons voir des carottes dénuées de vie, baignant dans leur propre sang dans des casseroles. Des bouts de carottes découpées de parts et d'autres du plan de travail, des carottes blessées essayant de lutter contre leur sort et de s'échapper comme elles le peuvent malgré le pauvre destin qui leur est réservé.

Mais parmi elle, seuls deux rescapés de cette tuerie tente de s'échapper en vint. Rampant et sautant aussi vite que leur blessures peuvent le permettre.

Alors, elles rampent, sautent, trébuchent, tombent, se relèves afin d'atteindre la porte de sortie. Cette porte de sortie qui leur permettra vie sauve et extraction loin de ce massacre auxquels elles ont dû assister sans pouvoir dire un mot.

Cette scène se déroulant sous nos propres yeux, nous savons d'avance qu'elles n'échapperont pas à la sinistre cuisson qui les attend, car toutes les riches personnes de cette ville ont payées ces cuisiners afin qui leur prépare des plats goûtus, gastronomique, remplis de saveur à base de carotte.

Cette somme d'argent assez élevée fait disparaitre toute once d'humanité chez les cuisiniers. D'ailleurs en parlant d'eux, je crois entendre le minuteur sonner.

La cuisson est alors prête.`
            },
            en: {
                // Navigation and menus
                'portfolio': 'Portfolio',
                'collectibles': 'Collectibles',
                'contact': 'Contact',
                'informations_networks': 'Informations & Networks',
                'sound_language': 'Sound & Language',
                'quit': 'Quit',
                'return_to_menu': 'Return to Menu',
                'return_collectibles': 'Return Collectibles',
                'return_home': 'Return Home',
                'main_page': 'Main page',
                'portfolio_main': 'Main portfolio',
                'options': 'Options',
                'language': 'Language',
                'close': 'Close',
                'previous': '◀ Previous',
                'next': 'Next ▶',
                'reset_papers': 'Reset to default',
                
                // Contact instructions
                'click_logos_visit_profiles': 'Click on logos to visit my profiles',
                'paper_manipulation_instructions': 'Each sheet is movable: Click + drag to rotate • Double-click to flip • Scroll to zoom',
                'magnifier_instructions': 'Click to activate magnifier and zoom on paper details',
                
                // Portfolio interface
                'double_click_explore': 'Double-click to explore',
                'touch_explore': 'Touch to explore',
                'double_click_access_viewer': 'Double-click on {media} to access interactive 3D viewer',
                'double_click_video': 'Double-click on the video to access interactive 3D viewer',
                'double_click_image': 'Double-click on the image to access interactive 3D viewer',
                'video': 'the video',
                'image': 'the image',
                'click_enlarge': 'Click on an image to enlarge',
                'use_arrows_navigate': 'Use arrows to navigate',
                'loading_preview': 'Preview loading...',
                'gallery': 'Gallery',
                'gallery_instructions': 'Click on an image to enlarge • Use arrows to navigate',
                'images_preparing': 'Images being prepared...',
                
                // Projects
                'project_title': 'Project',
                'software': 'Software:',
                'gallery': 'Gallery',
                'story_title': 'The Project Story',
                'viewer_3d': '3D Viewer',
                'viewer_3d_character': '3D Viewer - Character',
                'viewer_3d_environment': '3D Viewer - Environment',
                'viewer_3d_title': '3D Viewer -',
                'video_dash': 'Video -',
                'loading_character_viewer': 'Loading Marmoset character viewer...',
                'loading_environment_viewer': 'Loading Marmoset environment viewer...',
                'loading_marmoset_viewer': 'Loading Marmoset viewer...',
                'loading_3d_viewer': 'Loading 3D viewer...',
                'loading_preview': 'Preview loading...',
                'viewer_3d_marmoset': 'Marmoset 3D Viewer',
                'video_title': 'Video',
                'character': 'Character',
                'environment': 'Environment',
                'work_in_progress': 'Work In Progress',
                
                // Project descriptions
                'circus_desc': 'This personal project combines environment and character creation. Based on concept art by Yuri Gvozdenko, the scene tells a story through atmosphere, lighting and textures.',
                'archway_desc': 'A personal project dedicated to creating a Celtic-inspired arch. In this project, I decided to reinterpret an arch created in 3D by Jonatan Österberg, while developing a complete environment around this structure.',
                'gun_desc': 'Plasma pistol based on conceptual reference by Robert Simons | Concept Art World.',
                'kitchen_desc': 'PITCH: In a supernatural and post-apocalypse world, we find a simple carrot, orange and alive. Crawling on the kitchen plan she tries to survive by fleeing the killings of her family. (WIP - Work In Progress)',
                'room_desc': 'Creation of a stylized 3D environment based on reference by Thanh DO etc... (WIP - Work In Progress)',
                'telephone_desc': 'Modeling of a retro telephone with realistic materials.',
                
                // Project titles
                'circus_title': 'Project: Circus',
                'archway_title': 'Project: Archway',
                'gun_title': 'Project: Plasma Pistol',
                'kitchen_title': 'Project: The Last Meal',
                'room_title': 'Project: Room',
                'telephone_title': 'Project: Telephone Booth',
                
                // Visualizers
                'visualizer_archway': 'Visualizer - Archway',
                'visualizer_plasma': 'Visualizer - Plasma Pistol',
                'visualizer_telephone': 'Visualizer - Telephone Booth',
                'visualizer_room': 'Visualizer - Room',
                'back_to_collectibles': '← Back to Collectibles',
                'back_collectibles_subtitle': 'Main portfolio',
                'loading_subtitle': 'Loading... Please Wait',
                'shader_compilation': 'Shader compilation...',
                'creating_world': 'Creating world...',
                'building_universe': 'Building universe...',
                'preparing_experience': 'Preparing experience...',
                'ready_for_exploration': 'Ready for exploration!',
                'albedo': 'Albedo',
                'ambient_occlusion': 'Ambient Occlusion',
                'metallic': 'Metallic',
                'roughness': 'Roughness',
                'full_quality': 'Full Quality',
                'topology': 'Topology',
                'normal': 'Normal',
                
                // Legal notice
                'legal_notice': 'Legal Notice',
                'legal_editor': 'Editor',
                'legal_editor_info': 'Clara Neulinger',
                'legal_hosting': 'Hosting',
                'legal_hosting_info': 'Ionos - claraneulinger.com',
                'legal_intellectual_property': 'Intellectual Property',
                'legal_content_rights': 'All content (3D projects, models, textures, images) is the property of Clara Neulinger. Reproduction prohibited without authorization.',
                'legal_personal_data': 'Personal Data',
                'legal_no_data_collection': 'No data collected. Preferences stored locally (localStorage).',
                'legal_cookies': 'Cookies',
                'legal_no_cookies': 'No cookies used.',
                'legal_contact_section': 'Contact',
                'legal_contact_info': 'Contact me via social networks (Contact page).',
                
                // CV Download
                'download_cv': 'Download my CV',
                
                // Kitchen story (English)
                'kitchen_story': `Deep in a dark alley, hidden between concrete walls, lies a small clandestine kitchen, gloomy and filled with filth that gives no desire to pass through the door.

But once the door is opened, a sad reality meets our eyes. In this room, a wall made of tiles probably turned yellowish from lack of cleanliness is accompanied by stains of dark orange scattered throughout this cold wall. The worktop is in no better condition, it's raw wood that welcomes us where orange stains reside, announcing the horror of this kitchen.

When our eyes squint further, the arranged objects become clear. Knives and pots find their place on this worktop. This view painted before our eyes through this half-open door announces something bad, but it's only when our foot, gently and weakly crosses the door to find ourselves inside that the truth comes to light.

Once fully inside the room, hell is before our eyes. This kitchen is not only dark and gloomy, it's also the lair of conscienceless cooks, slaughtering carrots without pain or remorse.

A butchery displays before us, where kitchen utensils transform into torture objects.

Everywhere our eyes rest, we can see lifeless carrots, bathing in their own blood in pots. Pieces of carrots cut here and there on the worktop, wounded carrots trying to fight their fate and escape as they can despite the poor destiny reserved for them.

But among them, only two survivors of this slaughter try to escape quickly. Crawling and jumping as fast as their wounds allow.

So they crawl, jump, stumble, fall, get up to reach the exit door. This exit door that will allow them safe life and extraction far from this massacre they had to witness without being able to say a word.

This scene unfolding before our very eyes, we know in advance that they will not escape the sinister cooking that awaits them, because all the rich people of this city have paid these cooks to prepare tasty, gastronomic dishes, full of flavor based on carrot.

This quite high sum of money makes all trace of humanity disappear in the cooks. Speaking of them, I think I hear the timer ring.

The cooking is then ready.`
            }
        };
    }

    // Obtenir la traduction d'une clé
    t(key, params = {}) {
        let translation = this.translations[this.currentLanguage]?.[key] || this.translations['fr'][key] || key;
        
        // Remplacer les paramètres dans la traduction
        Object.keys(params).forEach(param => {
            translation = translation.replace(`{${param}}`, params[param]);
        });
        
        return translation;
    }

    // Changer la langue
    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            localStorage.setItem('language', language);
            this.updatePage();
        }
    }

    // Obtenir la langue actuelle
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Mettre à jour tous les éléments traduits sur la page
    updatePage() {
        // Mettre à jour tous les éléments avec data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = this.t(key);
        });

        // Mettre à jour les placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            element.placeholder = this.t(key);
        });

        // Mettre à jour les attributs title
        document.querySelectorAll('[data-translate-title]').forEach(element => {
            const key = element.getAttribute('data-translate-title');
            element.title = this.t(key);
        });

        // Déclencher un événement pour que d'autres composants puissent réagir
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: this.currentLanguage } 
        }));
    }

    // Initialiser le système de traduction
    init() {
        this.updatePage();
        
        // Ajouter les gestionnaires d'événements pour les boutons de langue
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-language]')) {
                const language = e.target.getAttribute('data-language');
                this.setLanguage(language);
            }
        });
    }
    
    // Alias pour compatibilité
    updatePageTranslations() {
        return this.updatePage();
    }
}

// Instance globale
window.translationManager = new TranslationManager();

// Initialiser automatiquement après le chargement du DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.translationManager.init();
    });
} else {
    // DOM déjà chargé
    window.translationManager.init();
}