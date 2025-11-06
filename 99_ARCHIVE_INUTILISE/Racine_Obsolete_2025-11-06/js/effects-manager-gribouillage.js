// Gestionnaire d'effets visuels GRIBOUILLAGE pour Clara Neulinger
class EffectsManager {
    constructor() {
        this.customCursor = null;
        this.mouseTrails = [];
        this.isLoading = true;
        this.lastMousePos = { x: 0, y: 0 };
        this.lastTrailPos = null;
        this.mouseSpeed = 0;
        this.maxTrails = 80; // LIMITE augmentée pour gribouillage + lignes continues
        this.trailsCleared = false; // Flag pour éviter multiple suppressions
        
        this.init();
    }
    
    init() {
        console.log('🎨 EffectsManager GRIBOUILLAGE: Initialisation');
        this.createCustomCursor();
        this.bindMouseEvents();
        
        // Message très visible dans la console
        console.log('🔥🔥🔥 EFFECTS-MANAGER-GRIBOUILLAGE.JS CHARGÉ ET INITIALISÉ 🔥🔥🔥');
    }
    
    createCustomCursor() {
        this.customCursor = document.createElement('div');
        this.customCursor.className = 'custom-cursor';
        this.customCursor.style.position = 'fixed';
        this.customCursor.style.pointerEvents = 'none';
        this.customCursor.style.zIndex = '9999';
        this.customCursor.style.width = '20px';
        this.customCursor.style.height = '20px';
        this.customCursor.style.border = '2px solid #f5f1e8';
        this.customCursor.style.borderRadius = '50%';
        this.customCursor.style.display = 'block';
        
        document.body.appendChild(this.customCursor);
        console.log('🎨 Curseur personnalisé créé');
    }
    
    bindMouseEvents() {
        console.log('🔥 DÉBUT bindMouseEvents');
        
        let lastTrailTime = 0;
        const trailInterval = 25; // Trail tous les 25ms pour performance optimale
        
        const handleMouseMove = (e) => {
            // Vérifier si on est sur l'écran de loading
            const loadingScreen = document.getElementById('loading-screen');
            const isLoadingVisible = loadingScreen && loadingScreen.style.display !== 'none';
            
            // Mettre à jour curseur seulement si loading visible
            if (this.customCursor && isLoadingVisible) {
                this.customCursor.style.left = e.clientX + 'px';
                this.customCursor.style.top = e.clientY + 'px';
            }
            
            // Créer trails SEULEMENT si l'écran de loading est visible ET si pas encore à 98%
            if (isLoadingVisible && this.isLoading && !this.trailsCleared) {
                const currentTime = Date.now();
                if (currentTime - lastTrailTime > trailInterval) {
                    this.createMouseTrail(e.clientX, e.clientY);
                    lastTrailTime = currentTime;
                }
            }
            
            this.lastMousePos = { x: e.clientX, y: e.clientY };
        };
        
        // Réinitialiser la position après une pause
        let mouseTimeout;
        const resetPosition = () => {
            this.lastTrailPos = null;
            console.log('🔄 Position réinitialisée (pause dans le mouvement)');
        };
        
        const handleMouseMoveWithReset = (e) => {
            handleMouseMove(e);
            
            // Réinitialiser après 200ms sans mouvement
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(resetPosition, 200);
        };
        
        // Créer trails sur clic SEULEMENT durant le loading
        document.addEventListener('click', (e) => {
            const loadingScreen = document.getElementById('loading-screen');
            const isLoadingVisible = loadingScreen && loadingScreen.style.display !== 'none';
            
            if (isLoadingVisible && this.isLoading && !this.trailsCleared) {
                console.log(`🔥 CLICK DETECTÉ durant loading: ${e.clientX}, ${e.clientY}`);
                this.createMouseTrail(e.clientX, e.clientY);
            }
        });
        
        // Écouter sur document ET window ET loading-screen
        document.addEventListener('mousemove', handleMouseMoveWithReset);
        window.addEventListener('mousemove', handleMouseMoveWithReset);
        
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.addEventListener('mousemove', handleMouseMoveWithReset);
            console.log('🔥 Événements ajoutés sur loading-screen');
        }
        
        console.log('🔥 Événements souris attachés sur document, window et loading-screen');
    }
    
    createMouseTrail(x, y) {
        // Calculer la vitesse
        const deltaX = x - this.lastMousePos.x;
        const deltaY = y - this.lastMousePos.y;
        this.mouseSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // SYSTÈME TRIPLE : lignes continues + gribouillage intéressant + traits supplémentaires
        if (this.lastTrailPos) {
            const distance = Math.sqrt(
                Math.pow(x - this.lastTrailPos.x, 2) + 
                Math.pow(y - this.lastTrailPos.y, 2)
            );
            
            // 1. LIGNE CONTINUE PRINCIPALE - ne pas fragmenter !
            this.createContinuousLine(this.lastTrailPos.x, this.lastTrailPos.y, x, y, distance);
            
            // 2. GRIBOUILLAGE INTÉRESSANT de l'ancienne version - plus de points !
            const numInterpolations = Math.max(2, Math.floor(distance / 12)); // Plus dense
            
            for (let interp = 0; interp <= numInterpolations; interp++) {
                const t = interp / numInterpolations;
                const interpX = this.lastTrailPos.x + (x - this.lastTrailPos.x) * t;
                const interpY = this.lastTrailPos.y + (y - this.lastTrailPos.y) * t;
                
                // Créer plusieurs traits pour gribouillage DENSE comme avant
                const numTrails = 3 + Math.floor(Math.random() * 2); // 3-4 traits par point !
                
                for (let i = 0; i < numTrails; i++) {
                    this.createInterestingGribouillage(interpX, interpY, t, i);
                }
            }
        } else {
            // Premier point - créer plusieurs traits de départ
            const numTrails = 2 + Math.floor(Math.random() * 2);
            for (let i = 0; i < numTrails; i++) {
                this.createInterestingGribouillage(x, y, 1, i);
            }
        }
        
        // Sauvegarder la position pour la prochaine ligne
        this.lastTrailPos = { x, y };
    }
    
    createContinuousLine(x1, y1, x2, y2, distance) {
        const line = document.createElement('div');
        line.style.position = 'fixed';
        line.style.pointerEvents = 'none';
        line.style.zIndex = '99999';
        
        // Calculer l'angle de la ligne
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        // Légère variation pour effet manuscrit mais pas trop
        const trembleX = (Math.random() - 0.5) * 2;
        const trembleY = (Math.random() - 0.5) * 2;  
        const trembleAngle = (Math.random() - 0.5) * 5;
        
        // Position au centre de la ligne
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;
        
        // Style de la ligne continue
        const thickness = 1.8 + Math.random() * 1.2; // 1.8 à 3px
        
        line.style.left = (centerX + trembleX) + 'px';
        line.style.top = (centerY + trembleY) + 'px';
        line.style.width = Math.max(distance * 0.95, 3) + 'px'; // Presque toute la distance
        line.style.height = thickness + 'px';
        line.style.transform = `rotate(${angle + trembleAngle}deg)`;
        line.style.transformOrigin = 'center';
        line.style.borderRadius = '1px';
        
        // Couleur principale plus visible pour les lignes continues
        line.style.backgroundColor = '#f5f1e8';
        line.style.opacity = '0.6'; // Plus opaque que le gribouillage
        line.style.display = 'block';
        line.style.visibility = 'visible';
        
        // CERTAINES LIGNES RESTENT PLUS LONGTEMPS !
        const isPersistent = Math.random() < 0.3; // 30% de chance d'être persistante
        
        if (isPersistent) {
            // Ligne persistante - reste 5-8 secondes
            line.style.backgroundColor = '#f0ead6'; // Légèrement différente
            line.style.opacity = '0.7'; // Plus visible
            
            const persistentDelay = 2000 + Math.random() * 3000; // 2-5s avant de commencer à disparaître
            const fadeDuration = 3000 + Math.random() * 2000; // 3-5s pour disparaître
            
            setTimeout(() => {
                line.style.transition = `opacity ${fadeDuration}ms ease-out`;
                line.style.opacity = '0';
                setTimeout(() => {
                    if (line.parentNode) {
                        line.remove();
                        const idx = this.mouseTrails.indexOf(line);
                        if (idx > -1) this.mouseTrails.splice(idx, 1);
                    }
                }, fadeDuration);
            }, persistentDelay);
        } else {
            // Ligne normale - disparaît normalement
            const fadeDelay = 300 + Math.random() * 400;
            const fadeDuration = 1200;
            
            setTimeout(() => {
                line.style.transition = `opacity ${fadeDuration}ms ease-out`;
                line.style.opacity = '0';
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        if (line.parentNode) {
                            line.remove();
                            const idx = this.mouseTrails.indexOf(line);
                            if (idx > -1) this.mouseTrails.splice(idx, 1);
                        }
                    }, fadeDuration);
                });
            }, fadeDelay);
        }
        
        // Ajouter au DOM avec limite
        if (this.mouseTrails.length >= this.maxTrails) {
            const oldestTrail = this.mouseTrails.shift();
            if (oldestTrail && oldestTrail.parentNode) {
                oldestTrail.remove();
            }
        }
        
        document.body.appendChild(line);
        this.mouseTrails.push(line);
    }
    
    createSingleTrail(x, y, progressFactor, trailIndex) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '99999';
        
        if (trailIndex < 10) {
            // Point de départ ou trait principal
            const trembleX = (Math.random() - 0.5) * 4;
            const trembleY = (Math.random() - 0.5) * 4;
            const rotation = (Math.random() - 0.5) * 15;
            
            const thickness = 1.2 + Math.random() * 1.5; // Plus fin que les lignes continues
            const length = 6 + Math.random() * 6;
            
            trail.style.left = (x + trembleX) + 'px';
            trail.style.top = (y + trembleY) + 'px';
            trail.style.width = length + 'px';
            trail.style.height = thickness + 'px';
            trail.style.transform = `rotate(${rotation}deg)`;
            trail.style.borderRadius = '1px';
        } else {
            // Gribouillage autour des lignes continues
            const offsetX = (Math.random() - 0.5) * 8; // Moins dispersé
            const offsetY = (Math.random() - 0.5) * 8;
            const miniLength = 2 + Math.random() * 4; // Plus petit
            const miniThickness = 0.6 + Math.random() * 1; // Plus fin
            const rotation = Math.random() * 120; // Moins d'orientations
            
            trail.style.left = (x + offsetX) + 'px';
            trail.style.top = (y + offsetY) + 'px';
            trail.style.width = miniLength + 'px';
            trail.style.height = miniThickness + 'px';
            trail.style.transform = `rotate(${rotation}deg)`;
            trail.style.borderRadius = '0px'; // Carré pour différencier
        }
        
        // Style différencié selon le type
        let baseOpacity, lifespan;
        
        if (trailIndex < 10) {
            // Traits principaux - plus visibles, vie moyenne
            baseOpacity = 0.5 + Math.random() * 0.2; // 0.5-0.7
            lifespan = 'normal';
        } else {
            // Gribouillage - plus discret, disparaît vite
            baseOpacity = 0.2 + Math.random() * 0.3; // 0.2-0.5
            lifespan = 'short';
        }
        
        trail.style.backgroundColor = '#f5f1e8';
        trail.style.opacity = baseOpacity.toFixed(1);
        trail.style.display = 'block';
        trail.style.visibility = 'visible';
        
        // OPTIMISATION : Limiter le nombre total de trails
        if (this.mouseTrails.length >= this.maxTrails) {
            // Supprimer le plus ancien trail pour faire de la place
            const oldestTrail = this.mouseTrails.shift();
            if (oldestTrail && oldestTrail.parentNode) {
                oldestTrail.remove();
            }
        }
        
        // Ajouter au DOM
        document.body.appendChild(trail);
        this.mouseTrails.push(trail);
        
        // Durée de vie selon le type de trait
        let fadeDelay, fadeDuration;
        
        if (lifespan === 'short') {
            // Gribouillage disparaît rapidement
            fadeDelay = 100 + Math.random() * 200; // 0.1-0.3s
            fadeDuration = 800 + Math.random() * 400; // 0.8-1.2s
        } else {
            // Traits normaux
            fadeDelay = 200 + Math.random() * 400; // 0.2-0.6s
            fadeDuration = 1200 + Math.random() * 600; // 1.2-1.8s
        }
        
        setTimeout(() => {
            trail.style.transition = `opacity ${fadeDuration}ms ease-out`;
            trail.style.opacity = '0';
            requestAnimationFrame(() => {
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.remove();
                        const idx = this.mouseTrails.indexOf(trail);
                        if (idx > -1) this.mouseTrails.splice(idx, 1);
                    }
                }, fadeDuration);
            });
        }, fadeDelay);
    }
    
    createInterestingGribouillage(x, y, progressFactor, trailIndex) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '99998'; // Juste en dessous des lignes continues
        
        if (trailIndex === 0) {
            // Trait principal plus épais et visible (ancienne version)
            const trembleX = (Math.random() - 0.5) * 8; // Plus de tremblement
            const trembleY = (Math.random() - 0.5) * 8;
            const rotation = (Math.random() - 0.5) * 25; // Variation d'angle forte
            
            // Grosseur très variable selon vitesse + aléatoire
            const speedFactor = Math.min(this.mouseSpeed * 0.18, 3);
            const randomThickness = 1.4 + Math.random() * 2.8; // 1.4 à 4.2px
            const thickness = Math.max(1.2, randomThickness + speedFactor);
            
            const length = 8 + Math.random() * 10; // Longueur variable
            
            trail.style.left = (x + trembleX) + 'px';
            trail.style.top = (y + trembleY) + 'px';
            trail.style.width = length + 'px';
            trail.style.height = thickness + 'px';
            trail.style.transform = `rotate(${rotation}deg)`;
            trail.style.transformOrigin = 'center';
            trail.style.borderRadius = Math.random() > 0.4 ? '2px' : '0px';
        } else {
            // Traits secondaires ULTRA gribouillage (ancienne version améliorée)
            const offsetX = (Math.random() - 0.5) * 15; // Dispersion LARGE
            const offsetY = (Math.random() - 0.5) * 15;
            const miniLength = 2 + Math.random() * 9; // Longueur très variable
            const miniThickness = 0.4 + Math.random() * 2.2; // De très fin à épais
            const rotation = Math.random() * 360; // Orientation complètement aléatoire
            
            trail.style.left = (x + offsetX) + 'px';
            trail.style.top = (y + offsetY) + 'px';
            trail.style.width = miniLength + 'px';
            trail.style.height = miniThickness + 'px';
            trail.style.transform = `rotate(${rotation}deg)`;
            trail.style.borderRadius = Math.random() > 0.6 ? '1px' : '0px';
        }
        
        // Style manuscrit avec variations (ancienne version)
        const colorVariation = Math.random() * 0.08; // Légère variation de couleur
        const baseOpacity = 0.35 + Math.random() * 0.4; // 0.35-0.75
        
        trail.style.backgroundColor = `rgba(245, 241, 232, ${1 - colorVariation})`;
        trail.style.opacity = baseOpacity.toFixed(2);
        trail.style.boxShadow = Math.random() > 0.7 ? '0 0 1px rgba(245, 241, 232, 0.2)' : 'none';
        trail.style.display = 'block';
        trail.style.visibility = 'visible';
        
        // OPTIMISATION : Limiter le nombre total de trails
        if (this.mouseTrails.length >= this.maxTrails) {
            const oldestTrail = this.mouseTrails.shift();
            if (oldestTrail && oldestTrail.parentNode) {
                oldestTrail.remove();
            }
        }
        
        // Ajouter au DOM
        document.body.appendChild(trail);
        this.mouseTrails.push(trail);
        
        // Animation de disparition variable (ancienne version)
        const fadeDelay = 150 + Math.random() * 500; // Délai variable
        const fadeDuration = 1400 + Math.random() * 2200; // 1.4-3.6 secondes
        
        setTimeout(() => {
            trail.style.transition = `opacity ${fadeDuration}ms ease-out`;
            trail.style.opacity = '0';
            requestAnimationFrame(() => {
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.remove();
                        const idx = this.mouseTrails.indexOf(trail);
                        if (idx > -1) this.mouseTrails.splice(idx, 1);
                    }
                }, fadeDuration);
            });
        }, fadeDelay);
    }
    
    clearTrailsAt98Percent() {
        if (this.trailsCleared) return; // Éviter les suppressions multiples
        
        this.trailsCleared = true;
        console.log('🎯 98% - Suppression IMMÉDIATE de TOUS les trails');
        
        // Supprimer INSTANTANÉMENT tous les trails sans animation
        this.mouseTrails.forEach(trail => {
            if (trail.parentNode) {
                trail.style.transition = 'none'; // Pas d'animation
                trail.style.opacity = '0';
                trail.remove(); // Suppression immédiate
            }
        });
        this.mouseTrails = [];
        
        // Supprimer TOUS les trails possibles dans le DOM (lignes continues + gribouillage)
        const allTrails = document.querySelectorAll('div[style*="position: fixed"][style*="z-index: 99999"], div[style*="position: fixed"][style*="z-index: 99998"]');
        allTrails.forEach(trail => {
            console.log('🧹 Suppression trail restant à 98%:', trail);
            trail.remove();
        });
        
        // Double vérification - supprimer tous les éléments avec les classes/styles de trails
        const backgroundTrails = document.querySelectorAll('div[style*="background-color: rgb(245, 241, 232)"], div[style*="background-color: #f5f1e8"], div[style*="background-color: #f0ead6"]');
        backgroundTrails.forEach(trail => {
            if (trail.style.position === 'fixed' && trail.style.pointerEvents === 'none') {
                console.log('🧹 Suppression trail par couleur à 98%:', trail);
                trail.remove();
            }
        });
        
        // Désactiver la création de nouveaux trails
        this.isLoading = false;
        
        // Cacher le curseur personnalisé
        if (this.customCursor) {
            this.customCursor.style.display = 'none';
        }
        
        // Réinitialiser les positions
        this.lastTrailPos = null;
        this.lastMousePos = { x: 0, y: 0 };
        
        console.log('🎯 TOUS les trails supprimés À 98% - Plus de création possible !');
    }
    
    onLoadingComplete() {
        console.log('🎨 Chargement terminé à 100%');
        
        // Si les trails n'ont pas été supprimés à 98%, les supprimer maintenant
        if (!this.trailsCleared) {
            console.log('⚠️ Suppression de sécurité - trails pas supprimés à 98%');
            this.clearTrailsAt98Percent();
        }
        
        // S'assurer que tout est bien nettoyé
        this.isLoading = false;
        
        // Dernière vérification de nettoyage
        const remainingTrails = document.querySelectorAll('div[style*="position: fixed"][style*="z-index: 9999"]');
        if (remainingTrails.length > 0) {
            console.log('🧹 Nettoyage final - suppression des derniers trails');
            remainingTrails.forEach(trail => trail.remove());
        }
        
        console.log('✅ Loading terminé - Interface vidéo propre !');
    }
}

// Créer l'instance globale
window.effectsManager = new EffectsManager();