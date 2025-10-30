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
        
        // Toujours lier les événements du bouton toggle, même sur mobile
        this.bindToggleEvents();
        
        if (this.isMobile || this.isTablet) {
            console.log('MagnifierManager: Loupe désactivée sur mobile/tablette');
            return;
        }
        
        this.createMagnifierOverlay();
        this.bindEvents();
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
            background: rgba(255, 255, 255, 0.98);
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
        `;
        
        this.magnifierOverlay.appendChild(content);
        document.body.appendChild(this.magnifierOverlay);
        
        console.log('🔍 Overlay créé avec support zoom:', this.magnifierOverlay);
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
        
        // Mettre à jour l'attribut data-active du bouton
        const toggleBtn = document.getElementById('magnifier-toggle');
        if (toggleBtn) {
            toggleBtn.setAttribute('data-active', this.isMagnifierEnabled.toString());
        }
        
        if (this.isMagnifierEnabled) {
            document.body.classList.add('magnifier-cursor-enabled');
        } else {
            document.body.classList.remove('magnifier-cursor-enabled');
            this.hideMagnifier();
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
        if (!this.currentTarget) return;
        
        const content = this.magnifierOverlay.querySelector('div');
        if (!content) return;
        
        // Obtenir les coordonnées relatives au CV
        const targetRect = this.currentTarget.getBoundingClientRect();
        const relativeX = e.clientX - targetRect.left;
        const relativeY = e.clientY - targetRect.top;
        
        // Nettoyer le contenu de la loupe
        content.innerHTML = '';
        content.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 150px;
            height: 150px;
            overflow: hidden;
            border-radius: 50%;
        `;
        
        // Détecter quelle face du CV est visible en accédant au dual-paper-manager
        let imageSrc = 'assets/images/Contact/Cv_fr.svg'; // Face avant par défaut
        
        // Vérifier si le dual-paper-manager existe et a l'état flipped
        if (window.dualPaperManager && window.dualPaperManager.papers && window.dualPaperManager.papers.cv) {
            const isFlipped = window.dualPaperManager.papers.cv.flipped;
            if (isFlipped) {
                imageSrc = 'assets/images/Contact/2.svg'; // Face arrière
                console.log('🔄 CV retourné - Affichage face arrière (2.svg)');
            } else {
                imageSrc = 'assets/images/Contact/Cv_fr.svg'; // Face avant
                console.log('📄 CV normal - Affichage face avant (Cv_fr.svg)');
            }
        } else {
            // Fallback: essayer de détecter par CSS transform
            const paperElement = document.getElementById('cv-paper');
            if (paperElement) {
                const transform = getComputedStyle(paperElement).transform;
                if (transform && transform.includes('matrix3d')) {
                    // Analyser la matrice 3D pour détecter la rotation Y
                    const values = transform.split('(')[1].split(')')[0].split(',');
                    if (values.length >= 16) {
                        const rotY = Math.asin(parseFloat(values[8])) * (180 / Math.PI);
                        if (Math.abs(rotY) > 90) {
                            imageSrc = 'assets/images/Contact/2.svg';
                            console.log('🔄 CSS détection - Face arrière');
                        }
                    }
                }
            }
            console.log('⚠️ Dual-paper-manager non accessible, utilisation du fallback CSS');
        }
        
        // Créer une image pour la loupe
        const magnifiedImage = document.createElement('img');
        magnifiedImage.src = imageSrc;
        magnifiedImage.style.cssText = `
            position: absolute;
            transform: scale(2.5);
            transform-origin: top left;
            left: ${-relativeX * 2.5 + 75}px;
            top: ${-relativeY * 2.5 + 75}px;
            width: ${targetRect.width}px;
            height: ${targetRect.height}px;
            pointer-events: none;
            object-fit: contain;
            object-position: center;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
        `;
        
        content.appendChild(magnifiedImage);
        console.log('🔍 Image SVG zoomée créée:', imageSrc);
    }
}

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.simpleMagnifierManager = new MagnifierManager();
});