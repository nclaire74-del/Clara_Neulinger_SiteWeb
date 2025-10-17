// Gestionnaire d'effets visuels et interactions
class EffectsManager {
    constructor() {
        this.customCursor = null;
        this.mouseTrails = [];
        this.isLoading = true;
        this.lastMousePos = { x: 0, y: 0 };
        this.lastTrailPos = null; // Pour les lignes continues
        this.mouseSpeed = 0;
        
        this.init();
    }
    
    init() {
        console.log('🎨 EffectsManager: Initialisation des effets de dessin');
        this.createCustomCursor();
        this.bindMouseEvents();
        
        // Test immédiat
        setTimeout(() => {
            console.log('🎨 Test: Système de traits initialisé');
            this.createMouseTrail(window.innerWidth / 2, window.innerHeight / 2);
        }, 500);
    }
    
    createCustomCursor() {
        // Créer le curseur personnalisé
        this.customCursor = document.createElement('div');
        this.customCursor.className = 'custom-cursor';
        document.body.appendChild(this.customCursor);
        
        // Initialiser la position
        this.customCursor.style.left = '50%';
        this.customCursor.style.top = '50%';
    }
    
    bindMouseEvents() {
        let lastTrailTime = 0;
        const trailInterval = 25; // Intervalle minimum entre les trails (ms)
        
        // Event sur l'écran de chargement spécifiquement
        const loadingScreen = document.getElementById('loading-screen');
        
        const handleMouseMove = (e) => {
            console.log(`🖱️ MOUSE MOVE DETECTÉ: ${e.clientX}, ${e.clientY}`);
            
            // Calculer la vitesse de la souris
            const deltaX = e.clientX - this.lastMousePos.x;
            const deltaY = e.clientY - this.lastMousePos.y;
            this.mouseSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // Mettre à jour la position du curseur si il existe
            if (this.customCursor) {
                this.customCursor.style.left = e.clientX + 'px';
                this.customCursor.style.top = e.clientY + 'px';
            }
            
            // FORCER la création de trails TOUJOURS pour le debug
            const currentTime = Date.now();
            if (currentTime - lastTrailTime > trailInterval) {
                console.log(`🔥 FORCE CRÉATION TRAIL à ${e.clientX}, ${e.clientY}`);
                this.createMouseTrail(e.clientX, e.clientY);
                lastTrailTime = currentTime;
            }
            
            this.lastMousePos = { x: e.clientX, y: e.clientY };
        };
        
        // Ajouter les événements sur document ET sur l'écran de chargement
        document.addEventListener('mousemove', handleMouseMove);
        if (loadingScreen) {
            loadingScreen.addEventListener('mousemove', handleMouseMove);
        }
        
        // Initialiser la position de la souris
        document.addEventListener('mouseenter', (e) => {
            this.lastMousePos = { x: e.clientX, y: e.clientY };
        });
        
        // Masquer le curseur quand il quitte la zone de chargement
        document.addEventListener('mouseleave', () => {
            if (this.customCursor) {
                this.customCursor.style.opacity = '0';
            }
        });
        
        document.addEventListener('mouseenter', () => {
            if (this.customCursor && this.isLoading) {
                this.customCursor.style.opacity = '1';
            }
        });
    }
    
    createMouseTrail(x, y) {
        console.log(`🎨 [DEBUG] createMouseTrail appelée à ${x}, ${y} - Speed: ${this.mouseSpeed.toFixed(1)}`);
        console.log(`🎨 [DEBUG] lastTrailPos:`, this.lastTrailPos);
        
        // Vérifications de sécurité
        if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
            console.error(`❌ [DEBUG] Coordonnées invalides: x=${x}, y=${y}`);
            return;
        }
        
        if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
            console.warn(`⚠️ [DEBUG] Coordonnées hors écran: x=${x}, y=${y}, écran: ${window.innerWidth}x${window.innerHeight}`);
        }
        
        // SIMPLE TRAIL ROUGE POUR DEBUG
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.width = '10px';
        trail.style.height = '10px';
        trail.style.backgroundColor = '#ff0000'; // ROUGE VIF
        trail.style.border = '2px solid #ffff00'; // BORDURE JAUNE
        trail.style.zIndex = '10000';
        trail.style.opacity = '1';
        trail.style.pointerEvents = 'none';
        trail.style.borderRadius = '50%';
        
        // Position avec tremblement naturel
        trail.style.left = (x + trembleX) + 'px';
        trail.style.top = (y + trembleY) + 'px';
        
        // Si on a une position précédente et qu'on bouge assez vite, créer une ligne
        if (this.lastTrailPos && this.mouseSpeed > 0.5) {
            const deltaX = x - this.lastTrailPos.x;
            const deltaY = y - this.lastTrailPos.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            
            // Ligne continue basée sur la vitesse et distance
            trail.style.width = Math.max(baseSize, Math.min(distance * 0.8, 25)) + 'px';
            trail.style.height = (baseSize * intensityVariation) + 'px';
            trail.style.transform = `rotate(${angle + rotationTremble}deg)`;
            trail.style.borderRadius = '2px';
            
            console.log(`📏 [DEBUG] Ligne continue: vitesse=${this.mouseSpeed.toFixed(1)}, distance=${distance.toFixed(1)}`);
        } else {
            // Point pour début ou mouvement lent
            trail.style.width = baseSize + 'px';
            trail.style.height = baseSize + 'px';
            trail.style.transform = `rotate(${rotationTremble}deg) scale(${0.8 + Math.random() * 0.4})`;
            trail.style.borderRadius = '50%';
            
            console.log(`� [DEBUG] Point: vitesse=${this.mouseSpeed.toFixed(1)}`);
        }
        
        // Opacité basée sur la vitesse et variations naturelles
        const speedOpacity = Math.min(1, 0.3 + this.mouseSpeed * 0.1);
        trail.style.opacity = (speedOpacity * intensityVariation).toFixed(2);
        
        // Ajouter au DOM
        document.body.appendChild(trail);
        this.mouseTrails.push(trail);
        
        console.log(`✏️ [DEBUG] Trail créé: ${trail.style.width} x ${trail.style.height}, opacity: ${trail.style.opacity}`);
        
        // Animation de disparition naturelle
        setTimeout(() => {
            trail.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
            trail.style.opacity = '0';
            trail.style.transform += ' scale(0.6)';
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.remove();
                    const idx = this.mouseTrails.indexOf(trail);
                    if (idx > -1) this.mouseTrails.splice(idx, 1);
                }
            }, 1500);
        }, 50 + Math.random() * 100);
        
        // Sauvegarder la position actuelle
        this.lastTrailPos = { x, y };
        

        
        // Debug: indiquer qu'un trail a été créé
        if (this.mouseTrails.length % 10 === 1) { // Tous les 10 trails
            console.log(`✏️ Trail créé (${this.mouseTrails.length} actifs, vitesse: ${this.mouseSpeed.toFixed(1)})`);
        }
    }
    
    // Méthode appelée quand le chargement se termine
    onLoadingComplete() {
        this.isLoading = false;
        
        // Supprimer le curseur personnalisé
        if (this.customCursor) {
            this.customCursor.style.opacity = '0';
            setTimeout(() => {
                if (this.customCursor && this.customCursor.parentNode) {
                    this.customCursor.parentNode.removeChild(this.customCursor);
                }
            }, 300);
        }
        
        // Nettoyer tous les trails
        this.mouseTrails.forEach(trail => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        });
        this.mouseTrails = [];
    }
    
    // Créer des gribouillages aléatoires de temps en temps
    createRandomScribbles() {
        if (!this.isLoading) return;
        
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;
        
        // Positions aléatoires sur l'écran
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Créer un petit gribouillage
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createMouseTrail(
                    x + (Math.random() - 0.5) * 20,
                    y + (Math.random() - 0.5) * 20
                );
            }, i * 100);
        }
        
        // Programmer le prochain gribouillage aléatoire
        setTimeout(() => {
            this.createRandomScribbles();
        }, 3000 + Math.random() * 5000);
    }
}

// Initialiser le gestionnaire d'effets
document.addEventListener('DOMContentLoaded', () => {
    window.effectsManager = new EffectsManager();
    
    // Démarrer les gribouillages aléatoires après un délai
    setTimeout(() => {
        if (window.effectsManager) {
            window.effectsManager.createRandomScribbles();
        }
    }, 2000);
});
