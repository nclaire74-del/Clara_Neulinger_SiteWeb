/**
 * CV Buttons Manager - Gestion des boutons CV avec overlay
 * Remplace le système de sélection par langue par des boutons uniformes
 */

class CVButtonsManager {
    constructor() {
        this.overlay = null;
        this.overlayImage = null;
        this.closeBtn = null;
        this.cvButtons = [];
        
        this.init();
    }
    
    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeElements());
        } else {
            this.initializeElements();
        }
    }
    
    initializeElements() {
        // Récupérer les éléments
        this.overlay = document.getElementById('cv-overlay');
        this.overlayImage = document.getElementById('cv-overlay-image');
        this.closeBtn = document.getElementById('cv-close-btn');
        this.cvButtons = document.querySelectorAll('.cv-btn');
        
        console.log('CV Buttons Manager: Éléments trouvés:', {
            overlay: !!this.overlay,
            overlayImage: !!this.overlayImage,
            closeBtn: !!this.closeBtn,
            buttonsCount: this.cvButtons.length
        });
        
        if (!this.overlay || !this.overlayImage || !this.closeBtn) {
            console.warn('CV Buttons Manager: Éléments overlay non trouvés');
            return;
        }
        
        this.bindEvents();
        console.log('CV Buttons Manager: Initialisé avec', this.cvButtons.length, 'boutons');
    }
    
    bindEvents() {
        // Événements pour les boutons CV
        this.cvButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleCVButtonClick(e));
        });
        
        // Événements pour fermer l'overlay
        this.closeBtn.addEventListener('click', () => this.closeOverlay());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeOverlay();
            }
        });
        
        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.closeOverlay();
            }
        });
    }
    
    handleCVButtonClick(event) {
        console.log('CV Buttons Manager: Bouton cliqué');
        const button = event.currentTarget;
        const cvPath = button.getAttribute('data-cv');
        
        console.log('CV Buttons Manager: Chemin CV:', cvPath);
        
        if (!cvPath) {
            console.error('CV Buttons Manager: Pas de chemin CV trouvé pour ce bouton');
            return;
        }
        
        // Effet visuel sur le bouton
        this.addClickEffect(button);
        
        // Ouvrir l'overlay avec le CV
        this.openOverlay(cvPath);
    }
    
    openOverlay(imagePath) {
        if (!this.overlay || !this.overlayImage) return;
        
        // Précharger l'image
        const img = new Image();
        img.onload = () => {
            this.overlayImage.src = imagePath;
            this.overlay.classList.add('active');
            
            // Empêcher le scroll du body
            document.body.style.overflow = 'hidden';
            
            console.log('CV Buttons Manager: Overlay ouvert avec', imagePath);
        };
        img.onerror = () => {
            console.error('CV Buttons Manager: Impossible de charger', imagePath);
        };
        img.src = imagePath;
    }
    
    closeOverlay() {
        if (!this.overlay) return;
        
        this.overlay.classList.remove('active');
        
        // Réactiver le scroll du body
        document.body.style.overflow = '';
        
        // Nettoyer l'image après l'animation
        setTimeout(() => {
            if (this.overlayImage) {
                this.overlayImage.src = '';
            }
        }, 300);
        
        console.log('CV Buttons Manager: Overlay fermé');
    }
    
    addClickEffect(button) {
        // Effet de clic temporaire
        button.style.transform = 'scale(0.95)';
        button.style.opacity = '0.8';
        
        setTimeout(() => {
            button.style.transform = '';
            button.style.opacity = '';
        }, 150);
    }
}

// Initialisation automatique
let cvButtonsManager = null;

// Attendre que tout soit chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        cvButtonsManager = new CVButtonsManager();
    });
} else {
    cvButtonsManager = new CVButtonsManager();
}

// Export pour utilisation externe si nécessaire
window.CVButtonsManager = CVButtonsManager;