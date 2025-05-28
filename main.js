// YADA-EXPERIENCE Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileNavToggle.querySelector('i').classList.remove('fa-times');
                    mobileNavToggle.querySelector('i').classList.add('fa-bars');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (testimonialItems.length > 0) {
        let currentTestimonial = 0;
        
        // Function to show testimonial by index
        function showTestimonial(index) {
            testimonialItems.forEach(item => item.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonialItems[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            currentTestimonial = index;
        }
        
        // Event listeners for dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Event listeners for prev/next buttons
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                let newIndex = currentTestimonial - 1;
                if (newIndex < 0) newIndex = testimonialItems.length - 1;
                showTestimonial(newIndex);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                let newIndex = currentTestimonial + 1;
                if (newIndex >= testimonialItems.length) newIndex = 0;
                showTestimonial(newIndex);
            });
        }
        
        // Auto-rotate testimonials
        setInterval(() => {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonialItems.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 8000);
    }
    
    // Add animation classes on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.why-us-item, .value-item, .program-card, .feature-card, .event-card, .donation-option');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.why-us-item, .value-item, .program-card, .feature-card, .event-card, .donation-option').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (valid) {
                // Show success message
                const formContainer = contactForm.parentElement;
                formContainer.innerHTML = `
                    <div style="text-align: center; padding: 30px;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--playful-teal); margin-bottom: 20px;"></i>
                        <h3>Message Sent!</h3>
                        <p>Thank you for reaching out. We'll get back to you soon!</p>
                    </div>
                `;
            }
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value.trim()) {
                // Show success message
                const formContainer = newsletterForm.parentElement;
                const originalContent = formContainer.innerHTML;
                
                formContainer.innerHTML = `
                    <div style="text-align: center;">
                        <i class="fas fa-paper-plane" style="font-size: 3rem; color: white; margin-bottom: 20px;"></i>
                        <h2>You're on the list!</h2>
                        <p>Thank you for subscribing to our newsletter.</p>
                    </div>
                `;
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    formContainer.innerHTML = originalContent;
                    const newForm = formContainer.querySelector('.newsletter-form');
                    if (newForm) {
                        newForm.addEventListener('submit', arguments.callee);
                    }
                }, 5000);
            }
        });
    }
});
