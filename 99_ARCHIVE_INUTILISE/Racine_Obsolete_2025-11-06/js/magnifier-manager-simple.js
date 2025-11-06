/**
 * Gestionnaire d'effet loupe SIMPLIFIÉ pour déboguer
 */

class MagnifierManager {
    constructor() {
        this.magnifierOverlay = null;
        this.isActive = false;
        this.isMagnifierEnabled = false;
        this.currentTarget = null;
        
        // Détection mobile/tablette pour désactiver la loupe
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.isDesktop = window.innerWidth > 1024;
        
        this.init();
    }

    init() {
        console.log(`🔍 MagnifierManager SIMPLE: Init - Desktop: ${this.isDesktop}, Mobile: ${this.isMobile}, Tablet: ${this.isTablet}`);
        
        if (this.isMobile || this.isTablet) {
            console.log('MagnifierManager: Loupe désactivée sur mobile/tablette');
            return;
        }
        
        this.createMagnifierOverlay();
        this.bindEvents();
        this.bindToggleEvents();
        console.log('✅ MagnifierManager SIMPLE initialisé');
    }
    
    createMagnifierOverlay() {
        this.magnifierOverlay = document.createElement('div');
        this.magnifierOverlay.style.cssText = `
            position: fixed;
            width: 150px;
            height: 150px;
            border: 3px solid #333;
            border-radius: 50%;
            background: white;
            pointer-events: none;
            z-index: 15000;
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        `;
        
        const content = document.createElement('div');
        content.innerHTML = 'Survole le CV pour voir le zoom';
        content.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 12px;
            text-align: center;
            color: #666;
            padding: 10px;
            background: transparent;
        `;
        
        this.magnifierOverlay.appendChild(content);
        document.body.appendChild(this.magnifierOverlay);
        
        console.log('🔍 Overlay créé avec fond blanc et support zoom:', this.magnifierOverlay);
    }

    bindEvents() {
        const papers = document.querySelectorAll('.cv-paper, .contact-paper, .cv-interactive-overlay');
        console.log(`📎 Binding events to ${papers.length} elements:`, papers);
        
        papers.forEach(paper => {
            paper.addEventListener('mouseenter', (e) => {
                if (this.isMagnifierEnabled) {
                    console.log('🎯 MOUSEENTER sur:', e.target.className);
                    this.showMagnifier(e);
                }
            });
            
            paper.addEventListener('mouseleave', (e) => {
                if (this.isMagnifierEnabled) {
                    console.log('🚪 MOUSELEAVE de:', e.target.className);
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
            console.log('🔘 Bouton toggle attaché');
        } else {
            console.error('❌ Bouton magnifier-toggle introuvable!');
        }
    }

    toggle() {
        this.isMagnifierEnabled = !this.isMagnifierEnabled;
        
        if (this.isMagnifierEnabled) {
            document.body.classList.add('magnifier-cursor-enabled');
            console.log('✅ LOUPE ACTIVÉE');
        } else {
            document.body.classList.remove('magnifier-cursor-enabled');
            this.hideMagnifier();
            console.log('❌ LOUPE DÉSACTIVÉE');
        }
    }

    showMagnifier(e) {
        console.log('🔍 SHOW MAGNIFIER');
        this.isActive = true;
        this.currentTarget = e.target;
        
        // Trouver le CV parent si on survole l'overlay
        if (e.target.classList.contains('cv-interactive-overlay')) {
            this.currentTarget = e.target.closest('.cv-paper') || e.target.parentElement.querySelector('.cv-paper');
            console.log('🎯 Overlay détecté, CV parent:', this.currentTarget);
        }
        
        if (this.magnifierOverlay) {
            this.magnifierOverlay.style.opacity = '1';
            this.updatePosition(e);
            this.updateContent(e);
            console.log('✅ Magnifier visible avec contenu zoomé');
        } else {
            console.error('❌ magnifierOverlay n\'existe pas!');
        }
    }

    hideMagnifier() {
        console.log('🙈 HIDE MAGNIFIER');
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
        if (!this.magnifierOverlay) {
            console.log('❌ Pas de magnifierOverlay');
            return;
        }
        
        console.log('🔍 UpdateContent appelé');
        
        // REMPLACER COMPLÈTEMENT LE CONTENU DU CERCLE
        this.magnifierOverlay.innerHTML = '';
        
        // Changer le background du cercle lui-même
        this.magnifierOverlay.style.background = 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)';
        
        console.log('� FOND DU CERCLE CHANGÉ EN DÉGRADÉ COLORÉ');
        
        // Créer un nouveau contenu SIMPLE
        const newContent = document.createElement('div');
        newContent.innerHTML = 'TEST VISIBLE';
        newContent.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-weight: bold;
            font-size: 14px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            z-index: 10;
        `;
        
        this.magnifierOverlay.appendChild(newContent);
        console.log('🔍 CONTENU TEST AJOUTÉ AU CERCLE');
        
        // PLUS TARD : on ajoutera l'image ici
        console.log('🔍 Contenu du cercle mis à jour avec test visuel');
    }
}

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOMContentLoaded - Initialising SimpleMagnifierManager');
    window.simpleMagnifierManager = new MagnifierManager();
});