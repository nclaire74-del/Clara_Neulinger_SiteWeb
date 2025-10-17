/**
 * Gestionnaire des effets de cercle gribouillage pour les boutons
 */
class ButtonEffectsManager {
    constructor() {
        this.activeEffects = new Map();
        this.init();
    }

    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupButtonEffects());
        } else {
            this.setupButtonEffects();
        }
    }

    createSubtitlePoints(button) {
        const subtitle = button.querySelector('.button-subtitle');
        if (!subtitle) return;

        // Créer un canvas pour le point gribouillé
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.left = '5px';
        canvas.style.top = '50%';
        canvas.style.transform = 'translateY(-50%)';
        canvas.style.width = '8px';
        canvas.style.height = '8px';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '4';
        canvas.className = 'subtitle-point';
        
        canvas.width = 8;
        canvas.height = 8;
        
        subtitle.style.position = 'relative';
        subtitle.appendChild(canvas);
        
        // Dessiner le point gribouillé
        this.drawGribouillagePoint(canvas);
    }

    drawGribouillagePoint(canvas) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        
        // Créer un petit cercle gribouillé plus discret
        ctx.beginPath();
        const points = 8;
        for (let i = 0; i <= points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const irregularity = (Math.random() - 0.5) * 1;
            const radius = 2 + irregularity;
            
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    setupButtonEffects() {
        // Écouter les boutons avec la classe game-button
        const buttons = document.querySelectorAll('.game-button');
        buttons.forEach(button => {
            // Créer les points gribouillés pour les sous-titres
            this.createSubtitlePoints(button);
            
            button.addEventListener('mouseenter', (e) => this.createHoverEffects(button));
            button.addEventListener('mouseleave', (e) => this.removeHoverEffects(button));
        });
    }

    createHoverEffects(button) {
        // Supprimer les effets précédents s'ils existent
        this.removeHoverEffects(button);

        // Créer le canvas pour le rectangle gribouillé (fond)
        const rectCanvas = this.createRectangleCanvas(button);
        
        // Créer le canvas pour l'ovale gribouillé (contour)
        const ovalCanvas = this.createOvalCanvas(button);

        // Dessiner les effets avec animations continues
        this.drawAnimatedGribouillageRectangle(rectCanvas.canvas, rectCanvas.width, rectCanvas.height);
        this.drawAnimatedGribouillageOval(ovalCanvas.canvas, ovalCanvas.radiusX, ovalCanvas.radiusY);
        
        // Stocker les références avec les animations
        this.activeEffects.set(button, { 
            rectCanvas: rectCanvas.canvas, 
            ovalCanvas: ovalCanvas.canvas,
            rectAnimationId: null,
            ovalAnimationId: null
        });
    }

    createRectangleCanvas(button) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0'; // Derrière le texte
        canvas.className = 'button-hover-rectangle';

        // Calculer les dimensions pour englober tout le texte
        const buttonText = button.querySelector('.button-text');
        const buttonSubtitle = button.querySelector('.button-subtitle');
        
        let totalWidth = 0;
        let totalHeight = 0;
        
        if (buttonText) {
            const textRect = buttonText.getBoundingClientRect();
            totalWidth = Math.max(totalWidth, textRect.width);
            totalHeight += textRect.height;
        }
        
        if (buttonSubtitle) {
            const subtitleRect = buttonSubtitle.getBoundingClientRect();
            totalWidth = Math.max(totalWidth, subtitleRect.width);
            totalHeight += subtitleRect.height + 4;
        }

        const rectWidth = totalWidth + 50;
        const rectHeight = totalHeight + 30;
        
        canvas.width = rectWidth;
        canvas.height = rectHeight;
        canvas.style.width = rectWidth + 'px';
        canvas.style.height = rectHeight + 'px';
        canvas.style.left = '50%';
        canvas.style.top = '50%';
        canvas.style.transform = 'translate(-50%, -50%)';
        canvas.style.position = 'absolute';

        button.appendChild(canvas);
        
        return { canvas, width: rectWidth, height: rectHeight };
    }

    createOvalCanvas(button) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1'; // Au-dessus du rectangle
        canvas.className = 'button-hover-oval';

        // Calculer les dimensions pour l'ovale
        const buttonText = button.querySelector('.button-text');
        const buttonSubtitle = button.querySelector('.button-subtitle');
        
        let textWidth = 0;
        let textHeight = 0;
        
        if (buttonText) {
            const textRect = buttonText.getBoundingClientRect();
            textWidth = Math.max(textWidth, textRect.width);
            textHeight += textRect.height;
        }
        
        if (buttonSubtitle) {
            const subtitleRect = buttonSubtitle.getBoundingClientRect();
            textWidth = Math.max(textWidth, subtitleRect.width);
            textHeight += subtitleRect.height;
        }

        const ovalWidth = textWidth + 60;
        const ovalHeight = textHeight + 40;
        
        canvas.width = ovalWidth;
        canvas.height = ovalHeight;
        canvas.style.width = ovalWidth + 'px';
        canvas.style.height = ovalHeight + 'px';
        canvas.style.left = '50%';
        canvas.style.top = '50%';
        canvas.style.transform = 'translate(-50%, -50%)';
        canvas.style.position = 'absolute';

        button.appendChild(canvas);
        
        return { canvas, radiusX: ovalWidth / 2 - 15, radiusY: ovalHeight / 2 - 10 };
    }

    removeHoverEffects(button) {
        const effectData = this.activeEffects.get(button);
        if (effectData) {
            // Arrêter les animations
            if (effectData.rectAnimationId) {
                cancelAnimationFrame(effectData.rectAnimationId);
            }
            if (effectData.ovalAnimationId) {
                cancelAnimationFrame(effectData.ovalAnimationId);
            }
            
            // Supprimer les canvas
            if (effectData.rectCanvas && effectData.rectCanvas.parentNode) {
                effectData.rectCanvas.parentNode.removeChild(effectData.rectCanvas);
            }
            if (effectData.ovalCanvas && effectData.ovalCanvas.parentNode) {
                effectData.ovalCanvas.parentNode.removeChild(effectData.ovalCanvas);
            }
            
            this.activeEffects.delete(button);
        }
        
        // Nettoyer aussi par sélecteur au cas où
        const existingRectangles = button.querySelectorAll('.button-hover-rectangle');
        const existingOvals = button.querySelectorAll('.button-hover-oval');
        existingRectangles.forEach(rect => rect.remove());
        existingOvals.forEach(oval => oval.remove());
    }

    drawAnimatedGribouillageRectangle(canvas, width, height) {
        const ctx = canvas.getContext('2d');
        
        // Configuration du style noir
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Variables pour l'animation continue
        let time = 0;
        const effectData = this.activeEffects.get(canvas.parentElement);
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Dessiner le fond noir d'abord
            this.drawBackgroundRectangle(ctx, width, height, time);
            
            // Puis dessiner le contour gribouillé
            this.drawMultiLayerRectangle(ctx, width - 20, height - 15, time);
            
            time += 0.05;
            
            if (effectData && effectData.rectCanvas) {
                effectData.rectAnimationId = requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    drawAnimatedGribouillageOval(canvas, radiusX, radiusY) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Configuration du style blanc
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Variables pour l'animation continue
        let time = 0;
        const effectData = this.activeEffects.get(canvas.parentElement);
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Dessiner plusieurs couches d'ovale avec variations d'opacité
            this.drawMultiLayerOval(ctx, centerX, centerY, radiusX, radiusY, time);
            
            time += 0.05;
            
            if (effectData && effectData.ovalCanvas) {
                effectData.ovalAnimationId = requestAnimationFrame(animate);
            }
        };
        
        animate();
    }



    drawBackgroundRectangle(ctx, width, height, time) {
        const centerX = width / 2;
        const centerY = height / 2;
        const rectWidth = width - 20;
        const rectHeight = height - 15;
        
        // Fond noir semi-transparent avec effet de tremblement
        const trembleX = Math.sin(time * 2) * 0.5;
        const trembleY = Math.cos(time * 1.8) * 0.5;
        
        ctx.fillStyle = `rgba(0, 0, 0, 0.7)`;
        ctx.fillRect(
            centerX - rectWidth/2 + trembleX,
            centerY - rectHeight/2 + trembleY,
            rectWidth,
            rectHeight
        );
    }

    drawMultiLayerRectangle(ctx, width, height, time) {
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        const rectWidth = width;
        const rectHeight = height;
        
        // Dessiner 3 couches de contour gribouillé
        for (let layer = 0; layer < 3; layer++) {
            const layerTime = time + (layer * 0.5);
            const opacity = 0.3 + (Math.sin(layerTime * 2) * 0.2);
            const trembleIntensity = 1 + layer * 0.4;
            
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = 1.5 + (layer * 0.3);
            
            // Points du rectangle avec irrégularités
            const points = [];
            const segments = 20; // Points par côté
            
            // Côté haut
            for (let i = 0; i <= segments; i++) {
                const progress = i / segments;
                const x = centerX - rectWidth/2 + progress * rectWidth;
                const y = centerY - rectHeight/2;
                
                const irregularity = Math.sin(progress * 8 + layerTime) * 2;
                const trembleX = Math.sin(layerTime * 3 + i * 0.5) * trembleIntensity;
                const trembleY = Math.cos(layerTime * 2.5 + i * 0.7) * trembleIntensity;
                
                points.push({
                    x: x + trembleX,
                    y: y + irregularity + trembleY
                });
            }
            
            // Côté droit
            for (let i = 1; i <= segments; i++) {
                const progress = i / segments;
                const x = centerX + rectWidth/2;
                const y = centerY - rectHeight/2 + progress * rectHeight;
                
                const irregularity = Math.sin(progress * 8 + layerTime + Math.PI/2) * 2;
                const trembleX = Math.sin(layerTime * 3 + i * 0.5 + Math.PI/2) * trembleIntensity;
                const trembleY = Math.cos(layerTime * 2.5 + i * 0.7 + Math.PI/2) * trembleIntensity;
                
                points.push({
                    x: x + irregularity + trembleX,
                    y: y + trembleY
                });
            }
            
            // Côté bas
            for (let i = 1; i <= segments; i++) {
                const progress = i / segments;
                const x = centerX + rectWidth/2 - progress * rectWidth;
                const y = centerY + rectHeight/2;
                
                const irregularity = Math.sin(progress * 8 + layerTime + Math.PI) * 2;
                const trembleX = Math.sin(layerTime * 3 + i * 0.5 + Math.PI) * trembleIntensity;
                const trembleY = Math.cos(layerTime * 2.5 + i * 0.7 + Math.PI) * trembleIntensity;
                
                points.push({
                    x: x + trembleX,
                    y: y + irregularity + trembleY
                });
            }
            
            // Côté gauche
            for (let i = 1; i < segments; i++) {
                const progress = i / segments;
                const x = centerX - rectWidth/2;
                const y = centerY + rectHeight/2 - progress * rectHeight;
                
                const irregularity = Math.sin(progress * 8 + layerTime + 3*Math.PI/2) * 2;
                const trembleX = Math.sin(layerTime * 3 + i * 0.5 + 3*Math.PI/2) * trembleIntensity;
                const trembleY = Math.cos(layerTime * 2.5 + i * 0.7 + 3*Math.PI/2) * trembleIntensity;
                
                points.push({
                    x: x + irregularity + trembleX,
                    y: y + trembleY
                });
            }
            
            // Dessiner le contour avec courbes
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            
            for (let i = 1; i < points.length; i++) {
                const current = points[i];
                const prev = points[i-1];
                
                const cpX = (prev.x + current.x) / 2 + Math.sin(layerTime * 4 + i) * 1;
                const cpY = (prev.y + current.y) / 2 + Math.cos(layerTime * 3.5 + i) * 1;
                
                ctx.quadraticCurveTo(cpX, cpY, current.x, current.y);
            }
            
            ctx.closePath();
            ctx.stroke();
        }
    }

    drawMultiLayerOval(ctx, centerX, centerY, radiusX, radiusY, time) {
        const totalPoints = 60;
        const irregularityFactor = 1.5;
        
        // Dessiner 3 couches avec des opacités et tremblements différents
        for (let layer = 0; layer < 3; layer++) {
            const layerTime = time + (layer * 0.7);
            const opacity = 0.4 + (Math.sin(layerTime * 2) * 0.3);
            const trembleIntensity = 0.8 + layer * 0.3;
            
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1.5 + (layer * 0.2);
            
            ctx.beginPath();
            
            for (let i = 0; i <= totalPoints; i++) {
                const angle = (i / totalPoints) * Math.PI * 2;
                
                // Calcul de l'ellipse de base
                const baseX = Math.cos(angle) * radiusX;
                const baseY = Math.sin(angle) * radiusY;
                
                // Irrégularités pour l'effet gribouillage
                const baseIrregularity = Math.sin(angle * 4 + layerTime) * irregularityFactor;
                const fineDetail = Math.cos(angle * 12 + layerTime * 1.5) * (irregularityFactor * 0.3);
                
                // Tremblement animé plus subtil pour l'ovale
                const trembleX = Math.sin(layerTime * 3 + angle * 2) * trembleIntensity;
                const trembleY = Math.cos(layerTime * 2.5 + angle * 3) * trembleIntensity;
                
                // Application des variations
                const irregularityX = Math.cos(angle) * (baseIrregularity + fineDetail);
                const irregularityY = Math.sin(angle) * (baseIrregularity + fineDetail);
                
                const x = centerX + baseX + irregularityX + trembleX;
                const y = centerY + baseY + irregularityY + trembleY;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    // Courbes pour un aspect plus organique
                    const prevAngle = ((i-1) / totalPoints) * Math.PI * 2;
                    const prevBaseX = Math.cos(prevAngle) * radiusX;
                    const prevBaseY = Math.sin(prevAngle) * radiusY;
                    
                    const prevIrregularity = Math.sin(prevAngle * 4 + layerTime) * irregularityFactor;
                    const prevFineDetail = Math.cos(prevAngle * 12 + layerTime * 1.5) * (irregularityFactor * 0.3);
                    const prevTrembleX = Math.sin(layerTime * 3 + prevAngle * 2) * trembleIntensity;
                    const prevTrembleY = Math.cos(layerTime * 2.5 + prevAngle * 3) * trembleIntensity;
                    
                    const prevIrregularityX = Math.cos(prevAngle) * (prevIrregularity + prevFineDetail);
                    const prevIrregularityY = Math.sin(prevAngle) * (prevIrregularity + prevFineDetail);
                    
                    const prevX = centerX + prevBaseX + prevIrregularityX + prevTrembleX;
                    const prevY = centerY + prevBaseY + prevIrregularityY + prevTrembleY;
                    
                    const cpX = (prevX + x) / 2 + Math.sin(layerTime * 4) * 1;
                    const cpY = (prevY + y) / 2 + Math.cos(layerTime * 3.5) * 1;
                    
                    ctx.quadraticCurveTo(cpX, cpY, x, y);
                }
            }
            
            ctx.closePath();
            ctx.stroke();
        }
    }

    // Méthode pour nettoyer tous les effets
    cleanup() {
        this.activeEffects.forEach((effectData, button) => {
            if (effectData.rectAnimationId) {
                cancelAnimationFrame(effectData.rectAnimationId);
            }
            if (effectData.ovalAnimationId) {
                cancelAnimationFrame(effectData.ovalAnimationId);
            }
            if (effectData.rectCanvas && effectData.rectCanvas.parentNode) {
                effectData.rectCanvas.parentNode.removeChild(effectData.rectCanvas);
            }
            if (effectData.ovalCanvas && effectData.ovalCanvas.parentNode) {
                effectData.ovalCanvas.parentNode.removeChild(effectData.ovalCanvas);
            }
        });
        this.activeEffects.clear();
    }
}

// Créer une instance globale
window.buttonEffectsManager = new ButtonEffectsManager();