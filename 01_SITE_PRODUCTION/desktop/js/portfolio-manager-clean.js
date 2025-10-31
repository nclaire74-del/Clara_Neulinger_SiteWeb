class PortfolioManager {
    constructor() {
        this.projects = [];
        this.categories = ['Tous', '3D', 'Animation', 'Design'];
        this.currentProject = 0;
        this.currentCategory = 0;
        
        // Configuration des projets
        this.projectFolders = [
            { 
                folder: 'Cirucs', 
                title: 'Projet : Circus',
                description: 'Ce projet personnel combine création d\'environnement et de personnage. Basé sur un concept art de Yuri Gvozdenko, la scène raconte une histoire à travers atmosphère, éclairage et textures.',
                tags: ['Maya', 'ZBrush', 'Substance Painter', 'Marmoset', 'Unreal Engine'],
                category: '3D',
                viewerFiles: {
                    environment: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Cirucs/Circus_Viewer.html',
                    character: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Cirucs/Chara_Circus_Viewer.html'
                },
                mainMedia: {
                    type: 'video',
                    src: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Cirucs/Neulinger_Clara_3B3D_Circus_Render_Video.mp4'
                },
                galleryImages: [
                    'Neulinger_Clara_3B3D_Circus_References',
                    'Neulinger_Clara_3B3D_Circus_Enviro_Renders_2',
                    'Neulinger_Clara_3B3D_Circus_Enviro_Renders_1',
                    'Neulinger_Clara_3B3D_Circus_Chara_Renders',
                    'Neulinger_Clara_3B3D_Circus_Chara_Sculpt'
                ]
            },
            { 
                folder: 'Arch', 
                title: 'Projet : Archway',
                description: 'Un projet personnel dédié à la création d\'une arche inspirée du style celtique. Dans le cadre de ce projet, j\'ai décidé de réinterpréter une arche réalisée en 3D par Jonatan Österberg, tout en développant un environnement complet autour de cette structure.',
                tags: ['Maya', 'Unreal Engine', 'Substance Painter', 'ZBrush', 'Marmoset'],
                category: '3D',
                viewerFiles: {
                    environment: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Arch/Arch_Viewer.html'
                },
                mainMedia: {
                    type: 'video',
                    src: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Arch/Neulinger_Clara_3B3D_Archway_Render_Video.mp4'
                },
                galleryImages: [
                    'Neulinger_Clara_3B3D_Archway_References_Concept',
                    'Neulinger_Clara_3B3D_Archway_Blockout',
                    'Neulinger_Clara_3B3D_Archway_Final_Beauty_Shots',
                    'Neulinger_Clara_3B3D_Archway_Sculpt_ZBrush',
                    'Neulinger_Clara_3B3D_Archway_Screenshot_Unreal',
                    'Neulinger_Clara_3B3D_Archway_Wireframe'
                ]
            },
            { 
                folder: 'Gun', 
                title: 'Projet : Plasma Pistol',
                description: 'Pistolet à plasma selon la référence conceptuelle de Robert Simons | Concept Art World.',
                tags: ['Maya', 'Substance Painter'],
                category: '3D',
                viewerFiles: {
                    environment: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Gun/Plasma_Pistol_Viewer.html'
                },
                mainMedia: {
                    type: 'image',
                    src: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Gun/NEULINGER_Clara_2B3DArt_Rendu_Texture.jpg'
                },
                galleryImages: [
                    'NEULINGER_Clara_2B3DArt_Rendu_Texture',
                    'NEULINGER_Clara_2B3DArt_Rendu_Sans_Texture',
                    'NEULINGER_Clara_2B3DArt_Wireframe'
                ]
            },
            { 
                folder: 'Kitchen', 
                title: 'Projet : The Last Meal',
                description: 'PITCH : In a supernatural and post-apocalypse world, we find a simple carrot, orange and alive. Crawling on the kitchen plan she tries to survive by fleeing the killings of her family. (WIP - Work In Progress)',
                tags: ['Maya', 'Substance Painter', 'Unreal Engine'],
                category: '3D',
                viewerFiles: {
                    environment: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Kitchen/Kitchen_Viewer.html'
                },
                mainMedia: {
                    type: 'image',
                    src: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Kitchen/NewLevelSequence1_0002_Ultra.png'
                },
                galleryImages: [
                    'NewLevelSequence1_0002_Ultra',
                    'LastMeal_References_Concept',
                    'LastMeal_Beauty_Shot_1',
                    'LastMeal_Stylisation_1',
                    'LastMeal_Beauty_Shot_2'
                ]
            },
            { 
                folder: 'Room', 
                title: 'Projet : Room',
                description: 'Creation d\'un environment stylé en 3D d\'après la référence de Thanh DO.  (WIP - Work In Progress)',
                tags: ['Marvelous Designer', 'Maya', 'Marmoset', 'Substance Painter'],
                category: '3D',
                viewerFiles: {
                    environment: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Room/Room_Viewer.html'
                },
                mainMedia: {
                    type: 'image',
                    src: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Room/Untitled_Camera 1_FullQuality.jpg'
                },
                galleryImages: [
                    'Untitled_Camera 1_FullQuality',
                    'lolUntitled_Camera 2_FullQuality',
                    'Albedo',
                    'AmbientOcclusion',
                    'specular(Complete)',
                    'lolUntitled_Camera 2_Normals'
                ]
            },
            { 
                folder: 'Telephone', 
                title: 'Projet : Telephone Booth',
                description: 'Réalisation d\'une texture à partir d\'un modèle 3D de cabine téléphonique, afin de la rendre abandoné, ayant une histoire a travers le temps.',
                tags: ['Maya', 'Substance Painter'],
                category: '3D',
                viewerFiles: {
                    environment: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Telephone/Telephone_Viewer.html'
                },
                mainMedia: {
                    type: 'image',
                    src: '/Clara_Neulinger/05_PROJETS_3D/projets_portfolio/Telephone/NEULINGER_CLARA_2B3DART_TELEPHONE_5.jpg'
                },
                galleryImages: [
                    'NEULINGER_CLARA_2B3DART_TELEPHONE_5',
                    'NEULINGER_CLARA_2B3DART_TELEPHONE_1',
                    'NEULINGER_CLARA_2B3DART_TELEPHONE_2',
                    'NEULINGER_CLARA_2B3DART_TELEPHONE_3',
                    'NEULINGER_CLARA_2B3DART_TELEPHONE_4',
                    'NEULINGER_CLARA_2B3DART_TELEPHONE_6'
                ]
            }
        ];
    }

    async initProjectsFromFolders() {
        console.log('[PORTFOLIO] Initialisation des projets depuis les dossiers...');
        
        for (let i = 0; i < this.projectFolders.length; i++) {
            const projectFolder = this.projectFolders[i];
            console.log(`[PORTFOLIO] Traitement du projet ${i + 1}/${this.projectFolders.length}: ${projectFolder.title}`);
            
            // Créer le projet avec les informations du dossier
            const project = {
                id: i + 1,
                title: projectFolder.title,
                description: projectFolder.description,
                folder: projectFolder.folder,
                tags: projectFolder.tags,
                category: projectFolder.category,
                images: projectFolder.galleryImages ? projectFolder.galleryImages.map(img => 
                    `/Clara_Neulinger/05_PROJETS_3D/Images_Portfolio/${projectFolder.folder}/${img}.jpg`
                ) : [],
                viewerFiles: projectFolder.viewerFiles,
                mainMedia: projectFolder.mainMedia
            };
            
            this.projects.push(project);
        }
        
        console.log(`[PORTFOLIO] ${this.projects.length} projets initialisés`);
    }

    init() {
        console.log('[PORTFOLIO] Initialisation...');
        try {
            this.initProjectsFromFolders().then(() => {
                this.setupEventListeners();
                this.updateDisplay();
                console.log('[PORTFOLIO] Initialisation terminée avec succès');
            });
        } catch (error) {
            console.error('[PORTFOLIO] Erreur lors de l\'initialisation:', error);
        }
    }

    setupEventListeners() {
        // Navigation des catégories
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
        console.log(`[CATEGORY] Catégorie précédente: ${this.categories[this.currentCategory]}`);
    }

    nextCategory() {
        this.currentCategory = (this.currentCategory + 1) % this.categories.length;
        this.updateCategoryDisplay();
        console.log(`[CATEGORY] Catégorie suivante: ${this.categories[this.currentCategory]}`);
    }

    previousProject() {
        this.currentProject = (this.currentProject - 1 + this.projects.length) % this.projects.length;
        this.updateProjectDisplay();
        this.updatePageCounter();
        console.log(`[PROJECT] Projet précédent: ${this.projects[this.currentProject].title}`);
    }

    nextProject() {
        this.currentProject = (this.currentProject + 1) % this.projects.length;
        this.updateProjectDisplay();
        this.updatePageCounter();
        console.log(`[PROJECT] Projet suivant: ${this.projects[this.currentProject].title}`);
    }

    updatePageCounter() {
        const currentItemElement = document.getElementById('current-item');
        const totalItemsElement = document.getElementById('total-items');
        
        if (currentItemElement && totalItemsElement) {
            currentItemElement.textContent = this.currentProject + 1;
            totalItemsElement.textContent = this.projects.length;
        }
    }

    updateDisplay() {
        this.updateCategoryDisplay();
        this.updateProjectDisplay();
        this.updatePageCounter();
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
                <div class="project-item" data-project="${project.id}">
                    <div class="project-header">
                        <div class="project-number">${String(project.id).padStart(2, '0')}</div>
                        <div class="project-info">
                            <h3>${project.title}</h3>
                            <div class="project-description">
                                <p>${project.description}</p>
                            </div>
                            <div class="project-tags">
                                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="project-media-wrapper" onclick="portfolioManager.openProjectDetails(${project.id})">
                        ${this.generateMainMedia(project)}
                        <div class="project-overlay">
                            <div class="project-overlay-text">
                                Cliquez pour explorer
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    generateMainMedia(project) {
        if (project.mainMedia.type === 'video') {
            return `<video class="project-media" autoplay muted loop playsinline>
                        <source src="${project.mainMedia.src}" type="video/mp4">
                    </video>`;
        } else {
            return `<img class="project-media" src="${project.mainMedia.src}" alt="${project.title}">`;
        }
    }

    openProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        console.log(`[OPEN] Ouverture de la page du projet: ${project.title}`);
        
        this.showMarmosetViewerTemplate(project);
    }

    showMarmosetViewerTemplate(project) {
        console.log(`[MARMOSET] Affichage du template pour: ${project.title}`);
        
        const modal = document.createElement('div');
        modal.className = 'marmoset-viewer-modal';
        modal.innerHTML = `
            <div class="modal-header">
                <h2>${project.title}</h2>
                <button class="modal-close" onclick="portfolioManager.closeModal()">&times;</button>
            </div>
            <div class="modal-content">
                <div class="project-gallery">
                    ${project.images.map((img, index) => `
                        <img src="${img}" alt="${project.title} ${index + 1}" 
                             onclick="portfolioManager.openImageViewer('${img}', ${index}, ${project.images.length}, '${project.title}')">
                    `).join('')}
                </div>
                ${project.viewerFiles ? `
                    <div class="marmoset-viewers">
                        ${Object.entries(project.viewerFiles).map(([type, file]) => `
                            <iframe src="${file}" width="100%" height="600"></iframe>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    openImageViewer(imagePath, currentIndex, totalImages, projectTitle) {
        const viewer = document.createElement('div');
        viewer.className = 'image-viewer-modal';
        viewer.innerHTML = `
            <div class="image-viewer-content">
                <button class="viewer-close" onclick="portfolioManager.closeImageViewer()">&times;</button>
                <button class="viewer-prev" onclick="portfolioManager.navigateImage(-1)">‹</button>
                <img src="${imagePath}" alt="${projectTitle}">
                <button class="viewer-next" onclick="portfolioManager.navigateImage(1)">›</button>
                <div class="viewer-counter">${currentIndex + 1} / ${totalImages}</div>
            </div>
        `;
        
        document.body.appendChild(viewer);
        this.currentImageIndex = currentIndex;
        this.currentImages = this.projects[this.currentProject].images;
        this.currentProjectTitle = projectTitle;
    }

    navigateImage(direction) {
        this.currentImageIndex += direction;
        if (this.currentImageIndex < 0) this.currentImageIndex = this.currentImages.length - 1;
        if (this.currentImageIndex >= this.currentImages.length) this.currentImageIndex = 0;
        
        const viewer = document.querySelector('.image-viewer-modal');
        if (viewer) {
            const img = viewer.querySelector('img');
            const counter = viewer.querySelector('.viewer-counter');
            img.src = this.currentImages[this.currentImageIndex];
            counter.textContent = `${this.currentImageIndex + 1} / ${this.currentImages.length}`;
        }
    }

    closeImageViewer() {
        const viewer = document.querySelector('.image-viewer-modal');
        if (viewer) {
            viewer.remove();
        }
    }

    createProjectDots() {
        const dotsContainer = document.getElementById('project-dots');
        if (dotsContainer && this.projects.length > 0) {
            dotsContainer.innerHTML = this.projects.map((project, index) => 
                `<div class="project-dot ${index === this.currentProject ? 'active' : ''}" 
                      onclick="portfolioManager.goToProject(${index})"></div>`
            ).join('');
        }
    }

    goToProject(index) {
        this.currentProject = index;
        this.updateProjectDisplay();
        this.updatePageCounter();
        this.createProjectDots();
    }

    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
                this.previousProject();
                break;
            case 'ArrowRight':
                this.nextProject();
                break;
            case 'Escape':
                this.closeModal();
                break;
        }
    }

    closePortfolio() {
        console.log('[PORTFOLIO] Fermeture du portfolio');
        if (window.showPortfolioCollectibles) {
            window.showPortfolioCollectibles = null;
        }
        
        const portfolioWindow = document.getElementById('portfolio-window');
        if (portfolioWindow) {
            portfolioWindow.classList.remove('show');
        }
        
        const mainUI = document.getElementById('main-ui');
        if (mainUI) {
            mainUI.style.display = 'flex';
        }
    }

    closeModal() {
        const modal = document.querySelector('.marmoset-viewer-modal');
        if (modal) {
            modal.remove();
        }
        this.closeImageViewer();
    }

    showPortfolioCollectibles() {
        console.log('[PORTFOLIO] Affichage des collectibles');
        
        const portfolioWindow = document.getElementById('portfolio-window');
        if (portfolioWindow) {
            portfolioWindow.classList.add('show');
        }
        
        const mainUI = document.getElementById('main-ui');
        if (mainUI) {
            mainUI.style.display = 'none';
        }
    }
}

// Création de l'instance globale
window.portfolioManager = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('[PORTFOLIO] DOM chargé, création de l\'instance...');
    if (!window.portfolioManager) {
        window.portfolioManager = new PortfolioManager();
        window.portfolioManager.init();
    }
});

// Fonction globale pour l'affichage du portfolio
window.showPortfolioCollectibles = function() {
    if (window.portfolioManager) {
        window.portfolioManager.showPortfolioCollectibles();
    }
};