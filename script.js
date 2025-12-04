// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}


// Contact Form Handling with Web3Forms
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Web3Forms Configuration
// Get your Access Key from https://web3forms.com/
// It's FREE and gives you 250 submissions/month
const WEB3FORMS_ACCESS_KEY = '3836678f-b484-42ee-9517-55b7132445ae';

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button to prevent double submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone') || 'Not provided';
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            return;
        }

        // Map subject values to readable text
        const subjectMap = {
            'real-estate': 'Real Estate Investment',
            'leasing': 'Leasing',
            'office-setup': 'Office Setup',
            'legal-support': 'Legal Support',
            'consulting': 'Consulting',
            'study-abroad': 'Study Abroad Consulting',
            'general': 'General Inquiry'
        };
        const subjectText = subjectMap[subject] || subject;

        try {
            // Check if Web3Forms is configured
            if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
                // Fallback: Show success message but log data to console
                console.log('Contact Form Submission:', {
                    name,
                    email,
                    phone,
                    subject: subjectText,
                    message
                });
                showFormMessage('Thank you for your message! We will get back to you soon. (Note: Web3Forms not configured - please check SETUP_WEB3FORMS.md)', 'success');
                contactForm.reset();
            } else {
                // Prepare data for Web3Forms
                const web3formsData = {
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `New Contact Form: ${subjectText}`,
                    name: name,
                    email: email,
                    phone: phone,
                    message: `Subject: ${subjectText}\n\nPhone: ${phone}\n\nMessage:\n${message}`,
                    from_name: 'Dinh Le Group Website',
                    to_email: 'caoquy120324@gmail.com'
                };

                // Send to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(web3formsData)
                });

                const result = await response.json();

                if (result.success) {
                    showFormMessage('Thank you for your message! We have received your inquiry and will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Failed to send message');
                }
            }
        } catch (error) {
            console.error('Web3Forms Error:', error);
            showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly at caoquy120324@gmail.com', 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            
            // Hide message after 8 seconds
            setTimeout(() => {
                if (formMessage) {
                    formMessage.style.display = 'none';
                }
            }, 8000);
        }
    });
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
    }
    
    // Parallax effect for globe
    const globe = document.querySelector('.globe-container');
    if (globe) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.2;
        globe.style.transform = `translateY(${parallax}px)`;
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    let filteredImages = [];

    // Filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.classList.add('show');
                    }, index * 50);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 100);
                }
            });
        });
    });

    // Initialize: show all items
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show');
        }, index * 50);
    });

    // Lightbox functionality
    function openLightbox(index) {
        currentImageIndex = index;
        filteredImages = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateLightboxImage() {
        if (filteredImages.length > 0) {
            const img = filteredImages[currentImageIndex].querySelector('img');
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        if (filteredImages.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
            updateLightboxImage();
        }
    }

    function prevImage() {
        if (filteredImages.length > 0) {
            currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
            updateLightboxImage();
        }
    }

    // Open lightbox on image click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            filteredImages = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
            const itemIndex = filteredImages.indexOf(item);
            if (itemIndex !== -1) {
                openLightbox(itemIndex);
            }
        });
    });

    // Lightbox controls
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }

    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.intro-card, .location-card, .service-card, .portfolio-item, .mission-card, .leader-card, .feature-item, .gallery-item, .feature-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 3D Realistic Globe with Three.js - Enhanced
    const globeContainer = document.getElementById('globe3d');
    
    function initThreeGlobe() {
        if (!globeContainer || typeof THREE === 'undefined') return;
        
        const width = 380;
        const height = 380;
        
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = null; // Transparent
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        globeContainer.innerHTML = '';
        globeContainer.appendChild(renderer.domElement);
        
        // Camera position
        camera.position.z = 300;
        
        // Create realistic Earth with better geometry
        const geometry = new THREE.SphereGeometry(100, 64, 64);
        
        // Earth texture - more realistic
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Draw ocean base with realistic colors
        const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
        oceanGrad.addColorStop(0, '#1a4d7a');
        oceanGrad.addColorStop(0.3, '#2d6ba0');
        oceanGrad.addColorStop(0.7, '#1e5a8a');
        oceanGrad.addColorStop(1, '#153d5c');
        ctx.fillStyle = oceanGrad;
        ctx.fillRect(0, 0, 1024, 512);
        
        // Draw continents with realistic shapes and colors
        ctx.fillStyle = '#3d6b4f'; // Dark green for continents
        
        // North America
        ctx.beginPath();
        ctx.ellipse(240, 160, 120, 80, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(200, 200, 60, 100, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // South America
        ctx.beginPath();
        ctx.ellipse(280, 300, 70, 100, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Europe
        ctx.beginPath();
        ctx.ellipse(500, 140, 50, 60, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Africa
        ctx.beginPath();
        ctx.ellipse(520, 240, 60, 120, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Asia
        ctx.beginPath();
        ctx.ellipse(700, 160, 160, 100, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(750, 280, 80, 60, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Australia
        ctx.beginPath();
        ctx.ellipse(760, 360, 50, 40, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle grid lines for tech feel
        ctx.strokeStyle = 'rgba(79, 195, 247, 0.15)';
        ctx.lineWidth = 0.5;
        for (let i = 1; i < 9; i++) {
            const y = i * 57;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(1024, y);
            ctx.stroke();
        }
        for (let i = 1; i < 18; i++) {
            const x = i * 57;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 512);
            ctx.stroke();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            shininess: 50,
            specular: new THREE.Color(0x333333),
            emissive: new THREE.Color(0x001122),
            emissiveIntensity: 0.1
        });
        
        const earth = new THREE.Mesh(geometry, material);
        scene.add(earth);
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(200, 200, 200);
        scene.add(directionalLight);
        
        // Add point light for glow
        const pointLight = new THREE.PointLight(0x4fc3f7, 0.4, 500);
        pointLight.position.set(0, 0, 200);
        scene.add(pointLight);
        
        // Rotation animation
        let rotationY = 0;
        const animate = () => {
            rotationY += 0.0015; // Very slow rotation
            earth.rotation.y = rotationY;
            
            // Subtle floating
            earth.position.y = Math.sin(Date.now() * 0.001) * 3;
            
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    function initCanvasGlobe() {
        if (!globeContainer) return;
        
        const canvas = document.createElement('canvas');
        canvas.className = 'globe-canvas';
        globeContainer.innerHTML = '';
        globeContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const width = 380;
        const height = 380;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);
        
        let rotation = 0;
        const rotationSpeed = 0.002;
        
        const drawGlobe = () => {
            ctx.clearRect(0, 0, width, height);
            
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = 150;
            
            // Ocean base with realistic gradient
            const oceanGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            oceanGradient.addColorStop(0, 'rgba(26, 77, 122, 0.8)');
            oceanGradient.addColorStop(0.5, 'rgba(45, 107, 160, 0.9)');
            oceanGradient.addColorStop(1, 'rgba(21, 61, 92, 0.95)');
            
            ctx.fillStyle = oceanGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw continents with better shapes
            ctx.fillStyle = 'rgba(61, 107, 79, 0.9)';
            
            // North America
            const naX = centerX - 70 + Math.cos(rotation) * 25;
            const naY = centerY - 55;
            ctx.beginPath();
            ctx.ellipse(naX, naY, 45, 35, rotation * 0.5, 0, Math.PI * 2);
            ctx.fill();
            
            // South America
            const saX = centerX - 55 + Math.cos(rotation) * 18;
            const saY = centerY + 35;
            ctx.beginPath();
            ctx.ellipse(saX, saY, 32, 40, rotation * 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            // Europe
            const euX = centerX + 5 + Math.cos(rotation) * 12;
            const euY = centerY - 65;
            ctx.beginPath();
            ctx.ellipse(euX, euY, 25, 20, rotation * 0.4, 0, Math.PI * 2);
            ctx.fill();
            
            // Africa
            const afX = centerX + 15 + Math.cos(rotation) * 15;
            const afY = centerY - 5;
            ctx.beginPath();
            ctx.ellipse(afX, afY, 35, 50, rotation * 0.2, 0, Math.PI * 2);
            ctx.fill();
            
            // Asia
            const asX = centerX + 75 + Math.cos(rotation) * 30;
            const asY = centerY - 25;
            ctx.beginPath();
            ctx.ellipse(asX, asY, 50, 42, rotation * 0.6, 0, Math.PI * 2);
            ctx.fill();
            
            // Australia
            const auX = centerX + 95 + Math.cos(rotation) * 25;
            const auY = centerY + 55;
            ctx.beginPath();
            ctx.ellipse(auX, auY, 22, 18, rotation * 0.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Tech grid lines
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
            ctx.lineWidth = 0.5;
            for (let lat = -80; lat <= 80; lat += 20) {
                const y = centerY + (lat / 90) * radius;
                ctx.beginPath();
                ctx.ellipse(centerX, y, radius, radius * 0.35, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            for (let lon = 0; lon < 360; lon += 30) {
                const angle = (lon + rotation * 57.3) * Math.PI / 180;
                ctx.beginPath();
                ctx.ellipse(centerX, centerY, radius, radius, angle, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // Outer glow
            ctx.strokeStyle = 'rgba(0, 180, 219, 0.4)';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(0, 180, 219, 0.6)';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.shadowBlur = 0;
            
            rotation += rotationSpeed;
            if (rotation > Math.PI * 2) rotation = 0;
            requestAnimationFrame(drawGlobe);
        };
        
        drawGlobe();
    }
    
    // Try Three.js first, fallback to Canvas
    if (globeContainer) {
        if (typeof THREE !== 'undefined') {
            initThreeGlobe();
        } else {
            // Wait for Three.js to load
            const checkThree = setInterval(() => {
                if (typeof THREE !== 'undefined') {
                    clearInterval(checkThree);
                    initThreeGlobe();
                }
            }, 100);
            
            // Fallback after 2 seconds
            setTimeout(() => {
                if (typeof THREE === 'undefined') {
                    clearInterval(checkThree);
                    initCanvasGlobe();
                }
            }, 2000);
        }
    }

});

