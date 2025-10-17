// Configuration générale du site
const CONFIG = {
    // Durée de chargement simulée (en millisecondes)
    LOADING_DURATION: 3000,
    
    // Messages de chargement
    LOADING_MESSAGES: [
        "Compilation du shader...",
        "Création du monde...",
        "Construction de l'univers...",
        "Préparation de l'expérience...",
        "Pret pour l'exploration!"
    ],
    
    // Options audio
    AUDIO: {
        enabled: true,
        volume: 0.5
    },
    
    // Langue par défaut
    LANGUAGE: 'fr'
};

// Exporter la configuration pour les autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
