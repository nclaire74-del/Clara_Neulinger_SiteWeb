class DualPaperManager {
    constructor() {
        // Protection contre les interférences externes
        if (typeof window !== 'undefined' && window.console) {
            console.log('🛡️ DualPaperManager: Protection contre interférences activée');
        }
        
        this.cvPaper = null;
        this.contactPaper = null;
        this.isDragging = false;
        this.currentPaper = null;
        this.startX = 0;
        this.startY = 0;
        this.globalEventsAdded = false; // Flag pour éviter les doublons
        
        // Détection mobile/tablette pour désactiver les effets 3D
        this.isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
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
        
        // Vérifier si on doit désactiver l'interactivité sur mobile/tablette
        this.shouldDisableInteractivity = this.isMobile || this.isTablet;
        
        if (this.shouldDisableInteractivity) {
            console.log('� DualPaperManager: Interactivité 3D désactivée sur mobile/tablette');
        } else {
            console.log('🖥️ DualPaperManager: Interactivité 3D active sur desktop');
        }
        
        // Écouter les changements de taille d'écran pour maintenir les papiers dans la zone
        window.addEventListener('resize', () => {
            setTimeout(() => {
                this.keepPapersInBounds();
            }, 100); // Petit délai pour que la fenêtre soit redimensionnée
        });
    }

    setupPapers() {
        console.log('🔥 DualPaperManager: Setup des papiers...');
        
        this.cvPaper = document.getElementById('cv-paper');
        this.contactPaper = document.getElementById('contact-paper');

        if (this.cvPaper) {
            console.log('✅ CV paper trouvé');
            console.log('📄 CV paper dimensions:', this.cvPaper.offsetWidth, 'x', this.cvPaper.offsetHeight);
            console.log('📄 CV paper position:', this.cvPaper.offsetLeft, ',', this.cvPaper.offsetTop);
            
            // Ajouter les event listeners seulement sur desktop
            if (!this.shouldDisableInteractivity) {
                this.addEventListeners(this.cvPaper, 'cv');
            }
            
            this.updatePaperTransform('cv');
            
            // Vérifier immédiatement que le CV est dans la zone
            setTimeout(() => this.keepPapersInBounds(), 100);
        } else {
            console.error('❌ CV paper non trouvé');
        }

        if (this.contactPaper) {
            console.log('✅ Contact paper trouvé');
            console.log('📄 Contact paper dimensions:', this.contactPaper.offsetWidth, 'x', this.contactPaper.offsetHeight);
            console.log('📄 Contact paper position:', this.contactPaper.offsetLeft, ',', this.contactPaper.offsetTop);
            
            // Ajouter les event listeners seulement sur desktop
            if (!this.shouldDisableInteractivity) {
                this.addEventListeners(this.contactPaper, 'contact');
            }
            
            this.updatePaperTransform('contact');
            
            // Vérifier immédiatement que le Contact est dans la zone
            setTimeout(() => this.keepPapersInBounds(), 100);
        } else {
            console.log('⚠️ Contact paper non trouvé (supprimé)');
        }

        // Events globaux seulement s'ils ne sont pas déjà ajoutés
        if (!this.globalEventsAdded) {
            // Événements souris (desktop)
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            document.addEventListener('mouseup', () => this.handleMouseUp());
            document.addEventListener('keydown', (e) => this.handleKeyDown(e));
            
            // Événements tactiles globaux (mobile/tablette)
            document.addEventListener('touchmove', (e) => {
                if (this.isDragging) {
                    e.preventDefault();
                    const touch = e.touches[0];
                    if (touch) {
                        const mouseEvent = {
                            clientX: touch.clientX,
                            clientY: touch.clientY
                        };
                        this.handleMouseMove(mouseEvent);
                    }
                }
            }, { passive: false });
            
            document.addEventListener('touchend', () => {
                if (this.isDragging) {
                    this.handleMouseUp();
                }
            });
            
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
        paper.removeEventListener('touchstart', paper._touchStartHandler);
        paper.removeEventListener('touchmove', paper._touchMoveHandler);
        paper.removeEventListener('touchend', paper._touchEndHandler);
        
        // Variables pour gérer le double-tap
        let lastTapTime = 0;
        const doubleTapDelay = 250; // Réduire le délai pour une meilleure réactivité
        
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
        
        // Gestionnaires tactiles
        paper._touchStartHandler = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const currentTime = new Date().getTime();
            
            // Détecter le double-tap
            const timeDiff = currentTime - lastTapTime;
            console.log(`⏱️ Time diff: ${timeDiff}ms (seuil: ${doubleTapDelay}ms)`);
            
            if (timeDiff < doubleTapDelay && timeDiff > 0) {
                console.log(`📱 Double-tap CONFIRMÉ sur ${paperType}! Retournement...`);
                this.flipPaper(paperType);
                lastTapTime = 0; // Reset pour éviter les triple-taps
                return;
            }
            lastTapTime = currentTime;
            console.log(`👆 Simple tap sur ${paperType}, dernière time: ${lastTapTime}`);
            
            console.log(`👆 Touch start détecté sur ${paperType} - coordonnées: ${touch.clientX}, ${touch.clientY}`);
            // Simuler un événement souris pour réutiliser la logique existante
            const mouseEvent = {
                clientX: touch.clientX,
                clientY: touch.clientY,
                target: e.target,
                preventDefault: () => e.preventDefault(),
                stopPropagation: () => e.stopPropagation()
            };
            this.handleMouseDown(mouseEvent, paperType);
        };
        
        paper._touchMoveHandler = (e) => {
            e.preventDefault();
            if (this.isDragging && this.currentPaper === paperType) {
                const touch = e.touches[0];
                const mouseEvent = {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                };
                this.handleMouseMove(mouseEvent);
            }
        };
        
        paper._touchEndHandler = (e) => {
            e.preventDefault();
            if (this.isDragging && this.currentPaper === paperType) {
                console.log(`👆 Touch end détecté sur ${paperType}`);
                this.handleMouseUp();
            }
        };
        
        // Ajouter les événements souris (desktop)
        paper.addEventListener('mousedown', paper._mouseDownHandler);
        paper.addEventListener('wheel', paper._wheelHandler);
        paper.addEventListener('dblclick', paper._dblClickHandler);
        paper.addEventListener('contextmenu', paper._contextMenuHandler);
        
        // Ajouter les événements tactiles (mobile/tablette)
        paper.addEventListener('touchstart', paper._touchStartHandler, { passive: false });
        paper.addEventListener('touchmove', paper._touchMoveHandler, { passive: false });
        paper.addEventListener('touchend', paper._touchEndHandler, { passive: false });
        
        // Empêcher la sélection
        paper.addEventListener('selectstart', (e) => e.preventDefault());
        paper.addEventListener('dragstart', (e) => e.preventDefault());
        
        console.log(`🎯 Events ajoutés pour ${paperType} (souris + tactile)`);
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

        // Throttle pour améliorer les performances sur mobile
        const isMobile = window.innerWidth <= 1024;
        if (isMobile && !this.moveThrottle) {
            this.moveThrottle = true;
            requestAnimationFrame(() => {
                this.moveThrottle = false;
            });
        } else if (isMobile) {
            return; // Skip cette frame sur mobile si on est en throttle
        }

        const deltaX = e.clientX - this.startX;
        const deltaY = e.clientY - this.startY;
        
        const paper = this.papers[this.currentPaper];
        
        if (this.currentPaper === 'contact') {
            // Pour la feuille contact : mouvement libre + rotation
            const movementSensitivity = 1.0; // Mouvement libre
            const rotationSensitivity = 0.3; // Rotation plus douce
            
            // Translation libre pour pouvoir aller partout MAIS limitée à la zone
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
            const containerPadding = isMobile ? 20 : isTablet ? 30 : 50;
            
            // Nouvelles limites pour contact (qui peut bouger librement)
            const containerWidth = window.innerWidth - (containerPadding * 2);
            const containerHeight = window.innerHeight - (containerPadding * 2);
            const maxTransX = containerWidth / 2 - 150; // Contact peut utiliser toute la largeur
            const maxTransY = containerHeight / 2 - 200;
            
            paper.transX = Math.max(-maxTransX, Math.min(maxTransX, deltaX * movementSensitivity));
            paper.transY = Math.max(-maxTransY, Math.min(maxTransY, deltaY * movementSensitivity));
            
            // Rotation plus subtile
            paper.rotY = paper.initialRotY + (deltaX * rotationSensitivity);
            paper.rotX = paper.initialRotX - (deltaY * rotationSensitivity);
            
            // Pas de limite pour les rotations, juste les translations
            paper.rotY = Math.max(-30, Math.min(30, paper.rotY));
            paper.rotX = Math.max(-30, Math.min(30, paper.rotX));
            
            console.log(`📝 Contact confiné: X=${paper.transX.toFixed(0)}px, Y=${paper.transY.toFixed(0)}px`);
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
            
            // Translation légère pour le CV MAIS limitée à la zone GAUCHE
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
            const containerPadding = isMobile ? 20 : isTablet ? 30 : 50;
            
            // Limites spéciales pour le CV repositionné (40% left, 70% top)
            const containerWidth = window.innerWidth - (containerPadding * 2);
            const containerHeight = window.innerHeight - (containerPadding * 2);
            // Nouvelles tailles du CV : 50% plus petit sur desktop
            const cvWidth = isMobile ? 300 : isTablet ? 400 : 300; // Desktop réduit de 50%
            const cvHeight = isMobile ? 424 : isTablet ? 566 : 424; // Desktop réduit de 50%
            
            // Zone de mouvement adaptée à la nouvelle position (36% left, 60% top)
            const maxTransX = (containerWidth * 0.64) - (cvWidth / 2); // 64% de largeur disponible à droite
            const minTransX = -(containerWidth * 0.36) + (cvWidth / 2); // 36% de largeur disponible à gauche
            const maxTransY = (containerHeight * 0.4) - (cvHeight / 2); // 40% de hauteur disponible en bas
            const minTransY = -(containerHeight * 0.6) + (cvHeight / 2); // 60% de hauteur disponible en haut
            
            const translationSensitivity = 0.2;
            paper.transX = Math.max(minTransX, Math.min(maxTransX, deltaX * translationSensitivity));
            paper.transY = Math.max(minTransY, Math.min(maxTransY, deltaY * translationSensitivity));
            
            console.log(`📄 CV confiné: rotX=${paper.rotX.toFixed(1)}°, rotY=${paper.rotY.toFixed(1)}°`);
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
            // Log silencieux pour contact-paper car il n'existe pas dans cette version
            if (paperType === 'contact') {
                // console.log(`⚠️ Élément ${paperType} non trouvé (normal car supprimé)`);
                return;
            } else {
                console.error(`❌ Élément ${paperType} non trouvé pour transformation !`);
                return;
            }
        }
        
        // Ajustement pour mobile/tablette - garder la 3D mais repositionner
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        
        // Ajuster la position Y pour mobile/tablette (descendre de 30%)
        let adjustedTransY = paper.transY;
        if (paperType === 'cv' && (isMobile || isTablet)) {
            adjustedTransY = paper.transY + (window.innerHeight * 0.3); // Descendre de 30%
        }
        
        // LIMITER LES DÉPLACEMENTS POUR RESTER DANS LA ZONE VISIBLE
        const containerPadding = isMobile ? 20 : isTablet ? 30 : 50; // Padding du container
        
        // Nouvelles limites adaptées au positionnement gauche du CV
        const containerWidth = window.innerWidth - (containerPadding * 2);
        const containerHeight = window.innerHeight - (containerPadding * 2);
        
        // Le CV est repositionné à 40% left, 70% top, donc on ajuste les limites
        // Tailles du CV : 50% plus petit sur desktop, tailles normales sur mobile/tablette
        const cvWidth = isMobile ? 300 : isTablet ? 400 : 300; // Desktop réduit de 50%
        const cvHeight = isMobile ? 424 : isTablet ? 566 : 424; // Desktop réduit de 50%
        
        // Limites strictes adaptées à la nouvelle position (36% left, 60% top)
        const maxTransX = (containerWidth * 0.64) - (cvWidth / 2); // 64% de largeur disponible à droite
        const minTransX = -(containerWidth * 0.36) + (cvWidth / 2); // 36% de largeur disponible à gauche
        const maxTransY = (containerHeight * 0.4) - (cvHeight / 2); // 40% de hauteur disponible en bas
        const minTransY = -(containerHeight * 0.6) + (cvHeight / 2); // 60% de hauteur disponible en haut
        
        // Contraindre les translations dans les limites STRICTES
        paper.transX = Math.max(minTransX, Math.min(maxTransX, paper.transX));
        adjustedTransY = Math.max(minTransY, Math.min(maxTransY, adjustedTransY));
        
        // Si c'est le papier CV normal (pas mobile), aussi limiter transY
        if (paperType === 'cv' && !isMobile && !isTablet) {
            paper.transY = Math.max(-maxTransY, Math.min(maxTransY, paper.transY));
        }
        
        // Construire la transformation 3D complète
        let transform;
        if (isMobile || isTablet) {
            // Mobile/tablette : si interactivité désactivée, ne pas forcer le transform
            if (this.shouldDisableInteractivity && paperType === 'cv') {
                // Laisser le CSS gérer la position sur mobile/tablette pour le CV
                transform = 'none';
            } else {
                // Sinon, appliquer transform normal
                const baseTransformContact = paperType === 'contact' ? 
                    'translate(-50%, -50%)' : 'translate(-50%, -50%)';
                
                transform = `${baseTransformContact} 
                    translateX(${paper.transX * 0.5}px) 
                    translateY(${adjustedTransY * 0.5}px) 
                    translateZ(${paper.transZ * 0.5}px) 
                    rotateX(${paper.rotX}deg) 
                    rotateY(${paper.rotY}deg) 
                    rotateZ(${paper.rotZ}deg) 
                    scale(${paper.scale})`;
            }
        } else {
            // Desktop : transformation normale
            transform = `translate(-50%, -50%)
                translateX(${paper.transX}px) 
                translateY(${paper.transY}px) 
                translateZ(${paper.transZ}px) 
                rotateX(${paper.rotX}deg) 
                rotateY(${paper.rotY}deg) 
                rotateZ(${paper.rotZ}deg) 
                scale(${paper.scale})
            `;
        }
        
        // Appliquer le transform seulement si ce n'est pas 'none'
        if (transform !== 'none') {
            const cleanTransform = transform.replace(/\s+/g, ' ').trim();
            paperElement.style.transform = cleanTransform;
            
            // Optimiser les transitions selon la plateforme
            if (isMobile || isTablet) {
                paperElement.style.setProperty('transform', cleanTransform, 'important');
                // Transition optimisée pour mobile/tablette
                paperElement.style.setProperty('transition', 'transform 0.05s ease-out', 'important');
            } else {
                // Desktop : transition plus fluide
                paperElement.style.transition = 'transform 0.1s ease-out';
            }
        } else {
            // Si transform = 'none', ne pas appliquer de transform (laisser CSS gérer)
            console.log(`📱 ${paperType}: Transform désactivé sur mobile/tablette - CSS gère la position`);
        }
        
        // Debug info réduite pour améliorer les performances
        if (paperType === this.currentPaper && this.isDragging) {
            console.log(`🎯 ${paperType}: rX=${paper.rotX.toFixed(1)}° rY=${paper.rotY.toFixed(1)}° scale=${paper.scale.toFixed(2)}`);
        }
    }

    resetPaper(paperType) {
        console.log(`🔄 Reset ${paperType}`);
        
        const paperElement = paperType === 'cv' ? this.cvPaper : this.contactPaper;
        
        // Vérifier si l'élément existe avant de l'utiliser
        if (!paperElement) {
            console.log(`⚠️ Reset ignoré - ${paperType} paper n'existe plus`);
            return;
        }
        
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
            if (paperElement) { // Vérifier à nouveau avant d'accéder à l'élément
                paperElement.style.transition = 'transform 0.1s ease-out';
            }
        }, 600);
    }

    resetAllPapers() {
        console.log('📄 Reset complet des papiers');
        this.resetPaper('cv');
        if (this.contactPaper) {
            this.resetPaper('contact');
        }
        this.currentPaper = null;
        this.isDragging = false;
        document.body.style.cursor = '';
    }

    // Nouvelle fonction pour vérifier et corriger les positions hors zone
    keepPapersInBounds() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        const containerPadding = isMobile ? 20 : isTablet ? 30 : 50;
        
        // Nouvelles limites adaptées au positionnement
        const containerWidth = window.innerWidth - (containerPadding * 2);
        const containerHeight = window.innerHeight - (containerPadding * 2);

        // Vérifier et corriger CV (zone gauche)
        if (this.papers.cv) {
            const cvWidth = isMobile ? 300 : isTablet ? 400 : 300; // Desktop réduit de 50%
            const cvHeight = isMobile ? 424 : isTablet ? 566 : 424; // Desktop réduit de 50%
            const maxTransX = (containerWidth / 4) - (cvWidth / 4);
            const maxTransY = (containerHeight / 2) - (cvHeight / 2);
            
            let corrected = false;
            if (Math.abs(this.papers.cv.transX) > maxTransX) {
                this.papers.cv.transX = Math.max(-maxTransX, Math.min(maxTransX, this.papers.cv.transX));
                corrected = true;
            }
            if (Math.abs(this.papers.cv.transY) > maxTransY) {
                this.papers.cv.transY = Math.max(-maxTransY, Math.min(maxTransY, this.papers.cv.transY));
                corrected = true;
            }
            if (corrected) {
                console.log('📄 CV repositionné dans la zone gauche');
                this.updatePaperTransform('cv');
            }
        }

        // Vérifier et corriger Contact (toute la zone)
        if (this.papers.contact) {
            const maxTransX = containerWidth / 2 - 150;
            const maxTransY = containerHeight / 2 - 200;
            
            let corrected = false;
            if (Math.abs(this.papers.contact.transX) > maxTransX) {
                this.papers.contact.transX = Math.max(-maxTransX, Math.min(maxTransX, this.papers.contact.transX));
                corrected = true;
            }
            if (Math.abs(this.papers.contact.transY) > maxTransY) {
                this.papers.contact.transY = Math.max(-maxTransY, Math.min(maxTransY, this.papers.contact.transY));
                corrected = true;
            }
            if (corrected) {
                console.log('📝 Contact repositionné dans la zone');
                this.updatePaperTransform('contact');
            }
        }
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