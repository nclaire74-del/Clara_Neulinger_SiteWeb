(function(){
    'use strict';

    function isMobile() {
        // Détection mobile simplifiée : userAgent + largeur viewport
        var ua = navigator.userAgent || navigator.vendor || window.opera;
        var mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        if (mobileUA.test(ua)) return true;
        // Viewport check fallback
        if (window.innerWidth && window.innerWidth <= 800) return true;
        return false;
    }

    function redirect() {
        try {
            var target = isMobile() ? '/Clara_Neulinger/01_SITE_PRODUCTION/mobile/' : '/Clara_Neulinger/01_SITE_PRODUCTION/desktop/';
            // Use replace to avoid polluting history
            window.location.replace(target);
        } catch (e) {
            console.error('Redirect error', e);
        }
    }

    // Expose for manual testing
    window.__isMobileRedirect = isMobile;
    window.__doRedirect = redirect;

    // Run after DOM ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(redirect, 300);
    } else {
        document.addEventListener('DOMContentLoaded', function(){ setTimeout(redirect, 300); });
    }
})();
