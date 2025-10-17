class PaperManager {
    constructor() {
        this.cvPaper = null;
        this.contactPaper = null;
        
        // État CV
        this.cvDragging = false;
        this.cvFlipped = false;
        this.cvRotationX = 0;
        this.cvRotationY = 0;
        this.cvTranslationX = 0; // CORRIGÉ: Ajout de la translation X
        this.cvTranslationY = 0; // CORRIGÉ: Ajout de la translation Y
        this.cvScale = 1;
        
        // État Contact
        this.contactDragging = false;
        this.contactFlipped = false;
        this.contactRotationX = 0;
        this.contactRotationY = 0;
        this.contactTranslationX = 0; // CORRIGÉ: Ajout de la translation X
        this.contactTranslationY = 0; // CORRIGÉ: Ajout de la translation Y
        this.contactScale = 1;
        
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.activePaper = null;
        
        // Sensibilité des rotations
        this.rotationSensitivity = 0.3;
        this.maxRotation = 45;
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Écouteurs pour l'ouverture de la fenêtre contact
        document.addEventListener('click', (e) => {
            if (e.target.closest('#contact')) {
                setTimeout(() => {
                    this.initializePapers();
                    this.updateCVLanguage();
                }, 100);
            }
        });

        // Fermeture
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-contact')) {
                this.resetPapers();
                const overlay = document.querySelector('#contact-window');
                if (overlay) overlay.classList.remove('show');
            }
        });

        // Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.resetPapers();
                const overlay = document.querySelector('#contact-window');
                if (overlay) overlay.classList.remove('show');
            }
        });

        // Changement de langue
        document.addEventListener('change', (e) => {
            if (e.target.id === 'language-select') {
                this.updateCVLanguage();
            }
        });
    }

    initializePapers() {
        this.cvPaper = document.getElementById('cv-paper');
        this.contactPaper = document.getElementById('contact-paper');
        
        if (!this.cvPaper || !this.contactPaper) {
            console.warn('Papers not found');
            return;
        }

        this.resetValues();
        this.addPapersEventListeners();
        console.log('Papers initialized');
    }

    resetValues() {
        // Reset CV
        this.cvDragging = false;
        this.cvFlipped = false;
        this.cvRotationX = 0;
        this.cvRotationY = 0;
        this.cvTranslationX = 0; // CORRIGÉ
        this.cvTranslationY = 0; // CORRIGÉ
        this.cvScale = 1;
        
        // Reset Contact
        this.contactDragging = false;
        this.contactFlipped = false;
        this.contactRotationX = 0;
        this.contactRotationY = 0;
        this.contactTranslationX = 0; // CORRIGÉ
        this.contactTranslationY = 0; // CORRIGÉ
        this.contactScale = 1;
        
        this.updatePapersTransform();
    }

    addPapersEventListeners() {
        // CORRIGÉ: Supprimer les anciens événements d'abord
        if (this.cvPaper._paperManagerEvents) {
            this.removePaperEvents(this.cvPaper);
        }
        if (this.contactPaper._paperManagerEvents) {
            this.removePaperEvents(this.contactPaper);
        }
        
        // Événements CV
        const cvMouseDown = (e) => this.handleMouseDown(e, 'cv');
        const cvDblClick = () => this.flipPaper('cv'); // CORRIGÉ: Fonction fléchée
        const cvWheel = (e) => this.handleWheel(e, 'cv');
        const cvContextMenu = (e) => {
            e.preventDefault();
            this.resetPaper('cv');
        };
        
        this.cvPaper.addEventListener('mousedown', cvMouseDown);
        this.cvPaper.addEventListener('dblclick', cvDblClick);
        this.cvPaper.addEventListener('wheel', cvWheel);
        this.cvPaper.addEventListener('contextmenu', cvContextMenu);
        
        // Marquer comme ayant des événements
        this.cvPaper._paperManagerEvents = {
            mousedown: cvMouseDown,
            dblclick: cvDblClick,
            wheel: cvWheel,
            contextmenu: cvContextMenu
        };
        
        // Événements Contact
        const contactMouseDown = (e) => this.handleMouseDown(e, 'contact');
        const contactDblClick = () => this.flipPaper('contact'); // CORRIGÉ: Fonction fléchée
        const contactWheel = (e) => this.handleWheel(e, 'contact');
        const contactContextMenu = (e) => {
            e.preventDefault();
            this.resetPaper('contact');
        };
        
        this.contactPaper.addEventListener('mousedown', contactMouseDown);
        this.contactPaper.addEventListener('dblclick', contactDblClick);
        this.contactPaper.addEventListener('wheel', contactWheel);
        this.contactPaper.addEventListener('contextmenu', contactContextMenu);
        
        // Marquer comme ayant des événements
        this.contactPaper._paperManagerEvents = {
            mousedown: contactMouseDown,
            dblclick: contactDblClick,
            wheel: contactWheel,
            contextmenu: contactContextMenu
        };
        
        // Événements globaux (CORRIGÉ: Éviter les doublons)
        if (!this.globalEventsAdded) {
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleMouseUp.bind(this));
            this.globalEventsAdded = true;
        }
    }
    
    removePaperEvents(paper) {
        if (paper._paperManagerEvents) {
            paper.removeEventListener('mousedown', paper._paperManagerEvents.mousedown);
            paper.removeEventListener('dblclick', paper._paperManagerEvents.dblclick);
            paper.removeEventListener('wheel', paper._paperManagerEvents.wheel);
            paper.removeEventListener('contextmenu', paper._paperManagerEvents.contextmenu);
            delete paper._paperManagerEvents;
        }
    }

    handleMouseDown(e, paperType) {
        if (e.target.closest('.close-contact')) return;
        
        this.activePaper = paperType;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        
        if (paperType === 'cv') {
            this.cvDragging = true;
            this.cvPaper.classList.add('dragging');
        } else {
            this.contactDragging = true;
            this.contactPaper.classList.add('dragging');
        }
        
        e.preventDefault();
        e.stopPropagation();
    }

    handleMouseMove(e) {
        if (!this.activePaper) return;
        
        const deltaX = e.clientX - this.lastMouseX;
        const deltaY = e.clientY - this.lastMouseY;
        
        if (this.activePaper === 'cv' && this.cvDragging) {
            this.cvRotationY += deltaX * this.rotationSensitivity;
            this.cvRotationX -= deltaY * this.rotationSensitivity;
            
            this.cvRotationX = Math.max(-this.maxRotation, Math.min(this.maxRotation, this.cvRotationX));
            this.cvRotationY = Math.max(-this.maxRotation, Math.min(this.maxRotation, this.cvRotationY));
        } else if (this.activePaper === 'contact' && this.contactDragging) {
            this.contactRotationY += deltaX * this.rotationSensitivity;
            this.contactRotationX -= deltaY * this.rotationSensitivity;
            
            this.contactRotationX = Math.max(-this.maxRotation, Math.min(this.maxRotation, this.contactRotationX));
            this.contactRotationY = Math.max(-this.maxRotation, Math.min(this.maxRotation, this.contactRotationY));
        }
        
        this.updatePapersTransform();
        
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
    }

    handleMouseUp() {
        this.cvDragging = false;
        this.contactDragging = false;
        this.activePaper = null;
        
        if (this.cvPaper) this.cvPaper.classList.remove('dragging');
        if (this.contactPaper) this.contactPaper.classList.remove('dragging');
    }

    handleWheel(e, paperType) {
        e.preventDefault();
        e.stopPropagation();
        
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        
        if (paperType === 'cv') {
            this.cvScale = Math.max(0.5, Math.min(2, this.cvScale + delta));
        } else {
            this.contactScale = Math.max(0.5, Math.min(2, this.contactScale + delta));
        }
        
        this.updatePapersTransform();
    }

    flipPaper(paperType) {
        if (paperType === 'cv') {
            this.cvFlipped = !this.cvFlipped;
            this.cvPaper.style.transition = 'transform 0.6s ease-in-out';
            setTimeout(() => {
                if (this.cvPaper) this.cvPaper.style.transition = 'transform 0.1s ease-out';
            }, 600);
        } else {
            this.contactFlipped = !this.contactFlipped;
            this.contactPaper.style.transition = 'transform 0.6s ease-in-out';
            setTimeout(() => {
                if (this.contactPaper) this.contactPaper.style.transition = 'transform 0.1s ease-out';
            }, 600);
        }
        
        this.updatePapersTransform();
    }

    updatePapersTransform() {
        if (this.cvPaper) {
            const cvFlipRotation = this.cvFlipped ? 180 : 0;
            const cvTransform = `
                rotateX(${this.cvRotationX}deg) 
                rotateY(${this.cvRotationY + cvFlipRotation}deg) 
                scale(${this.cvScale})
            `;
            this.cvPaper.style.transform = cvTransform;
        }
        
        if (this.contactPaper) {
            const contactFlipRotation = this.contactFlipped ? 180 : 0;
            const contactTransform = `
                rotateX(${this.contactRotationX}deg) 
                rotateY(${this.contactRotationY + contactFlipRotation}deg) 
                scale(${this.contactScale})
            `;
            this.contactPaper.style.transform = contactTransform;
        }
    }

    resetPaper(paperType) {
        if (paperType === 'cv') {
            this.cvPaper.style.transition = 'transform 0.5s ease-out';
            this.cvRotationX = 0;
            this.cvRotationY = 0;
            this.cvScale = 1;
            this.cvFlipped = false;
            this.cvDragging = false;
        } else {
            this.contactPaper.style.transition = 'transform 0.5s ease-out';
            this.contactRotationX = 0;
            this.contactRotationY = 0;
            this.contactScale = 1;
            this.contactFlipped = false;
            this.contactDragging = false;
        }
        
        this.updatePapersTransform();
        
        setTimeout(() => {
            if (paperType === 'cv' && this.cvPaper) {
                this.cvPaper.style.transition = 'transform 0.1s ease-out';
            } else if (paperType === 'contact' && this.contactPaper) {
                this.contactPaper.style.transition = 'transform 0.1s ease-out';
            }
        }, 500);
    }

    resetPapers() {
        this.resetPaper('cv');
        this.resetPaper('contact');
    }

    updateCVLanguage() {
        const currentLang = CONFIG.LANGUAGE || 'fr';
        const frenchCV = document.getElementById('cv-frame-fr');
        const englishCV = document.getElementById('cv-frame-en');
        
        console.log('🌍 Mise à jour langue CV:', currentLang);
        
        if (frenchCV && englishCV) {
            if (currentLang === 'en') {
                frenchCV.style.display = 'none';
                englishCV.style.display = 'block';
                console.log('✅ CV anglais activé');
            } else {
                frenchCV.style.display = 'block';
                englishCV.style.display = 'none';
                console.log('✅ CV français activé');
            }
        }
    }
}

// Initialiser le gestionnaire de papier
document.addEventListener('DOMContentLoaded', () => {
    window.paperManager = new PaperManager();
    console.log('Paper Manager loaded');
});