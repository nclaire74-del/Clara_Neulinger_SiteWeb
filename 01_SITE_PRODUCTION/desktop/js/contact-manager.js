// Gestionnaire de l'encadrement de contact pour les logos sociaux
class ContactManager {
    constructor() {
        this.contactBox = null;
        this.init();
    }
    
    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
            });
        } else {
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        // Gestionnaire pour le logo contact
        const contactLogo = document.getElementById('contact-logo-trigger');
        if (contactLogo) {
            contactLogo.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleContactBox();
            });
        }
        
        // Bouton de fermeture
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('contact-close-btn')) {
                this.hideContactBox();
            }
        });
        
        // Fermer en cliquant ailleurs
        document.addEventListener('click', (e) => {
            const contactBox = document.getElementById('contact-info-box');
            const contactLogo = document.getElementById('contact-logo-trigger');
            
            if (contactBox && contactBox.style.display === 'block') {
                if (!contactBox.contains(e.target) && !contactLogo.contains(e.target)) {
                    this.hideContactBox();
                }
            }
        });
        
        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideContactBox();
            }
        });
    }
    
    toggleContactBox() {
        const contactBox = document.getElementById('contact-info-box');
        if (!contactBox) return;
        
        if (contactBox.style.display === 'none' || !contactBox.style.display) {
            this.showContactBox();
        } else {
            this.hideContactBox();
        }
    }
    
    showContactBox() {
        const contactBox = document.getElementById('contact-info-box');
        if (contactBox) {
            contactBox.style.display = 'block';
            // Réinitialiser l'animation
            contactBox.style.animation = 'none';
            setTimeout(() => {
                contactBox.style.animation = 'contactBoxAppear 0.3s ease-out';
            }, 10);
            
            console.log('📞 Encadrement de contact affiché');
        }
    }
    
    hideContactBox() {
        const contactBox = document.getElementById('contact-info-box');
        if (contactBox) {
            contactBox.style.display = 'none';
            console.log('📞 Encadrement de contact masqué');
        }
    }
}

// Initialiser le gestionnaire de contact
document.addEventListener('DOMContentLoaded', () => {
    window.contactManager = new ContactManager();
    console.log('✅ Gestionnaire de contact initialisé');
});