class ButtonParallaxManager {
    constructor() {
        this.buttons = [];
        this.isActive = false;
        this.init();
    }

    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Supprimer les anciens event listeners
        if (this.isActive && this.buttons) {
            this.buttons.forEach(button => {
                if (button._parallaxHandlers) {
                    button.removeEventListener('mousemove', button._parallaxHandlers.mouseMoveHandler);
                    button.removeEventListener('mouseenter', button._parallaxHandlers.mouseEnterHandler);
                    button.removeEventListener('mouseleave', button._parallaxHandlers.mouseLeaveHandler);
                    delete button._parallaxHandlers;
                }
            });
        }
        
        // Trouver tous les boutons de jeu (incluant les nouveaux)
        this.buttons = document.querySelectorAll('.game-button');
        console.log(`[PARALLAX] ${this.buttons.length} boutons détectés`);
        
        if (this.buttons.length > 0) {
            this.addParallaxEffects();
            this.isActive = true;
        }
    }

    addParallaxEffects() {
        this.buttons.forEach(button => {
            // Throttling pour limiter la fréquence des mises à jour
            let lastUpdate = 0;
            const throttleDelay = 16; // ~60fps
            
            // Créer des fonctions liées pour pouvoir les supprimer plus tard
            const mouseMoveHandler = (e) => {
                const now = Date.now();
                if (now - lastUpdate > throttleDelay) {
                    this.handleMouseMove(e, button);
                    lastUpdate = now;
                }
            };
            const mouseEnterHandler = (e) => this.handleMouseEnter(e, button);
            const mouseLeaveHandler = (e) => this.handleMouseLeave(e, button);
            
            // Stocker les handlers sur l'élément pour pouvoir les supprimer
            button._parallaxHandlers = { mouseMoveHandler, mouseEnterHandler, mouseLeaveHandler };
            
            // Effet parallaxe au survol
            button.addEventListener('mousemove', mouseMoveHandler);
            button.addEventListener('mouseenter', mouseEnterHandler);
            button.addEventListener('mouseleave', mouseLeaveHandler);
            
            console.log(`[PARALLAX] Effet ajouté au bouton:`, button.className);
        });
    }

    handleMouseMove(event, button) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculer la distance de la souris par rapport au centre
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        
        // Facteur de parallaxe réduit pour plus de fluidité
        const parallaxFactor = 0.05;
        
        // Calculer la transformation
        const translateX = deltaX * parallaxFactor;
        const translateY = deltaY * parallaxFactor;
        
        // Appliquer la transformation avec un scale plus subtil
        button.style.transform = `scale(1.1) translate(${translateX}px, ${translateY}px)`;
    }

    handleMouseEnter(event, button) {
        // Pas de transition pendant le mouvement pour éviter les conflits
        button.style.transition = 'none';
    }

    handleMouseLeave(event, button) {
        // Retour à la position normale
        button.style.transition = 'transform 0.3s ease-out';
        button.style.transform = 'scale(1) translate(0px, 0px)';
    }

    destroy() {
        if (this.isActive) {
            this.buttons.forEach(button => {
                button.removeEventListener('mousemove', this.handleMouseMove);
                button.removeEventListener('mouseenter', this.handleMouseEnter);
                button.removeEventListener('mouseleave', this.handleMouseLeave);
                button.style.transform = '';
                button.style.transition = '';
            });
        }
        this.isActive = false;
    }
}

// Initialiser le gestionnaire de parallaxe
window.buttonParallaxManager = new ButtonParallaxManager();