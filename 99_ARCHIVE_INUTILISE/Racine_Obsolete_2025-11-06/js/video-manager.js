// Gestionnaire de la vidéo d'arrière-plan
class VideoManager {
    constructor() {
        this.video = document.getElementById('background-video');
        this.isPlaying = false;
        
        this.init();
    }
    
    init() {
        if (this.video) {
            // Configurer la vidéo
            this.video.muted = true;
            this.video.loop = true;
            
            // Événements vidéo
            this.video.addEventListener('loadeddata', () => {
                console.log('Vidéo chargée et prête');
            });
            
            this.video.addEventListener('error', (e) => {
                console.warn('Erreur de chargement vidéo:', e);
                // Fallback: fond noir si la vidéo ne charge pas
                document.body.style.backgroundColor = '#000';
            });
        }
    }
    
    startVideo() {
        if (this.video && !this.isPlaying) {
            this.video.play()
                .then(() => {
                    this.isPlaying = true;
                    console.log('Vidéo démarrée');
                })
                .catch((error) => {
                    console.warn('Impossible de démarrer la vidéo:', error);
                });
        }
    }
    
    pauseVideo() {
        if (this.video && this.isPlaying) {
            this.video.pause();
            this.isPlaying = false;
        }
    }
    
    toggleVideo() {
        if (this.isPlaying) {
            this.pauseVideo();
        } else {
            this.startVideo();
        }
    }
}

// Initialiser le gestionnaire vidéo
document.addEventListener('DOMContentLoaded', () => {
    window.videoManager = new VideoManager();
});
