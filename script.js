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


// Contact Form Handling with EmailJS
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// EmailJS Configuration
// TODO: Replace these with your actual EmailJS credentials
// Get them from https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS Public Key

// Initialize EmailJS when page loads
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

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
            // Check if EmailJS is configured
            if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
                EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
                EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
                // Fallback: Show success message but log data to console
                console.log('Contact Form Submission:', {
                    name,
                    email,
                    phone,
                    subject: subjectText,
                    message
                });
                showFormMessage('Thank you for your message! We will get back to you soon. (Note: EmailJS not configured - please check SETUP_EMAILJS.md)', 'success');
                contactForm.reset();
            } else {
                // Send email using EmailJS
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    phone: phone,
                    subject: subjectText,
                    message: message,
                    to_email: 'info@dinhlegroup.com'
                };

                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
                
                showFormMessage('Thank you for your message! We have received your inquiry and will get back to you soon.', 'success');
                contactForm.reset();
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly at info@dinhlegroup.com', 'error');
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.intro-card, .location-card, .service-card, .portfolio-item, .mission-card, .leader-card, .feature-item, .gallery-item, .feature-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});

