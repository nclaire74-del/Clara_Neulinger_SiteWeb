// ============================================
// EFFECTS MANAGER - MOBILE
// ============================================
// Gestion de l'effet TV Shutdown et Try Again screen
// Version mobile (identique à desktop mais sans audio)

console.log('✅ Effects manager mobile chargé');

// ============================================
// EXIT SITE
// ============================================

function exitSite() {
    playTvShutdownEffect();
}

// ============================================
// TV SHUTDOWN EFFECT
// ============================================

function playTvShutdownEffect() {
    const shutdownOverlay = document.createElement('div');
    shutdownOverlay.className = 'shutdown-overlay';
    document.body.appendChild(shutdownOverlay);

    const video = document.getElementById('background-video');
    const mainUI = document.getElementById('main-ui');
    const vignette = document.getElementById('video-vignette-overlay');

    if (video) video.classList.add('tv-shutdown');
    if (mainUI) mainUI.classList.add('tv-shutdown');
    if (vignette) vignette.classList.add('tv-shutdown');

    setTimeout(() => {
        showTryAgainScreen();
    }, 1200);
}

// ============================================
// TRY AGAIN SCREEN
// ============================================

function showTryAgainScreen() {
    const tryAgainOverlay = document.createElement('div');
    tryAgainOverlay.className = 'try-again-overlay';
    tryAgainOverlay.innerHTML = `
        <div class="try-again-content">
            <h1 class="try-again-title">Try Again</h1>
            <div class="try-again-buttons">
                <button class="game-button try-again-btn" onclick="restartExperience()">
                    <span class="button-text">Restart</span>
                </button>
                <button class="game-button back-btn" onclick="goBackToMenu()">
                    <span class="button-text">Back to Menu</span>
                </button>
            </div>
            
            <div class="legal-notice-section" style="position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 500px; text-align: left; font-size: 0.65rem; line-height: 1.3; color: rgba(255,255,255,0.5); max-height: 180px; overflow-y: auto; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 6px;">
                <h3 data-translate="legal_notice" style="font-size: 0.8rem; margin: 0 0 6px 0; color: rgba(255,255,255,0.7);">Mentions Légales</h3>
                <p style="margin: 0 0 4px 0;"><strong data-translate="legal_editor" style="color: rgba(255,255,255,0.65);">Éditeur :</strong> <span data-translate="legal_editor_info">Clara Neulinger</span></p>
                <p style="margin: 0 0 4px 0;"><strong data-translate="legal_hosting" style="color: rgba(255,255,255,0.65);">Hébergement :</strong> <span data-translate="legal_hosting_info">Ionos - claraneulinger.com</span></p>
                <p style="margin: 0 0 4px 0;"><strong data-translate="legal_intellectual_property" style="color: rgba(255,255,255,0.65);">Propriété :</strong> <span data-translate="legal_content_rights">Tout le contenu est la propriété de Clara Neulinger.</span></p>
                <p style="margin: 0 0 4px 0;"><strong data-translate="legal_personal_data" style="color: rgba(255,255,255,0.65);">Données :</strong> <span data-translate="legal_no_data_collection">Aucune donnée collectée.</span></p>
                <p style="margin: 0 0 4px 0;"><strong data-translate="legal_cookies" style="color: rgba(255,255,255,0.65);">Cookies :</strong> <span data-translate="legal_no_cookies">Aucun.</span></p>
                <p style="margin: 0;"><strong data-translate="legal_contact_section" style="color: rgba(255,255,255,0.65);">Contact :</strong> <span data-translate="legal_contact_info">Via réseaux sociaux.</span></p>
            </div>
        </div>
    `;
    document.body.appendChild(tryAgainOverlay);
    
    // Update translations after adding to DOM
    if (window.translationManager) {
        window.translationManager.updatePage();
    }

    setTimeout(() => {
        tryAgainOverlay.classList.add('show');
    }, 400);
}

// ============================================
// RESTART & BACK TO MENU
// ============================================

function restartExperience() {
    window.location.reload();
}

function goBackToMenu() {
    const overlays = document.querySelectorAll('.try-again-overlay, .shutdown-overlay');
    overlays.forEach(overlay => overlay.remove());

    const video = document.getElementById('background-video');
    const mainUI = document.getElementById('main-ui');
    const vignette = document.getElementById('video-vignette-overlay');

    if (video) video.classList.remove('tv-shutdown');
    if (mainUI) mainUI.classList.remove('tv-shutdown');
    if (vignette) vignette.classList.remove('tv-shutdown');
}
