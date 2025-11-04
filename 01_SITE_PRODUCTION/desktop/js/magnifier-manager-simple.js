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
            background: transparent;
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
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            width: 140px;
            height: 140px;
            display: flex;
            align-items: center;
            justify-content: center;
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
                    // Vérifier si la souris sort vraiment de la zone (pas juste un clic)
                    const rect = paper.getBoundingClientRect();
                    const mouseX = e.clientX;
                    const mouseY = e.clientY;
                    
                    // Ne cacher la loupe que si la souris est vraiment sortie de la zone
                    if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
                        console.log('🚪 MOUSELEAVE réel - Masquer loupe');
                        this.hideMagnifier();
                    } else {
                        console.log('🔍 MOUSELEAVE pendant clic - Garder loupe');
                    }
                }
            });
            
            paper.addEventListener('mousemove', (e) => {
                if (this.isActive && this.isMagnifierEnabled) {
                    this.updatePosition(e);
                    this.updateContent(e);
                }
            });
            
            // Empêcher la loupe de disparaître lors des clics
            paper.addEventListener('click', (e) => {
                if (this.isMagnifierEnabled) {
                    console.log('🖱️ CLICK - Maintenir loupe active');
                    e.stopPropagation();
                    // Forcer le maintien de la loupe
                    if (!this.isActive) {
                        this.showMagnifier(e);
                    }
                }
            });
            
            paper.addEventListener('dblclick', (e) => {
                if (this.isMagnifierEnabled) {
                    console.log('🖱️ DOUBLE-CLICK - Maintenir loupe active');
                    e.stopPropagation();
                    // Forcer le maintien de la loupe
                    if (!this.isActive) {
                        this.showMagnifier(e);
                    }
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
        const toggleBtn = document.getElementById('magnifier-toggle');
        
        if (this.isMagnifierEnabled) {
            document.body.classList.add('magnifier-cursor-enabled');
            if (toggleBtn) {
                toggleBtn.setAttribute('data-active', 'true');
            }
            console.log('✅ LOUPE ACTIVÉE');
        } else {
            document.body.classList.remove('magnifier-cursor-enabled');
            if (toggleBtn) {
                toggleBtn.setAttribute('data-active', 'false');
            }
            this.hideMagnifier();
            console.log('❌ LOUPE DÉSACTIVÉE');
        }
    }

    disableMagnifier() {
        this.isMagnifierEnabled = false;
        const toggleBtn = document.getElementById('magnifier-toggle');
        
        document.body.classList.remove('magnifier-cursor-enabled');
        if (toggleBtn) {
            toggleBtn.setAttribute('data-active', 'false');
        }
        this.hideMagnifier();
        console.log('❌ LOUPE FORCÉE À DÉSACTIVÉE');
    }

    showMagnifier(e) {
        console.log('🔍 SHOW MAGNIFIER');
        this.isActive = true;
        this.currentTarget = e.target;
        
        // Trouver le CV parent si on survole l'overlay
        if (e.target.classList.contains('cv-interactive-overlay')) {
            // Chercher le CV dans les éléments frères
            const cvPaper = e.target.parentElement.querySelector('.cv-paper');
            if (cvPaper) {
                this.currentTarget = cvPaper;
                console.log('🎯 Overlay détecté, CV parent trouvé:', this.currentTarget);
            } else {
                // Fallback: chercher dans les enfants de l'overlay
                const cvImg = e.target.querySelector('img');
                if (cvImg) {
                    this.currentTarget = cvImg.parentElement;
                    console.log('🎯 Overlay détecté, image CV trouvée:', this.currentTarget);
                }
            }
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
        
        // Si on survole l'overlay, utiliser ses coordonnées mais cibler l'image du CV
        let targetForCoords = this.currentTarget;
        if (e.target.classList.contains('cv-interactive-overlay')) {
            targetForCoords = e.target; // Utiliser l'overlay pour les coordonnées
            console.log('🎯 Utilisation des coordonnées de l\'overlay');
        }
        
        // Obtenir les coordonnées relatives au CV
        const targetRect = targetForCoords.getBoundingClientRect();
        const relativeX = e.clientX - targetRect.left;
        const relativeY = e.clientY - targetRect.top;
        
        // Détecter quelle face du CV est visible (front ou back)
        let cvImageSrc = '/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg'; // Front par défaut
        
        // Vérifier si le CV est flippé en utilisant le dual-paper-manager
        if (window.dualPaperManager && window.dualPaperManager.papers && window.dualPaperManager.papers.cv) {
            const isFlipped = window.dualPaperManager.papers.cv.flipped;
            if (isFlipped) {
                cvImageSrc = '/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/2.svg'; // Back
                console.log('🔄 CV flippé - Affichage face arrière');
            } else {
                console.log('📄 CV normal - Affichage face avant');
            }
        }
        
        // Utiliser directement background-image avec position dynamique et ZOOM PLUS FORT
        content.innerHTML = '';
        
        // Calculer la position pour centrer exactement la zone sous la souris dans la loupe
        // La formule : on veut que le point sous la souris apparaisse au centre du cercle (75px, 75px)
        
        const backgroundWidth = 1200;
        const backgroundHeight = 1500;
        const circleRadius = 75; // Centre du cercle de 150px
        
        // Position exacte en pixels dans l'image de fond
        const mousePointX = (relativeX / targetRect.width) * backgroundWidth;
        const mousePointY = (relativeY / targetRect.height) * backgroundHeight;
        
        // Pour centrer ce point, il faut le décaler vers le centre du cercle
        const bgPosX = ((mousePointX - circleRadius) / (backgroundWidth - 150)) * 100;
        const bgPosY = ((mousePointY - circleRadius) / (backgroundHeight - 150)) * 100;
        
        // Limiter pour éviter les zones blanches
        const finalBgPosX = Math.max(0, Math.min(100, bgPosX));
        const finalBgPosY = Math.max(0, Math.min(100, bgPosY));
        
        content.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 150px;
            height: 150px;
            overflow: hidden;
            border-radius: 50%;
            background: white url('${cvImageSrc}') no-repeat;
            background-size: 1200px 1500px;
            background-position: ${finalBgPosX}% ${finalBgPosY}%;
        `;
        
        console.log(`🔍 Souris(${Math.round(relativeX)},${Math.round(relativeY)}) -> BG(${Math.round(finalBgPosX)}%,${Math.round(finalBgPosY)}%)`);
        
        // Détecter quelle face du CV est visible en regardant directement l'image visible
        let imageSrc = '../../05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg'; // Face avant par défaut
        
        // Chercher l'image actuellement visible dans le CV
        const cvImages = this.currentTarget.querySelectorAll('img');
        let sourceImage = null;
        if (cvImages.length > 0) {
            // Prendre la première image visible
            for (let img of cvImages) {
                const style = window.getComputedStyle(img);
                if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
                    // Utiliser directement le src de l'image trouvée
                    imageSrc = img.src;
                    sourceImage = img;
                    console.log('🎯 Image détectée directement:', imageSrc);
                    break;
                }
            }
        } else {
            // Fallback: vérifier si le dual-paper-manager existe et a l'état flipped
            if (window.dualPaperManager && window.dualPaperManager.papers && window.dualPaperManager.papers.cv) {
                const isFlipped = window.dualPaperManager.papers.cv.flipped;
                if (isFlipped) {
                    imageSrc = '../../05_PROJETS_3D/Images_Portfolio/Cv/2.svg'; // Face arrière
                    console.log('🔄 CV retourné - Affichage face arrière (2.svg)');
                } else {
                    imageSrc = '../../05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg'; // Face avant
                    console.log('📄 CV normal - Affichage face avant (Cv_fr.svg)');
                }
            } else {
                console.log('⚠️ Aucune image trouvée, utilisation du fallback par défaut');
            }
        }
        
        // Créer une image pour la loupe
        const magnifiedImage = document.createElement('img');
        
        // Si on a une image source, cloner ses propriétés
        if (sourceImage) {
            magnifiedImage.src = sourceImage.src;
            console.log('🎯 Utilisation image source directe:', sourceImage.src);
        } else {
            magnifiedImage.src = imageSrc;
            console.log('🔍 Utilisation chemin calculé:', imageSrc);
        }
        
        // Ajouter des événements de debug
        magnifiedImage.onload = () => {
            console.log('✅ Image chargée avec succès:', magnifiedImage.src);
        };
        
        magnifiedImage.onerror = () => {
            console.error('❌ Erreur de chargement image:', magnifiedImage.src);
            // Essayer différents chemins de fallback
            if (magnifiedImage.src.includes('../../')) {
                magnifiedImage.src = magnifiedImage.src.replace('../../', '/Clara_Neulinger/');
                console.log('🔄 Tentative chemin absolu:', magnifiedImage.src);
            } else if (magnifiedImage.src.includes('/Clara_Neulinger/')) {
                magnifiedImage.src = magnifiedImage.src.replace('/Clara_Neulinger/', '../../');
                console.log('🔄 Tentative chemin relatif:', magnifiedImage.src);
            }
        };
        
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
            background: transparent;
            image-rendering: auto;
            -webkit-image-rendering: auto;
            -moz-image-rendering: auto;
            shape-rendering: geometricPrecision;
            text-rendering: optimizeLegibility;
            max-width: none;
            max-height: none;
            border: none;
        `;
        
        content.appendChild(magnifiedImage);
        console.log('🔍 Image SVG zoomée créée. Coords:', {relativeX, relativeY}, 'Target:', targetRect);
    }
}

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOMContentLoaded - Initialising SimpleMagnifierManager');
    window.simpleMagnifierManager = new MagnifierManager();
});