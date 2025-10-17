class DualPaperManager {
    constructor() {
        this.cvPaper = null;
        this.contactPaper = null;
        this.isDragging = false;
        this.currentPaper = null;
        this.startX = 0;
        this.startY = 0;
        this.globalEventsAdded = false; // Flag pour éviter les doublons
        
        // État de chaque papier avec positions 3D initiales
        this.papers = {
            cv: {
                rotX: 2, rotY: -1, rotZ: 0,
                transX: 0, transY: -150, transZ: -20, /* CV beaucoup plus haut */
                scale: 1, flipped: false,
                initialRotX: 2, initialRotY: -1
            },
            contact: {
                rotX: -1, rotY: 2, rotZ: 0,
                transX: -100, transY: 250, transZ: 100, /* Papier jaune beaucoup plus bas et vers la gauche */
                scale: 1, flipped: false,
                initialRotX: -1, initialRotY: 2
            }
        };
        
        this.init();
    }

    init() {
        console.log('🔥 DualPaperManager: Initialisation 3D...');
        
        // Ne pas auto-setup, attendre l'appel du navigation-manager
        console.log('🔥 DualPaperManager: En attente d\'activation...');
    }

    setupPapers() {
        console.log('🔥 DualPaperManager: Setup des papiers...');
        
        this.cvPaper = document.getElementById('cv-paper');
        this.contactPaper = document.getElementById('contact-paper');

        if (this.cvPaper) {
            console.log('✅ CV paper trouvé');
            console.log('📄 CV paper dimensions:', this.cvPaper.offsetWidth, 'x', this.cvPaper.offsetHeight);
            console.log('📄 CV paper position:', this.cvPaper.offsetLeft, ',', this.cvPaper.offsetTop);
            this.addEventListeners(this.cvPaper, 'cv');
            this.updatePaperTransform('cv');
        } else {
            console.error('❌ CV paper non trouvé');
        }

        if (this.contactPaper) {
            console.log('✅ Contact paper trouvé');
            console.log('📝 Contact paper dimensions:', this.contactPaper.offsetWidth, 'x', this.contactPaper.offsetHeight);
            console.log('📝 Contact paper position:', this.contactPaper.offsetLeft, ',', this.contactPaper.offsetTop);
            this.addEventListeners(this.contactPaper, 'contact');
            this.updatePaperTransform('contact');
        } else {
            console.error('❌ Contact paper non trouvé');
        }

        // Events globaux seulement s'ils ne sont pas déjà ajoutés
        if (!this.globalEventsAdded) {
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            document.addEventListener('mouseup', () => this.handleMouseUp());
            document.addEventListener('keydown', (e) => this.handleKeyDown(e));
            
            // Bouton reset
            const resetBtn = document.getElementById('reset-papers');
            if (resetBtn) {
                resetBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🔄 Reset via bouton');
                    this.resetAllPapers();
                });
                console.log('✅ Bouton reset configuré');
            }
            
            this.globalEventsAdded = true;
            console.log('✅ Events globaux ajoutés');
        }
    }

    addEventListeners(paper, paperType) {
        // Nettoyer les anciens événements avant d'ajouter les nouveaux
        paper.removeEventListener('mousedown', paper._mouseDownHandler);
        paper.removeEventListener('wheel', paper._wheelHandler);
        paper.removeEventListener('dblclick', paper._dblClickHandler);
        paper.removeEventListener('contextmenu', paper._contextMenuHandler);
        
        // Créer les handlers et les stocker pour pouvoir les supprimer plus tard
        paper._mouseDownHandler = (e) => {
            console.log(`🖱️ Clic détecté sur ${paperType} - coordonnées: ${e.clientX}, ${e.clientY}`);
            this.handleMouseDown(e, paperType);
        };
        paper._wheelHandler = (e) => {
            e.preventDefault();
            console.log(`🔄 Molette détectée sur ${paperType}`);
            this.handleWheel(e, paperType);
        };
        paper._dblClickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`🔄 Double-clic détecté sur ${paperType}`);
            this.flipPaper(paperType);
        };
        paper._contextMenuHandler = (e) => {
            e.preventDefault();
            console.log(`🖱️ Clic droit détecté sur ${paperType}`);
            this.resetPaper(paperType);
        };
        
        // Ajouter les événements
        paper.addEventListener('mousedown', paper._mouseDownHandler);
        paper.addEventListener('wheel', paper._wheelHandler);
        paper.addEventListener('dblclick', paper._dblClickHandler);
        paper.addEventListener('contextmenu', paper._contextMenuHandler);
        
        // Empêcher la sélection
        paper.addEventListener('selectstart', (e) => e.preventDefault());
        paper.addEventListener('dragstart', (e) => e.preventDefault());
        
        console.log(`🎯 Events ajoutés pour ${paperType}`);
    }

    handleMouseDown(e, paperType) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log(`🎮 Début manipulation ${paperType} - target:`, e.target.tagName);
        
        this.isDragging = true;
        this.currentPaper = paperType;
        this.startX = e.clientX;
        this.startY = e.clientY;
        
        // Sauvegarder l'état initial pour cette manipulation
        const paper = this.papers[paperType];
        paper.initialRotX = paper.rotX;
        paper.initialRotY = paper.rotY;
        
        // Ajouter classe dragging
        const paperElement = paperType === 'cv' ? this.cvPaper : this.contactPaper;
        paperElement.classList.add('dragging');
        
        // Mettre au premier plan temporairement
        if (paperType === 'cv') {
            this.papers.cv.transZ = 30;
            console.log('📄 CV mis au premier plan pour manipulation');
        } else {
            this.papers.contact.transZ = 100; // Plus haut que le CV
            console.log('📝 Contact mis au premier plan pour manipulation');
        }
        this.updatePaperTransform(paperType);
        
        // Curseur grabbing sur tout le body
        document.body.style.cursor = 'grabbing';
    }

    handleMouseMove(e) {
        if (!this.isDragging || !this.currentPaper) return;

        const deltaX = e.clientX - this.startX;
        const deltaY = e.clientY - this.startY;
        
        const paper = this.papers[this.currentPaper];
        
        if (this.currentPaper === 'contact') {
            // Pour la feuille contact : mouvement libre + rotation
            const movementSensitivity = 1.0; // Mouvement libre
            const rotationSensitivity = 0.3; // Rotation plus douce
            
            // Translation libre pour pouvoir aller partout
            paper.transX = deltaX * movementSensitivity;
            paper.transY = deltaY * movementSensitivity;
            
            // Rotation plus subtile
            paper.rotY = paper.initialRotY + (deltaX * rotationSensitivity);
            paper.rotX = paper.initialRotX - (deltaY * rotationSensitivity);
            
            // Pas de limite pour les translations, limites pour rotations
            paper.rotY = Math.max(-30, Math.min(30, paper.rotY));
            paper.rotX = Math.max(-30, Math.min(30, paper.rotX));
            
            console.log(`📝 Contact libre: X=${paper.transX.toFixed(0)}px, Y=${paper.transY.toFixed(0)}px`);
        } else {
            // Pour le CV : rotation principalement
            const sensitivity = 0.5;
            const maxRotation = 60;
            
            // Rotation Y (horizontal) et X (vertical)
            const newRotY = paper.initialRotY + (deltaX * sensitivity);
            const newRotX = paper.initialRotX - (deltaY * sensitivity);
            
            // Limiter les rotations pour éviter les retournements bizarres
            paper.rotY = Math.max(-maxRotation, Math.min(maxRotation, newRotY));
            paper.rotX = Math.max(-maxRotation, Math.min(maxRotation, newRotX));
            
            // Translation légère pour le CV
            const translationSensitivity = 0.2;
            paper.transX = deltaX * translationSensitivity;
            paper.transY = deltaY * translationSensitivity;
            
            console.log(`📄 CV: rotX=${paper.rotX.toFixed(1)}°, rotY=${paper.rotY.toFixed(1)}°`);
        }
        
        this.updatePaperTransform(this.currentPaper);
    }

    handleMouseUp() {
        if (!this.isDragging) return;
        
        console.log(`🎮 Fin manipulation ${this.currentPaper}`);
        
        // Retirer classe dragging
        const paperElement = this.currentPaper === 'cv' ? this.cvPaper : this.contactPaper;
        paperElement.classList.remove('dragging');
        
        // Remettre les Z positions originales avec transition douce
        setTimeout(() => {
            if (this.currentPaper === 'cv') {
                this.papers.cv.transZ = -20; // CV en arrière-plan
            } else if (this.currentPaper === 'contact') {
                this.papers.contact.transZ = 100; // Contact toujours AU-DESSUS du CV
            }
            
            // Adoucir le retour en position seulement si currentPaper existe
            if (this.currentPaper && this.papers[this.currentPaper]) {
                // Pour contact, garder la position libre, pour CV reset partiel
                if (this.currentPaper === 'cv') {
                    this.papers[this.currentPaper].transX *= 0.3;
                    this.papers[this.currentPaper].transY *= 0.3;
                }
                // Pour contact, on garde la position où elle a été déplacée
                this.updatePaperTransform(this.currentPaper);
            }
        }, 200);
        
        // Restaurer curseur
        document.body.style.cursor = '';
        
        this.isDragging = false;
        this.currentPaper = null;
    }

    handleWheel(e, paperType) {
        e.preventDefault();
        
        const paper = this.papers[paperType];
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        
        paper.scale = Math.max(0.3, Math.min(3, paper.scale + delta));
        
        console.log(`🔍 Zoom ${paperType} = ${paper.scale.toFixed(2)}`);
        this.updatePaperTransform(paperType);
    }

    handleKeyDown(e) {
        const contactWindow = document.getElementById('contact-window');
        if (!contactWindow || !contactWindow.classList.contains('show')) return;
        
        const step = 3;
        let paper = null;
        
        // Déterminer quel papier manipuler (le dernier cliqué ou les deux)
        if (this.currentPaper) {
            paper = this.papers[this.currentPaper];
        }
        
        switch(e.key.toLowerCase()) {
            case 'r':
                if (this.currentPaper) this.flipPaper(this.currentPaper);
                break;
            case 'arrowleft':
                if (paper) {
                    paper.rotY -= step;
                    this.updatePaperTransform(this.currentPaper);
                }
                break;
            case 'arrowright':
                if (paper) {
                    paper.rotY += step;
                    this.updatePaperTransform(this.currentPaper);
                }
                break;
            case 'arrowup':
                if (paper) {
                    paper.rotX -= step;
                    this.updatePaperTransform(this.currentPaper);
                }
                break;
            case 'arrowdown':
                if (paper) {
                    paper.rotX += step;
                    this.updatePaperTransform(this.currentPaper);
                }
                break;
            case '+':
            case '=':
                if (paper) {
                    paper.scale = Math.min(3, paper.scale + 0.1);
                    this.updatePaperTransform(this.currentPaper);
                }
                break;
            case '-':
                if (paper) {
                    paper.scale = Math.max(0.3, paper.scale - 0.1);
                    this.updatePaperTransform(this.currentPaper);
                }
                break;
            case 'c':
                if (this.currentPaper) this.resetPaper(this.currentPaper);
                break;
            case 'escape':
                this.resetAllPapers();
                break;
        }
    }

    flipPaper(paperType) {
        console.log(`🔄 Retournement ${paperType}`);
        
        const paper = this.papers[paperType];
        paper.flipped = !paper.flipped;
        
        // Animation de retournement fluide
        const paperElement = paperType === 'cv' ? this.cvPaper : this.contactPaper;
        if (!paperElement) {
            console.error(`❌ Élément ${paperType} non trouvé pour retournement !`);
            return;
        }
        
        paperElement.style.transition = 'transform 0.8s ease-in-out';
        
        // Ajouter 180° en Y pour le retournement
        paper.rotY += paper.flipped ? 180 : -180;
        
        this.updatePaperTransform(paperType);
        
        // Retirer la transition après l'animation
        setTimeout(() => {
            if (paperElement) {
                paperElement.style.transition = 'transform 0.1s ease-out';
            }
        }, 800);
    }

    updatePaperTransform(paperType) {
        const paper = this.papers[paperType];
        const paperElement = paperType === 'cv' ? this.cvPaper : this.contactPaper;
        
        if (!paperElement) {
            console.error(`❌ Élément ${paperType} non trouvé pour transformation !`);
            return;
        }
        
        // Construire la transformation 3D complète
        const transform = `
            translateX(${paper.transX}px) 
            translateY(${paper.transY}px) 
            translateZ(${paper.transZ}px) 
            rotateX(${paper.rotX}deg) 
            rotateY(${paper.rotY}deg) 
            rotateZ(${paper.rotZ}deg) 
            scale(${paper.scale})
        `;
        
        paperElement.style.transform = transform.replace(/\s+/g, ' ').trim();
        
        // Debug info
        console.log(`🎯 UPDATE ${paperType}: ${transform.replace(/\s+/g, ' ').trim()}`);
        
        if (paperType === this.currentPaper && this.isDragging) {
            console.log(`🎯 ${paperType}: rX=${paper.rotX.toFixed(1)}° rY=${paper.rotY.toFixed(1)}° scale=${paper.scale.toFixed(2)}`);
        }
    }

    resetPaper(paperType) {
        console.log(`🔄 Reset ${paperType}`);
        
        const paperElement = paperType === 'cv' ? this.cvPaper : this.contactPaper;
        paperElement.style.transition = 'transform 0.6s ease-out';
        
        // Remettre les valeurs initiales
        if (paperType === 'cv') {
            this.papers.cv = {
                rotX: 2, rotY: -1, rotZ: 0,
                transX: 0, transY: -150, transZ: -20, /* CV beaucoup plus haut */
                scale: 1, flipped: false,
                initialRotX: 2, initialRotY: -1
            };
        } else {
            this.papers.contact = {
                rotX: -1, rotY: 2, rotZ: 0,
                transX: -100, transY: 250, transZ: 100, /* Papier jaune beaucoup plus bas et vers la gauche */
                scale: 1, flipped: false,
                initialRotX: -1, initialRotY: 2
            };
        }
        
        this.updatePaperTransform(paperType);
        
        // Retirer la transition après l'animation
        setTimeout(() => {
            paperElement.style.transition = 'transform 0.1s ease-out';
        }, 600);
    }

    resetAllPapers() {
        console.log('� Reset complet des papiers');
        this.resetPaper('cv');
        this.resetPaper('contact');
        this.currentPaper = null;
        this.isDragging = false;
        document.body.style.cursor = '';
    }

    destroy() {
        // Nettoyer tous les événements
        if (this.cvPaper) {
            this.cvPaper.removeEventListener('mousedown', this.handleMouseDown);
            this.cvPaper.removeEventListener('wheel', this.handleWheel);
            this.cvPaper.removeEventListener('dblclick', this.flipPaper);
            this.cvPaper.removeEventListener('contextmenu', this.resetPaper);
        }
        
        if (this.contactPaper) {
            this.contactPaper.removeEventListener('mousedown', this.handleMouseDown);
            this.contactPaper.removeEventListener('wheel', this.handleWheel);
            this.contactPaper.removeEventListener('dblclick', this.flipPaper);
            this.contactPaper.removeEventListener('contextmenu', this.resetPaper);
        }
        
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('keydown', this.handleKeyDown);
        
        console.log('🗑️ DualPaperManager détruit');
    }
}

// Auto-initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    window.dualPaperManager = new DualPaperManager();
    console.log('✅ Dual Paper Manager 3D initialisé');
});

// Export pour utilisation globale
window.DualPaperManager = DualPaperManager;