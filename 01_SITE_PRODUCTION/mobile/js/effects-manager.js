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
            
            <div class="legal-notice-section" style="margin-top: 30px; width: 90%; max-width: 600px; text-align: left; font-size: 0.8rem; color: rgba(255,255,255,0.7); max-height: 250px; overflow-y: auto; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                <h3 data-translate="legal_notice" style="font-size: 1rem; margin-bottom: 12px; color: rgba(255,255,255,0.9);">Mentions Légales</h3>
                
                <div style="margin-bottom: 12px;">
                    <h4 data-translate="legal_site_owner" style="font-size: 0.9rem; margin-bottom: 3px; color: rgba(255,255,255,0.85);">Propriétaire du site</h4>
                    <p style="margin: 0;">Clara Neulinger</p>
                </div>
                
                <div style="margin-bottom: 12px;">
                    <h4 data-translate="legal_hosting" style="font-size: 0.9rem; margin-bottom: 3px; color: rgba(255,255,255,0.85);">Hébergement</h4>
                    <p data-translate="legal_hosting_info" style="margin: 0;">Ce site est hébergé localement sur WAMP64 à des fins de démonstration.</p>
                </div>
                
                <div style="margin-bottom: 12px;">
                    <h4 data-translate="legal_intellectual_property" style="font-size: 0.9rem; margin-bottom: 3px; color: rgba(255,255,255,0.85);">Propriété intellectuelle</h4>
                    <p data-translate="legal_content_rights" style="margin: 0;">Tout le contenu de ce site, notamment les projets 3D, modèles, textures, images et créations visuelles, sont la propriété de Clara Neulinger. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est interdite.</p>
                </div>
                
                <div style="margin-bottom: 12px;">
                    <h4 data-translate="legal_personal_data" style="font-size: 0.9rem; margin-bottom: 3px; color: rgba(255,255,255,0.85);">Données personnelles</h4>
                    <p data-translate="legal_no_data_collection" style="margin: 0;">Ce site ne collecte aucune donnée personnelle. Seules les préférences techniques (langue et volume) sont stockées localement dans votre navigateur (localStorage) et ne sont jamais transmises.</p>
                </div>
                
                <div style="margin-bottom: 12px;">
                    <h4 data-translate="legal_cookies" style="font-size: 0.9rem; margin-bottom: 3px; color: rgba(255,255,255,0.85);">Cookies</h4>
                    <p data-translate="legal_no_cookies" style="margin: 0;">Ce site n'utilise pas de cookies. Aucun suivi ni analyse.</p>
                </div>
                
                <div>
                    <h4 data-translate="legal_contact_section" style="font-size: 0.9rem; margin-bottom: 3px; color: rgba(255,255,255,0.85);">Contact</h4>
                    <p data-translate="legal_contact_info" style="margin: 0;">Pour toute question concernant ce site ou l'utilisation des œuvres, veuillez me contacter via les réseaux sociaux disponibles sur la page Contact.</p>
                </div>
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
