// Optimisations mobiles - Version simple
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile optimizations: Script chargé - mais écran de chargement préservé');
    
    // COMMENTÉ: L'écran de chargement est maintenant géré par loading-manager.js
    // const loadingScreen = document.getElementById('loading-screen');
    // if (loadingScreen) {
    //     loadingScreen.style.display = 'none';
    // }
    
    // COMMENTÉ: L'interface est maintenant gérée par loading-manager.js
    // const mainUI = document.getElementById('main-ui');
    // if (mainUI) {
    //     mainUI.style.display = 'block';
    // }
    
    // Optimiser les viewers 3D
    setTimeout(() => {
        const viewers = document.querySelectorAll('.marmoset-viewer-container, .viewer-container, iframe[src*="marmoset"]');
        viewers.forEach(viewer => {
            viewer.style.width = '95vw';
            viewer.style.height = '60vh';
            viewer.style.margin = '0 auto';
        });
    }, 100);
    
    // Précharger les images importantes
    const images = ['/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg', '/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/2.svg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
