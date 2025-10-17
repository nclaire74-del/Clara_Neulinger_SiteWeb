// Gestionnaire d'effets visuels SIMPLE pour debug
class EffectsManager {
    constructor() {
        this.customCursor = null;
        this.mouseTrails = [];
        this.isLoading = true;
        this.lastMousePos = { x: 0, y: 0 };
        this.lastTrailPos = null;
        this.mouseSpeed = 0;
        
        this.init();
    }
    
    init() {
        console.log('🎨 EffectsManager SIMPLE: Initialisation');
        this.createCustomCursor();
        this.bindMouseEvents();
        
        // Test immédiat - créer un trail rouge au centre
        setTimeout(() => {
            console.log('🔥 TEST FORCÉ - Création trail rouge au centre');
            this.createTestTrail();
        }, 2000);
        
        // Message très visible dans la console
        console.log('🔥🔥🔥 EFFECTS-MANAGER-SIMPLE.JS CHARGÉ ET INITIALISÉ 🔥🔥🔥');
    }
    
    createTestTrail() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const testTrail = document.createElement('div');
        testTrail.style.position = 'fixed';
        testTrail.style.left = centerX + 'px';
        testTrail.style.top = centerY + 'px';
        testTrail.style.width = '50px';
        testTrail.style.height = '50px';
        testTrail.style.backgroundColor = '#ff0000';
        testTrail.style.border = '5px solid #ffff00';
        testTrail.style.zIndex = '100000'; // Encore plus haut
        testTrail.style.opacity = '1';
        testTrail.style.borderRadius = '50%';
        testTrail.style.display = 'block';
        testTrail.style.visibility = 'visible';
        
        document.body.appendChild(testTrail);
        console.log('🔥 TRAIL TEST CRÉÉ avec z-index 100000 - Devrait être visible au premier plan');
        
        // Créer aussi un trail blanc de test
        setTimeout(() => {
            const whiteTest = document.createElement('div');
            whiteTest.style.position = 'fixed';
            whiteTest.style.left = (centerX + 60) + 'px';
            whiteTest.style.top = centerY + 'px';
            whiteTest.style.width = '40px';
            whiteTest.style.height = '5px';
            whiteTest.style.backgroundColor = '#ffffff';
            whiteTest.style.border = '1px solid #f5f1e8';
            whiteTest.style.zIndex = '100000';
            whiteTest.style.opacity = '1';
            whiteTest.style.display = 'block';
            whiteTest.style.visibility = 'visible';
            whiteTest.style.boxShadow = '0 0 10px rgba(255, 255, 255, 1)';
            
            document.body.appendChild(whiteTest);
            console.log('🔥 TRAIT BLANC TEST créé - Ligne blanche à côté du point rouge');
        }, 1000);
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
        const trailInterval = 50; // Trail tous les 50ms
        
        const handleMouseMove = (e) => {
            console.log(`🖱️ MOUSE DETECTÉ: ${e.clientX}, ${e.clientY}`);
            
            // Vérifier si on est sur l'écran de loading
            const loadingScreen = document.getElementById('loading-screen');
            const isLoadingVisible = loadingScreen && loadingScreen.style.display !== 'none';
            
            console.log(`📺 Loading screen visible: ${isLoadingVisible}`);
            
            // Mettre à jour curseur seulement si loading visible
            if (this.customCursor && isLoadingVisible) {
                this.customCursor.style.left = e.clientX + 'px';
                this.customCursor.style.top = e.clientY + 'px';
            }
            
            // Créer trails SEULEMENT si l'écran de loading est visible
            if (isLoadingVisible) {
                const currentTime = Date.now();
                if (currentTime - lastTrailTime > trailInterval) {
                    console.log(`✏️ CRÉATION TRAIL SUR LOADING SCREEN`);
                    this.createMouseTrail(e.clientX, e.clientY);
                    lastTrailTime = currentTime;
                }
            } else {
                console.log(`❌ Pas de trail - loading screen non visible`);
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
        
        // Test si les événements fonctionnent
        document.addEventListener('click', (e) => {
            console.log(`🔥 CLICK DETECTÉ: ${e.clientX}, ${e.clientY}`);
            this.createMouseTrail(e.clientX, e.clientY);
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
        console.log(`✏️ Création ligne continue à x=${x}, y=${y}`);
        
        // Calculer la vitesse
        const deltaX = x - this.lastMousePos.x;
        const deltaY = y - this.lastMousePos.y;
        this.mouseSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '99999'; // TRÈS HAUT pour passer devant tout
        
        // Si on a une position précédente, créer une ligne continue
        if (this.lastTrailPos) {
            // Calculer distance et angle entre les deux points
            const distance = Math.sqrt(
                Math.pow(x - this.lastTrailPos.x, 2) + 
                Math.pow(y - this.lastTrailPos.y, 2)
            );
            const angle = Math.atan2(y - this.lastTrailPos.y, x - this.lastTrailPos.x) * 180 / Math.PI;
            
            // Position au centre de la ligne
            const centerX = (this.lastTrailPos.x + x) / 2;
            const centerY = (this.lastTrailPos.y + y) / 2;
            
            // Variations naturelles
            const trembleX = (Math.random() - 0.5) * 3;
            const trembleY = (Math.random() - 0.5) * 3;
            const trembleAngle = (Math.random() - 0.5) * 10;
            const thickness = 2 + Math.random() * 3;
            
            // Créer une ligne
            trail.style.left = (centerX + trembleX) + 'px';
            trail.style.top = (centerY + trembleY) + 'px';
            trail.style.width = Math.max(distance, 3) + 'px';
            trail.style.height = thickness + 'px';
            trail.style.transform = `rotate(${angle + trembleAngle}deg)`;
            trail.style.transformOrigin = 'center';
            trail.style.borderRadius = '2px';
            
            console.log(`📏 Ligne: distance=${distance.toFixed(1)}px, angle=${angle.toFixed(1)}°`);
        } else {
            // Premier point - faire un petit cercle
            trail.style.left = x + 'px';
            trail.style.top = y + 'px';
            trail.style.width = '4px';
            trail.style.height = '4px';
            trail.style.borderRadius = '50%';
            
            console.log(`� Point de départ`);
        }
        
        // Style blanc TRÈS visible pour debug
        trail.style.backgroundColor = '#ffffff'; // Blanc pur
        trail.style.border = '1px solid #f5f1e8'; // Bordure pour plus de visibilité
        trail.style.opacity = '1'; // Opacité maximale
        trail.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)'; // Halo blanc
        
        console.log(`🎨 Trail stylé - z-index: ${trail.style.zIndex}`);
        
        // Ajouter au DOM - directement dans le body pour être sûr qu'il passe devant
        document.body.appendChild(trail);
        this.mouseTrails.push(trail);
        
        // Forcer le style après ajout au DOM
        trail.style.display = 'block';
        trail.style.visibility = 'visible';
        
        // DEBUG DÉTAILLÉ
        console.log(`🔥 TRAIL AJOUTÉ AU DOM:`);
        console.log(`   - Position: left=${trail.style.left}, top=${trail.style.top}`);
        console.log(`   - Taille: width=${trail.style.width}, height=${trail.style.height}`);
        console.log(`   - Couleur: ${trail.style.backgroundColor}`);
        console.log(`   - Opacité: ${trail.style.opacity}`);
        console.log(`   - Z-index: ${trail.style.zIndex}`);
        console.log(`   - Parent: ${trail.parentNode ? 'document.body' : 'AUCUN'}`);
        
        // Sauvegarder la position pour la prochaine ligne
        this.lastTrailPos = { x, y };
        
        console.log(`✏️ Trail créé! Total: ${this.mouseTrails.length}`);
        
        // Fade out
        setTimeout(() => {
            trail.style.transition = 'opacity 2s ease-out';
            trail.style.opacity = '0';
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.remove();
                    const idx = this.mouseTrails.indexOf(trail);
                    if (idx > -1) this.mouseTrails.splice(idx, 1);
                }
            }, 2000);
        }, 100);
    }
    
    onLoadingComplete() {
        this.isLoading = false;
        console.log('🎨 Chargement terminé - Nettoyage des trails');
        
        // Supprimer tous les trails restants
        this.mouseTrails.forEach(trail => {
            if (trail.parentNode) {
                trail.remove();
            }
        });
        this.mouseTrails = [];
        
        // Cacher le curseur personnalisé
        if (this.customCursor) {
            this.customCursor.style.display = 'none';
        }
        
        console.log('🧹 Tous les trails supprimés');
    }
}

// Créer l'instance globale
window.effectsManager = new EffectsManager();