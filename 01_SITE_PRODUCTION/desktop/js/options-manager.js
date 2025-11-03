// Gestionnaire des Options - Desktop

// Variables globales pour les options
let currentVolume = 50;
let currentLanguage = 'fr';

// Fonction pour ouvrir le panel Options
function openOptionsPanel() {
    const optionsPanel = document.getElementById('options-panel');
    if (optionsPanel) {
        optionsPanel.style.display = 'flex';
        
        // Initialiser les valeurs
        const volumeSlider = document.getElementById('volume-slider');
        const volumeValue = document.getElementById('volume-value');
        
        if (volumeSlider) {
            volumeSlider.value = currentVolume;
            volumeSlider.addEventListener('input', function() {
                currentVolume = this.value;
                if (volumeValue) {
                    volumeValue.textContent = this.value + '%';
                }
                // Appliquer le volume si nécessaire
                applyVolumeSettings(this.value);
            });
        }
        
        if (volumeValue) {
            volumeValue.textContent = currentVolume + '%';
        }
        
        // Initialiser les boutons de langue
        updateLanguageButtons();
    }
}

// Fonction pour fermer le panel Options
function closeOptionsPanel() {
    const optionsPanel = document.getElementById('options-panel');
    if (optionsPanel) {
        optionsPanel.style.display = 'none';
    }
}

// Fonction pour changer la langue
function setLanguage(lang) {
    currentLanguage = lang;
    updateLanguageButtons();
    
    // Ici vous pouvez ajouter la logique pour changer la langue de l'interface
    console.log(`Langue changée vers: ${lang}`);
}

// Fonction pour mettre à jour les boutons de langue
function updateLanguageButtons() {
    const frBtn = document.getElementById('lang-fr');
    const enBtn = document.getElementById('lang-en');
    
    if (frBtn && enBtn) {
        frBtn.classList.toggle('active', currentLanguage === 'fr');
        enBtn.classList.toggle('active', currentLanguage === 'en');
    }
}

// Fonction pour appliquer les paramètres de volume
function applyVolumeSettings(volume) {
    // Appliquer le volume aux vidéos et sons si nécessaire
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video) {
            video.volume = volume / 100;
        }
    });
    
    // Sauvegarder dans localStorage
    localStorage.setItem('portfolio_volume', volume);
    
    console.log(`Volume appliqué: ${volume}%`);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les paramètres sauvegardés
    const savedVolume = localStorage.getItem('portfolio_volume');
    const savedLanguage = localStorage.getItem('portfolio_language');
    
    if (savedVolume) {
        currentVolume = parseInt(savedVolume);
    }
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    
    // Gestionnaire pour le bouton Options
    const optionsBtn = document.getElementById('options');
    if (optionsBtn) {
        optionsBtn.addEventListener('click', function() {
            openOptionsPanel();
        });
    }
    
    // Gestionnaire pour fermer en cliquant sur l'overlay
    const optionsPanel = document.getElementById('options-panel');
    if (optionsPanel) {
        optionsPanel.addEventListener('click', function(e) {
            if (e.target === optionsPanel) {
                closeOptionsPanel();
            }
        });
    }
    
    // Gestionnaire pour fermer avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const optionsPanel = document.getElementById('options-panel');
            const contactModal = document.getElementById('contact-modal');
            
            if (optionsPanel && optionsPanel.style.display === 'flex') {
                closeOptionsPanel();
            } else if (contactModal && contactModal.style.display === 'flex') {
                contactModal.style.display = 'none';
            }
        }
    });
    
    // Gestionnaire pour le bouton Contact - ouvre la page Contact au lieu de la modal
    const contactBtn = document.getElementById('contact');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // Masquer le menu principal
            const mainUI = document.getElementById('main-ui');
            if (mainUI) {
                mainUI.style.display = 'none';
            }
            
            // Ouvrir la page Contact avec les papiers
            const contactWindow = document.getElementById('contact-window');
            if (contactWindow) {
                contactWindow.classList.add('show');
                
                // Initialiser le dual paper manager si disponible
                setTimeout(() => {
                    if (window.dualPaperManager) {
                        window.dualPaperManager.init();
                    }
                }, 100);
            }
        });
    }
    
    // Gestionnaire pour fermer la modal Contact
    const contactModal = document.getElementById('contact-modal');
    const modalClose = document.querySelector('.modal-close');
    if (modalClose && contactModal) {
        modalClose.addEventListener('click', function() {
            contactModal.style.display = 'none';
        });
    }
    
    // Fermer la modal Contact en cliquant sur l'overlay
    if (contactModal) {
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                contactModal.style.display = 'none';
            }
        });
    }
    
    // Gestionnaire pour le logo Contact dans les réseaux sociaux
    const contactLogoTrigger = document.getElementById('contact-logo-trigger');
    if (contactLogoTrigger && contactModal) {
        contactLogoTrigger.addEventListener('click', function() {
            contactModal.style.display = 'flex';
        });
    }
});

console.log('✅ Options Manager chargé - Desktop version');