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

// Détection mobile/performance faible pour optimisations
window.isLowPerformanceDevice = function() {
    // Détection mobile ou tablette
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Détection connexion lente (si disponible)
    const isSlowConnection = navigator.connection && 
        (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
    
    // Détection RAM faible (si disponible)
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    
    return isMobileDevice || isSlowConnection || isLowMemory;
};

// Système de monitoring de performance
window.performanceMonitor = {
    init: function() {
        if (window.isLowPerformanceDevice()) {
            console.warn('🚨 Appareil basse performance détecté - Optimisations activées');
        }
        
        // Surveiller les images lourdes
        document.addEventListener('DOMContentLoaded', () => {
            const heavyImages = document.querySelectorAll('img[data-size="heavy"]');
            heavyImages.forEach(img => {
                const startTime = performance.now();
                img.addEventListener('load', () => {
                    const loadTime = performance.now() - startTime;
                    if (loadTime > 5000) {
                        console.warn(`⚠️ Image lourde: ${img.src.split('/').pop()} - ${Math.round(loadTime)}ms`);
                    }
                });
            });
        });
    }
};

class App {
    constructor() {
        this.isLoaded = false;
        this.managers = {};
        
        // Initialiser le monitoring de performance
        window.performanceMonitor.init();
        
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
        
        this.contactBox = null;
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
                
                if (platform === 'contact') {
                    // Géré par contact-manager.js pour le nouvel encadrement
                    return;
                } else if (this.links[platform]) {
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
        
        // La gestion du contact est maintenant dans contact-manager.js
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

 / /   G e s t i o n   d e   l a   m o d a l   d e   c o n t a c t 
 d o c u m e n t . a d d E v e n t L i s t e n e r ( ' D O M C o n t e n t L o a d e d ' ,   f u n c t i o n ( )   { 
         c o n s t   c o n t a c t B u t t o n   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o n t a c t ' ) ; 
         c o n s t   c o n t a c t M o d a l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o n t a c t - m o d a l ' ) ; 
         c o n s t   c l o s e M o d a l   =   d o c u m e n t . q u e r y S e l e c t o r ( ' . m o d a l - c l o s e ' ) ; 
         
         / /   O u v r i r   l a   m o d a l 
         i f   ( c o n t a c t B u t t o n )   { 
                 c o n t a c t B u t t o n . a d d E v e n t L i s t e n e r ( ' c l i c k ' ,   f u n c t i o n ( )   { 
                         c o n t a c t M o d a l . s t y l e . d i s p l a y   =   ' f l e x ' ; 
                 } ) ; 
         } 
         
         / /   F e r m e r   l a   m o d a l 
         i f   ( c l o s e M o d a l )   { 
                 c l o s e M o d a l . a d d E v e n t L i s t e n e r ( ' c l i c k ' ,   f u n c t i o n ( )   { 
                         c o n t a c t M o d a l . s t y l e . d i s p l a y   =   ' n o n e ' ; 
                 } ) ; 
         } 
         
         / /   F e r m e r   e n   c l i q u a n t   s u r   l ' o v e r l a y 
         i f   ( c o n t a c t M o d a l )   { 
                 c o n t a c t M o d a l . a d d E v e n t L i s t e n e r ( ' c l i c k ' ,   f u n c t i o n ( e )   { 
                         i f   ( e . t a r g e t   = = =   c o n t a c t M o d a l )   { 
                                 c o n t a c t M o d a l . s t y l e . d i s p l a y   =   ' n o n e ' ; 
                         } 
                 } ) ; 
         } 
         
         / /   F e r m e r   a v e c   E s c a p e 
         d o c u m e n t . a d d E v e n t L i s t e n e r ( ' k e y d o w n ' ,   f u n c t i o n ( e )   { 
                 i f   ( e . k e y   = = =   ' E s c a p e '   & &   c o n t a c t M o d a l . s t y l e . d i s p l a y   = = =   ' f l e x ' )   { 
                         c o n t a c t M o d a l . s t y l e . d i s p l a y   =   ' n o n e ' ; 
                 } 
         } ) ; 
 } ) ; 
 
 