// ============================================
// CV DOWNLOAD MANAGER
// ============================================

/**
 * Télécharge le CV au format PDF
 * Fonction globale disponible pour Desktop et Mobile
 */
function downloadCV() {
    console.log('📄 Téléchargement du CV...');
    
    // Déterminer la langue actuelle
    const currentLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    
    // Sélectionner le bon CV selon la langue
    const cvPath = currentLanguage === 'fr' 
        ? '../../05_PROJETS_3D/Images_Portfolio/Cv/CV_Clara_Neulinger_FR.pdf'
        : '../../05_PROJETS_3D/Images_Portfolio/Cv/CV_Clara_Neulinger_EN.pdf';
    
    const cvFilename = currentLanguage === 'fr'
        ? 'CV_Clara_Neulinger_FR.pdf'
        : 'CV_Clara_Neulinger_EN.pdf';
    
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
