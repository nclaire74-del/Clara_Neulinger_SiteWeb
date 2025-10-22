/**
 * Gestionnaire d'effet loupe pour les papiers
 * Transforme le curseur en loupe et zoome sur le texte au survol
 */

class MagnifierManager {
    constructor() {
        this.magnifierOverlay = null;
        this.isActive = false;
        this.isMagnifierEnabled = false; // Nouvelle propriété pour le toggle
        this.currentTarget = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        // Détection mobile/tablette pour désactiver la loupe
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.isDesktop = window.innerWidth > 1024;
        
        this.init();
    }

    init() {
        // Écouter les changements de taille d'écran
        window.addEventListener('resize', () => this.handleResize());
        
        console.log(`MagnifierManager: Init - Desktop: ${this.isDesktop}, Mobile: ${this.isMobile}, Tablet: ${this.isTablet}`);
        
        // Désactiver la loupe SEULEMENT sur mobile et tablette
        if (this.isMobile || this.isTablet) {
            console.log('MagnifierManager: Loupe désactivée sur mobile/tablette');
            return;
        }
        
        // Activer la loupe sur desktop (fonctionne normalement)
        this.createMagnifierOverlay();
        this.bindEvents();
        this.bindToggleEvents();
        console.log('MagnifierManager initialisé et FONCTIONNEL pour desktop');
    }
    
    handleResize() {
        const oldIsDesktop = this.isDesktop;
        
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        this.isDesktop = window.innerWidth > 1024;
        
        console.log(`MagnifierManager: Resize - Old: ${oldIsDesktop ? 'Desktop' : 'Mobile/Tablet'}, New: ${this.isDesktop ? 'Desktop' : 'Mobile/Tablet'}`);
        
        // Si on passe de desktop à mobile/tablette, désactiver la loupe
        if (oldIsDesktop && !this.isDesktop) {
            this.cleanup();
            console.log('MagnifierManager: Loupe désactivée (passage vers mobile/tablette)');
        }
        // Si on passe de mobile/tablette à desktop, réactiver la loupe
        else if (!oldIsDesktop && this.isDesktop && !this.magnifierOverlay) {
            this.createMagnifierOverlay();
            this.bindEvents();
            this.bindToggleEvents();
            console.log('MagnifierManager: Loupe réactivée (passage vers desktop)');
        }
    }
    
    cleanup() {
        if (this.magnifierOverlay) {
            this.deactivateMagnifier();
            this.magnifierOverlay.remove();
            this.magnifierOverlay = null;
        }
    }

    createMagnifierOverlay() {
        // Créer l'overlay de loupe
        this.magnifierOverlay = document.createElement('div');
        this.magnifierOverlay.className = 'magnifier-overlay';
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
        
        // Contenu zoomé de la loupe
        const magnifierContent = document.createElement('div');
        magnifierContent.className = 'magnifier-content';
        magnifierContent.innerHTML = '<span class="magnifier-text">LOUPE TEST</span>';
        magnifierContent.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 14px;
            font-weight: bold;
            color: #333;
        `;
        
        this.magnifierOverlay.appendChild(magnifierContent);
        document.body.appendChild(this.magnifierOverlay);
        
        console.log('🔍 Overlay magnifier créé et ajouté au DOM:', this.magnifierOverlay);
    }

    bindEvents() {
        // Événements pour les papiers CV et contact + overlay interactif
        const papers = document.querySelectorAll('.cv-paper, .contact-paper, .cv-interactive-overlay');
        
        console.log(`Binding events to ${papers.length} papers:`, papers);
        
        papers.forEach(paper => {
            // Survol des papiers
            paper.addEventListener('mouseenter', (e) => {
                if (this.isMagnifierEnabled) { // Vérifier si la loupe est activée
                    console.log('🎯 Mouseenter on:', e.target.className);
                    this.activateMagnifier(e.target);
                }
            });
            
            paper.addEventListener('mouseleave', (e) => {
                if (this.isMagnifierEnabled) {
                    console.log('🚪 Mouseleave from:', e.target.className);
                    this.deactivateMagnifier();
                }
            });
            
            // Suivi de la souris - version simplifiée
            paper.addEventListener('mousemove', (e) => {
                if (this.isActive && this.isMagnifierEnabled) {
                    console.log('👀 Mousemove - Updating position');
                    this.updateMagnifierPosition(e);
                    this.updateMagnifierContent(e);
                }
            });
        });

        // Événements globaux pour le suivi de la souris
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    bindToggleEvents() {
        const toggleBtn = document.getElementById('magnifier-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.toggleMagnifier();
            });
        }
    }

    toggleMagnifier() {
        this.isMagnifierEnabled = !this.isMagnifierEnabled;
        const toggleBtn = document.getElementById('magnifier-toggle');
        
        if (toggleBtn) {
            toggleBtn.setAttribute('data-active', this.isMagnifierEnabled.toString());
        }
        
        // Appliquer/enlever le curseur loupe
        if (this.isMagnifierEnabled) {
            document.body.classList.add('magnifier-cursor-enabled');
            console.log('Curseur loupe activé');
        } else {
            document.body.classList.remove('magnifier-cursor-enabled');
            console.log('Curseur loupe désactivé');
        }
        
        // Si on désactive, désactiver aussi la loupe active
        if (!this.isMagnifierEnabled && this.isActive) {
            this.deactivateMagnifier();
        }
        
        // Mettre à jour l'explication
        this.updateExplanation();
        
        console.log(`Loupe ${this.isMagnifierEnabled ? 'activée' : 'désactivée'}`);
    }

    updateExplanation() {
        const explanation = document.querySelector('.magnifier-explanation p');
        if (explanation) {
            if (this.isMagnifierEnabled) {
                explanation.textContent = 'Loupe activée ! Survolez les papiers pour zoomer. Cliquez à nouveau pour désactiver.';
            } else {
                explanation.textContent = 'Cliquez pour activer la loupe et zoomer sur les détails des papiers';
            }
        }
    }

    activateMagnifier(target) {
        console.log('🔍 ACTIVATION DE LA LOUPE sur:', target.className);
        
        this.isActive = true;
        
        // Si on survole l'overlay, trouver le CV parent
        if (target.classList.contains('cv-interactive-overlay')) {
            this.currentTarget = target.closest('.cv-paper') || target.parentElement.querySelector('.cv-paper');
            console.log('🎯 Overlay détecté, CV parent trouvé:', this.currentTarget);
        } else {
            this.currentTarget = target;
        }
        
        // Vérifier qu'on a bien trouvé un target
        if (!this.currentTarget) {
            console.error('❌ Aucun target trouvé pour la loupe');
            return;
        }
        
        // TEST: Montrer immédiatement l'overlay
        if (this.magnifierOverlay) {
            this.magnifierOverlay.style.opacity = '1';
            this.magnifierOverlay.style.left = '200px';
            this.magnifierOverlay.style.top = '200px';
            console.log('✅ Overlay affiché en mode test');
        } else {
            console.error('❌ magnifierOverlay n\'existe pas!');
        }
        
        console.log('✅ Loupe activée sur:', this.currentTarget.className);
    }
    }
    }

    deactivateMagnifier() {
        if (!this.isActive) return;
        
        this.isActive = false;
        
        // Supprimer les classes
        if (this.currentTarget) {
            this.currentTarget.classList.remove('magnifying-cursor');
            this.currentTarget.classList.remove('paper-hover-zoom', 'zoomed', 'instant-zoom');
        }
        
        // Désactiver l'overlay
        this.magnifierOverlay.classList.remove('active');
        
        this.currentTarget = null;
        console.log('Loupe désactivée');
    }

    updateMagnifierPosition(e) {
        // Positionner la loupe plus proche du curseur pour plus de précision
        const offsetX = 20; // Réduit le décalage horizontal
        const offsetY = -70; // Réduit le décalage vertical
        
        let x = e.clientX + offsetX;
        let y = e.clientY + offsetY;
        
        // Vérifier les limites de l'écran
        const magnifierRect = this.magnifierOverlay.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Ajuster si la loupe sort de l'écran
        if (x + magnifierRect.width > windowWidth) {
            x = e.clientX - magnifierRect.width - 10; // Moins de décalage
        }
        if (y < 0) {
            y = e.clientY + 20; // Plus proche
        }
        if (y + magnifierRect.height > windowHeight) {
            y = e.clientY - magnifierRect.height - 10; // Au-dessus si nécessaire
        }
        
        this.magnifierOverlay.style.left = x + 'px';
        this.magnifierOverlay.style.top = y + 'px';
    }

    updateMagnifierContent(e) {
        const magnifierContent = this.magnifierOverlay.querySelector('.magnifier-content');
        
        // Déterminer le target réel (en cas d'overlay)
        let realTarget = this.currentTarget;
        if (!realTarget) {
            console.warn('⚠️ Pas de currentTarget défini');
            return;
        }
        
        if (realTarget.classList.contains('cv-paper') || realTarget.classList.contains('cv-interactive-overlay')) {
            // Créer un effet de loupe réel en copiant le contenu sous le curseur
            this.createTextZoom(e, magnifierContent);
        } else if (realTarget.classList.contains('contact-paper')) {
            // Pour le contact, créer un zoom du papier réel
            this.createTextZoom(e, magnifierContent);
        }
    }

    createTextZoom(e, magnifierContent) {
        console.log('🔍 createTextZoom appelée avec:', e);
        
        // Obtenir les coordonnées relatives au papier
        const targetRect = this.currentTarget.getBoundingClientRect();
        const relativeX = e.clientX - targetRect.left;
        const relativeY = e.clientY - targetRect.top;
        
        console.log('📍 Position relative:', relativeX, relativeY);
        
        // Créer une copie du contenu avec zoom
        const zoomClone = this.currentTarget.cloneNode(true);
        
        // Nettoyer le contenu de la loupe
        magnifierContent.innerHTML = '';
        magnifierContent.className = 'magnifier-content text-zoom';
        
        // Configurer le clone pour l'effet loupe
        zoomClone.style.position = 'absolute';
        zoomClone.style.transform = 'scale(2.5)'; // Zoom 2.5x
        zoomClone.style.transformOrigin = 'top left';
        zoomClone.style.left = `${-relativeX * 2.5 + 75}px`; // Centrer sur la zone de 150px
        zoomClone.style.top = `${-relativeY * 2.5 + 75}px`;
        zoomClone.style.width = targetRect.width + 'px';
        zoomClone.style.height = targetRect.height + 'px';
        zoomClone.style.pointerEvents = 'none';
        
        // Ajouter le clone à la loupe
        magnifierContent.appendChild(zoomClone);
        
        console.log('✅ Loupe textuelle créée avec zoom 2.5x');
    }

    updateContactPaperZoom(e, magnifierContent) {
        const rect = this.currentTarget.getBoundingClientRect();
        const relativeX = (e.clientX - rect.left) / rect.width;
        const relativeY = (e.clientY - rect.top) / rect.height;
        
        // Approche simplifiée : créer un clone visible du contenu
        magnifierContent.innerHTML = '';
        
        // Créer un conteneur pour le zoom
        const zoomContainer = document.createElement('div');
        zoomContainer.style.position = 'absolute';
        zoomContainer.style.width = '350px';
        zoomContainer.style.height = '450px';
        zoomContainer.style.transformOrigin = 'top left';
        zoomContainer.style.overflow = 'visible';
        
        // Copier exactement le contenu du papier contact
        const originalContent = this.currentTarget.querySelector('.contact-content');
        if (originalContent) {
            const clonedContent = originalContent.cloneNode(true);
            
            // Appliquer le style de base du papier
            zoomContainer.style.background = `
                radial-gradient(circle at 15% 25%, rgba(139, 69, 19, 0.15) 0%, transparent 30%),
                radial-gradient(circle at 75% 85%, rgba(160, 82, 45, 0.12) 0%, transparent 25%),
                linear-gradient(135deg, 
                    #f5f08a 0%, #f0e870 15%, #e8dd55 35%, 
                    #ddd040 55%, #d1c235 75%, #c4b528 90%, #b8a820 100%
                )`;
            zoomContainer.style.borderRadius = '3px';
            zoomContainer.style.padding = '25px 20px';
            zoomContainer.style.fontFamily = 'Kindergarten, serif';
            zoomContainer.style.color = '#8B4513';
            
            zoomContainer.appendChild(clonedContent);
        }
        
        // Calculs de position pour le zoom
        const paperWidth = 350;
        const paperHeight = 450;
        const loupeSize = 150;
        const zoomLevel = 2.5; // Zoom réduit pour plus de stabilité
        
        // Position du curseur en pixels sur le papier
        const cursorX = relativeX * paperWidth;
        const cursorY = relativeY * paperHeight;
        
        // Position pour centrer la zone sous le curseur dans la loupe
        const offsetX = (loupeSize / 2) - (cursorX * zoomLevel);
        const offsetY = (loupeSize / 2) - (cursorY * zoomLevel);
        
        // Appliquer les transformations
        zoomContainer.style.transform = `scale(${zoomLevel})`;
        zoomContainer.style.left = `${offsetX / zoomLevel}px`;
        zoomContainer.style.top = `${offsetY / zoomLevel}px`;
        
        magnifierContent.appendChild(zoomContainer);
        
        console.log(`Contact zoom: pos(${Math.round(cursorX)}, ${Math.round(cursorY)}) zoom(${zoomLevel}) offset(${Math.round(offsetX)}, ${Math.round(offsetY)})`);
    }

    isOnBackSide() {
        // Méthode plus fiable : vérifier la visibilité des faces
        const frontSide = this.currentTarget.querySelector('.cv-paper-side.front');
        const backSide = this.currentTarget.querySelector('.cv-paper-side.back');
        
        if (frontSide && backSide) {
            // Vérifier quelle face est visible en regardant l'opacité ou la position
            const frontRect = frontSide.getBoundingClientRect();
            const backRect = backSide.getBoundingClientRect();
            
            // Si le back est devant le front, on est sur le dos
            const frontZ = window.getComputedStyle(frontSide).zIndex || 0;
            const backZ = window.getComputedStyle(backSide).zIndex || 0;
            
            // Vérifier la transformation du conteneur parent
            const paperTransform = window.getComputedStyle(this.currentTarget).transform;
            if (paperTransform && paperTransform !== 'none') {
                // Analyser la matrice 3D pour détecter la rotation Y
                const matrix = paperTransform.match(/matrix3d\(([^)]+)\)/);
                if (matrix) {
                    const values = matrix[1].split(', ').map(parseFloat);
                    // Dans une matrice 3D, les valeurs [0] et [5] indiquent la rotation Y
                    const scaleX = values[0];
                    // Si scaleX est négatif, on voit probablement le dos
                    return scaleX < 0;
                }
                
                // Fallback pour matrix 2D
                const matrix2d = paperTransform.match(/matrix\(([^)]+)\)/);
                if (matrix2d) {
                    const values = matrix2d[1].split(', ').map(parseFloat);
                    const scaleX = values[0];
                    return scaleX < 0;
                }
            }
        }
        
        // Par défaut, on assume qu'on est sur le front
        return false;
    }

    updateCVImagePosition(e, magnifierContent) {
        const rect = this.currentTarget.getBoundingClientRect();
        const relativeX = (e.clientX - rect.left) / rect.width;
        const relativeY = (e.clientY - rect.top) / rect.height;
        
        // Taille de l'image dans la loupe - plus petite pour plus de précision
        const imageWidth = 400; // Réduit pour une meilleure correspondance
        const imageHeight = imageWidth / 0.707; // Ratio A4
        
        // Position exacte du curseur dans l'image (en pixels)
        const centerX = relativeX * imageWidth;
        const centerY = relativeY * imageHeight;
        
        // Taille de la loupe et niveau de zoom
        const loupeSize = 120;
        const zoomLevel = 2.5; // Zoom réduit pour voir plus de contexte
        
        // Calculer le décalage pour centrer exactement sur le curseur
        const offsetX = (loupeSize / 2) - (centerX * zoomLevel);
        const offsetY = (loupeSize / 2) - (centerY * zoomLevel);
        
        // Appliquer la position et le zoom
        magnifierContent.style.backgroundSize = `${imageWidth * zoomLevel}px auto`;
        magnifierContent.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
        magnifierContent.style.transform = 'scale(1)'; // Pas de transform scale supplémentaire
        
        console.log(`Zoom sur: x=${Math.round(relativeX*100)}%, y=${Math.round(relativeY*100)}% - Pos: ${Math.round(centerX)},${Math.round(centerY)}`);
    }

    getCVContent(e) {
        const rect = this.currentTarget.getBoundingClientRect();
        const relativeX = (e.clientX - rect.left) / rect.width;
        const relativeY = (e.clientY - rect.top) / rect.height;
        
        // Zones très précises basées sur la structure d'un CV typique
        if (relativeY < 0.15) {
            // En-tête du CV (nom, titre)
            if (relativeX < 0.6) {
                return "Clara<br/>Neulinger";
            } else {
                return "Développeuse<br/>3D/Web";
            }
        } else if (relativeY < 0.25) {
            // Zone contact en haut
            if (relativeX < 0.3) {
                return "� Email<br/>Contact";
            } else if (relativeX < 0.6) {
                return "📱 Téléphone<br/>Mobile";
            } else {
                return "🌐 Portfolio<br/>En ligne";
            }
        } else if (relativeY < 0.45) {
            // Zone expérience professionnelle
            if (relativeX < 0.1) {
                return "💼<br/>Expérience";
            } else if (relativeY < 0.35) {
                return "Développeuse<br/>Senior";
            } else {
                return "Projets<br/>3D/Web";
            }
        } else if (relativeY < 0.65) {
            // Zone formation/éducation
            if (relativeX < 0.1) {
                return "🎓<br/>Formation";
            } else if (relativeX < 0.5) {
                return "Master<br/>Informatique";
            } else {
                return "Certifications<br/>3D";
            }
        } else if (relativeY < 0.85) {
            // Zone compétences
            if (relativeX < 0.1) {
                return "⚡<br/>Compétences";
            } else if (relativeX < 0.33) {
                return "JavaScript<br/>React";
            } else if (relativeX < 0.66) {
                return "Blender<br/>3D";
            } else {
                return "WebGL<br/>Three.js";
            }
        } else {
            // Zone langues/hobbies
            if (relativeX < 0.5) {
                return "🌍 Langues<br/>FR/EN";
            } else {
                return "🎨 Loisirs<br/>Art 3D";
            }
        }
    }

    getContactContent(e) {
        const rect = this.currentTarget.getBoundingClientRect();
        const relativeX = (e.clientX - rect.left) / rect.width;
        const relativeY = (e.clientY - rect.top) / rect.height;
        
        // Zones précises du papier contact
        if (relativeY < 0.2) {
            // En-tête du papier contact
            return "📝 CONTACT<br/>Clara Neulinger";
        } else if (relativeY < 0.4) {
            // Zone email
            if (relativeX < 0.15) {
                return "📧<br/>Email";
            } else {
                return "clara.neulinger<br/>@email.com";
            }
        } else if (relativeY < 0.6) {
            // Zone téléphone
            if (relativeX < 0.15) {
                return "�<br/>Tel";
            } else {
                return "+33 6 XX XX<br/>XX XX";
            }
        } else if (relativeY < 0.8) {
            // Zone réseaux sociaux
            if (relativeX < 0.33) {
                return "💼<br/>LinkedIn";
            } else if (relativeX < 0.66) {
                return "�<br/>GitHub";
            } else {
                return "🌐<br/>Portfolio";
            }
        } else {
            // Zone message
            return "💌<br/>Contactez-moi";
        }
    }

    // Méthode pour mettre à jour les références après changement DOM
    updatePaperReferences() {
        this.bindEvents();
    }
}

// Initialisation globale
window.magnifierManager = null;

// Initialiser après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    window.magnifierManager = new MagnifierManager();
});

// Réinitialiser après les changements de papiers
document.addEventListener('papersUpdated', () => {
    if (window.magnifierManager) {
        window.magnifierManager.updatePaperReferences();
    }
});