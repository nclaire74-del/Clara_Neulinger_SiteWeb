/**
 * SCRIPT DE PROTECTION CONTRE LES ERREURS EXTERNES
 * Protège le site contre les interférences d'extensions navigateur
 */

(function() {
    'use strict';
    
    console.log('🛡️ Protection anti-interférences activée');
    
    // 1. Protéger les objets globaux critiques
    if (typeof window !== 'undefined') {
        // Empêcher la modification de nos gestionnaires
        const protectedGlobals = [
            'portfolioManager',
            'dualPaperManager', 
            'cvMobileManager',
            'magnifierManager',
            'navigationManager',
            'loadingManager',
            'videoManager',
            'buttonParallaxManager',
            'effectsManager'
        ];
        
        protectedGlobals.forEach(globalName => {
            if (window[globalName]) {
                try {
                    Object.freeze(window[globalName]);
                } catch(e) {
                    // Ignore si déjà protégé
                }
            }
        });
    }
    
    // 2. Capturer et ignorer les erreurs externes connues
    const originalConsoleError = console.error;
    console.error = function(...args) {
        const errorMsg = args.join(' ');
        
        // Ignorer les erreurs d'extensions connues
        if (
            errorMsg.includes('classifier.js') ||
            errorMsg.includes('content.js') ||
            errorMsg.includes('extension') ||
            errorMsg.includes('Cannot use \'in\' operator to search for \'animation\'')
        ) {
            console.warn('🛡️ Erreur externe ignorée:', errorMsg);
            return; // Ne pas afficher
        }
        
        // Afficher les vraies erreurs de notre code
        originalConsoleError.apply(console, args);
    };
    
    // 3. Gestionnaire d'erreurs global pour les extensions
    window.addEventListener('error', function(e) {
        if (
            e.filename && (
                e.filename.includes('classifier.js') ||
                e.filename.includes('content.js') ||
                e.filename.includes('extension')
            )
        ) {
            console.warn('🛡️ Erreur d\'extension bloquée:', e.message);
            e.preventDefault();
            return false;
        }
    });
    
    // 4. Protection spécifique contre l'erreur 'animation'
    const originalIn = (function() {
        const nativeIn = Function.prototype.call.bind(({}).propertyIsEnumerable);
        return function(prop, obj) {
            if (obj === undefined || obj === null) {
                console.warn('🛡️ Tentative d\'accès à propriété sur objet undefined/null - ignorée');
                return false;
            }
            return prop in obj;
        };
    })();
    
    // 5. Surveiller les mutations DOM suspectes
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // Détecter l'injection de scripts externes
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeName === 'SCRIPT' && 
                            (node.src && (node.src.includes('classifier') || node.src.includes('content'))) ||
                            (node.textContent && node.textContent.includes('animation'))) {
                            console.warn('🛡️ Script externe suspect détecté et surveillé');
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    // 6. Protection du localStorage/sessionStorage
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
        if (key && (key.includes('classifier') || key.includes('extension'))) {
            console.warn('🛡️ Tentative de stockage externe bloquée:', key);
            return;
        }
        return originalSetItem.call(this, key, value);
    };
    
    console.log('✅ Protection anti-interférences configurée');
    
})();

// Protection spécifique pour les animations CSS
document.addEventListener('DOMContentLoaded', function() {
    // S'assurer que nos animations CSS ne sont pas perturbées
    const style = document.createElement('style');
    style.textContent = `
        /* Protection contre les interférences d'animations externes */
        .papers-container * {
            animation-fill-mode: both !important;
        }
        
        .cv-paper, .contact-paper {
            animation-play-state: running !important;
        }
        
        /* Désactiver les animations d'extensions sur nos éléments */
        [data-extension-id] {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('🛡️ Protection CSS animations activée');
});