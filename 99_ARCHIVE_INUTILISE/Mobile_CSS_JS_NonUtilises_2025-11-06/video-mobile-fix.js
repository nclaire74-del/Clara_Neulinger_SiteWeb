// Gestionnaire vidéo mobile optimisé
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('background-video');
    if (video) {
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('playsinline', 'true');
        video.muted = true;
        
        // Démarrer immédiatement
        video.play().catch(() => {
            console.log('Autoplay bloqué');
        });
        
        // Redémarrer si nécessaire
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
    }
});
