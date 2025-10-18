class PortfolioManager {
    constructor() {
        this.projects = [];
        this.categories = ['Tous', '3D', 'Animation', 'Design'];
        this.currentProject = 0;
        this.currentCategory = 0;
        
        // Configuration des projets avec template Marmoset
        this.projectFolders = [
            { 
                folder: 'Cirucs', 
                title: 'Projet Circus',
                description: 'Modélisation 3D d\'un environnement et personnage de cirque. Projet réalisé en cours de 3D, comprenant sculpting, retopologie, UV mapping et rendu.',
                tags: ['Maya', 'ZBrush', 'Substance Painter', 'Marmoset'],
                category: '3D',
                viewerFiles: {
                    environment: 'Circus_Viewer.html',
                    character: 'Chara_Circus_Viewer.html'
                }
            },
            { 
                folder: 'Arch', 
                title: 'Architecture',
                description: 'Projet architectural avec modélisation d\'intérieurs et d\'environnements détaillés.',
                tags: ['Maya', 'Substance Painter', 'Marmoset'],
                category: '3D',
                viewerFiles: {
                    environment: 'Arch_Viewer.html'
                }
            },
            { 
                folder: 'Gun', 
                title: 'Arme Sci-Fi',
                description: 'Modélisation d\'une arme futuriste avec texturing PBR complet.',
                tags: ['Maya', 'Substance Painter', 'Marmoset'],
                category: '3D',
                viewerFiles: {
                    environment: 'Gun_Viewer.html'
                }
            },
            { 
                folder: 'Room', 
                title: 'Environnement',
                description: 'Création d\'un environnement 3D immersif avec éclairage dynamique.',
                tags: ['Maya', 'Substance Painter', 'Marmoset'],
                category: '3D',
                viewerFiles: {
                    environment: 'Room_Viewer.html'
                }
            },
            { 
                folder: 'Telephone', 
                title: 'Téléphone Vintage',
                description: 'Modélisation d\'un téléphone rétro avec matériaux réalistes.',
                tags: ['Maya', 'Substance Painter', 'Marmoset'],
                category: '3D',
                viewerFiles: {
                    environment: 'Phone_Viewer.html'
                }
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
                folder: folderConfig.folder,
                viewerFiles: folderConfig.viewerFiles,
                mainImage: `assets/images/${folderConfig.folder}/preview.jpg`
            };

            this.projects.push(project);
            console.log(`[OK] Projet ${project.title} configuré avec template Marmoset`);
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
        this.updatePageCounter(); // Ajout de la mise à jour du compteur
        console.log(`[PROJECT] Projet précédent: ${this.projects[this.currentProject].title}`);
    }

    nextProject() {
        this.currentProject = (this.currentProject + 1) % this.projects.length;
        this.updateProjectDisplay();
        this.updatePageCounter(); // Ajout de la mise à jour du compteur
        console.log(`[PROJECT] Projet suivant: ${this.projects[this.currentProject].title}`);
    }

    // Nouvelle méthode pour mettre à jour le compteur de pages
    updatePageCounter() {
        const currentItemElement = document.getElementById('current-item');
        const totalItemsElement = document.getElementById('total-items');
        
        if (currentItemElement && totalItemsElement) {
            currentItemElement.textContent = this.currentProject + 1;
            totalItemsElement.textContent = this.projects.length;
            console.log(`[COUNTER] Page ${this.currentProject + 1}/${this.projects.length}`);
        }
    }

    updateDisplay() {
        this.updateCategoryDisplay();
        this.updateProjectDisplay();
        this.updatePageCounter(); // Initialiser le compteur de pages
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
            // Affichage uniforme pour tous les projets (1000x600px)
            if (this.currentProject === 0 && project.title === 'Projet Circus') {
                // Projet Circus avec vidéo
                projectShowcase.innerHTML = `
                <div class="project-item active uniform-project" data-project="${project.id}">
                    <div class="project-container">
                        <div class="project-media-wrapper" ondblclick="portfolioManager.openProjectDetails(${project.id})">
                            <video class="project-media" autoplay muted loop>
                                <source src="assets/videos/Neulinger_Clara_3B3D_Circus_Render_Video.mp4" type="video/mp4">
                                Votre navigateur ne supporte pas la lecture de vidéos.
                            </video>
                            <div class="project-overlay">
                                <div class="project-overlay-text">
                                    <span>� Double-cliquez pour explorer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="project-info-container">
                        <h3>${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="project-hint">
                            <small>💡 Double-cliquez pour accéder au viewer 3D interactif</small>
                        </div>
                    </div>
                </div>
                `;
            } else {
                // Autres projets avec image preview
                projectShowcase.innerHTML = `
                <div class="project-item active uniform-project" data-project="${project.id}">
                    <div class="project-container">
                        <div class="project-media-wrapper" ondblclick="portfolioManager.openProjectDetails(${project.id})">
                            <img class="project-media" src="assets/images/${project.folder}/preview.jpg" 
                                 alt="${project.title}" 
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                            <div class="placeholder-fallback" style="display:none">
                                <p>Projet ${project.title}</p>
                                <span>Preview en cours...</span>
                            </div>
                            <div class="project-overlay">
                                <div class="project-overlay-text">
                                    <span>🎯 Double-cliquez pour explorer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="project-info-container">
                        <h3>${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="project-hint">
                            <small>💡 Double-cliquez pour accéder à la galerie et aux viewers 3D</small>
                        </div>
                    </div>
                </div>
                `;
            }
        }
    }

    openProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        console.log(`[OPEN] Ouverture de la page du projet: ${project.title}`);
        
        // Utiliser le template Marmoset pour tous les projets
        this.showMarmosetViewerTemplate(project);
    }

    // Template Marmoset générique pour tous les projets
    showMarmosetViewerTemplate(project) {
        console.log(`[MARMOSET] Affichage du template pour: ${project.title}`);
        
        // Créer une modal avec galerie, viewer et infos
        const modal = document.createElement('div');
        modal.className = 'marmoset-viewer-modal';
        modal.innerHTML = `
            <div class="marmoset-modal-content">
                <div class="marmoset-page-title">
                    <h1>Projet : ${project.title.replace('Projet ', '')}</h1>
                </div>
                <div class="marmoset-header">
                    <button class="back-to-collectibles game-button" onclick="this.closest('.marmoset-viewer-modal').remove(); portfolioManager.showPortfolioCollectibles()">
                        <span class="button-text">← Retour Collectibles</span>
                        <span class="button-subtitle">Portfolio principal</span>
                    </button>
                </div>
                <div class="marmoset-main-container">
                    <div class="marmoset-gallery-panel">
                        <h3>Galerie</h3>
                        <p class="gallery-instructions">Cliquez sur une image pour l'agrandir • Utilisez les flèches pour naviguer</p>
                        <div class="gallery-scroll-container" id="${project.folder.toLowerCase()}-gallery">
                            <!-- Images seront ajoutées ici -->
                        </div>
                    </div>
                    <div class="marmoset-viewer-container">
                        <h3 class="viewer-title">Viewer 3D - ${project.title}</h3>
                        <div class="viewer-wrapper">
                            <iframe id="marmoset-viewer-inline" 
                                    src="assets/images/${project.folder}/${project.viewerFiles?.environment || 'placeholder.html'}" 
                                    width="100%" 
                                    height="100%" 
                                    frameborder="0"
                                    allowfullscreen>
                                <p>Chargement du viewer Marmoset...</p>
                            </iframe>
                        </div>
                    </div>
                    
                    <!-- Panneau d'informations -->
                    <div class="marmoset-info-panel">
                        <h3 class="info-title">Logiciels utilisés</h3>
                        <div class="info-content">
                            <div class="logos-container">
                                <div class="logo-wrapper">
                                    <img src="assets/images/Logos/Maya.png" alt="Maya" class="logo-item" title="Autodesk Maya">
                                </div>
                                <div class="logo-wrapper">
                                    <img src="assets/images/Logos/zbrush.png" alt="ZBrush" class="logo-item" title="ZBrush">
                                </div>
                                <div class="logo-wrapper">
                                    <img src="assets/images/Logos/Marmoset.png" alt="Marmoset" class="logo-item" title="Marmoset Toolbag">
                                </div>
                                <div class="logo-wrapper">
                                    <img src="assets/images/Logos/Unreal.png" alt="Unreal Engine" class="logo-item" title="Unreal Engine">
                                </div>
                                <div class="logo-wrapper">
                                    <img src="assets/images/Logos/Painter.png" alt="Substance Painter" class="logo-item" title="Substance Painter">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    ${project.viewerFiles?.character ? `
                    <!-- Deuxième viewer 3D pour le personnage (si existe) -->
                    <div class="marmoset-chara-viewer-container">
                        <h3 class="viewer-title">Viewer 3D - Personnage</h3>
                        <div class="viewer-wrapper">
                            <iframe id="marmoset-chara-viewer-inline" 
                                    src="assets/images/${project.folder}/${project.viewerFiles.character}" 
                                    width="100%" 
                                    height="100%" 
                                    frameborder="0"
                                    allowfullscreen>
                                <p>Chargement du viewer Marmoset personnage...</p>
                            </iframe>
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Charger les images de la galerie pour ce projet
        this.loadProjectGallery(project);
        
        // Réinitialiser l'effet parallaxe pour le nouveau bouton
        if (window.buttonParallaxManager) {
            setTimeout(() => {
                window.buttonParallaxManager.setup();
            }, 100);
        }
        
        console.log(`[MARMOSET] Template chargé pour ${project.title}`);
    }

    // Méthode pour charger les images de galerie d'un projet
    loadProjectGallery(project) {
        const galleryContainer = document.getElementById(`${project.folder.toLowerCase()}-gallery`);
        if (!galleryContainer) return;

        console.log(`[GALLERY] Chargement de la galerie pour ${project.title}`);
        
        // Images réelles pour chaque projet
        const projectImages = {
            'cirucs': [
                'Neulinger_Clara_3B3D_Circus_Chara_Renders_1.jpg',
                'Neulinger_Clara_3B3D_Circus_Chara_Renders_2.jpg',
                'Neulinger_Clara_3B3D_Circus_Enviro_Renders_1.jpg',
                'Neulinger_Clara_3B3D_Circus_Enviro_Renders_2.jpg',
                'Neulinger_Clara_3B3D_Circus_Chara_Sculpt_1.jpg',
                'Neulinger_Clara_3B3D_Circus_Chara_Sculpt_2.jpg',
                'Neulinger_Clara_3B3D_Circus_Chara_Topology_1.jpg',
                'Neulinger_Clara_3B3D_Circus_Chara_Topology_2.jpg',
                'Neulinger_Clara_3B3D_Circus_Chara_Uv_1.jpg',
                'Neulinger_Clara_3B3D_Circus_Chara_Uv_2.jpg',
                'Neulinger_Clara_3B3D_Circus_Enviro_Sculpt_1.jpg',
                'Neulinger_Clara_3B3D_Circus_Enviro_Topology_1.jpg',
                'Neulinger_Clara_3B3D_Circus_Enviro_Topology_2.jpg',
                'Neulinger_Clara_3B3D_Circus_Enviro_Uv_1.jpg',
                'Neulinger_Clara_3B3D_Circus_Enviro_Uv_2.jpg',
                'Neulinger_Clara_3B3D_Circus_Enviro_Uv_3.jpg',
                'Neulinger_Clara_3B3D_Circus_References.jpg',
                'Neulinger_Clara_3B3D_Circus_References_2.jpg'
            ],
            'arch': [
                'Neulinger_Clara_3B3D_Archway_Renders.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Topology_1.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Topology_2.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Topology_3.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Uv_1.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Uv_2.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Uv_3.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Uv_4.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Uv_5.jpg',
                'Neulinger_Clara_3B3D_pORTFOLIO.jpg'
            ],
            'gun': [
                '1.png',
                '2.png',
                '3.png',
                '4.png',
                '5.png',
                '6.png',
                'totale.jpg',
                'Neulinger_Clara_3B3D_pORTFOLIO2.jpg'
            ],
            'room': [
                'Neulinger_Clara_Room_Render.png',
                'Neulinger_Clara_Room_Renders_1.jpg',
                'Neulinger_Clara_Room_Renders_2.jpg',
                'Neulinger_Clara_Room_Renders_3.jpg'
            ],
            'telephone': [
                'NEULINGER_CLARA_2B3DART_TELEPHONE_1.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_2.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_3.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_4.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_5.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_6.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_7.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_8.jpg',
                '1.png',
                '2.png',
                '3.png',
                '4.png',
                '5.png',
                'Neulinger_Clara_3B3D_pORTFOLIO3.jpg'
            ]
        };

        const images = projectImages[project.folder.toLowerCase()] || [];
        
        if (images.length === 0) {
            galleryContainer.innerHTML = '<p class="no-images">Images en cours de préparation...</p>';
            return;
        }

        // Créer les éléments d'image
        const imageElements = images.map((imageName, index) => {
            const imagePath = `assets/images/${project.folder}/${imageName}`;
            return `
                <div class="gallery-item" onclick="this.classList.toggle('enlarged')">
                    <img src="${imagePath}" alt="${project.title} - Image ${index + 1}" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block'"
                         title="Cliquez pour agrandir">
                    <div class="image-placeholder" style="display:none">
                        <p>Image ${index + 1}<br>En cours de chargement</p>
                    </div>
                    <div class="image-info">
                        <span class="image-name">${imageName}</span>
                    </div>
                </div>
            `;
        }).join('');

        galleryContainer.innerHTML = imageElements;
        console.log(`[GALLERY] ${images.length} images ajoutées pour ${project.title}`);
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
        
        // Créer une modal avec galerie, viewer et infos
        const modal = document.createElement('div');
        modal.className = 'marmoset-viewer-modal';
        modal.innerHTML = `
            <div class="marmoset-modal-content">
                <div class="marmoset-page-title">
                    <h1>Projet : Circus</h1>
                </div>
                <div class="marmoset-header">
                    <button class="back-to-collectibles game-button" onclick="this.closest('.marmoset-viewer-modal').remove(); portfolioManager.showPortfolioCollectibles()">
                        <span class="button-text">← Retour Collectibles</span>
                        <span class="button-subtitle">Portfolio principal</span>
                    </button>
                </div>
                <div class="marmoset-main-container">
                    <div class="marmoset-gallery-panel">
                        <h3>Galerie</h3>
                        <p class="gallery-instructions">Cliquez sur une image pour l'agrandir • Utilisez les flèches pour naviguer</p>
                        <div class="gallery-scroll-container" id="circus-gallery">
                            <!-- Images seront ajoutées ici -->
                        </div>
                    </div>
                    <div class="marmoset-viewer-container">
                        <h3 class="viewer-title">Viewer 3D - Environnement</h3>
                        <div class="viewer-wrapper">
                            <iframe id="marmoset-viewer-inline" 
                                    src="assets/images/Cirucs/Circus_Viewer.html" 
                                    width="100%" 
                                    height="100%" 
                                    frameborder="0"
                                    allowfullscreen>
                                <p>Chargement du viewer Marmoset...</p>
                            </iframe>
                        </div>
                    </div>
                    
                    <!-- Panneau d'informations -->
                    <div class="marmoset-info-panel">
                        <h3 class="info-title">Logiciels utilisés</h3>
                        <div class="info-content">
                            <div class="logos-container">
                                <div class="logo-wrapper">
                                    <img src="assets/images/Logos/Maya.png" alt="Maya" class="logo-item" title="Autodesk Maya">
                                </div>
                                <div class="logo-wrapper">
                                    <img src="assets/images/Logos/zbrush.png" alt="ZBrush" class="logo-item" title="ZBrush">
                                </div>
                                <div class="logo-wrapper">
                                    <img src="assets/images/Logos/Marmoset.png" alt="Marmoset" class="logo-item" title="Marmoset Toolbag">
                                </div>
                                <div class="logo-wrapper">
                                    <img src="assets/images/Logos/Unreal.png" alt="Unreal Engine" class="logo-item" title="Unreal Engine">
                                </div>
                                <div class="logo-wrapper">
                                    <img src="assets/images/Logos/Painter.png" alt="Substance Painter" class="logo-item" title="Substance Painter">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Deuxième viewer 3D pour le personnage -->
                    <div class="marmoset-chara-viewer-container">
                        <h3 class="viewer-title">Viewer 3D - Personnage</h3>
                        <div class="viewer-wrapper">
                            <iframe id="marmoset-chara-viewer-inline" 
                                    src="assets/images/Cirucs/Chara_Circus_Viewer.html" 
                                    width="100%" 
                                    height="100%" 
                                    frameborder="0"
                                    allowfullscreen>
                                <p>Chargement du viewer Marmoset personnage...</p>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Charger les images de la galerie
        this.loadCircusGallery();
        
        // Réinitialiser l'effet parallaxe pour le nouveau bouton
        if (window.buttonParallaxManager) {
            setTimeout(() => {
                window.buttonParallaxManager.setup();
            }, 100);
        }
        
        console.log('[MARMOSET] Viewer chargé depuis Circus_Viewer.html');
    }

    // Charger les images du dossier Circus
    loadCircusGallery() {
        const galleryContainer = document.getElementById('circus-gallery');
        if (!galleryContainer) return;

        // Liste des images Circus - stocker comme propriété de classe - ORDRE SPÉCIFIQUE
        this.circusImages = [
            'Neulinger_Clara_3B3D_Circus_References.jpg',
            'Neulinger_Clara_3B3D_Circus_References_2.jpg',
            'Neulinger_Clara_3B3D_Circus_Enviro_Renders_2.jpg',
            'Neulinger_Clara_3B3D_Circus_Enviro_Renders_1.jpg',
            'Neulinger_Clara_3B3D_Circus_Chara_Renders_1.jpg',
            'Neulinger_Clara_3B3D_Circus_Chara_Renders_2.jpg',
            'Neulinger_Clara_3B3D_Circus_Chara_Sculpt_1.jpg',
            'Neulinger_Clara_3B3D_Circus_Chara_Sculpt_2.jpg',
            'Neulinger_Clara_3B3D_Circus_Enviro_Sculpt_1.jpg',
            'Neulinger_Clara_3B3D_Circus_Enviro_Topology_1.jpg',
            'Neulinger_Clara_3B3D_Circus_Enviro_Topology_2.jpg',
            'Neulinger_Clara_3B3D_Circus_Chara_Topology_1.jpg',
            'Neulinger_Clara_3B3D_Circus_Chara_Topology_2.jpg',
            'Neulinger_Clara_3B3D_Circus_Chara_Uv_1.jpg',
            'Neulinger_Clara_3B3D_Circus_Chara_Uv_2.jpg',
            'Neulinger_Clara_3B3D_Circus_Enviro_Uv_3.jpg',
            'Neulinger_Clara_3B3D_Circus_Enviro_Uv_2.jpg',
            'Neulinger_Clara_3B3D_Circus_Enviro_Uv_1.jpg'
        ];

        galleryContainer.innerHTML = this.circusImages.map(imageName => `
            <div class="gallery-item" onclick="portfolioManager.openImageLightbox('assets/images/Cirucs/${imageName}')">
                <img src="assets/images/Cirucs/${imageName}" alt="${imageName}" loading="lazy">
            </div>
        `).join('');
    }

    // Ouvrir une image en lightbox avec navigation
    openImageLightbox(imageSrc) {
        // Trouver l'index de l'image actuelle
        const imageName = imageSrc.split('/').pop();
        const currentIndex = this.circusImages.findIndex(img => img === imageName);
        
        this.currentLightboxIndex = currentIndex;
        this.createLightbox(imageSrc);
    }

    // Créer la lightbox avec navigation
    createLightbox(imageSrc) {
        // Supprimer toute lightbox existante
        const existingLightbox = document.querySelector('.image-lightbox');
        if (existingLightbox) {
            existingLightbox.remove();
        }

        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" onclick="portfolioManager.closeLightbox()">×</button>
                <button class="lightbox-prev" onclick="portfolioManager.previousImage()">‹</button>
                <button class="lightbox-next" onclick="portfolioManager.nextImage()">›</button>
                <img src="${imageSrc}" alt="Image agrandie" id="lightbox-image">
                <div class="lightbox-counter">${this.currentLightboxIndex + 1} / ${this.circusImages.length}</div>
            </div>
        `;
        
        // Fermer en cliquant sur le fond
        lightbox.onclick = (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        };

        // Navigation au clavier
        document.addEventListener('keydown', this.handleKeyNavigation.bind(this));
        
        document.body.appendChild(lightbox);
    }

    // Navigation au clavier
    handleKeyNavigation(e) {
        if (!document.querySelector('.image-lightbox')) return;
        
        switch(e.key) {
            case 'Escape':
                this.closeLightbox();
                break;
            case 'ArrowLeft':
                this.previousImage();
                break;
            case 'ArrowRight':
                this.nextImage();
                break;
        }
    }

    // Image précédente
    previousImage() {
        if (this.currentLightboxIndex > 0) {
            this.currentLightboxIndex--;
        } else {
            this.currentLightboxIndex = this.circusImages.length - 1; // Boucle vers la fin
        }
        this.updateLightboxImage();
    }

    // Image suivante
    nextImage() {
        if (this.currentLightboxIndex < this.circusImages.length - 1) {
            this.currentLightboxIndex++;
        } else {
            this.currentLightboxIndex = 0; // Boucle vers le début
        }
        this.updateLightboxImage();
    }

    // Mettre à jour l'image de la lightbox avec animation fluide
    updateLightboxImage() {
        const img = document.getElementById('lightbox-image');
        const counter = document.querySelector('.lightbox-counter');
        
        if (img && counter) {
            // Animation de sortie
            img.style.opacity = '0';
            img.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                const newImageSrc = `assets/images/Cirucs/${this.circusImages[this.currentLightboxIndex]}`;
                img.src = newImageSrc;
                counter.textContent = `${this.currentLightboxIndex + 1} / ${this.circusImages.length}`;
                
                // Animation d'entrée
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, 150);
        }
    }

    // Fermer la lightbox
    closeLightbox() {
        const lightbox = document.querySelector('.image-lightbox');
        if (lightbox) {
            lightbox.remove();
        }
        // Supprimer l'écouteur d'événements du clavier
        document.removeEventListener('keydown', this.handleKeyNavigation.bind(this));
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

// Ajouter la fonction manquante showPortfolioCollectibles
PortfolioManager.prototype.showPortfolioCollectibles = function() {
    console.log('[PORTFOLIO] Retour aux collectibles');
    
    // Afficher le portfolio principal
    const portfolioWindow = document.getElementById('portfolio-window');
    if (portfolioWindow) {
        portfolioWindow.style.display = 'flex';
        portfolioWindow.style.visibility = 'visible';
        portfolioWindow.style.opacity = '1';
    }
    
    // Masquer le menu principal si visible
    const mainUI = document.getElementById('main-ui');
    if (mainUI) {
        mainUI.style.display = 'none';
    }
};


