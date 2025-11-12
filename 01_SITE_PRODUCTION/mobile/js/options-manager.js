// ============================================
// OPTIONS MANAGER - MOBILE
// ============================================
// Gestion du volume et de la langue
// Version mobile simplifiée

console.log('✅ Options manager mobile chargé');

// Initialisation du panel d'options
function initOptionsPanel() {
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    
    // Charger le volume sauvegardé
    const savedVolume = localStorage.getItem('audioVolume') || '50';
    volumeSlider.value = savedVolume;
    volumeValue.textContent = savedVolume + '%';
    
    // Gérer le changement de volume
    volumeSlider.addEventListener('input', function() {
        const volume = this.value;
        volumeValue.textContent = volume + '%';
        localStorage.setItem('audioVolume', volume);
        
        // Appliquer le volume à toutes les vidéos/audios
        const videos = document.querySelectorAll('video, audio');
        videos.forEach(media => {
            media.volume = volume / 100;
        });
    });
    
    // Charger la langue sauvegardée OU détecter automatiquement
    const savedLang = localStorage.getItem('language') || localStorage.getItem('selectedLanguage');
    
    if (savedLang) {
        // Langue déjà sauvegardée, l'utiliser
        setLanguage(savedLang);
    } else {
        // Première visite : Détection automatique de la langue du navigateur
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Vérifier si c'est une langue française (fr, fr-FR, fr-CA, etc.)
        if (browserLang.toLowerCase().startsWith('fr')) {
            console.log(`🇫🇷 Langue du navigateur détectée : ${browserLang} → Français`);
            setLanguage('fr');
        } else {
            // Par défaut : ANGLAIS pour toutes les autres langues
            console.log(`🌍 Langue du navigateur détectée : ${browserLang} → Anglais (défaut international)`);
            setLanguage('en');
        }
    }
    
    // Ajouter les gestionnaires d'événements pour les boutons de langue
    document.getElementById('lang-fr').addEventListener('click', () => setLanguage('fr'));
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
}
