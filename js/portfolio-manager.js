class PortfolioManager {
    constructor() {
        this.projects = [];
        this.categories = ['Tous', '3D', 'Animation', 'Design'];
        this.currentProject = 0;
        this.currentCategory = 0;
        
        // Configuration des dossiers de projets
        this.projectFolders = [
            { 
                folder: 'Cirucs', 
                title: 'Projet Circus 3D',
                description: 'ModÃ©lisation 3D d\'un environnement et personnage de cirque. Projet rÃ©alisÃ© en cours de 3D, comprenant sculpting, retopologie, UV mapping et rendu.',
                tags: ['Blender', 'ZBrush', 'Substance Painter'],
                category: '3D'
            },
            { 
                folder: 'Arch', 
                title: 'Architecture 3D',
                description: 'Projet architectural avec modÃ©lisation d\'intÃ©rieurs et extÃ©rieurs.',
                tags: ['3ds Max', 'Archicad', 'Corona'],
                category: '3D'
            }
        ];
        
        // Les projets seront initialisÃ©s aprÃ¨s le chargement du DOM
    }

    // Fonction pour initialiser les projets depuis les dossiers d'images
    async initProjectsFromFolders() {
        console.log('[PORTFOLIO] Initialisation des projets depuis les dossiers...');
        
        for (let i = 0; i < this.projectFolders.length; i++) {
            const folderConfig = this.projectFolders[i];
            const project = {
                id: i + 1,
                title: folderConfig.title,
                description: folderConfig.description,
                tags: folderConfig.tags,
                category: folderConfig.category,
                mainImage: `00_SITE_ACTIF/assets/images/${folderConfig.folder}/placeholder.jpg`,
                tbsceneFile: `00_SITE_ACTIF/assets/images/Cirucs/ok.mview`,
                gallery: []
            };

            // Pour Circus, on a les vrais noms de fichiers
            if (folderConfig.folder === "Cirucs") {
                project.mainImage = "00_SITE_ACTIF/assets/images/Cirucs/Neulinger_Clara_3B3D_Circus_Chara_Renders_1.jpg";
                project.gallery = [
                    "00_SITE_ACTIF/assets/images/Cirucs/Neulinger_Clara_3B3D_Circus_Chara_Renders_1.jpg",
                    "00_SITE_ACTIF/assets/images/Cirucs/Neulinger_Clara_3B3D_Circus_Chara_Renders_2.jpg",
                    "00_SITE_ACTIF/assets/images/Cirucs/Neulinger_Clara_3B3D_Circus_Chara_Sculpt_1.jpg",
                    "00_SITE_ACTIF/assets/images/Cirucs/Neulinger_Clara_3B3D_Circus_Chara_Sculpt_2.jpg",
                    "00_SITE_ACTIF/assets/images/Cirucs/Neulinger_Clara_3B3D_Circus_Enviro_Renders_1.jpg",
                    "00_SITE_ACTIF/assets/images/Cirucs/Neulinger_Clara_3B3D_Circus_Enviro_Renders_2.jpg",
                    "00_SITE_ACTIF/assets/images/Cirucs/Neulinger_Clara_3B3D_Circus_References.jpg"
                ];
                console.log('[OK] Galerie Cirucs configurÃ©e avec', project.gallery.length, 'images');
            }

            this.projects.push(project);
            console.log(`[OK] Projet ${project.title} ajoutÃ© depuis le dossier ${folderConfig.folder}`);
        }
    }

    init() {
        console.log('[PORTFOLIO] Initialisation...');
        try {
            this.setupEventListeners();
            this.updateDisplay();
            console.log('[OK] PortfolioManager initialisÃ© avec succÃ¨s');
        } catch (error) {
            console.error('[ERROR] Erreur lors de l\'initialisation du PortfolioManager:', error);
        }
    }

    setupEventListeners() {
        // Navigation des catÃ©gories
        const prevCategoryBtn = document.getElementById('prev-category');
        const nextCategoryBtn = document.getElementById('next-category');
        
        if (prevCategoryBtn) {
            prevCategoryBtn.addEventListener('click', () => this.previousCategory());
        }
        
        if (nextCategoryBtn) {
            nextCategoryBtn.addEventListener('click', () => this.nextCategory());
        }

        // Navigation des projets
        const prevProjectBtn = document.getElementById('prev-project');
        const nextProjectBtn = document.getElementById('next-project');
        
        if (prevProjectBtn) {
            prevProjectBtn.addEventListener('click', () => this.previousProject());
        }
        
        if (nextProjectBtn) {
            nextProjectBtn.addEventListener('click', () => this.nextProject());
        }

        // Bouton retour
        const backBtn = document.getElementById('back-to-home-portfolio');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.closePortfolio());
        }

        // Navigation clavier
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    previousCategory() {
        this.currentCategory = (this.currentCategory - 1 + this.categories.length) % this.categories.length;
        this.updateCategoryDisplay();
        console.log(`[CATEGORY] CatÃ©gorie prÃ©cÃ©dente: ${this.categories[this.currentCategory]}`);
    }

    nextCategory() {
        this.currentCategory = (this.currentCategory + 1) % this.categories.length;
        this.updateCategoryDisplay();
        console.log(`[CATEGORY] CatÃ©gorie suivante: ${this.categories[this.currentCategory]}`);
    }

    previousProject() {
        this.currentProject = (this.currentProject - 1 + this.projects.length) % this.projects.length;
        this.updateProjectDisplay();
        console.log(`[PROJECT] Projet prÃ©cÃ©dent: ${this.projects[this.currentProject].title}`);
    }

    nextProject() {
        this.currentProject = (this.currentProject + 1) % this.projects.length;
        this.updateProjectDisplay();
        console.log(`[PROJECT] Projet suivant: ${this.projects[this.currentProject].title}`);
    }

    updateDisplay() {
        this.updateCategoryDisplay();
        this.updateProjectDisplay();
        this.createProjectDots();
    }

    updateCategoryDisplay() {
        const categoryElement = document.getElementById('current-category');
        if (categoryElement) {
            categoryElement.textContent = this.categories[this.currentCategory];
        }
    }

    updateProjectDisplay() {
        const project = this.projects[this.currentProject];
        if (!project) return;

        console.log(`[DISPLAY] Affichage du projet ${this.currentProject + 1}/${this.projects.length}: ${project.title}`);

        const projectShowcase = document.getElementById('project-showcase');
        if (projectShowcase) {
            projectShowcase.innerHTML = `
            <div class="project-item active" data-project="${project.id}">
                <div class="project-3d-viewer" ondblclick="portfolioManager.openProjectDetails(${project.id})">
                    <div class="project-viewer-content">
                        <div class="project-video-wrapper">
                            <video class="project-main-video" autoplay muted loop>
                                <source src="00_SITE_ACTIF/assets/videos/Neulinger_Clara_3B3D_Circus_Render_Video.mp4" type="video/mp4">
                                Votre navigateur ne supporte pas la lecture de vidÃ©os.
                            </video>
                            <div class="project-overlay">
                                <div class="project-overlay-text">
                                    <span>[3D] Projet 3D : ${project.title}</span>
                                    <p>Double-clic pour inspecter</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        }
    }

    openProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        console.log(`[OPEN] Ouverture de la page du projet: ${project.title}`);
        console.log('[DEBUG] Debug galerie:', project.gallery);
        console.log('[DEBUG] Nombre d\'images:', project.gallery ? project.gallery.length : 'undefined');

        // Pour le projet Circus, afficher le viewer Marmoset inline
        if (project.title === 'Projet Circus 3D') {
            this.showMarmosetViewerInline(project);
            return;
        }

        // CrÃ©er la modal des dÃ©tails avec animation de livre qui s'ouvre
        const modal = document.createElement('div');
        modal.className = 'project-details-modal page-opening';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${project.title}</h2>
                    <button class="close-modal" onclick="this.closest('.project-details-modal').remove()">Ã—</button>
                </div>
                <div class="modal-body">
                    <div class="project-3d-container">
                        <div id="tbscene-viewer-${project.id}" class="tbscene-viewer">
                            <p>Chargement du viewer 3D Marmoset...</p>
                        </div>
                    </div>
                    
                    <div class="project-info-section">
                        <div class="project-full-description">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            
                            <div class="project-specs">
                                <h4>[TECH] SpÃ©cifications</h4>
                                <div class="specs-grid">
                                    <div class="spec-item">
                                        <strong>[TOOLS] Logiciels:</strong> ${project.tags.join(', ')}
                                    </div>
                                    <div class="spec-item">
                                        <strong>[3D] Fichier 3D:</strong> ${project.tbsceneFile}
                                    </div>
                                    <div class="spec-item">
                                        <strong>[IMAGES] Images:</strong> ${project.gallery.length} assets
                                    </div>
                                    <div class="spec-item">
                                        <strong>[CATEGORY] CatÃ©gorie:</strong> ${project.category}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="project-gallery">
                            <h3>Portfolio d'images</h3>
                            <div class="gallery-grid">
                                ${project.gallery.map(img => `
                                    <img src="${img}" alt="${project.title}" class="gallery-image" 
                                         onclick="this.classList.toggle('fullscreen')">
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Forcer l'affichage au premier plan avec des styles inline
        modal.style.zIndex = '99999';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.display = 'flex';
        
        console.log('[MODAL] Modal ajoutÃ©e avec z-index 99999');
        
        // Animation d'ouverture de page
        setTimeout(() => {
            modal.classList.remove('page-opening');
            modal.classList.add('page-opened');
        }, 100);

        // Initialiser le viewer 3D si le fichier tbscene existe
        if (project.tbsceneFile) {
            this.initTbsceneViewer(project.id, project.tbsceneFile);
        }
    }

    initTbsceneViewer(projectId, tbsceneFile) {
        const viewerContainer = document.getElementById(`tbscene-viewer-${projectId}`);
        if (!viewerContainer) return;

        console.log(`[3D] Initialisation du viewer Marmoset pour: ${tbsceneFile}`);
        
        // CrÃ©er l'interface du viewer Marmoset
        viewerContainer.innerHTML = `
            <div class="marmoset-container">
                <div id="marmoset-${projectId}" class="marmoset-viewer">
                    <div id="loading-${projectId}" class="marmoset-loading">
                        <p>Chargement du modÃ¨le 3D...</p>
                    </div>
                </div>
            </div>
        `;

        // Charger le viewer Marmoset
        this.loadMarmosetViewer(projectId, tbsceneFile);
    }

    loadMarmosetViewer(projectId, mviewFile) {
        const marmosetContainer = document.getElementById(`marmoset-${projectId}`);
        const loadingOverlay = document.getElementById(`loading-${projectId}`);
        
        if (!marmosetContainer) {
            console.error(`[ERROR] Container marmoset-${projectId} introuvable`);
            return;
        }

        console.log(`[3D] Tentative de chargement du fichier: ${mviewFile}`);

        // VÃ©rifier si Marmoset Viewer est disponible
        if (typeof marmoset !== 'undefined' && marmoset.embed) {
            console.log('[OK] Marmoset Viewer dÃ©tectÃ©, chargement du fichier .mview...');
            
            try {
                // Nettoyer le container
                marmosetContainer.innerHTML = '';
                
                // CrÃ©er l'Ã©lÃ©ment viewer Marmoset
                const viewerElement = marmoset.embed({
                    src: mviewFile,
                    id: `viewer-${projectId}`,
                    width: '100%',
                    height: '100%',
                    autoStart: true,
                    fullFrame: true,
                    loop: true,
                    pagePreset: false
                });
                
                // Ajouter le viewer au container
                marmosetContainer.appendChild(viewerElement);
                
                console.log('[OK] Viewer Marmoset crÃ©Ã© et ajoutÃ© au DOM');
                
                // Masquer le loading aprÃ¨s un dÃ©lai
                setTimeout(() => {
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                    console.log('[OK] Loading overlay masquÃ©');
                }, 3000);
                
            } catch (error) {
                console.error('[ERROR] Erreur lors du chargement Marmoset:', error);
                this.showMarmosetPlaceholder(projectId, mviewFile);
            }
            
        } else {
            console.log('[WARNING] Marmoset Viewer non disponible, vÃ©rification dans 2 secondes...');
            
            // RÃ©essayer aprÃ¨s un dÃ©lai pour laisser le temps au script de se charger
            setTimeout(() => {
                if (typeof marmoset !== 'undefined' && marmoset.embed) {
                    this.loadMarmosetViewer(projectId, mviewFile);
                } else {
                    console.error('[ERROR] Marmoset Viewer toujours non disponible');
                    this.showMarmosetPlaceholder(projectId, mviewFile);
                }
            }, 2000);
        }
    }

    showMarmosetPlaceholder(projectId, mviewFile) {
        const viewerContainer = document.getElementById(`tbscene-viewer-${projectId}`);
        if (!viewerContainer) return;

        viewerContainer.innerHTML = `
            <div class="tbscene-placeholder">
                <div class="viewer-3d-icon">[3D]</div>
                <h3>Viewer 3D Marmoset</h3>
                <p><strong>Fichier:</strong> ${mviewFile}</p>
                <p>[TARGET] Le modÃ¨le 3D devrait apparaÃ®tre ici</p>
                <p>[CHECK] VÃ©rification du chargement en cours...</p>
                <div class="viewer-controls">
                    <button onclick="window.portfolioManager.loadMarmosetViewer(${projectId}, '${mviewFile}')">[RETRY] RÃ©essayer</button>
                </div>
                <div class="viewer-status">
                    <span>[LOADING] Chargement du viewer 3D...</span>
                </div>
                <div style="margin-top: 20px; padding: 15px; background: rgba(255, 200, 100, 0.2); border: 2px dashed #000; border-radius: 8px;">
                    <p style="margin: 0; font-size: 0.9rem; color: #666;">
                        [INFO] <strong>Fichier .mview dÃ©tectÃ©:</strong> ${mviewFile}
                    </p>
                </div>
            </div>
        `;
    }

    createProjectDots() {
        const dotsContainer = document.getElementById('project-dots');
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';
        
        this.projects.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'project-dot';
            if (index === this.currentProject) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                this.currentProject = index;
                this.updateProjectDisplay();
                this.createProjectDots();
            });
            
            dotsContainer.appendChild(dot);
        });
    }

    handleKeyboard(e) {
        switch(e.code) {
            case 'ArrowLeft':
                this.previousProject();
                e.preventDefault();
                break;
            case 'ArrowRight':
                this.nextProject();
                e.preventDefault();
                break;
            case 'ArrowUp':
                this.previousCategory();
                e.preventDefault();
                break;
            case 'ArrowDown':
                this.nextCategory();
                e.preventDefault();
                break;
            case 'Escape':
                this.closePortfolio();
                e.preventDefault();
                break;
        }
    }

    closePortfolio() {
        const portfolioWindow = document.getElementById('portfolio-window');
        const mainUI = document.getElementById('main-ui');
        
        if (portfolioWindow) {
            portfolioWindow.style.display = 'none';
        }
        
        if (mainUI) {
            mainUI.style.display = 'block';
        }
        
        console.log('[PORTFOLIO] Retour Ã  l\'interface principale');
    }

    closeModal() {
        const modal = document.querySelector('.project-details-modal');
        if (modal) {
            modal.remove();
        }
    }

    // MÃ©thode pour ajouter facilement de nouveaux projets
    addProject(projectData) {
        const newProject = {
            id: this.projects.length + 1,
            title: projectData.title || 'Nouveau Projet',
            description: projectData.description || 'Description du projet...',
            tags: projectData.tags || ['Tag1', 'Tag2'],
            category: projectData.category || '3D',
            mainImage: projectData.mainImage || '00_SITE_ACTIF/assets/images/placeholder.jpg',
            gallery: projectData.gallery || []
        };
        
        this.projects.push(newProject);
        this.updateDisplay();
        console.log(`[OK] Projet ajoutÃ©: ${project.title}`);
    }

    // MÃ©thode pour facilement modifier un projet
    updateProject(index, projectData) {
        if (index >= 0 && index < this.projects.length) {
            this.projects[index] = { ...this.projects[index], ...projectData };
            this.updateDisplay();
            console.log(`[EDIT] Projet modifiÃ©: ${this.projects[index].title}`);
        }
    }

    // Ouvrir directement la page dÃ©diÃ©e du projet Circus 3D
    loadCircusProjectPage() {
        console.log('[CIRCUS] Ouverture directe de la page Circus 3D...');
        
        // Rediriger vers la page circus-3d
        window.location.href = '00_SITE_ACTIF/projets/circus-3d/index.html';
    }

    // Fermer la modal du project preview
    closeModal() {
        const existingModal = document.querySelector('.project-modal');
        if (existingModal) {
            existingModal.remove();
            document.body.style.overflow = '';
        }
    }

    // Afficher le viewer Marmoset inline pour le projet Circus
    showMarmosetViewerInline(project) {
        console.log('[MARMOSET] Affichage du viewer Marmoset inline pour Circus');
        
        // Créer la modal avec le viewer Marmoset intégré
        const modal = document.createElement('div');
        modal.className = 'marmoset-viewer-modal';
        modal.innerHTML = `
            <div class="marmoset-modal-content">
                <div class="marmoset-header">
                    <h2>${project.title}</h2>
                    <button class="close-marmoset-viewer" onclick="this.closest('.marmoset-viewer-modal').remove()">×</button>
                </div>
                <div class="marmoset-viewer-container">
                    <div id="marmoset-viewer-inline" class="marmoset-viewer-inline">
                        <p>Chargement du viewer Marmoset...</p>
                    </div>
                </div>
                <div class="marmoset-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Charger le script Marmoset depuis CDN
        this.loadMarmosetScript().then(() => {
            // Charger le fichier .mview du projet Circus
            this.initializeMarmosetViewer();
        });
    }

    // Charger le script Marmoset depuis CDN
    loadMarmosetScript() {
        return new Promise((resolve, reject) => {
            // Vérifier si Marmoset est déjà chargé
            if (window.marmoset) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://viewer.marmoset.co/main/marmoset.js';
            script.onload = () => {
                console.log('[MARMOSET] Script chargé depuis CDN');
                resolve();
            };
            script.onerror = () => {
                console.error('[MARMOSET] Erreur de chargement du script');
                reject();
            };
            document.head.appendChild(script);
        });
    }

    // Initialiser le viewer Marmoset avec le fichier .mview
    initializeMarmosetViewer() {
        console.log('[MARMOSET] Initialisation du viewer...');
        
        const viewerContainer = document.getElementById('marmoset-viewer-inline');
        if (!viewerContainer) {
            console.error('[MARMOSET] Container non trouvé');
            return;
        }

        if (window.marmoset) {
            // URL du fichier .mview du projet Circus
            const mviewUrl = 'assets/images/Cirucs/ok.mview';
            
            viewerContainer.innerHTML = `
                <marmoset id="circus-mview" src="${mviewUrl}" width="800" height="600">
                    <p>Chargement du modèle 3D Circus...</p>
                </marmoset>
            `;

            // Initialiser Marmoset
            window.marmoset.embed();
            console.log('[MARMOSET] Viewer initialisé avec succès');
        } else {
            viewerContainer.innerHTML = '<p style="color: red;">Erreur: Script Marmoset non disponible</p>';
        }
    }
}

// Instance globale
window.portfolioManager = null;

// Instance crÃ©Ã©e automatiquement au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('[PORTFOLIO] DOM chargÃ©, crÃ©ation de l\'instance...');
    if (!window.portfolioManager) {
        window.portfolioManager = new PortfolioManager();
        // Initialiser les projets et l'affichage
        window.portfolioManager.initProjectsFromFolders().then(() => {
            window.portfolioManager.init();
            console.log('[PORTFOLIO] Initialisation complète');
        });
    }
});
