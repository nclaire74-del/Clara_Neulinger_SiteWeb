// Système de traduction pour le portfolio Clara Neulinger - Version Mobile
class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'fr';
        this.translations = {
            fr: {
                // Navigation et menus
                'portfolio': 'Portfolio',
                'collectibles': 'Collectibles',
                'contact': 'Contact',
                'return_to_menu': 'Retour au Menu',
                'return_collectibles': 'Retour aux Collectibles',
                'return_home': 'Retour Accueil',
                'main_page': 'Page principale',
                'portfolio_main': 'Portfolio principal',
                'options': 'Options',
                'language': 'Langue',
                'close': 'Fermer',
                'previous': '◀ Précédent',
                'next': 'Suivant ▶',
                'software': 'Logiciels :',
                'reset_papers': 'Remettre à zéro',
                
                // Instructions Contact (ajout)
                'click_logos_visit_profiles': 'Cliquez sur les logos pour visiter mes profils',
                'paper_manipulation_instructions': 'Chaque feuille est manipulable : Touchez + glissez pour tourner • Double-tap pour retourner • Pincez pour zoomer',
                'magnifier_instructions': 'Touchez pour activer la loupe et zoomer sur les détails des papiers',
                
                // Contact
                'email': 'Email :',
                'phone': 'Téléphone :',
                'click_logos_profiles': 'Cliquez sur les logos pour visiter mes profils',
                
                // Interface portfolio
                'double_click_explore': 'Touchez pour explorer',
                'touch_explore': 'Touchez pour explorer',
                'double_click_access_viewer': 'Touchez sur {media} pour accéder au viewer 3D interactif',
                'touch_image_viewer_3d': 'Touchez l\'image pour accéder au viewer 3D interactif',
                'touch_image_enlarge': 'Touchez une image pour l\'agrandir • Pincez pour zoomer',
                'work_in_progress': 'Work In Progress',
                'project_story': 'L\'Histoire du Projet',
                'video': 'la vidéo',
                'image': 'l\'image',
                'click_enlarge': 'Touchez une image pour l\'agrandir',
                'use_arrows_navigate': 'Utilisez les flèches pour naviguer',
                'swipe_or_arrows_navigate': 'Utilisez les flèches ou glissez pour naviguer',
                'swipe_or_arrows_navigate_cv': 'Utilisez les flèches ou glissez pour naviguer entre les CV',
                'loading_preview': 'Preview en cours...',
                
                // Projets
                'project_title': 'Projet',
                'software': 'Logiciels',
                'gallery': 'Galerie',
                'story_title': 'L\'Histoire du Projet',
                'viewer_3d': 'Viewer 3D',
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
                'telephone_desc': 'Réalisation de la texture à partir d\'un modèle 3D de cabine téléphonique créé avec Maya.',
                
                // Sections des modals de projets
                'gallery_section': 'Galerie',
                'viewer_3d_section': 'Viewer 3D',
                'viewer_character_section': 'Viewer 3D - Personnage',
                'loading_3d_viewer': 'Chargement du viewer 3D...',
                'touch_instructions': 'Tournez avec votre doigt • Pincez pour zoomer/dézoomer',
                'video_section': 'Vidéo - Archway',
                'video_not_supported': 'Votre navigateur ne supporte pas la lecture vidéo.',
                'video_instructions': 'Touchez pour lire/pause • Double-tap pour plein écran',
                
                // Visualiseurs spécifiques
                'visualizer_archway_title': 'Visualiseur - Archway',
                'visualizer_gun_title': 'Visualiseur - Plasma Pistol',
                'visualizer_room_title': 'Visualiseur - Room',
                'visualizer_telephone_title': 'Visualiseur - Telephone Booth',
                
                // Boutons des visualiseurs
                'button_albedo': 'Albedo',
                'button_ambient_occlusion': 'Ambient Occlusion',
                'button_metallic': 'Metallic',
                'button_roughness': 'Roughness',
                'button_full_quality': 'Full Quality',
                'button_topology': 'Topology',
                'button_specular': 'Specular',
                'button_normal': 'Normal',
                'button_ao': 'AO',
                
                // Labels des sliders
                'slider_final': 'Final',
                'slider_base': 'Base',
                'slider_topo': 'Topo',
                'slider_metal': 'Metal',
                'slider_rough': 'Rough',
                'slider_spec': 'Spec',
                
                // Section logiciels
                'software_section': 'Logiciels :',
                
                // Titres des projets
                'circus_title': 'Projet : Circus',
                'archway_title': 'Projet : Archway',
                'gun_title': 'Projet : Plasma Pistol',
                'kitchen_title': 'Projet : The Last Meal',
                'room_title': 'Projet : The Room',
                'telephone_title': 'Projet : Telephone Booth',
                
                // Visualiseurs
                'visualizer_archway': 'Visualiseur - Archway',
                'visualizer_plasma': 'Visualiseur - Plasma Pistol',
                'albedo': 'Albedo',
                'ambient_occlusion': 'Ambient Occlusion',
                'metallic': 'Metallic',
                'roughness': 'Roughness',
                'full_quality': 'Full Quality',
                'topology': 'Topology',
                'normal': 'Normal',
                
                // Écran de chargement
                'loading_please_wait': 'Chargement... Patientez',
                'shader_compilation': 'Compilation du shader...',
                'loading_textures': 'Chargement des textures...',
                'loading_3d_models': 'Chargement des modèles 3D...',
                'loading_3d_viewer': 'Chargement du viewer 3D...',
                'image_loading': 'Chargement de l\'image...',
                
                // Contact et informations
                'informations_networks': 'Informations & Réseaux',
                'sound_language': 'Son & Langue',
                'quit': 'Quitter',
                'volume': 'Volume',
                
                // Mentions légales
                'legal_notice': 'Mentions Légales',
                'legal_site_owner': 'Propriétaire du site',
                'legal_hosting': 'Hébergement',
                'legal_hosting_info': 'Ce site est hébergé localement (WAMP64) à des fins de démonstration.',
                'legal_intellectual_property': 'Propriété intellectuelle',
                'legal_content_rights': 'Tout le contenu de ce site (images 3D, projets, textes) est la propriété de Clara Neulinger. Toute reproduction, même partielle, est interdite sans autorisation préalable.',
                'legal_personal_data': 'Données personnelles',
                'legal_no_data_collection': 'Ce site ne collecte aucune donnée personnelle. Les préférences de langue et volume sont stockées uniquement dans votre navigateur (localStorage) et ne sont jamais transmises.',
                'legal_cookies': 'Cookies',
                'legal_no_cookies': 'Ce site n\'utilise pas de cookies.',
                'legal_contact_section': 'Contact',
                'legal_contact_info': 'Pour toute question concernant ce site, vous pouvez me contacter via les réseaux sociaux présents sur la page Contact.',
                
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
                'return_to_menu': 'Return to Menu',
                'return_collectibles': 'Return to Collectibles',
                'return_home': 'Return Home',
                'main_page': 'Main page',
                'portfolio_main': 'Main portfolio',
                'options': 'Options',
                'language': 'Language',
                'close': 'Close',
                'previous': '◀ Previous',
                'next': 'Next ▶',
                'software': 'Software:',
                'reset_papers': 'Reset to default',
                
                // Contact instructions (added)
                'click_logos_visit_profiles': 'Click on logos to visit my profiles',
                'paper_manipulation_instructions': 'Each sheet is movable: Touch + drag to rotate • Double-tap to flip • Pinch to zoom',
                'magnifier_instructions': 'Touch to activate magnifier and zoom on paper details',
                
                // Contact
                'email': 'Email:',
                'phone': 'Phone:',
                'click_logos_profiles': 'Click on logos to visit my profiles',
                
                // Portfolio interface
                'double_click_explore': 'Touch to explore',
                'touch_explore': 'Touch to explore',
                'double_click_access_viewer': 'Touch on {media} to access interactive 3D viewer',
                'touch_image_viewer_3d': 'Touch the image to access interactive 3D viewer',
                'touch_image_enlarge': 'Touch an image to enlarge • Pinch to zoom',
                'work_in_progress': 'Work In Progress',
                'project_story': 'The Project Story',
                'video': 'the video',
                'image': 'the image',
                'click_enlarge': 'Touch an image to enlarge',
                'use_arrows_navigate': 'Use arrows to navigate',
                'swipe_or_arrows_navigate': 'Use arrows or swipe to navigate',
                'swipe_or_arrows_navigate_cv': 'Use arrows or swipe to navigate between CVs',
                'loading_preview': 'Preview loading...',
                
                // Projects
                'project_title': 'Project',
                'software': 'Software',
                'gallery': 'Gallery',
                'story_title': 'The Project Story',
                'viewer_3d': '3D Viewer',
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
                
                // Project modal sections
                'gallery_section': 'Gallery',
                'viewer_3d_section': '3D Viewer',
                'viewer_character_section': '3D Viewer - Character',
                'loading_3d_viewer': 'Loading 3D viewer...',
                'touch_instructions': 'Rotate with your finger • Pinch to zoom in/out',
                'video_section': 'Video - Archway',
                'video_not_supported': 'Your browser does not support video playback.',
                'video_instructions': 'Tap to play/pause • Double-tap for fullscreen',
                
                // Specific visualizers
                'visualizer_archway_title': 'Visualizer - Archway',
                'visualizer_gun_title': 'Visualizer - Plasma Pistol',
                'visualizer_room_title': 'Visualizer - Room',
                'visualizer_telephone_title': 'Visualizer - Telephone Booth',
                
                // Visualizer buttons
                'button_albedo': 'Albedo',
                'button_ambient_occlusion': 'Ambient Occlusion',
                'button_metallic': 'Metallic',
                'button_roughness': 'Roughness',
                'button_full_quality': 'Full Quality',
                'button_topology': 'Topology',
                'button_specular': 'Specular',
                'button_normal': 'Normal',
                'button_ao': 'AO',
                
                // Slider labels
                'slider_final': 'Final',
                'slider_base': 'Base',
                'slider_topo': 'Topo',
                'slider_metal': 'Metal',
                'slider_rough': 'Rough',
                'slider_spec': 'Spec',
                
                // Software section
                'software_section': 'Software:',
                
                // Titles
                'circus_title': 'Project: Circus',
                'archway_title': 'Project: Archway',
                'gun_title': 'Project: Plasma Pistol',
                'kitchen_title': 'Project: The Last Meal',
                'room_title': 'Project: The Room',
                'telephone_title': 'Project: Telephone Booth',
                
                // Visualizers
                'visualizer_archway': 'Visualizer - Archway',
                'visualizer_plasma': 'Visualizer - Plasma Pistol',
                'albedo': 'Albedo',
                'ambient_occlusion': 'Ambient Occlusion',
                'metallic': 'Metallic',
                'roughness': 'Roughness',
                'full_quality': 'Full Quality',
                'topology': 'Topology',
                'normal': 'Normal',
                
                // Loading screen
                'loading_please_wait': 'Loading... Please Wait',
                'shader_compilation': 'Shader compilation...',
                'loading_textures': 'Loading textures...',
                'loading_3d_models': 'Loading 3D models...',
                'loading_3d_viewer': 'Loading 3D viewer...',
                'image_loading': 'Loading image...',
                
                // Contact and information
                'informations_networks': 'Information & Networks',
                'sound_language': 'Sound & Language',
                'quit': 'Quit',
                'volume': 'Volume',
                
                // Legal Notice
                'legal_notice': 'Legal Notice',
                'legal_site_owner': 'Site Owner',
                'legal_hosting': 'Hosting',
                'legal_hosting_info': 'This site is hosted locally on WAMP64 for demonstration purposes.',
                'legal_intellectual_property': 'Intellectual Property',
                'legal_content_rights': 'All content on this site, particularly 3D projects, models, textures, images and visual creations, are the property of Clara Neulinger. Any reproduction, distribution or use without prior written authorization is prohibited.',
                'legal_personal_data': 'Personal Data',
                'legal_no_data_collection': 'This site does not collect any personal data. Only technical preferences (language and volume) are stored locally in your browser (localStorage) and never transmitted.',
                'legal_cookies': 'Cookies',
                'legal_no_cookies': 'This site does not use cookies. No tracking or analytics.',
                'legal_contact_section': 'Contact',
                'legal_contact_info': 'For any questions regarding this site or the use of works, please contact me via the social networks available on the Contact page.',
                
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
}

// Instance globale
window.translationManager = new TranslationManager();
// S'assurer que le français est la langue par défaut si aucune préférence n'existe
if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'fr');
    window.translationManager.setLanguage('fr');
}