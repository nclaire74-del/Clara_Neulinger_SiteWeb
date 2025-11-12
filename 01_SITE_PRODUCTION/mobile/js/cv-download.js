// ============================================
// CV DOWNLOAD MANAGER - MOBILE
// ============================================

/**
 * Télécharge le CV au format PDF
 * Fonction globale disponible pour Mobile
 */
function downloadCV(cvIndex = null) {
    console.log('📄 Téléchargement du CV (Mobile)...');
    
    // Si cvIndex est fourni (depuis le viewer), utiliser cet index
    // Sinon, déterminer selon la langue actuelle
    let currentLanguage;
    let cvPath;
    let cvFilename;
    
    if (cvIndex !== null) {
        // Depuis le CV viewer (0 = EN, 1 = FR)
        if (cvIndex === 0) {
            cvPath = '../../05_PROJETS_3D/Images_Portfolio/Cv/CV_Clara_Neulinger_EN.pdf';
            cvFilename = 'CV_Clara_Neulinger_EN.pdf';
        } else {
            cvPath = '../../05_PROJETS_3D/Images_Portfolio/Cv/CV_Clara_Neulinger_FR.pdf';
            cvFilename = 'CV_Clara_Neulinger_FR.pdf';
        }
    } else {
        // Depuis le lien de contact
        currentLanguage = localStorage.getItem('preferredLanguage') || 'fr';
        cvPath = currentLanguage === 'fr' 
            ? '../../05_PROJETS_3D/Images_Portfolio/Cv/CV_Clara_Neulinger_FR.pdf'
            : '../../05_PROJETS_3D/Images_Portfolio/Cv/CV_Clara_Neulinger_EN.pdf';
        
        cvFilename = currentLanguage === 'fr'
            ? 'CV_Clara_Neulinger_FR.pdf'
            : 'CV_Clara_Neulinger_EN.pdf';
    }
    
    // Créer un élément <a> temporaire pour le téléchargement
    fetch(cvPath)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = cvFilename;
            document.body.appendChild(a);
            a.click();
            
            // Nettoyer
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            console.log('✅ CV téléchargé:', cvFilename);
        })
        .catch(error => {
            console.error('❌ Erreur téléchargement CV:', error);
            alert('Erreur lors du téléchargement du CV. Veuillez réessayer.');
        });
}

// Exposer la fonction globalement
window.downloadCV = downloadCV;
