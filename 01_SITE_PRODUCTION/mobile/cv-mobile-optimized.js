/**
 * Gestionnaire CV mobile optimisé
 */

class CVMobileManager {
    constructor() {
        this.currentLang = 'fr';
        this.init();
    }

    init() {
        this.bindLanguageButtons();
        this.preloadImages();
    }

    bindLanguageButtons() {
        const langButtons = document.querySelectorAll('.cv-lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        if (lang === this.currentLang) return;

        // Mettre à jour les boutons
        document.querySelectorAll('.cv-lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

        // Mettre à jour les CV
        document.querySelectorAll('.cv-image-wrapper').forEach(wrapper => {
            wrapper.classList.remove('active');
        });

        const targetCv = lang === 'fr' ? 'fr' : 'en';
        document.querySelector(`[data-cv="${targetCv}"]`).classList.add('active');

        this.currentLang = lang;
    }

    preloadImages() {
        // Précharger les images CV
        const images = [
            '/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/Cv_fr.svg',
            '/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/Cv/2.svg'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// Initialiser dès que le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    window.cvMobileManager = new CVMobileManager();
});