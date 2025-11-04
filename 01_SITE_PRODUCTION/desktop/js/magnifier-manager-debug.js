/**
 * Gestionnaire d'effet loupe SUPER SIMPLIFIÉ pour déboguer - VERSION FORCÉE
 */

class MagnifierManagerDebug {
    constructor() {
        this.magnifierOverlay = null;
        this.isActive = false;
        this.isMagnifierEnabled = false;
        this.currentTarget = null;
        
        // Détection mobile/tablette pour désactiver la loupe
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.isDesktop = window.innerWidth > 1024;
        
        console.log('🔥 MAGNIFIER DEBUG VERSION FORCÉE CHARGÉE');
        this.init();
    }

    init() {
        console.log(`🔍 MagnifierManagerDebug: Init - Desktop: ${this.isDesktop}, Mobile: ${this.isMobile}, Tablet: ${this.isTablet}`);
        
        if (this.isMobile || this.isTablet) {
            console.log('MagnifierManagerDebug: Loupe désactivée sur mobile/tablette');
            return;
        }
        
        this.createMagnifierOverlay();
        this.bindEvents();
        this.bindToggleEvents();
        console.log('✅ MagnifierManagerDebug initialisé');
    }
    
    createMagnifierOverlay() {
        this.magnifierOverlay = document.createElement('div');
        this.magnifierOverlay.style.cssText = `
            position: fixed;
            width: 150px;
            height: 150px;
            border: 3px solid #333;
            border-radius: 50%;
            background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
            pointer-events: none;
            z-index: 15000;
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        `;
        
        const content = document.createElement('div');
        content.innerHTML = 'DEBUG VERSION';
        content.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 14px;
            text-align: center;
            color: white;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            background: transparent;
        `;
        
        this.magnifierOverlay.appendChild(content);
        document.body.appendChild(this.magnifierOverlay);
        
        console.log('🔥 DEBUG Overlay créé avec fond coloré:', this.magnifierOverlay);
    }

    bindEvents() {
        const papers = document.querySelectorAll('.cv-paper, .contact-paper, .cv-interactive-overlay');
        console.log(`📎 DEBUG Binding events to ${papers.length} elements:`, papers);
        
        papers.forEach(paper => {
            paper.addEventListener('mouseenter', (e) => {
                if (this.isMagnifierEnabled) {
                    console.log('🔥 DEBUG MOUSEENTER sur:', e.target.className);
                    this.showMagnifier(e);
                }
            });
            
            paper.addEventListener('mouseleave', (e) => {
                if (this.isMagnifierEnabled) {
                    console.log('🔥 DEBUG MOUSELEAVE de:', e.target.className);
                    this.hideMagnifier();
                }
            });
            
            paper.addEventListener('mousemove', (e) => {
                if (this.isActive && this.isMagnifierEnabled) {
                    this.updatePosition(e);
                    this.updateContent(e);
                }
            });
        });
    }

    bindToggleEvents() {
        const toggleBtn = document.getElementById('magnifier-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.toggle();
            });
            console.log('🔥 DEBUG Bouton toggle attaché');
        } else {
            console.error('❌ DEBUG Bouton magnifier-toggle introuvable!');
        }
    }

    toggle() {
        this.isMagnifierEnabled = !this.isMagnifierEnabled;
        
        if (this.isMagnifierEnabled) {
            document.body.classList.add('magnifier-cursor-enabled');
            console.log('🔥 DEBUG LOUPE ACTIVÉE');
        } else {
            document.body.classList.remove('magnifier-cursor-enabled');
            this.hideMagnifier();
            console.log('🔥 DEBUG LOUPE DÉSACTIVÉE');
        }
    }

    showMagnifier(e) {
        console.log('🔥 DEBUG SHOW MAGNIFIER');
        this.isActive = true;
        this.currentTarget = e.target;
        
        if (this.magnifierOverlay) {
            this.magnifierOverlay.style.opacity = '1';
            this.updatePosition(e);
            this.updateContent(e);
            console.log('🔥 DEBUG Magnifier visible');
        } else {
            console.error('❌ DEBUG magnifierOverlay n\'existe pas!');
        }
    }

    hideMagnifier() {
        console.log('🔥 DEBUG HIDE MAGNIFIER');
        this.isActive = false;
        
        if (this.magnifierOverlay) {
            this.magnifierOverlay.style.opacity = '0';
        }
    }

    updatePosition(e) {
        if (this.magnifierOverlay) {
            const x = e.clientX + 20;
            const y = e.clientY - 80;
            
            this.magnifierOverlay.style.left = x + 'px';
            this.magnifierOverlay.style.top = y + 'px';
        }
    }

    updateContent(e) {
        console.log('🔥 DEBUG UpdateContent appelé');
        
        if (!this.magnifierOverlay) {
            console.log('❌ DEBUG Pas de magnifierOverlay');
            return;
        }
        
        // Changer le fond du cercle pour chaque mouvement
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.magnifierOverlay.style.background = randomColor;
        
        console.log('🔥 DEBUG Fond changé en:', randomColor);
        
        // Mettre à jour le texte
        const content = this.magnifierOverlay.querySelector('div');
        if (content) {
            content.innerHTML = `DEBUG<br>ACTIF<br>X:${Math.round(e.clientX)}<br>Y:${Math.round(e.clientY)}`;
            console.log('🔥 DEBUG Texte mis à jour');
        }
    }
}

// Auto-initialisation FORCÉE
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔥 DOMContentLoaded - Initialising DEBUG MagnifierManager');
    // Supprimer l'ancien gestionnaire s'il existe
    if (window.simpleMagnifierManager) {
        delete window.simpleMagnifierManager;
    }
    window.magnifierManagerDebug = new MagnifierManagerDebug();
});

// Initialisation immédiate si DOM déjà chargé
if (document.readyState === 'loading') {
    // DOM pas encore chargé, attendre DOMContentLoaded
} else {
    // DOM déjà chargé, initialiser immédiatement
    console.log('🔥 DOM déjà chargé - Initialisation immédiate DEBUG');
    if (window.simpleMagnifierManager) {
        delete window.simpleMagnifierManager;
    }
    window.magnifierManagerDebug = new MagnifierManagerDebug();
}