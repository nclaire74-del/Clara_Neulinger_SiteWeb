// Script principal - Initialisation de l'application

// Gestion d'erreur globale pour éviter les écrans blancs
window.addEventListener('error', function(event) {
    console.error('💥 Erreur détectée :', event.error);
    // En cas d'erreur critique, on garde le site fonctionnel
    const loadingManager = window.loadingManager;
    if (loadingManager && typeof loadingManager.hideLoader === 'function') {
        loadingManager.hideLoader();
    }
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('💥 Promise rejetée :', event.reason);
    event.preventDefault(); // Évite l'affichage d'erreur dans la console
});

class App {
    constructor() {
        this.isLoaded = false;
        this.managers = {};
        
        this.init();
    }
    
    init() {
        console.log('🎮 Initialisation du Portfolio Clara Neulinger');
        
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeManagers();
            });
        } else {
            this.initializeManagers();
        }
    }
    
    initializeManagers() {
        console.log('📋 Initialisation des gestionnaires...');
        
        try {
            // Les gestionnaires s'initialisent automatiquement via leurs propres DOMContentLoaded
            // Nous gardons juste une référence ici
            setTimeout(() => {
                this.managers = {
                    loading: window.loadingManager,
                    video: window.videoManager,
                    navigation: window.navigationManager,
                    effects: window.effectsManager,
                    audio: window.audioManager,
                    portfolio: window.portfolioManager || new PortfolioManager(),
                    magnifier: window.magnifierManager || new MagnifierManager()
                };
            
            // Assigner l'instance créée à la variable globale
            if (!window.portfolioManager) {
                window.portfolioManager = this.managers.portfolio;
            }
            
            // Assigner l'instance de la loupe à la variable globale
            if (!window.magnifierManager) {
                window.magnifierManager = this.managers.magnifier;
            }
            
            // Initialiser les événements de navigation
            this.setupMainMenuEvents();
            
                console.log('✅ Gestionnaires initialisés:', Object.keys(this.managers));
            }, 100);
        } catch (error) {
            console.error('💥 Erreur lors de l\'initialisation des gestionnaires:', error);
            // En cas d'erreur, on cache quand même le loader pour éviter l'écran blanc
            if (window.loadingManager && typeof window.loadingManager.hideLoader === 'function') {
                window.loadingManager.hideLoader();
            }
        }
    }
    
    setupMainMenuEvents() {
        console.log('🎮 Configuration des événements du menu principal...');
        
        // Bouton Portfolio / Load Game - Géré par navigation-manager.js
        // Pas besoin de dupliquer ici
        
        // Tous les boutons sont maintenant gérés par navigation-manager.js
        // pour éviter les conflits d'événements
    }
    
    // Les méthodes d'ouverture sont maintenant gérées par navigation-manager.js
    
    // Méthodes utilitaires globales
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 170, 255, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            border: 1px solid #00aaff;
            z-index: 99999;
            font-family: 'Kindergarten', sans-serif;
            box-shadow: 0 0 20px rgba(0, 170, 255, 0.3);
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer automatiquement après 3 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Gestionnaire d'erreurs global
    static handleError(error, context = '') {
        console.error(`❌ Erreur ${context}:`, error);
        App.showNotification(`Erreur: ${error.message || error}`, 'error');
    }
}

// Gestionnaire d'erreurs globales
window.addEventListener('error', (event) => {
    App.handleError(event.error, 'JavaScript');
});

window.addEventListener('unhandledrejection', (event) => {
    App.handleError(event.reason, 'Promise');
});

// Gestionnaire des logos sociaux
class SocialLogosManager {
    constructor() {
        this.links = {
            artstation: 'https://www.artstation.com/neulinger_clara',
            linkedin: 'https://www.linkedin.com/in/clara-neulinger-08a70a20b/',
            instagram: 'https://www.therookies.co/u/ClaraNeulinger'
        };
        
        this.init();
    }
    
    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
            });
        } else {
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        const socialLogos = document.querySelectorAll('.social-logo');
        
        socialLogos.forEach(logo => {
            logo.addEventListener('click', (e) => {
                const platform = logo.getAttribute('data-platform');
                if (this.links[platform]) {
                    window.open(this.links[platform], '_blank');
                }
            });
            
            // Effet de rotation au hover
            logo.addEventListener('mouseenter', () => {
                logo.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
}

// Initialiser l'application
const app = new App();
const socialLogos = new SocialLogosManager();

// Styles d'animation pour les notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification.error {
        background: rgba(255, 50, 50, 0.9) !important;
        border-color: #ff3333 !important;
    }
    
    .notification.success {
        background: rgba(50, 255, 50, 0.9) !important;
        border-color: #33ff33 !important;
    }
`;
document.head.appendChild(notificationStyles);
