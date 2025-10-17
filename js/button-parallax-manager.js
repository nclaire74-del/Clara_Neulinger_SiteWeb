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
        // Trouver tous les boutons de jeu
        this.buttons = document.querySelectorAll('.game-button');
        
        if (this.buttons.length > 0) {
            this.addParallaxEffects();
            this.isActive = true;
        }
    }

    addParallaxEffects() {
        this.buttons.forEach(button => {
            // Effet parallaxe au survol
            button.addEventListener('mousemove', (e) => this.handleMouseMove(e, button));
            button.addEventListener('mouseenter', (e) => this.handleMouseEnter(e, button));
            button.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, button));
        });
    }

    handleMouseMove(event, button) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculer la distance de la souris par rapport au centre
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        
        // Facteur de parallaxe (plus petit = plus subtil)
        const parallaxFactor = 0.1;
        
        // Calculer la transformation
        const translateX = deltaX * parallaxFactor;
        const translateY = deltaY * parallaxFactor;
        
        // Appliquer la transformation avec le scale hover
        button.style.transform = `scale(1.3) translate(${translateX}px, ${translateY}px)`;
        
        // Faire suivre les encadrements avec un léger décalage
        if (button.querySelector('::before')) {
            const beforeElement = window.getComputedStyle(button, '::before');
        }
        if (button.querySelector('::after')) {
            const afterElement = window.getComputedStyle(button, '::after');
        }
    }

    handleMouseEnter(event, button) {
        // Transition plus rapide pour l'entrée
        button.style.transition = 'transform 0.1s ease-out';
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