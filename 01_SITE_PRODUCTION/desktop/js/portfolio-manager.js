// Fonction d'initialisation des projets
function initPortfolioProjectFolders() {
    return [
            { 
                folder: 'Cirucs', 
                title: 'Projet : Circus',
                description: 'Ce projet personnel combine création d\'environnement et de personnage. Basé sur un concept art de Yuri Gvozdenko, la scène raconte une histoire à travers atmosphère, éclairage et textures.',
                tags: ['Maya', 'ZBrush', 'Substance Painter', 'Marmoset', 'Unreal Engine'],
                category: '3D',
                viewerFiles: {
                    environment: 'Circus_Viewer.html',
                    character: 'Chara_Circus_Viewer.html'
                },
                mainMedia: {
                    type: 'video',
                    src: 'assets/images/Cirucs/Neulinger_Clara_3B3D_Circus_Render_Video.mp4'
                }
            },
            { 
                folder: 'Arch', 
                title: 'Projet : Archway',
                description: 'Un projet personnel dédié à la création d\'une arche inspirée du style celtique. Dans le cadre de ce projet, j\'ai décidé de réinterpréter une arche réalisée en 3D par Jonatan Österberg, tout en développant un environnement complet autour de cette structure.',
                tags: ['Maya', 'Unreal Engine', 'Substance Painter', 'ZBrush', 'Marmoset'],
                category: '3D',
                viewerFiles: {
                    environment: 'Arch_Viewer.html'
                },
                mainMedia: {
                    type: 'video',
                    src: 'assets/images/Arch/Neulinger_Clara_3B3D_Archway_Render_Video.mp4'
                }
            },
            { 
                folder: 'Gun', 
                title: 'Projet : Plasma Pistol',
                description: 'Pistolet à plasma selon la référence conceptuelle de Robert Simons | Concept Art World.',
                tags: ['Maya', 'Substance Painter'],
                category: '3D',
                viewerFiles: {
                    environment: 'Plasma_Pistol_Viewer.html'
                },
                mainMedia: {
                    type: 'image',
                    src: 'assets/images/Gun/NEULINGER_Clara_2B3DArt_Rendu_Texture.jpg'
                }
            },
            { 
                folder: 'Kitchen', 
                title: 'Projet : The Last Meal',
                description: 'PITCH : In a supernatural and post-apocalypse world, we find a simple carrot, orange and alive. Crawling on the kitchen plan she tries to survive by fleeing the killings of her family. (WIP - Work In Progress)',
                tags: ['Maya', 'Substance Painter', 'Unreal Engine'],
                category: '3D',
                viewerFiles: {
                    environment: 'Kitchen_Viewer.html'
                },
                mainMedia: {
                    type: 'image',
                    src: window.isLowPerformanceDevice && window.isLowPerformanceDevice() ? 
                         'assets/images/Kitchen/preview.jpg' : // Version légère mobile
                         'assets/images/Kitchen/NewLevelSequence1_0002_Ultra.png' // Image demandée desktop
                }
            },
            { 
                folder: 'Room', 
                title: 'Projet : Room',
                description: 'Creation d\'un environment stylé en 3D d\'après la référence de Thanh DO etc... (WIP - Work In Progress)',
                tags: ['Marvelous Designer', 'Maya', 'Marmoset', 'Substance Painter'],
                category: '3D',
                viewerFiles: {
                    environment: 'Room_Viewer.html'
                },
                mainMedia: {
                    type: 'image',
                    src: 'assets/images/Room/Untitled_Camera 1_FullQuality.jpg'
                }
            },
            { 
                folder: 'Telephone', 
                title: 'Projet : Telephone Booth',
                description: 'Réalisation de la texture à partir d\'un modèle 3D de cabine téléphonique créé avec Maya.',
                tags: ['Maya', 'Substance Painter'],
                category: '3D',
                viewerFiles: {
                    environment: 'Telephone_Viewer.html'
                },
                mainMedia: {
                    type: 'image',
                    src: 'assets/images/Telephone/NEULINGER_CLARA_2B3DART_TELEPHONE_5.jpg'
                }
            }
        ];
}

class PortfolioManager {
    constructor() {
        this.projects = [];
        this.categories = ['Tous', '3D', 'Animation', 'Design'];
        this.currentProject = 0;
        this.currentCategory = 0;
        this.projectFolders = initPortfolioProjectFolders();
        
        // Écouter les changements de langue
        document.addEventListener('languageChanged', (e) => {
            this.updateTranslations();
        });
    }
    
    // Fonction utilitaire pour obtenir une traduction
    t(key, params = {}) {
        if (window.translationManager) {
            return window.translationManager.t(key, params);
        }
        return key;
    }
    
    // Mettre à jour les traductions dynamiques
    updateTranslations() {
        // Mettre à jour les éléments générés dynamiquement
        const hintElements = document.querySelectorAll('.translate-hint');
        hintElements.forEach(element => {
            const mediaType = element.getAttribute('data-media-type');
            const mediaText = mediaType === 'video' ? this.t('video') : this.t('image');
            element.textContent = this.t('double_click_access_viewer', { media: mediaText });
        });
        
        // Mettre à jour les titres et descriptions de projets si ils sont traduits
        this.updateProjectTranslations();
    }
    
    // Mettre à jour les traductions des projets
    updateProjectTranslations() {
        // Cette fonction sera appelée pour mettre à jour les descriptions et titres si besoin
        // Peut être étendue pour des projets avec des traductions spécifiques
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
                mainMedia: folderConfig.mainMedia || {
                    type: 'image',
                    src: `assets/images/${folderConfig.folder}/preview.jpg?v=${Date.now()}`
                }
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
            // Générer le média principal selon le type configuré
            const mediaElement = this.generateMainMedia(project);
            
            // Affichage uniforme pour tous les projets
            projectShowcase.innerHTML = `
            <div class="project-item active uniform-project ${project.mainMedia.type === 'video' ? 'video-project' : 'image-project'}" data-project="${project.id}">
                <div class="project-container">
                    <div class="project-media-wrapper" 
                         ondblclick="portfolioManager.openProjectDetails(${project.id})"
                         onclick="portfolioManager.handleMobileClick(event, ${project.id})">
                        ${mediaElement}
                        <div class="project-overlay">
                            <div class="project-overlay-text">
                                <span class="desktop-instruction" data-translate="double_click_explore">Double-cliquez pour explorer</span>
                                <span class="mobile-instruction" data-translate="touch_explore">Touchez pour explorer</span>
                            </div>
                        </div>
                    </div>
                    <div class="project-info-side">
                        <h3>${project.title}</h3>
                        <div class="project-description-additional">
                            <p>${project.description}</p>
                        </div>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="project-hint">
                            <small class="translate-hint" data-media-type="${project.mainMedia.type}">Double-cliquez sur ${project.mainMedia.type === 'video' ? 'la vidéo' : 'l\'image'} pour accéder au viewer 3D interactif</small>
                        </div>
                    </div>
                </div>
            </div>
            `;
            
            // Repositionner le bouton après mise à jour du contenu
            setTimeout(() => {
                this.repositionReturnButton();
            }, 50);
        }
    }

    // Générer l'élément média principal selon la configuration
    generateMainMedia(project) {
        if (project.mainMedia.type === 'video') {
            return `
                <video class="project-media" autoplay muted loop playsinline controls="false" disablepictureinpicture controlslist="nodownload nofullscreen noremoteplayback">
                    <source src="${project.mainMedia.src}" type="video/mp4">
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
            `;
        } else {
            return `
                <img class="project-media" src="${project.mainMedia.src}" 
                     alt="${project.title}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="placeholder-fallback" style="display:none">
                    <p>Projet ${project.title}</p>
                    <span>Preview en cours...</span>
                </div>
            `;
        }
    }

    // Gestion des clics sur mobile/tablette
    handleMobileClick(event, projectId) {
        // Détection si c'est un appareil mobile/tablette
        const isMobile = window.innerWidth <= 1024 || ('ontouchstart' in window);
        
        if (isMobile) {
            // Sur mobile/tablette, un simple clic ouvre le projet
            event.preventDefault();
            this.openProjectDetails(projectId);
        }
        // Sur desktop, laisser le double-clic fonctionner normalement
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
                    <h1>Projet : ${project.title.replace('Projet : ', '')}</h1>
                    ${project.folder === 'Room' || project.folder === 'Kitchen' ? `
                    <div class="wip-badge">
                        <span class="wip-text">Work In Progress</span>
                    </div>
                    ` : ''}
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
                    
                    ${project.folder !== 'Telephone' && project.folder !== 'Kitchen' ? `
                    <div class="marmoset-viewer-container">
                        <h3 class="viewer-title">${project.folder === 'Arch' ? 'Video - ' + project.title : 'Viewer 3D - ' + project.title}</h3>
                        <div class="viewer-wrapper">
                            ${project.folder === 'Arch' ? 
                                `<video controls autoplay muted loop style="width: 100%; height: 100%; border-radius: 8px;">
                                    <source src="assets/images/Arch/Neulinger_Clara_3B3D_Archway_Render_Video.mp4" type="video/mp4">
                                    Votre navigateur ne supporte pas la lecture de vidéos.
                                </video>` :
                                `<iframe id="marmoset-viewer-inline" 
                                        src="../../05_PROJETS_3D/projets_portfolio/${project.folder}/${project.viewerFiles?.environment || 'placeholder.html'}" 
                                        width="100%" 
                                        height="100%" 
                                        frameborder="0"
                                        allowfullscreen>
                                    <p>Chargement du viewer Marmoset...</p>
                                </iframe>`
                            }
                        </div>
                    </div>
                    ` : ''}
                    
                    ${project.folder === 'Arch' ? `
                    <!-- TEMPLATE RÉUTILISABLE : Visualisateur de matériaux avec slider interactif -->
                    <!-- Peut être étendu à d'autres projets (Room, Kitchen, Gun, etc.) -->
                    <div class="marmoset-extra-panel">
                        <h3>Visualiseur - Archway</h3>
                        <div class="asset-slider-container">
                            <!-- Sélecteur de type d'asset -->
                            <div class="asset-type-selector">
                                <button class="asset-type-btn active" data-type="BASE COLOR">Albedo</button>
                                <button class="asset-type-btn" data-type="AO">Ambient Occlusion</button>
                                <button class="asset-type-btn" data-type="metallic">Metallic</button>
                                <button class="asset-type-btn" data-type="ROUPH">Roughness</button>
                            </div>
                            
                            <!-- Image d'aperçu -->
                            <div class="asset-preview-container">
                                <img id="arch-asset-preview" src="assets/images/Arch/BASE COLOR/NewLevelSequence.0128.jpeg" alt="Asset Preview">
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    ${project.folder === 'Gun' ? `
                    <!-- TEMPLATE RÉUTILISABLE : Visualisateur de matériaux avec slider interactif pour Plasma Pistol -->
                    <div class="marmoset-extra-panel">
                        <h3>Visualiseur - Plasma Pistol</h3>
                        <div class="asset-slider-container">
                            <!-- Sélecteur de type d'asset -->
                            <div class="asset-type-selector">
                                <button class="asset-type-btn active" data-type="FINAL">Full Quality</button>
                                <button class="asset-type-btn" data-type="BASE COLOR">Albedo</button>
                                <button class="asset-type-btn" data-type="TOPOLOGY">Topology</button>
                                <button class="asset-type-btn" data-type="METALLIC">Metallic</button>
                                <button class="asset-type-btn" data-type="ROUGHNESS">Roughness</button>
                                <button class="asset-type-btn" data-type="NORMAL">Normal</button>
                            </div>
                            
                            <!-- Image d'aperçu -->
                            <div class="asset-preview-container">
                                <img id="gun-asset-preview" src="assets/images/Gun/4.png" alt="Plasma Pistol Preview">
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <!-- Slider pour Archway - EN DESSOUS du panel -->
                    ${project.folder === 'Arch' ? `
                    <div class="arch-slider-external">
                        <div class="asset-sequence-slider">
                            <button class="sequence-btn" id="prev-sequence">◀</button>
                            <div class="slider-container">
                                <input type="range" id="asset-slider" min="128" max="149" value="128" step="1">
                                <div class="slider-zones">
                                    <div class="zone base-color-zone" data-start="128" data-end="133"></div>
                                    <div class="zone ao-zone" data-start="134" data-end="138"></div>
                                    <div class="zone metallic-zone" data-start="139" data-end="143"></div>
                                    <div class="zone roughness-zone" data-start="144" data-end="149"></div>
                                </div>
                                <div class="zone-labels">
                                    <span class="zone-label" data-zone="base-color">Base</span>
                                    <span class="zone-label" data-zone="ao">AO</span>
                                    <span class="zone-label" data-zone="metallic">Metal</span>
                                    <span class="zone-label" data-zone="roughness">Rough</span>
                                </div>
                            </div>
                            <button class="sequence-btn" id="next-sequence">▶</button>
                        </div>
                    </div>
                    ` : ''}
                    
                    <!-- Slider pour Gun/Plasma Pistol - EN DESSOUS du panel -->
                    ${project.folder === 'Gun' ? `
                    <div class="arch-slider-external">
                        <div class="asset-sequence-slider">
                            <button class="sequence-btn" id="gun-prev-sequence">◀</button>
                            <div class="slider-container">
                                <input type="range" id="gun-asset-slider" min="1" max="6" value="1" step="1">
                                <div class="slider-zones">
                                    <div class="zone final-zone" data-start="1" data-end="1"></div>
                                    <div class="zone base-color-zone" data-start="2" data-end="2"></div>
                                    <div class="zone topology-zone" data-start="3" data-end="3"></div>
                                    <div class="zone metallic-zone" data-start="4" data-end="4"></div>
                                    <div class="zone roughness-zone" data-start="5" data-end="5"></div>
                                    <div class="zone normal-zone" data-start="6" data-end="6"></div>
                                </div>
                                <div class="zone-labels">
                                    <span class="zone-label" data-zone="final">Final</span>
                                    <span class="zone-label" data-zone="base-color">Base</span>
                                    <span class="zone-label" data-zone="topology">Topo</span>
                                    <span class="zone-label" data-zone="metallic">Metal</span>
                                    <span class="zone-label" data-zone="roughness">Rough</span>
                                    <span class="zone-label" data-zone="normal">Norm</span>
                                </div>
                            </div>
                            <button class="sequence-btn" id="gun-next-sequence">▶</button>
                        </div>
                    </div>
                    ` : ''}
                    
                    ${project.folder === 'Telephone' ? `
                    <!-- TEMPLATE RÉUTILISABLE : Visualisateur de matériaux avec slider interactif pour Telephone Booth -->
                    <div class="marmoset-extra-panel">
                        <h3>Visualiseur - Telephone Booth</h3>
                        <div class="asset-slider-container">
                            <!-- Sélecteur de type d'asset -->
                            <div class="asset-type-selector">
                                <button class="asset-type-btn active" data-type="FINAL">Full Quality</button>
                                <button class="asset-type-btn" data-type="BASE COLOR">Albedo</button>
                                <button class="asset-type-btn" data-type="ROUGHNESS">Roughness</button>
                                <button class="asset-type-btn" data-type="METALLIC">Metallic</button>
                                <button class="asset-type-btn" data-type="NORMAL">Normal</button>
                            </div>
                            
                            <!-- Image d'aperçu -->
                            <div class="asset-preview-container">
                                <img id="telephone-asset-preview" src="assets/images/Telephone/5.png" alt="Telephone Booth Preview">
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <!-- Slider pour Telephone Booth - EN DESSOUS du panel -->
                    ${project.folder === 'Telephone' ? `
                    <div class="arch-slider-external">
                        <div class="asset-sequence-slider">
                            <button class="sequence-btn" id="telephone-prev-sequence">◀</button>
                            <div class="slider-container">
                                <input type="range" id="telephone-asset-slider" min="1" max="5" value="1" step="1">
                                <div class="slider-zones">
                                    <div class="zone final-zone" data-start="1" data-end="1"></div>
                                    <div class="zone base-color-zone" data-start="2" data-end="2"></div>
                                    <div class="zone roughness-zone" data-start="3" data-end="3"></div>
                                    <div class="zone metallic-zone" data-start="4" data-end="4"></div>
                                    <div class="zone normal-zone" data-start="5" data-end="5"></div>
                                </div>
                                <div class="zone-labels">
                                    <span class="zone-label" data-zone="final">Final</span>
                                    <span class="zone-label" data-zone="base-color">Base</span>
                                    <span class="zone-label" data-zone="roughness">Rough</span>
                                    <span class="zone-label" data-zone="metallic">Metal</span>
                                    <span class="zone-label" data-zone="normal">Norm</span>
                                </div>
                            </div>
                            <button class="sequence-btn" id="telephone-next-sequence">▶</button>
                        </div>
                    </div>
                    ` : ''}
                    
                    ${project.folder === 'Room' ? `
                    <!-- TEMPLATE RÉUTILISABLE : Visualisateur de matériaux avec slider interactif pour Room -->
                    <div class="marmoset-extra-panel">
                        <h3>Visualiseur - Room</h3>
                        <div class="asset-slider-container">
                            <!-- Sélecteur de type d'asset -->
                            <div class="asset-type-selector">
                                <button class="asset-type-btn active" data-type="FULL_QUALITY" onclick="updateRoomAssets('FULL_QUALITY')">Full Quality</button>
                                <button class="asset-type-btn" data-type="CAMERA_2" onclick="updateRoomAssets('CAMERA_2')">Topology</button>
                                <button class="asset-type-btn" data-type="ALBEDO" onclick="updateRoomAssets('ALBEDO')">Albedo</button>
                                <button class="asset-type-btn" data-type="SPECULAR" onclick="updateRoomAssets('SPECULAR')">Specular</button>
                                <button class="asset-type-btn" data-type="AO" onclick="updateRoomAssets('AO')">Ambient Occlusion</button>
                                <button class="asset-type-btn" data-type="NORMALS" onclick="updateRoomAssets('NORMALS')">Normal</button>
                            </div>
                            
                            <!-- Image d'aperçu -->
                            <div class="asset-preview-container">
                                <img id="room-asset-preview" src="assets/images/Room/fullQuality.png" alt="Room Preview">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Slider pour Room - EN DESSOUS du panel -->
                    <div class="arch-slider-external">
                        <div class="asset-sequence-slider">
                            <button class="sequence-btn" id="room-prev-sequence">◀</button>
                            <div class="slider-container">
                                <input type="range" id="room-asset-slider" min="1" max="6" value="1" step="1">
                                <div class="slider-zones">
                                    <div class="zone final-zone" data-start="1" data-end="1"></div>
                                    <div class="zone base-color-zone" data-start="2" data-end="2"></div>
                                    <div class="zone topology-zone" data-start="3" data-end="3"></div>
                                    <div class="zone metallic-zone" data-start="4" data-end="4"></div>
                                    <div class="zone roughness-zone" data-start="5" data-end="5"></div>
                                    <div class="zone normal-zone" data-start="6" data-end="6"></div>
                                </div>
                                <div class="zone-labels">
                                    <span class="zone-label" data-zone="final">Final</span>
                                    <span class="zone-label" data-zone="base-color">Base</span>
                                    <span class="zone-label" data-zone="topology">Topo</span>
                                    <span class="zone-label" data-zone="metallic">Metal</span>
                                    <span class="zone-label" data-zone="roughness">Rough</span>
                                    <span class="zone-label" data-zone="normal">Norm</span>
                                </div>
                            </div>
                            <button class="sequence-btn" id="room-next-sequence">▶</button>
                        </div>
                    </div>
                    ` : ''}
                    
                    ${project.folder === 'Kitchen' ? `
                    <!-- Panel Histoire spécifique pour Kitchen/The Last Meal -->
                    <div class="marmoset-story-panel">
                        <div class="story-content">
                            <h3>L'Histoire du Projet</h3>
                            <div class="story-text">
                                <p>Au fin fond d'une ruelle sombre se trouve cachée entre des murs de béton une petite cuisine clandestine, lugubre et remplie de saletés ne donnant aucune envie d'y passer la porte.</p>
                                
                                <p>Mais une fois la porte ouverte, une triste réalité s'offre à nos yeux. Dans cette pièce, un mur fait de carrelage probablement devenu jaunâtre par le manque de propreté est accompagné de taches d'un orange sombre décimée un peu par tout sur ce mur froid s'y trouve. Le plan de travail n'est pas en meilleur état, c'est un bois brute qui nous accueille oû réside des taches orange annonçant l'horreur de cette cuisine.</p>
                                
                                <p>Quand nos yeux se plissent d'avantage, les objets disposés deviennent nets. Couteaux, et casseroles trouvent leur place sur ce plan de travail. Cette vue qui se peint devant nos yeux à travers cette porte entre ouverte annonce quelque chose de mauvais, mais ce n'est qu'une fois que notre pied, doucement et faiblement franchit la porte afin de se retrouver à l'intérieur que la vérité éclate au grand jour.</p>
                                
                                <p>Une fois rentré pleinement dans la pièce, face à nos yeux l'enfer se trouve. Cette cuisine n'est pas que sombre et lugubre c'est aussi le repère des cuisiniers dénués de conscience, abattant des carottes sans peine et remord.</p>
                                
                                <p>Une boucherie s'affiche face à nous, où les ustensiles de cuisine se transforment en objet de torture.</p>
                                
                                <p>Partout où nos yeux se posent, nous pouvons voir des carottes dénuées de vie, baignant dans leur propre sang dans des casseroles. Des bouts de carottes découpées de parts et d'autres du plan de travail, des carottes blessées essayant de lutter contre leur sort et de s'échapper comme elles le peuvent malgré le pauvre destin qui leur est réservé.</p>
                                
                                <p>Mais parmi elle, seuls deux rescapés de cette tuerie tente de s'échapper en vint. Rampant et sautant aussi vite que leur blessures peuvent le permettre.</p>
                                
                                <p>Alors, elles rampent, sautent, trébuchent, tombent, se relèves afin d'atteindre la porte de sortie. Cette porte de sortie qui leur permettra vie sauve et extraction loin de ce massacre auxquels elles ont dû assister sans pouvoir dire un mot.</p>
                                
                                <p>Cette scène se déroulant sous nos propres yeux, nous savons d'avance qu'elles n'échapperont pas à la sinistre cuisson qui les attend, car toutes les riches personnes de cette ville ont payées ces cuisiners afin qui leur prépare des plats goûtus, gastronomique, remplis de saveur à base de carotte.</p>
                                
                                <p>Cette somme d'argent assez élevée fait disparaitre toute once d'humanité chez les cuisiniers. D'ailleurs en parlant d'eux, je crois entendre le minuteur sonner.</p>
                                
                                <p><strong>La cuisson est alors prête.</strong></p>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <!-- Panneau d'informations standard -->
                    <div class="marmoset-info-panel">
                        <div class="title-zone">
                            <h3>Logiciels :</h3>
                        </div>
                        <div class="logos-zone">
                            ${this.generateLogos(project.tags)}
                        </div>
                    </div>
                    
                    ${project.viewerFiles?.character ? `
                    <!-- Deuxième viewer 3D pour le personnage (si existe) -->
                    <div class="marmoset-chara-viewer-container">
                        <h3 class="viewer-title">Viewer 3D - Personnage</h3>
                        <div class="viewer-wrapper">
                            <iframe id="marmoset-chara-viewer-inline" 
                                    src="../../05_PROJETS_3D/projets_portfolio/${project.folder}/${project.viewerFiles.character}" 
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
        
        // Initialiser le slider d'assets pour Archway
        if (project.folder === 'Arch') {
            this.initArchAssetSlider();
        }
        
        // Initialiser la navigation des images pour Gun/Plasma Pistol
        if (project.folder === 'Gun') {
            this.initGunImageNavigation();
        }
        
        // Initialiser la navigation des images pour Telephone Booth
        if (project.folder === 'Telephone') {
            this.initTelephoneImageNavigation();
        }
        
        // Initialiser la navigation des images pour Room
        if (project.folder === 'Room') {
            this.initRoomNavigation();
        }
        
        // Réinitialiser l'effet parallaxe pour le nouveau bouton
        if (window.buttonParallaxManager) {
            setTimeout(() => {
                window.buttonParallaxManager.setup();
            }, 100);
        }
        
        console.log(`[MARMOSET] Template chargé pour ${project.title}`);
    }

    // Générer les logos en fonction des tags du projet
    generateLogos(tags) {
        const logoMapping = {
            'Maya': { src: 'Maya.png', alt: 'Maya', title: 'Autodesk Maya' },
            'ZBrush': { src: 'zbrush.png', alt: 'ZBrush', title: 'ZBrush' },
            'Marmoset': { src: 'Marmoset.png', alt: 'Marmoset', title: 'Marmoset Toolbag' },
            'Unreal Engine': { src: 'Unreal.png', alt: 'Unreal Engine', title: 'Unreal Engine' },
            'Substance Painter': { src: 'Painter.png', alt: 'Substance Painter', title: 'Substance Painter' },
            'Marvelous Designer': { src: 'Marvelous_Designer.png', alt: 'Marvelous Designer', title: 'Marvelous Designer' },
            'Photoshop': { src: 'Photoshop.png', alt: 'Photoshop', title: 'Adobe Photoshop' },
            'Blender': { src: 'Blender.png', alt: 'Blender', title: 'Blender' },
            '3ds Max': { src: '3dsMax.png', alt: '3ds Max', title: 'Autodesk 3ds Max' }
        };

        return tags.map(tag => {
            const logo = logoMapping[tag];
            if (logo) {
                const whiteLogos = ['zbrush.png', 'Unreal.png'];
                const isWhiteLogo = whiteLogos.includes(logo.src);
                const cssClass = isWhiteLogo ? 'logo-item white-logo' : 'logo-item';
                return `<img src="assets/images/Logos/${logo.src}" alt="${logo.alt}" class="${cssClass}" title="${logo.title}">`;
            }
            return '';
        }).join('');
    }

    // Initialiser le slider d'assets pour Archway
    initArchAssetSlider() {
        const assetTypeBtns = document.querySelectorAll('.asset-type-btn');
        const assetPreview = document.getElementById('arch-asset-preview');
        const assetSlider = document.getElementById('asset-slider');
        const prevBtn = document.getElementById('prev-sequence');
        const nextBtn = document.getElementById('next-sequence');
        
        // Types d'assets dans l'ordre
        const assetTypes = ['BASE COLOR', 'AO', 'metallic', 'ROUPH'];
        let currentSliderValue = 128;
        
        // Fonction pour déterminer le type d'asset selon la position du slider
        const getAssetTypeFromSlider = (sliderValue) => {
            // Ordre modifié : Base Color, AO, Metallic, Roughness
            // Répartir les 22 frames (128-149) sur 4 types d'assets
            if (sliderValue <= 133) return 'BASE COLOR';      // 128-133 (6 frames)
            else if (sliderValue <= 138) return 'AO';         // 134-138 (5 frames) 
            else if (sliderValue <= 143) return 'metallic';   // 139-143 (5 frames)
            else return 'ROUPH';                              // 144-149 (6 frames)
        };
        
        // Fonction pour mettre à jour l'image et l'interface
        const updateAssetImage = () => {
            const currentAssetType = getAssetTypeFromSlider(currentSliderValue);
            
            // Mettre à jour l'image
            const frameNumber = String(currentSliderValue).padStart(4, '0');
            const imagePath = `assets/images/Arch/${currentAssetType}/NewLevelSequence.${frameNumber}.jpeg`;
            assetPreview.src = imagePath;
            assetSlider.value = currentSliderValue;
            
            // Mettre à jour les boutons actifs
            assetTypeBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.type === currentAssetType) {
                    btn.classList.add('active');
                }
            });
        };
        
        // Gestion du slider - changement automatique de type
        assetSlider.addEventListener('input', (e) => {
            currentSliderValue = parseInt(e.target.value);
            updateAssetImage();
        });
        
        // Gestion des boutons précédent/suivant
        prevBtn.addEventListener('click', () => {
            if (currentSliderValue > 128) {
                currentSliderValue--;
                updateAssetImage();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentSliderValue < 149) {
                currentSliderValue++;
                updateAssetImage();
            }
        });
        
        // Gestion des boutons de type d'asset - sauter à la section correspondante
        assetTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const assetType = btn.dataset.type;
                // Définir la frame de départ pour chaque type (nouvel ordre)
                switch(assetType) {
                    case 'BASE COLOR': currentSliderValue = 128; break;  // 128-133
                    case 'AO': currentSliderValue = 134; break;          // 134-138
                    case 'metallic': currentSliderValue = 139; break;    // 139-143
                    case 'ROUPH': currentSliderValue = 144; break;       // 144-149
                }
                assetSlider.value = currentSliderValue; // Mettre à jour le slider
                updateAssetImage();
            });
        });
        
        // Initialiser avec la première image
        updateAssetImage();
        
        console.log('[ARCH SLIDER] Slider d\'assets auto-switch initialisé');
    }

    // Initialiser la navigation des images pour Gun/Plasma Pistol
    initGunImageNavigation() {
        const assetTypeBtns = document.querySelectorAll('.asset-type-btn');
        const gunPreview = document.getElementById('gun-asset-preview');
        const gunSlider = document.getElementById('gun-asset-slider');
        const prevBtn = document.getElementById('gun-prev-sequence');
        const nextBtn = document.getElementById('gun-next-sequence');
        
        // Mapping des types d'assets vers les fichiers images et valeurs du slider
        // Ordre du slider : 1=Final, 2=Base Color, 3=Topology, 4=Metallic, 5=Roughness, 6=Normal
        const assetImageMap = {
            'FINAL': { file: '4.png', value: 1 },         // 4.png = Rendu finale (position 1)
            'BASE COLOR': { file: '6.png', value: 2 },    // 6.png = Base Color (position 2)
            'TOPOLOGY': { file: '2.png', value: 3 },      // 2.png = Topology (position 3)
            'METALLIC': { file: '5.png', value: 4 },      // 5.png = Metallic (position 4)
            'ROUGHNESS': { file: '3.png', value: 5 },     // 3.png = Roughness (position 5)
            'NORMAL': { file: '1.png', value: 6 }         // 1.png = Normal (position 6)
        };
        
        // Mapping inverse pour le slider (valeur -> type)
        const sliderToAssetMap = {
            1: 'FINAL',        // Position 1 = Rendu Final
            2: 'BASE COLOR',   // Position 2 = Base Color
            3: 'TOPOLOGY',     // Position 3 = Topology
            4: 'METALLIC',     // Position 4 = Metallic
            5: 'ROUGHNESS',    // Position 5 = Roughness
            6: 'NORMAL'        // Position 6 = Normal
        };
        
        // Fonction pour mettre à jour l'image
        const updateGunImage = (assetType) => {
            const assetData = assetImageMap[assetType];
            if (gunPreview && assetData) {
                gunPreview.src = `assets/images/Gun/${assetData.file}?v=${Date.now()}`;
                
                // Mettre à jour le slider
                if (gunSlider) {
                    gunSlider.value = assetData.value;
                }
                
                // Mettre à jour les boutons actifs
                assetTypeBtns.forEach(btn => btn.classList.remove('active'));
                const activeBtn = Array.from(assetTypeBtns).find(btn => btn.dataset.type === assetType);
                if (activeBtn) {
                    activeBtn.classList.add('active');
                }
                
                console.log(`[GUN VIEWER] Image changée vers: ${assetData.file} (${assetType})`);
            }
        };
        
        // Gestion des clics sur les boutons de type d'asset
        assetTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const assetType = btn.dataset.type;
                updateGunImage(assetType);
            });
        });
        
        // Gestion du slider
        if (gunSlider) {
            gunSlider.addEventListener('input', (e) => {
                const sliderValue = parseInt(e.target.value);
                const assetType = sliderToAssetMap[sliderValue];
                if (assetType) {
                    updateGunImage(assetType);
                }
            });
        }
        
        // Gestion des boutons précédent/suivant
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const currentValue = parseInt(gunSlider.value);
                if (currentValue > 1) {
                    const newValue = currentValue - 1;
                    const assetType = sliderToAssetMap[newValue];
                    updateGunImage(assetType);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const currentValue = parseInt(gunSlider.value);
                if (currentValue < 6) {
                    const newValue = currentValue + 1;
                    const assetType = sliderToAssetMap[newValue];
                    updateGunImage(assetType);
                }
            });
        }
        
        // Initialiser avec Rendu Final (première image dans l'ordre)
        updateGunImage('FINAL');
        
        console.log('[GUN NAVIGATION] Navigation des images Plasma Pistol avec slider initialisée');
    }

    // === GESTION NAVIGATION IMAGES ROOM ===
    initRoomNavigation() {
        console.log('[ROOM NAVIGATION] Initialisation de la navigation Room...');
        
        const roomSlider = document.querySelector('#room-asset-slider');
        const prevBtn = document.querySelector('#room-prev-sequence');
        const nextBtn = document.querySelector('#room-next-sequence');
        const assetTypeBtns = document.querySelectorAll('[data-type]');
        
        if (!roomSlider) {
            console.warn('[ROOM NAVIGATION] Slider Room non trouvé');
            return;
        }
        
        // Mapping slider vers types d'assets Room
        const sliderToAssetMap = {
            1: 'FULL_QUALITY',
            2: 'CAMERA_2',
            3: 'ALBEDO', 
            4: 'SPECULAR',
            5: 'AO',
            6: 'NORMALS'
        };
        
        // Fonction de mise à jour de l'image Room
        const updateRoomImage = (assetType) => {
            if (typeof window.updateRoomAssets === 'function') {
                window.updateRoomAssets(assetType);
                
                // Mettre à jour la position du slider
                const sliderValue = Object.keys(sliderToAssetMap).find(key => sliderToAssetMap[key] === assetType);
                if (sliderValue) {
                    roomSlider.value = sliderValue;
                }
                
                console.log(`[ROOM VIEWER] Image changée vers: ${assetType}`);
            }
        };
        
        // Gestion des clics sur les boutons de type d'asset
        assetTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const assetType = btn.dataset.type;
                updateRoomImage(assetType);
            });
        });
        
        // Gestion du slider
        roomSlider.addEventListener('input', (e) => {
            const sliderValue = parseInt(e.target.value);
            const assetType = sliderToAssetMap[sliderValue];
            if (assetType) {
                updateRoomImage(assetType);
            }
        });
        
        // Gestion des boutons précédent/suivant
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const currentValue = parseInt(roomSlider.value);
                if (currentValue > 1) {
                    const newValue = currentValue - 1;
                    const assetType = sliderToAssetMap[newValue];
                    updateRoomImage(assetType);
                } else {
                    // Revenir à la fin (6)
                    roomSlider.value = 6;
                    updateRoomImage('NORMALS');
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const currentValue = parseInt(roomSlider.value);
                if (currentValue < 6) {
                    const newValue = currentValue + 1;
                    const assetType = sliderToAssetMap[newValue];
                    updateRoomImage(assetType);
                } else {
                    // Revenir au début (1)
                    roomSlider.value = 1;
                    updateRoomImage('FULL_QUALITY');
                }
            });
        }
        
        // Initialiser avec Full Quality (première image)
        updateRoomImage('FULL_QUALITY');
        
        console.log('[ROOM NAVIGATION] Navigation des images Room avec slider initialisée');
    }

    // Initialiser la navigation des images pour Telephone Booth
    initTelephoneImageNavigation() {
        const assetTypeBtns = document.querySelectorAll('.asset-type-btn');
        const telephonePreview = document.getElementById('telephone-asset-preview');
        const telephoneSlider = document.getElementById('telephone-asset-slider');
        const prevBtn = document.getElementById('telephone-prev-sequence');
        const nextBtn = document.getElementById('telephone-next-sequence');
        
        // Mapping des types d'assets vers les fichiers images et valeurs du slider
        // Ordre du slider : 1=Final, 2=Base Color, 3=Roughness, 4=Metallic, 5=Normal
        const assetImageMap = {
            'FINAL': { file: '5.png', value: 1 },         // 5.png = Rendu finale (position 1)
            'BASE COLOR': { file: '1.png', value: 2 },    // 1.png = Base Color (position 2)
            'ROUGHNESS': { file: '2.png', value: 3 },     // 2.png = Roughness (position 3)
            'METALLIC': { file: '3.png', value: 4 },      // 3.png = Metallic (position 4)
            'NORMAL': { file: '4.png', value: 5 }         // 4.png = Normal (position 5)
        };
        
        // Mapping inverse pour le slider (valeur -> type)
        const sliderToAssetMap = {
            1: 'FINAL',        // Position 1 = Rendu Final
            2: 'BASE COLOR',   // Position 2 = Base Color
            3: 'ROUGHNESS',    // Position 3 = Roughness
            4: 'METALLIC',     // Position 4 = Metallic
            5: 'NORMAL'        // Position 5 = Normal
        };
        
        // Fonction pour mettre à jour l'image
        const updateTelephoneImage = (assetType) => {
            const assetData = assetImageMap[assetType];
            if (telephonePreview && assetData) {
                telephonePreview.src = `assets/images/Telephone/${assetData.file}?v=${Date.now()}`;
                
                // Mettre à jour le slider
                if (telephoneSlider) {
                    telephoneSlider.value = assetData.value;
                }
                
                // Mettre à jour les boutons actifs
                assetTypeBtns.forEach(btn => btn.classList.remove('active'));
                const activeBtn = Array.from(assetTypeBtns).find(btn => btn.dataset.type === assetType);
                if (activeBtn) {
                    activeBtn.classList.add('active');
                }
                
                console.log(`[TELEPHONE VIEWER] Image changée vers: ${assetData.file} (${assetType})`);
            }
        };
        
        // Gestion des clics sur les boutons de type d'asset
        assetTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const assetType = btn.dataset.type;
                updateTelephoneImage(assetType);
            });
        });
        
        // Gestion du slider
        if (telephoneSlider) {
            telephoneSlider.addEventListener('input', (e) => {
                const sliderValue = parseInt(e.target.value);
                const assetType = sliderToAssetMap[sliderValue];
                if (assetType) {
                    updateTelephoneImage(assetType);
                }
            });
        }
        
        // Gestion des boutons précédent/suivant
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const currentValue = parseInt(telephoneSlider.value);
                if (currentValue > 1) {
                    const newValue = currentValue - 1;
                    const assetType = sliderToAssetMap[newValue];
                    updateTelephoneImage(assetType);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const currentValue = parseInt(telephoneSlider.value);
                if (currentValue < 5) {
                    const newValue = currentValue + 1;
                    const assetType = sliderToAssetMap[newValue];
                    updateTelephoneImage(assetType);
                }
            });
        }
        
        // Initialiser avec Rendu Final (première image dans l'ordre)
        updateTelephoneImage('FINAL');
        
        console.log('[TELEPHONE NAVIGATION] Navigation des images Telephone Booth avec slider initialisée');
    }

    // Méthode pour charger les images de galerie d'un projet
    loadProjectGallery(project) {
        const galleryContainer = document.getElementById(`${project.folder.toLowerCase()}-gallery`);
        if (!galleryContainer) return;

        console.log(`[GALLERY] Chargement de la galerie pour ${project.title}`);
        
        // Images réelles pour chaque projet
        const projectImages = {
            'cirucs': [
                'Neulinger_Clara_3B3D_Circus_References.jpg',
                'Neulinger_Clara_3B3D_Circus_References_2.jpg',
                'Neulinger_Clara_3B3D_Circus_Enviro_Renders_2.jpg',
                'Neulinger_Clara_3B3D_Circus_Enviro_Renders_1.jpg',
                'Neulinger_Clara_3B3D_Circus_Chara_Renders_1.jpg',
                'Neulinger_Clara_3B3D_Circus_Chara_Renders_2.jpg',
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
                'Neulinger_Clara_3B3D_Circus_Enviro_Uv_3.jpg'
            ],
            'arch': [
                'Neulinger_Clara_3B3D_pORTFOLIO.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Topology_3.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Topology_2.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Topology_1.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Uv_1.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Uv_2.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Uv_3.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Uv_4.jpg',
                'Neulinger_Clara_3B3D_Archway_Renders_Uv_5.jpg'
            ],
            'gun': [
                'NEULINGER_Clara_2B3DArt_Rendu_Texture.jpg',
                'Neulinger_Clara_3B3D_pORTFOLIO2.jpg'
            ],
            'room': [
                'Neulinger_Clara_Room_Renders_3.jpg',
                'Neulinger_Clara_Room_Renders_2.jpg',
                'Neulinger_Clara_Room_Renders_1.jpg',
                'Untitled_Camera 1_FullQuality.jpg'
            ],
            'telephone': [
                'Neulinger_Clara_3B3D_pORTFOLIO3.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_1.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_2.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_3.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_4.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_5.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_6.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_7.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_8.jpg'
            ],
            'kitchen': [
                'NewLevelSequence1_0002_Ultra.png',
                'Neulinger_Clara_3B3D_Archway_Renders.png'
            ]
        };

        const images = projectImages[project.folder.toLowerCase()] || [];
        
        console.log(`[GALLERY DEBUG] Projet: ${project.folder.toLowerCase()}, Images trouvées:`, images);
        
        if (images.length === 0) {
            console.log(`[GALLERY DEBUG] Aucune image trouvée pour ${project.folder.toLowerCase()}`);
            galleryContainer.innerHTML = '<p class="no-images">Images en cours de préparation...</p>';
            return;
        }

        // Créer les éléments d'image avec chargement intelligent
        const imageElements = images.map((imageName, index) => {
            const imagePath = `assets/images/${project.folder}/${imageName}`;
            // Images lourdes connues - chargement conditionnel
            const heavyImages = ['NewLevelSequence1_0002_Ultra.png', 'fullQuality.png', 'lolUntitled_Camera 2_FullQuality.png'];
            const isHeavyImage = heavyImages.includes(imageName);
            const loadingStrategy = (isHeavyImage && window.isLowPerformanceDevice && window.isLowPerformanceDevice()) ? 'lazy' : 'eager';
            
            return `
                <div class="gallery-item" onclick="portfolioManager.openImageViewer('${imagePath}', ${index}, ${images.length}, '${project.title}')">
                    <img src="${imagePath}" 
                         alt="${project.title} - Image ${index + 1}" 
                         loading="${loadingStrategy}"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block'"
                         title="Cliquez pour agrandir"
                         style="opacity: 0; transition: opacity 0.3s ease;"
                         onload="this.style.opacity = 1; console.log('✅ Image chargée: ${imageName}');"
                         data-size="${isHeavyImage ? 'heavy' : 'normal'}">
                    <div class="image-placeholder" style="display:none">
                        <p>Image ${index + 1}<br>Erreur de chargement</p>
                    </div>
                    ${isHeavyImage ? `<div class="heavy-image-indicator" style="position: absolute; top: 5px; right: 5px; background: rgba(255,107,107,0.8); color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px;">10MB+</div>` : ''}
                </div>
            `;
        }).join('');

        galleryContainer.innerHTML = imageElements;
        
        console.log(`[GALLERY] ${images.length} images ajoutées pour ${project.title}`);
    }

    // Lazy loading supprimé - chargement immédiat pour des performances optimales

    // Méthode helper pour récupérer les images d'un projet
    getProjectImages(projectFolder) {
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
                'Neulinger_Clara_Room_Renders_3.jpg',
                'Neulinger_Clara_Room_Renders_2.jpg',
                'Neulinger_Clara_Room_Renders_1.jpg',
                'Untitled_Camera 1_FullQuality.jpg'
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
            ],
            'kitchen': [
                'NewLevelSequence1_0002_Ultra.png',
                'Neulinger_Clara_3B3D_Archway_Renders.png'
            ]
        };

        return projectImages[projectFolder.toLowerCase()] || [];
    }

    // Viewer d'images avec navigation par flèches
    openImageViewer(imagePath, currentIndex, totalImages, projectTitle) {
        // Stocker les données pour la navigation
        this.currentImageIndex = currentIndex;
        this.totalGalleryImages = totalImages;
        this.currentProjectTitle = projectTitle;
        
        // Récupérer toutes les images du projet actuel
        const project = this.projects.find(p => p.title === projectTitle);
        if (project) {
            const projectImages = this.getProjectImages(project.folder.toLowerCase());
            this.currentGalleryImages = projectImages.map(img => `assets/images/${project.folder}/${img}`);
        }

        // Template uniforme pour tous les projets - structure basée sur Circus qui fonctionne bien
        const modal = document.createElement('div');
        modal.className = 'image-viewer-modal';
        modal.innerHTML = `
            <div class="image-viewer-overlay" onclick="this.closest('.image-viewer-modal').remove()"></div>
            <div class="image-viewer-content">
                <button class="image-viewer-close" onclick="this.closest('.image-viewer-modal').remove()">×</button>
                <div class="image-container-wrapper">
                    <button class="image-nav-btn prev image-nav-left" onclick="portfolioManager.navigateImage(-1)" ${currentIndex === 0 ? 'disabled' : ''}>‹</button>
                    <img src="${imagePath}" alt="${projectTitle} - Image ${currentIndex + 1}" class="image-viewer-img">
                </div>
                <div class="image-nav-buttons">
                    <button class="image-nav-btn prev mobile-only" onclick="portfolioManager.navigateImage(-1)" ${currentIndex === 0 ? 'disabled' : ''}>‹</button>
                    <button class="image-nav-btn next" onclick="portfolioManager.navigateImage(1)" ${currentIndex === totalImages - 1 ? 'disabled' : ''}>›</button>
                </div>
                <div class="image-viewer-info">
                    <span>${currentIndex + 1} / ${totalImages}</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Navigation clavier fluide avec throttling
        let keyboardThrottle = false;
        this.keyboardHandler = (e) => {
            if (e.key === 'ArrowLeft' && !keyboardThrottle) {
                e.preventDefault();
                keyboardThrottle = true;
                this.navigateImage(-1);
                setTimeout(() => { keyboardThrottle = false; }, 100); // Navigation très fluide
            } else if (e.key === 'ArrowRight' && !keyboardThrottle) {
                e.preventDefault();
                keyboardThrottle = true;
                this.navigateImage(1);
                setTimeout(() => { keyboardThrottle = false; }, 100); // Navigation très fluide
            } else if (e.key === 'Escape') {
                e.preventDefault();
                modal.remove();
            }
        };
        
        document.addEventListener('keydown', this.keyboardHandler);
        
        // Nettoyer les listeners quand on ferme la modal
        modal.addEventListener('remove', () => {
            document.removeEventListener('keydown', this.keyboardHandler);
        });
        
        // Observer pour nettoyer quand la modal est supprimée du DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.removedNodes.forEach((node) => {
                    if (node === modal) {
                        document.removeEventListener('keydown', this.keyboardHandler);
                        observer.disconnect();
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true });
    }

    // Navigation entre les images
    navigateImage(direction) {
        this.currentImageIndex += direction;
        
        // Limiter les indices
        if (this.currentImageIndex < 0) this.currentImageIndex = 0;
        if (this.currentImageIndex >= this.totalGalleryImages) this.currentImageIndex = this.totalGalleryImages - 1;
        
        // Mettre à jour l'affichage
        const modal = document.querySelector('.image-viewer-modal');
        if (modal && this.currentGalleryImages) {
            const img = modal.querySelector('.image-viewer-img');
            const info = modal.querySelector('.image-viewer-info span');
            const prevBtn = modal.querySelector('.prev');
            const nextBtn = modal.querySelector('.next');
            
            img.src = this.currentGalleryImages[this.currentImageIndex];
            img.alt = `${this.currentProjectTitle} - Image ${this.currentImageIndex + 1}`;
            info.textContent = `${this.currentImageIndex + 1} / ${this.totalGalleryImages}`;
            
            // Gérer les boutons
            prevBtn.disabled = this.currentImageIndex === 0;
            nextBtn.disabled = this.currentImageIndex === this.totalGalleryImages - 1;
        }
    }

    // Méthode helper pour récupérer les images d'un projet
    getProjectImages(folderName) {
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
                'Neulinger_Clara_Room_Renders_3.jpg',
                'Neulinger_Clara_Room_Renders_2.jpg',
                'Neulinger_Clara_Room_Renders_1.jpg',
                'Untitled_Camera 1_FullQuality.jpg'
            ],
            'telephone': [
                'NEULINGER_CLARA_2B3DART_TELEPHONE_1.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_2.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_3.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_4.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_5.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_6.jpg',
                'NEULINGER_CLARA_2B3DART_TELEPHONE_7.jpg',
                'NEULINGER_Clara_2B3DART_TELEPHONE_8.jpg',
                '1.png',
                '2.png',
                '3.png',
                '4.png',
                '5.png',
                'Neulinger_Clara_3B3D_pORTFOLIO3.jpg'
            ]
        };
        return projectImages[folderName] || [];
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
            mainImage: projectData.mainImage || 'assets/images/placeholder.jpg',
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

    // Ancienne fonction spécifique supprimée - utilise maintenant le template générique

    // Anciennes fonctions spécifiques supprimées - remplacées par le système générique


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
    
    // Réinitialiser l'effet parallaxe pour tous les boutons de la page collectibles
    if (window.buttonParallaxManager) {
        setTimeout(() => {
            window.buttonParallaxManager.setup();
            console.log('[PORTFOLIO] Parallaxe réinitialisé pour les collectibles');
        }, 100);
    }
};

// Fonction simplifiée - pas de repositionnement JS, seulement CSS
PortfolioManager.prototype.repositionReturnButton = function() {
    console.log('[PORTFOLIO] Repositionnement géré uniquement par CSS');
    
    // Réinitialiser le parallax sur le bouton
    if (window.buttonParallaxManager) {
        setTimeout(() => {
            window.buttonParallaxManager.setup();
        }, 100);
    }
};

// Appeler la fonction lors de l'affichage du portfolio
PortfolioManager.prototype.showPortfolioCollectiblesOriginal = PortfolioManager.prototype.showPortfolioCollectibles;
PortfolioManager.prototype.showPortfolioCollectibles = function() {
    this.showPortfolioCollectiblesOriginal();
    
    // Repositionner le bouton IMMÉDIATEMENT puis après délai
    this.repositionReturnButton();
    
    setTimeout(() => {
        this.repositionReturnButton();
    }, 100);
    
    setTimeout(() => {
        this.repositionReturnButton();
    }, 500);
    
    // Ajouter un listener pour les changements de taille d'écran
    const resizeHandler = () => {
        this.repositionReturnButton();
    };
    
    // Supprimer l'ancien listener s'il existe
    if (this.resizeHandler) {
        window.removeEventListener('resize', this.resizeHandler);
    }
    
    // Ajouter le nouveau listener
    this.resizeHandler = resizeHandler;
    window.addEventListener('resize', resizeHandler);
};

// Fonction globale pour gérer le slider Room
window.updateRoomSlider = function(imageType) {
    console.log('[ROOM SLIDER] Changement vers:', imageType);
    
    // Définir les mappages d'images
    const imageMap = {
        'fullQuality': 'Untitled_Camera 1_FullQuality.jpg',
        'camera2': 'lolUntitled_Camera 2_FullQuality.jpg',
        'albedo': 'Albedo.jpg',
        'ao': 'AmbientOcclusion.jpg',
        'specular': 'specular(Complete).jpg',
        'normals': 'lolUntitled_Camera 2_Normals.jpg'
    };
    
    // Mettre à jour les classes actives
    const sliderItems = document.querySelectorAll('.slider-image-item');
    sliderItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.image === imageType) {
            item.classList.add('active');
        }
    });
    
    // Optionnel: mettre à jour une image d'aperçu si nécessaire
    const previewImg = document.querySelector('#room-asset-preview');
    if (previewImg && imageMap[imageType]) {
        previewImg.src = `assets/images/Room/${imageMap[imageType]}?v=${Date.now()}`;
        previewImg.alt = imageType;
    }
    
    console.log('[ROOM SLIDER] Image changée vers:', imageMap[imageType]);
};

// Fonction globale pour gérer les assets Room
window.updateRoomAssets = function(assetType) {
    console.log('[ROOM ASSETS] Changement vers:', assetType);
    
    // Définir les mappages d'images pour les assets
    const assetMap = {
        'FULL_QUALITY': 'fullQuality.png',
        'CAMERA_2': 'lolUntitled_Camera 2_FullQuality.png',
        'ALBEDO': 'Albedo.png',
        'SPECULAR': 'specular(Complete).png',
        'AO': 'AmbientOcclusion.png',
        'NORMALS': 'lolUntitled_Camera 2_Normals.png'
    };
    
    // Mettre à jour les boutons actifs
    const assetButtons = document.querySelectorAll('.asset-type-btn');
    assetButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === assetType) {
            btn.classList.add('active');
        }
    });
    
    // Mettre à jour l'image d'aperçu
    const previewImg = document.querySelector('#room-asset-preview');
    if (previewImg && assetMap[assetType]) {
        previewImg.src = `assets/images/Room/${assetMap[assetType]}?v=${Date.now()}`;
        previewImg.alt = `Room ${assetType}`;
    }
    
    // Mettre à jour le slider correspondant
    const sliderMap = {
        'FULL_QUALITY': 1,
        'CAMERA_2': 2,
        'ALBEDO': 3,
        'SPECULAR': 4,
        'AO': 5,
        'NORMALS': 6
    };
    
    const slider = document.querySelector('#room-asset-slider');
    if (slider && sliderMap[assetType]) {
        slider.value = sliderMap[assetType];
    }
    
    console.log('[ROOM ASSETS] Asset changé vers:', assetMap[assetType]);
};

// Fonctions globales pour les contrôles de slider Room
window.roomSliderChange = function(value) {
    const typeMap = {
        1: 'FULL_QUALITY',
        2: 'CAMERA_2', 
        3: 'ALBEDO',
        4: 'SPECULAR',
        5: 'AO',
        6: 'NORMALS'
    };
    
    if (typeMap[value]) {
        updateRoomAssets(typeMap[value]);
    }
};

window.roomPrevSequence = function() {
    const slider = document.querySelector('#room-asset-slider');
    if (slider) {
        const currentValue = parseInt(slider.value);
        const newValue = currentValue > 1 ? currentValue - 1 : 6;
        slider.value = newValue;
        roomSliderChange(newValue);
    }
};

window.roomNextSequence = function() {
    const slider = document.querySelector('#room-asset-slider');
    if (slider) {
        const currentValue = parseInt(slider.value);
        const newValue = currentValue < 6 ? currentValue + 1 : 1;
        slider.value = newValue;
        roomSliderChange(newValue);
    }
};

// Événements pour les boutons d'assets Room
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que les éléments soient créés
    setTimeout(() => {
        const assetButtons = document.querySelectorAll('.asset-type-btn[data-type]');
        assetButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const assetType = this.dataset.type;
                if (assetType && this.closest('[data-project="Room"]')) {
                    updateRoomAssets(assetType);
                }
            });
        });
        
        // Événement pour le slider Room
        const roomSlider = document.querySelector('#room-asset-slider');
        if (roomSlider) {
            roomSlider.addEventListener('input', function() {
                const value = parseInt(this.value);
                const typeMap = {
                    1: 'FULL_QUALITY',
                    2: 'CAMERA_2',
                    3: 'ALBEDO',
                    4: 'SPECULAR',
                    5: 'AO',
                    6: 'NORMALS'
                };
                
                if (typeMap[value]) {
                    updateRoomAssets(typeMap[value]);
                }
            });
        }
    }, 1000);
});

