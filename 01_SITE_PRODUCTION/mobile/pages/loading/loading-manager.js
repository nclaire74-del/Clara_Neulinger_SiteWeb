class LoadingManager {
    constructor() {
        console.log('=== LOADING MANAGER INIT ===');
        this.currentProgress = 0;
        this.targetProgress = 0;
        this.loadingBar = document.getElementById('loading-bar');
        this.loadingPercentage = document.getElementById('loading-percentage');
        this.loadingMessage = document.getElementById('loading-message');
        this.loadingScreen = document.getElementById('loading-screen');
        this.mainUI = document.getElementById('main-ui');
        this.isPaused = false;
        this.loadingInterval = null;
        
        console.log('Éléments trouvés:', {
            loadingBar: !!this.loadingBar,
            loadingPercentage: !!this.loadingPercentage,
            loadingMessage: !!this.loadingMessage,
            loadingScreen: !!this.loadingScreen,
            mainUI: !!this.mainUI,
            CONFIG: !!window.CONFIG
        });
        
        // Forcer l'arrêt de toute animation sur le message
        if (this.loadingMessage) {
            this.loadingMessage.style.animation = 'none';
            this.loadingMessage.style.transition = 'none';
            this.loadingMessage.style.transform = 'none';
            this.loadingMessage.style.opacity = '1';
            console.log('Loading message: animations forcées à none');
        }
        
        if (this.loadingScreen) {
            console.log('Loading screen display:', window.getComputedStyle(this.loadingScreen).display);
            console.log('Loading screen visibility:', window.getComputedStyle(this.loadingScreen).visibility);
        }
        
        this.messages = CONFIG?.LOADING_MESSAGES || [
            "Compilation du shader...",
            "Création du monde...",
            "Construction de l'univers...",
            "Préparation de l'expérience...",
            "Pret pour l'exploration!"
        ];
        
        this.init();
    }
    
    init() {
        console.log('Loading Manager: Initialisation...');
        
        // S'assurer que l'écran de chargement est visible
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'flex';
            this.loadingScreen.style.opacity = '1';
            console.log('Loading screen forcé visible');
        }
        
        // S'assurer que l'interface principale est cachée
        if (this.mainUI) {
            this.mainUI.style.display = 'none';
            console.log('Main UI caché');
        }
        
        this.updateProgress(0);
        this.startLoading();
        this.bindKeyEvents();
    }
    
    bindKeyEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.loadingScreen && this.loadingScreen.style.display !== 'none') {
                e.preventDefault();
                this.togglePause();
            }
        });
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        console.log(`🎮 Loader ${this.isPaused ? 'mis en pause' : 'repris'} - Espace pour ${this.isPaused ? 'reprendre' : 'mettre en pause'}`);
        
        // Contrôler les animations de la barre de chargement
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            if (this.isPaused) {
                loadingScreen.classList.add('loading-paused');
            } else {
                loadingScreen.classList.remove('loading-paused');
            }
        }
        
        if (this.loadingMessage) {
            if (this.isPaused) {
                // Sauvegarder le message actuel avant la pause
                this.savedMessage = this.loadingMessage.textContent || this.loadingMessage.innerHTML;
                
                this.loadingMessage.innerHTML = '<span class="pause-icon">⏸</span> PAUSE <span class="pause-icon">⏸</span><br><span style="font-size: 14px; opacity: 0.8;">Appuyez sur [ESPACE] pour continuer</span>';
                this.loadingMessage.style.color = "#e8dcc0"; // Même couleur que le texte normal
                this.loadingMessage.style.fontSize = "18px"; // Plus petit
                this.loadingMessage.style.fontWeight = "300";
                this.loadingMessage.style.textShadow = "1px 1px 2px rgba(0,0,0,0.2)";
                this.loadingMessage.style.letterSpacing = "0.5px";
                this.loadingMessage.classList.add('pause-message');
            } else {
                // Restaurer immédiatement le message sauvegardé
                if (this.savedMessage) {
                    this.loadingMessage.innerHTML = this.savedMessage;
                }
                
                this.loadingMessage.style.color = "#e8dcc0";
                this.loadingMessage.style.fontSize = "16px"; // Taille normale
                this.loadingMessage.style.fontWeight = "300";
                this.loadingMessage.style.textShadow = "1px 1px 2px rgba(0,0,0,0.2)";
                this.loadingMessage.style.letterSpacing = "0.5px";
                this.loadingMessage.classList.remove('pause-message');
            }
        }
    }
    
    updateProgress(progress) {
        // Valider la progression
        progress = Math.max(0, Math.min(100, progress));
        this.targetProgress = progress;
        
        // Animation fluide de la progression
        const animate = () => {
            if (this.currentProgress < this.targetProgress) {
                this.currentProgress += 0.5;
                if (this.currentProgress > this.targetProgress) {
                    this.currentProgress = this.targetProgress;
                }
            }
            
            // Mettre à jour l'affichage
            if (this.loadingBar) {
                this.loadingBar.style.width = this.currentProgress + '%';
            }
            
            if (this.loadingPercentage) {
                this.loadingPercentage.textContent = Math.floor(this.currentProgress) + '%';
            }
            
            // Supprimer les trails à 98%
            if (this.currentProgress >= 98 && window.effectsManager && !window.effectsManager.trailsCleared) {
                console.log('🎯 98% atteint - Suppression des trails maintenant !');
                window.effectsManager.clearTrailsAt98Percent();
            }
            
            // Continuer l'animation si nécessaire
            if (this.currentProgress < this.targetProgress) {
                requestAnimationFrame(animate);
            } else if (this.currentProgress >= 100) {
                this.completeLoading();
            }
        };
        
        animate();
    }
    
    startLoading() {
        let progress = 0;
        let messageIndex = 0;
        let startDelay = true;
        
        // Rester à 0% pendant 1,4 secondes
        setTimeout(() => {
            startDelay = false;
        }, 1400);
        
        this.loadingInterval = setInterval(() => {
            if (this.isPaused) {
                return; // Ne pas progresser si en pause
            }
            
            if (startDelay) {
                // Rester à 0% pendant le délai initial
                this.updateProgress(0);
                return;
            }
            
            progress += Math.random() * 12 + 8; // Progression aléatoire entre 8 et 20
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(this.loadingInterval);
            }
            
            this.updateProgress(progress);
            
            // Changer le message selon la progression de manière stable
            if (!this.isPaused) {
                const newMessageIndex = Math.floor((progress / 100) * (this.messages.length - 1));
                if (newMessageIndex !== messageIndex && newMessageIndex < this.messages.length) {
                    messageIndex = newMessageIndex;
                    if (this.loadingMessage && this.messages[messageIndex]) {
                        // Changement direct sans transition pour éviter le clignotement
                        this.loadingMessage.textContent = this.messages[messageIndex];
                    }
                }
            }
        }, 1000); // Intervalle fixe et plus lent
    }
    
    completeLoading() {
        console.log('Loading Manager: Chargement terminé, démarrage transition...');
        setTimeout(() => {
            console.log('Loading Manager: Masquage écran de chargement...');
            if (this.loadingScreen) {
                this.loadingScreen.style.opacity = '0';
                this.loadingScreen.style.transition = 'opacity 0.5s ease-out';
                
                setTimeout(() => {
                    console.log('Loading Manager: Écran de chargement masqué, affichage interface...');
                    this.loadingScreen.style.display = 'none';
                    
                    // Afficher l'interface principale avec la vidéo
                    if (this.mainUI) {
                        this.mainUI.style.display = 'block';
                        this.mainUI.style.opacity = '0';
                        this.mainUI.style.transition = 'opacity 0.8s ease-in';
                        
                        setTimeout(() => {
                            this.mainUI.style.opacity = '1';
                        }, 50);
                    }
                    
                    // Démarrer la vidéo
                    if (window.videoManager) {
                        window.videoManager.startVideo();
                    }
                    
                    // Notifier que le chargement est terminé
                    if (window.effectsManager) {
                        window.effectsManager.onLoadingComplete();
                    }
                }, 500);
            }
        }, 1000);
    }
    
    // Méthode publique pour mettre à jour la progression manuellement
    setProgress(progress) {
        this.updateProgress(progress);
    }
}

// Initialiser le gestionnaire de chargement quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    window.loadingManager = new LoadingManager();
});
