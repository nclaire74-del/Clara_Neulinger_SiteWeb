// ============================================
// CV DOWNLOAD MANAGER
// ============================================

/**
 * Télécharge les 2 CVs au format PDF (FR et EN)
 * Fonction globale disponible pour Desktop
 */
function downloadCV() {
    console.log('📄 Téléchargement des CVs...');
    
    // Les deux CVs à télécharger
    const cvs = [
        {
            path: '../../05_PROJETS_3D/Images_Portfolio/Cv/CV_Clara_Neulinger_FR.pdf',
            filename: 'CV_Clara_Neulinger_FR.pdf'
        },
        {
            path: '../../05_PROJETS_3D/Images_Portfolio/Cv/CV_Clara_Neulinger_EN.pdf',
            filename: 'CV_Clara_Neulinger_EN.pdf'
        }
    ];
    
    // Télécharger les deux CVs séquentiellement
    cvs.forEach((cv, index) => {
        setTimeout(() => {
            fetch(cv.path)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = cv.filename;
                    document.body.appendChild(a);
                    a.click();
                    
                    // Nettoyer
                    setTimeout(() => {
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(a);
                    }, 100);
                    
                    console.log('✅ CV téléchargé:', cv.filename);
                })
                .catch(error => {
                    console.error('❌ Erreur téléchargement CV:', error);
                    alert('Erreur lors du téléchargement du CV. Veuillez réessayer.');
                });
        }, index * 300); // Délai de 300ms entre chaque téléchargement
    });
}

// Exposer la fonction globalement
window.downloadCV = downloadCV;
