// Add Star class for background
class Star {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        this.brightness = Math.random();
        this.brightnessDelta = this.twinkleSpeed;
    }

    update() {
        // Update brightness for twinkling effect
        this.brightness += this.brightnessDelta;
        if (this.brightness >= 1 || this.brightness <= 0.2) {
            this.brightnessDelta = -this.brightnessDelta;
        }
    }

    draw() {
        this.ctx.save();
        
        // Main star
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(220, 5%, 100%, ${this.brightness})`;
        this.ctx.fill();
        
        // Star glow
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(220, 5%, 100%, ${this.brightness * 0.3})`;
        this.ctx.fill();

        this.ctx.restore();
    }
}

class Meteor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Determine meteor spawn zone
        const random = Math.random();
        
        if (random < 0.7) {  // 70% chance for central area
            // Central spawn area
            this.x = canvas.width * (0.6 + Math.random() * 0.3);
            this.y = Math.random() * canvas.height * 0.3;
            this.size = Math.random() * 1.5 + 0.3;  // Normal size
        } else if (random < 0.85) {  // 15% chance for upper-left area
            // Upper-left spawn area
            this.x = canvas.width * (0.85 + Math.random() * 0.15);
            this.y = Math.random() * canvas.height * 0.15;
            this.size = Math.random() * 1 + 0.2;  // Slightly smaller size
        } else {  // 15% chance for lower-right area
            // Lower-right spawn area
            this.x = canvas.width * (0.7 + Math.random() * 0.3);
            this.y = canvas.height * (0.2 + Math.random() * 0.2);
            this.size = Math.random() * 1 + 0.2;  // Slightly smaller size
        }
        
        // All meteors move in the same direction (top-right to bottom-left)
        const baseSpeedX = -6;  // Base horizontal speed (left)
        const baseSpeedY = 4;   // Base vertical speed (down)
        const variation = 0.2;   // Speed variation
        
        this.speedX = baseSpeedX * (1 + (Math.random() - 0.5) * variation);
        this.speedY = baseSpeedY * (1 + (Math.random() - 0.5) * variation);
        
        this.trail = [];
        this.maxTrailLength = Math.floor(Math.random() * 40) + 35;
        this.opacity = Math.random() * 0.3 + 0.7;
        
        // More natural silver color
        const brightness = Math.random() * 3 + 97;
        this.color = {
            hue: 225,
            sat: 10,
            light: brightness
        };
    }

    update() {
        // Update trail
        this.trail.unshift({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
            this.trail.pop();
        }

        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Return true if meteor is still on screen
        return this.y < this.canvas.height && this.x > 0 && this.x < this.canvas.width;
    }

    draw() {
        this.ctx.save();
        
        // Draw trail with improved realism
        for (let i = 0; i < this.trail.length; i++) {
            const point = this.trail[i];
            const progress = i / this.trail.length;
            const opacity = Math.pow(1 - progress, 1.5) * this.opacity; // More dramatic fade
            
            // Main trail with graduated size
            const trailSize = this.size * (1 - Math.pow(progress, 0.5)); // More gradual size reduction
            
            // Main trail
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${this.color.hue}, ${this.color.sat}%, ${this.color.light}%, ${opacity})`;
            this.ctx.fill();
            
            // Enhanced inner glow
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, trailSize * 1.5, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${this.color.hue}, ${this.color.sat}%, ${this.color.light}%, ${opacity * 0.3})`;
            this.ctx.fill();
            
            // Outer glow
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, trailSize * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${this.color.hue}, ${this.color.sat}%, ${this.color.light}%, ${opacity * 0.1})`;
            this.ctx.fill();
        }
        
        // Brighter, more detailed meteor head
        const headSize = this.size * 2;
        
        // Core
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, headSize * 0.7, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${this.color.hue}, ${this.color.sat - 5}%, 100%, ${this.opacity})`; // Pure white core
        this.ctx.fill();
        
        // Inner glow
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, headSize * 1.5, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${this.color.hue}, ${this.color.sat}%, 98%, ${this.opacity * 0.5})`;
        this.ctx.fill();
        
        // Outer glow
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, headSize * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${this.color.hue}, ${this.color.sat}%, 95%, ${this.opacity * 0.2})`;
        this.ctx.fill();
        
        // Extreme outer glow
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, headSize * 5, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${this.color.hue}, ${this.color.sat}%, 90%, ${this.opacity * 0.1})`;
        this.ctx.fill();

        this.ctx.restore();
    }
}

class MeteorShower {
    constructor() {
        this.canvas = document.getElementById('meteorCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.meteors = [];
        this.stars = [];
        this.lastTime = 0;
        this.meteorInterval = 200;
        this.lastMeteor = 0;
        this.maxMeteors = 4;
        this.minMeteors = 2;
        this.burstCount = 0;
        this.maxBurstsInWave = 5;
        
        this.resize();
        this.initStars();
        window.addEventListener('resize', () => {
            this.resize();
            this.initStars();
        });
        
        this.animate();
    }

    initStars() {
        // Clear existing stars
        this.stars = [];
        // Add new stars based on screen size
        const starCount = Math.floor((this.canvas.width * this.canvas.height) / 3000);
        for (let i = 0; i < starCount; i++) {
            this.stars.push(new Star(this.canvas));
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addMeteor() {
        // Add multiple meteors at once in a burst
        const count = Math.floor(Math.random() * (this.maxMeteors - this.minMeteors + 1)) + this.minMeteors;
        for (let i = 0; i < count; i++) {
            this.meteors.push(new Meteor(this.canvas));
        }
        
        // Wave pattern
        this.burstCount++;
        if (this.burstCount >= this.maxBurstsInWave) {
            this.meteorInterval = 1000; // Longer pause between waves
            this.burstCount = 0;
        } else {
            this.meteorInterval = 200; // Normal interval within wave
        }
    }

    animate(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Add new meteors
        if (currentTime - this.lastMeteor > this.meteorInterval) {
            this.addMeteor();
            this.lastMeteor = currentTime;
        }

        // Slower fade for more persistent trails
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw stars
        for (let star of this.stars) {
            star.update();
            star.draw();
        }

        // Update and draw meteors
        this.meteors = this.meteors.filter(meteor => {
            const isAlive = meteor.update();
            if (isAlive) {
                meteor.draw();
            }
            return isAlive;
        });

        requestAnimationFrame((time) => this.animate(time));
    }
}

// Start the meteor shower
new MeteorShower(); 