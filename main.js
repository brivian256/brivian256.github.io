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
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        const icon = mobileNavToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    // Scroll to target
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Donation Amount Selection
    const donationAmounts = document.querySelectorAll('.donation-amount');
    if (donationAmounts.length > 0) {
        donationAmounts.forEach(amount => {
            amount.addEventListener('click', function() {
                donationAmounts.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                
                // Clear custom amount input when preset amount is selected
                const customInput = document.querySelector('.donation-custom input');
                if (customInput) {
                    customInput.value = '';
                }
            });
        });
        
        // Custom amount input handling
        const customInput = document.querySelector('.donation-custom input');
        if (customInput) {
            customInput.addEventListener('focus', function() {
                donationAmounts.forEach(item => item.classList.remove('active'));
            });
        }
    }
    
    // Form Submission Handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message (in production, would submit to server)
                const formParent = form.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your submission has been received.';
                
                // Replace form with success message
                formParent.innerHTML = '';
                formParent.appendChild(successMessage);
            }
        });
    });
    
    // Simple Testimonial Slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    
    if (testimonials.length > 1) {
        // Hide all testimonials except the first one
        for (let i = 1; i < testimonials.length; i++) {
            testimonials[i].style.display = 'none';
        }
        
        // Create navigation dots
        const sliderContainer = document.querySelector('.testimonial-slider');
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        for (let i = 0; i < testimonials.length; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
            
            // Add click event to dots
            dot.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                showTestimonial(index);
            });
        }
        
        sliderContainer.appendChild(dotsContainer);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Function to show specific testimonial
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(item => {
                item.style.display = 'none';
            });
            
            // Show selected testimonial
            testimonials[index].style.display = 'block';
            
            // Update active dot
            const dots = document.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            dots[index].classList.add('active');
            
            // Update current index
            currentTestimonial = index;
        }
        
        // Add CSS for dots
        const style = document.createElement('style');
        style.textContent = `
            .slider-dots {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
            .dot {
                width: 12px;
                height: 12px;
                background-color: #ddd;
                border-radius: 50%;
                margin: 0 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            .dot.active {
                background-color: var(--deep-purple);
            }
            .testimonial-item {
                transition: opacity 0.5s ease;
            }
            .success-message {
                text-align: center;
                padding: 30px;
                color: #28a745;
                font-size: 1.2rem;
            }
            .success-message i {
                font-size: 3rem;
                margin-bottom: 15px;
                display: block;
            }
            .form-control.error {
                border-color: #dc3545;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Check if we need placeholder images
    const eventImages = document.querySelectorAll('.event-image');
    eventImages.forEach(img => {
        // Add placeholder background if image doesn't load
        img.addEventListener('error', function() {
            this.style.backgroundColor = '#f0f0f0';
            this.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999;"><i class="fas fa-image" style="font-size: 3rem;"></i></div>';
        });
    });
    
    // Add active class to current section in navigation
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 200; // Offset for better UX
        
        // Find all sections with IDs
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call to set active link
    updateActiveNavLink();
});
