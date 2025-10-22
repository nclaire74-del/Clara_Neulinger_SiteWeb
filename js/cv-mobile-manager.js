/**
 * Gestionnaire du CV pour mobile et tablette
 * - Désactive l'interactivité 3D sur mobile/tablette
 * - Ajoute la fonctionnalité double-clic pour agrandissement
 * - Préserve l'interactivité 3D sur PC
 */

class CVMobileManager {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.isDesktop = window.innerWidth > 1024;
        
        this.cvPaper = document.getElementById('cv-paper');
        this.fullscreenOverlay = document.getElementById('cv-fullscreen-overlay');
        this.closeButton = document.getElementById('cv-close-button');
        this.fullscreenImage = document.getElementById('cv-fullscreen-image');
        
        this.doubleTapTimer = null;
        this.lastTap = 0;
        
        this.init();
    }
    
    init() {
        if (!this.cvPaper) return;
        
        // Écouter les changements de taille d'écran
        window.addEventListener('resize', () => this.handleResize());
        
        // Configurer selon le type d'appareil
        this.setupDeviceSpecificBehavior();
    }
    
    handleResize() {
        const oldIsMobile = this.isMobile;
        const oldIsTablet = this.isTablet;
        const oldIsDesktop = this.isDesktop;
        
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.isDesktop = window.innerWidth > 1024;
        
        // Si le type d'appareil a changé, reconfigurer
        if (oldIsMobile !== this.isMobile || oldIsTablet !== this.isTablet || oldIsDesktop !== this.isDesktop) {
            this.setupDeviceSpecificBehavior();
        }
    }
    
    setupDeviceSpecificBehavior() {
        // Nettoyer les anciens événements
        this.removeAllEventListeners();
        
        if (this.isMobile || this.isTablet) {
            // Mobile/Tablette : pas d'interactivité 3D, double-clic pour agrandissement
            this.setupMobileTabletBehavior();
        } else {
            // PC : garder l'interactivité 3D normale
            this.setupDesktopBehavior();
        }
    }
    
    setupMobileTabletBehavior() {
        console.log('🔧 Configuration mobile/tablette : CV centré, double-clic pour agrandissement');
        
        // Désactiver l'interactivité 3D
        this.disableInteractivity();
        
        // Forcer la position du CV vers la droite
        this.forcePosition();
        
        // Ajouter le double-clic/double-tap
        this.cvPaper.addEventListener('click', (e) => this.handleDoubleTap(e));
        this.cvPaper.addEventListener('touchend', (e) => this.handleDoubleTap(e));
        
        // Configurer la fermeture de la vue agrandie
        this.closeButton.addEventListener('click', () => this.closeFullscreen());
        this.fullscreenOverlay.addEventListener('click', (e) => {
            if (e.target === this.fullscreenOverlay) {
                this.closeFullscreen();
            }
        });
        
        // Empêcher le scroll pendant la vue agrandie
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.fullscreenOverlay.classList.contains('active')) {
                this.closeFullscreen();
            }
        });
    }
    
    setupDesktopBehavior() {
        console.log('🔧 Configuration desktop : interactivité 3D préservée');
        
        // Nettoyer l'intervalle de force position
        if (this.positionInterval) {
            clearInterval(this.positionInterval);
            this.positionInterval = null;
        }
        
        // S'assurer que l'interactivité 3D est active
        this.enableInteractivity();
    }
    
    disableInteractivity() {
        if (!this.cvPaper) return;
        
        // Désactiver le dragging
        this.cvPaper.style.pointerEvents = 'auto'; // Garde les clics mais pas le drag
        
        // Ne forcer le cursor pointer que sur mobile/tablette
        if (this.isMobile || this.isTablet) {
            this.cvPaper.style.cursor = 'pointer';
        }
        
        // Empêcher les interactions 3D
        this.cvPaper.addEventListener('mousedown', this.preventDrag);
        this.cvPaper.addEventListener('touchstart', this.preventDrag);
        this.cvPaper.addEventListener('dragstart', this.preventDrag);
    }
    
    enableInteractivity() {
        if (!this.cvPaper) return;
        
        // Réactiver le dragging
        this.cvPaper.style.pointerEvents = 'all';
        
        // Ne pas forcer le cursor sur desktop pour permettre l'effet loupe
        // Le magnifier-manager gérera le cursor avec ses propres classes CSS
        if (this.isMobile || this.isTablet) {
            this.cvPaper.style.cursor = 'grab';
        } else {
            // Sur desktop, ne pas forcer le cursor pour permettre l'effet loupe
            this.cvPaper.style.cursor = '';
        }
        
        // Retirer les blocages d'interaction
        this.cvPaper.removeEventListener('mousedown', this.preventDrag);
        this.cvPaper.removeEventListener('touchstart', this.preventDrag);
        this.cvPaper.removeEventListener('dragstart', this.preventDrag);
    }
    
    forcePosition() {
        if (!this.cvPaper) return;
        
        // SOLUTION SIMPLE - Centrage absolu toujours
        console.log('📱 CENTRAGE SIMPLE ET EFFICACE');
        
        // Nettoyer les styles
        this.cvPaper.style.transform = '';
        
        // Appliquer SEULEMENT le centrage parfait - CSS s'occupe du reste
        this.cvPaper.style.setProperty('position', 'absolute', 'important');
        this.cvPaper.style.setProperty('left', '50%', 'important');
        this.cvPaper.style.setProperty('top', '50%', 'important');
        this.cvPaper.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
        this.cvPaper.style.setProperty('transform-origin', 'center center', 'important');
        this.cvPaper.style.setProperty('z-index', '1000', 'important');
        
        console.log('📱 CV centré : left=50%, top=50%, transform=translate(-50%, -50%)');
        
        // Maintenir le centrage simple toutes les 200ms
        this.positionInterval = setInterval(() => {
            if (this.cvPaper && (this.isMobile || this.isTablet)) {
                // Appliquer seulement le centrage - pas de calculs compliqués
                this.cvPaper.style.setProperty('position', 'absolute', 'important');
                this.cvPaper.style.setProperty('left', '50%', 'important');
                this.cvPaper.style.setProperty('top', '50%', 'important');
                this.cvPaper.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
                this.cvPaper.style.setProperty('z-index', '1000', 'important');
            }
        }, 200);
    }
    
    preventDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    
    handleDoubleTap(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - this.lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            // Double-tap détecté
            e.preventDefault();
            this.openFullscreen();
        } else {
            // Premier tap
            this.lastTap = currentTime;
        }
    }
    
    openFullscreen() {
        if (!this.fullscreenOverlay) return;
        
        console.log('📱 Ouverture vue agrandie CV');
        
        // Obtenir l'image actuelle (recto ou verso)
        const frontSide = this.cvPaper.querySelector('.cv-paper-side.front img');
        const backSide = this.cvPaper.querySelector('.cv-paper-side.back img');
        
        // Déterminer quelle face est visible (pour l'instant, toujours le recto)
        const currentImage = frontSide ? frontSide.src : (backSide ? backSide.src : 'assets/images/Contact/Cv_fr.svg');
        
        this.fullscreenImage.src = currentImage;
        this.fullscreenOverlay.classList.add('active');
        
        // Empêcher le scroll du body
        document.body.style.overflow = 'hidden';
    }
    
    closeFullscreen() {
        if (!this.fullscreenOverlay) return;
        
        console.log('📱 Fermeture vue agrandie CV');
        
        this.fullscreenOverlay.classList.remove('active');
        
        // Réactiver le scroll du body
        document.body.style.overflow = '';
    }
    
    removeAllEventListeners() {
        if (!this.cvPaper) return;
        
        // Cloner l'élément pour supprimer tous les event listeners
        const newCvPaper = this.cvPaper.cloneNode(true);
        this.cvPaper.parentNode.replaceChild(newCvPaper, this.cvPaper);
        this.cvPaper = newCvPaper;
        
        // Reconfigurer les références
        if (this.closeButton) {
            const newCloseButton = document.getElementById('cv-close-button');
            if (newCloseButton) this.closeButton = newCloseButton;
        }
    }
}

// Initialiser le gestionnaire quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    // Attendre que tous les autres scripts soient chargés
    setTimeout(() => {
        window.cvMobileManager = new CVMobileManager();
    }, 100);
});