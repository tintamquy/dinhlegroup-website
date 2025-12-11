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
                    from_name: 'Dinhle Group Website',
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
    const animateElements = document.querySelectorAll('.intro-card, .location-card, .service-card, .portfolio-item, .mission-card, .leader-card, .feature-item, .gallery-item, .feature-card, .vn-factory-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 3D Technology Network Globe - Dots Connected Style
    const globeContainer = document.getElementById('globe3d');
    
    function initTechGlobe() {
        if (!globeContainer || typeof THREE === 'undefined') {
            initCanvasTechGlobe();
            return;
        }
        
        const isMobile = window.innerWidth < 768;
        const width = isMobile ? 250 : 380;
        const height = isMobile ? 250 : 380;
        
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = null;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: !isMobile, // Disable antialiasing on mobile for performance
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
        globeContainer.innerHTML = '';
        globeContainer.appendChild(renderer.domElement);
        
        camera.position.z = isMobile ? 250 : 300;
        
        // Create network nodes (dots) on sphere surface
        const nodes = [];
        const nodeCount = isMobile ? 80 : 150; // Fewer nodes on mobile
        const radius = isMobile ? 80 : 100;
        
        // Generate nodes on sphere
        for (let i = 0; i < nodeCount; i++) {
            const theta = Math.random() * Math.PI * 2; // Longitude
            const phi = Math.acos(2 * Math.random() - 1); // Latitude
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            nodes.push({ x, y, z, theta, phi });
        }
        
        // Create node geometry and material
        const nodeGeometry = new THREE.SphereGeometry(isMobile ? 1.5 : 2, 8, 8);
        const nodeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.9
        });
        
        const nodeMeshes = [];
        nodes.forEach(node => {
            const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
            mesh.position.set(node.x, node.y, node.z);
            scene.add(mesh);
            nodeMeshes.push(mesh);
        });
        
        // Create connections (lines between nearby nodes)
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00b4d8,
            transparent: true,
            opacity: 0.3
        });
        
        const maxDistance = isMobile ? 40 : 50;
        nodes.forEach((node, i) => {
            nodes.forEach((otherNode, j) => {
                if (i < j) {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const dz = node.z - otherNode.z;
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    
                    if (distance < maxDistance) {
                        const geometry = new THREE.BufferGeometry().setFromPoints([
                            new THREE.Vector3(node.x, node.y, node.z),
                            new THREE.Vector3(otherNode.x, otherNode.y, otherNode.z)
                        ]);
                        const line = new THREE.Line(geometry, lineMaterial);
                        scene.add(line);
                    }
                }
            });
        });
        
        // Add outer sphere wireframe for tech feel
        const wireframeGeometry = new THREE.SphereGeometry(radius + 2, 32, 32);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            wireframe: true,
            transparent: true,
            opacity: 0.2
        });
        const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        scene.add(wireframe);
        
        // Add glow effect with point lights
        const glowColor = 0x00d4ff;
        const pointLight1 = new THREE.PointLight(glowColor, 0.5, 300);
        pointLight1.position.set(50, 50, 50);
        scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(glowColor, 0.3, 300);
        pointLight2.position.set(-50, -50, -50);
        scene.add(pointLight2);
        
        // Animation
        let rotationY = 0;
        const rotationSpeed = 0.001;
        
        const animate = () => {
            rotationY += rotationSpeed;
            
            // Rotate all nodes
            nodeMeshes.forEach((mesh, i) => {
                const node = nodes[i];
                const newTheta = node.theta + rotationY;
                mesh.position.x = radius * Math.sin(node.phi) * Math.cos(newTheta);
                mesh.position.y = radius * Math.sin(node.phi) * Math.sin(newTheta);
                mesh.position.z = radius * Math.cos(node.phi);
            });
            
            wireframe.rotation.y = rotationY;
            
            // Subtle floating
            const floatY = Math.sin(Date.now() * 0.001) * 2;
            nodeMeshes.forEach(mesh => {
                mesh.position.y += floatY * 0.01;
            });
            wireframe.position.y = floatY;
            
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    function initCanvasTechGlobe() {
        if (!globeContainer) return;
        
        const isMobile = window.innerWidth < 768;
        const canvas = document.createElement('canvas');
        canvas.className = 'globe-canvas';
        globeContainer.innerHTML = '';
        globeContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const dpr = isMobile ? 1.5 : 2;
        const width = isMobile ? 250 : 380;
        const height = isMobile ? 250 : 380;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = isMobile ? 100 : 150;
        const nodeCount = isMobile ? 60 : 100;
        
        // Generate nodes
        const nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
            const y = centerY + radius * Math.sin(phi) * Math.sin(theta);
            nodes.push({ x, y, theta, phi });
        }
        
        let rotation = 0;
        const rotationSpeed = 0.002;
        
        const drawGlobe = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Draw connections first
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.25)';
            ctx.lineWidth = 0.5;
            const maxDistance = isMobile ? 50 : 70;
            
            nodes.forEach((node, i) => {
                const nodeX = centerX + radius * Math.sin(node.phi) * Math.cos(node.theta + rotation);
                const nodeY = centerY + radius * Math.sin(node.phi) * Math.sin(node.theta + rotation);
                
                nodes.forEach((otherNode, j) => {
                    if (i < j) {
                        const otherX = centerX + radius * Math.sin(otherNode.phi) * Math.cos(otherNode.theta + rotation);
                        const otherY = centerY + radius * Math.sin(otherNode.phi) * Math.sin(otherNode.theta + rotation);
                        
                        const dx = nodeX - otherX;
                        const dy = nodeY - otherY;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < maxDistance) {
                            ctx.beginPath();
                            ctx.moveTo(nodeX, nodeY);
                            ctx.lineTo(otherX, otherY);
                            ctx.stroke();
                        }
                    }
                });
            });
            
            // Draw nodes (dots)
            nodes.forEach(node => {
                const nodeX = centerX + radius * Math.sin(node.phi) * Math.cos(node.theta + rotation);
                const nodeY = centerY + radius * Math.sin(node.phi) * Math.sin(node.theta + rotation);
                
                // Glow effect
                const gradient = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, 8);
                gradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
                gradient.addColorStop(0.5, 'rgba(0, 180, 219, 0.4)');
                gradient.addColorStop(1, 'rgba(0, 180, 219, 0)');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(nodeX, nodeY, 8, 0, Math.PI * 2);
                ctx.fill();
                
                // Dot
                ctx.fillStyle = '#00d4ff';
                ctx.beginPath();
                ctx.arc(nodeX, nodeY, isMobile ? 2 : 3, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Outer wireframe circle
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Grid lines
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
            ctx.lineWidth = 0.5;
            for (let lat = -80; lat <= 80; lat += 30) {
                const y = centerY + (lat / 90) * radius;
                ctx.beginPath();
                ctx.ellipse(centerX, y, radius, radius * 0.4, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            for (let lon = 0; lon < 360; lon += 45) {
                const angle = (lon + rotation * 57.3) * Math.PI / 180;
                ctx.beginPath();
                ctx.ellipse(centerX, centerY, radius, radius, angle, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            rotation += rotationSpeed;
            if (rotation > Math.PI * 2) rotation = 0;
            requestAnimationFrame(drawGlobe);
        };
        
        drawGlobe();
    }
    
    // Initialize tech globe
    if (globeContainer) {
        if (typeof THREE !== 'undefined') {
            initTechGlobe();
        } else {
            const checkThree = setInterval(() => {
                if (typeof THREE !== 'undefined') {
                    clearInterval(checkThree);
                    initTechGlobe();
                }
            }, 100);
            
            setTimeout(() => {
                if (typeof THREE === 'undefined') {
                    clearInterval(checkThree);
                    initCanvasTechGlobe();
                }
            }, 2000);
        }
    }

});

