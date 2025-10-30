/**
 * Gestionnaire pour l'interface CV mobile/tablette
 * Gère la navigation entre les images côte à côte et le viewer fullscreen
 * Compatible avec l'ancien système pour les écrans desktop
 */

class CVMobileManager {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.isDesktop = window.innerWidth > 1024;
        
        // Nouveau système mobile
        this.currentImageIndex = 0;
        this.images = [];
        this.overlay = null;
        this.fullscreenImage = null;
        this.navButtons = {};
        this.indicators = [];
        
        // Ancien système (compatibilité)
        this.cvPaper = document.getElementById('cv-paper');
        this.fullscreenOverlay = document.getElementById('cv-fullscreen-overlay');
        this.closeButton = document.getElementById('cv-close-button');
        this.doubleTapTimer = null;
        this.lastTap = 0;
        
        this.init();
    }
    
    init() {
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
        
        // Écouter les changements de taille d'écran
        window.addEventListener('resize', () => this.handleResize());
    }

    setup() {
        console.log('🖼️ CV Mobile Manager - Initialisation...');
        
        // Configurer selon le type d'appareil
        if (this.isMobile || this.isTablet) {
            this.setupNewMobileInterface();
        } else {
            this.setupDesktopBehavior();
        }
    }

    setupNewMobileInterface() {
        console.log('📱 Configuration nouveau interface mobile...');
        
        // Récupérer les éléments du nouveau système
        this.images = Array.from(document.querySelectorAll('.cv-image-wrapper img'));
        this.overlay = document.querySelector('.cv-fullscreen-overlay');
        this.fullscreenImage = this.overlay ? this.overlay.querySelector('.cv-fullscreen-content img') : null;
        
        if (!this.images.length) {
            console.warn('❌ Aucune image trouvée dans .cv-image-wrapper');
            return;
        }
        
        if (!this.overlay || !this.fullscreenImage) {
            console.warn('❌ Overlay ou image fullscreen non trouvé');
            return;
        }

        // Configurer les éléments de navigation
        this.setupNavigation();
        
        // Attacher les événements
        this.attachEvents();
        
        console.log('✅ Nouveau CV Mobile Manager initialisé avec', this.images.length, 'images');
    }

    setupNavigation() {
        // Boutons de navigation
        this.navButtons.prev = document.querySelector('.cv-nav-prev');
        this.navButtons.next = document.querySelector('.cv-nav-next');
        this.closeButton = document.querySelector('.cv-close-button');
        
        // Indicateurs de page
        const indicatorsContainer = document.querySelector('.cv-page-indicators');
        if (indicatorsContainer) {
            // Nettoyer les anciens indicateurs
            indicatorsContainer.innerHTML = '';
            this.indicators = [];
            
            // Créer les nouveaux indicateurs
            this.images.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = 'cv-page-indicator';
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => this.goToImage(index));
                indicatorsContainer.appendChild(indicator);
                this.indicators.push(indicator);
            });
        }
    }

    attachEvents() {
        // Clic sur les images pour ouvrir le fullscreen
        this.images.forEach((img, index) => {
            const wrapper = img.closest('.cv-image-wrapper');
            if (wrapper) {
                wrapper.addEventListener('click', () => this.openFullscreen(index));
            }
        });

        // Navigation
        if (this.navButtons.prev) {
            this.navButtons.prev.addEventListener('click', () => this.previousImage());
        }
        if (this.navButtons.next) {
            this.navButtons.next.addEventListener('click', () => this.nextImage());
        }

        // Fermeture
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.closeFullscreen());
        }

        // Fermeture par clic sur l'overlay
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.closeFullscreen();
                }
            });
        }

        // Gestion du clavier
        document.addEventListener('keydown', (e) => {
            if (!this.overlay || !this.overlay.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeFullscreen();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });

        // Gestion du swipe sur mobile
        this.setupSwipeGestures();
    }

    setupSwipeGestures() {
        if (!this.overlay) return;
        
        let startX = 0;
        let startY = 0;
        let isSwipe = false;

        this.overlay.addEventListener('touchstart', (e) => {
            if (!this.overlay.classList.contains('active')) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwipe = true;
        });

        this.overlay.addEventListener('touchmove', (e) => {
            if (!isSwipe) return;
            e.preventDefault(); // Empêcher le scroll
        });

        this.overlay.addEventListener('touchend', (e) => {
            if (!isSwipe || !this.overlay.classList.contains('active')) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Vérifier si c'est un swipe horizontal
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextImage(); // Swipe vers la gauche
                } else {
                    this.previousImage(); // Swipe vers la droite
                }
            }
            
            isSwipe = false;
        });
    }

    openFullscreen(index) {
        console.log('🔍 Ouverture fullscreen - Image', index);
        
        this.currentImageIndex = index;
        this.updateFullscreenImage();
        this.updateNavigation();
        this.updateIndicators();
        
        // Afficher l'overlay
        if (this.overlay) {
            this.overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Empêcher le scroll
        }
    }

    closeFullscreen() {
        console.log('❌ Fermeture fullscreen');
        
        if (this.overlay) {
            this.overlay.classList.remove('active');
            document.body.style.overflow = ''; // Restaurer le scroll
        }
    }

    previousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
            this.updateFullscreenImage();
            this.updateNavigation();
            this.updateIndicators();
        }
    }

    nextImage() {
        if (this.currentImageIndex < this.images.length - 1) {
            this.currentImageIndex++;
            this.updateFullscreenImage();
            this.updateNavigation();
            this.updateIndicators();
        }
    }

    goToImage(index) {
        if (index >= 0 && index < this.images.length) {
            this.currentImageIndex = index;
            this.updateFullscreenImage();
            this.updateNavigation();
            this.updateIndicators();
        }
    }

    updateFullscreenImage() {
        const currentImg = this.images[this.currentImageIndex];
        if (currentImg && this.fullscreenImage) {
            this.fullscreenImage.src = currentImg.src;
            this.fullscreenImage.alt = currentImg.alt || `CV - Page ${this.currentImageIndex + 1}`;
        }
    }

    updateNavigation() {
        // Mise à jour des boutons
        if (this.navButtons.prev) {
            this.navButtons.prev.disabled = this.currentImageIndex === 0;
        }
        if (this.navButtons.next) {
            this.navButtons.next.disabled = this.currentImageIndex === this.images.length - 1;
        }
    }

    updateIndicators() {
        // Mise à jour des indicateurs
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentImageIndex);
        });
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
            this.setup();
        }
    }
    
    setupDesktopBehavior() {
        console.log('� Configuration desktop : préservation fonctionnalités existantes');
        
        // Sur desktop, maintenir la compatibilité avec l'ancien système
        if (this.cvPaper) {
            // S'assurer que l'interactivité 3D est active
            this.cvPaper.style.pointerEvents = 'all';
            this.cvPaper.style.cursor = '';
        }
    }

    // Méthode publique pour forcer la réinitialisation
    refresh() {
        console.log('🔄 CV Mobile Manager - Rafraîchissement...');
        this.setup();
    }
}

// Auto-initialisation
let cvMobileManager = null;

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        cvMobileManager = new CVMobileManager();
    });
} else {
    cvMobileManager = new CVMobileManager();
}

// Export pour utilisation externe
window.CVMobileManager = CVMobileManager;
window.cvMobileManager = cvMobileManager;