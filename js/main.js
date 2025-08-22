// ===== PORTFOLIO WEBSITE JAVASCRIPT =====
// Main functionality for the responsive portfolio website

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION FUNCTIONALITY =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        const isExpanded = navMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    // ===== SMOOTH SCROLLING & ACTIVE NAV LINKS =====
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
        
        // Show/hide back to top button
        toggleBackToTopButton();
        
        lastScrollTop = scrollTop;
    });
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.querySelector('.back-to-top');
    
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== PORTFOLIO TABS FUNCTIONALITY =====
    const tabButtons = document.querySelectorAll('.tab-button');
    const portfolioContents = document.querySelectorAll('.portfolio-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            portfolioContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            const targetContent = document.querySelector(`#${targetTab}-panel`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // ===== PROJECT MODAL FUNCTIONALITY =====
    const modal = document.querySelector('.project-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.querySelector('#modal-title');
    const galleryTrack = document.querySelector('#gallery-track');
    const mobileGalleryContainer = document.querySelector('#mobile-gallery-container');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    
    let currentImageIndex = 0;
    let totalImages = 0;
    
    // Sample project data - you can modify this to match your actual projects
    const projectData = {
        'graphic-1': {
            title: 'Brand Identity Design',
            images: [
                'https://via.placeholder.com/800x600/333333/ffffff?text=Brand+Identity+1',
                'https://via.placeholder.com/800x600/333333/ffffff?text=Brand+Identity+2',
                'https://via.placeholder.com/800x600/333333/ffffff?text=Brand+Identity+3',
                'https://via.placeholder.com/800x600/333333/ffffff?text=Brand+Identity+4',
                'https://via.placeholder.com/800x600/333333/ffffff?text=Brand+Identity+5',
                'https://via.placeholder.com/800x600/333333/ffffff?text=Brand+Identity+6',
                'https://via.placeholder.com/800x600/333333/ffffff?text=Brand+Identity+7',
                'https://via.placeholder.com/800x600/333333/ffffff?text=Brand+Identity+8'
            ]
        },
        'graphic-2': {
            title: 'Logo Design',
            images: [
                'https://via.placeholder.com/800x600/444444/ffffff?text=Logo+Design+1',
                'https://via.placeholder.com/800x600/444444/ffffff?text=Logo+Design+2',
                'https://via.placeholder.com/800x600/444444/ffffff?text=Logo+Design+3',
                'https://via.placeholder.com/800x600/444444/ffffff?text=Logo+Design+4',
                'https://via.placeholder.com/800x600/444444/ffffff?text=Logo+Design+5',
                'https://via.placeholder.com/800x600/444444/ffffff?text=Logo+Design+6',
                'https://via.placeholder.com/800x600/444444/ffffff?text=Logo+Design+7',
                'https://via.placeholder.com/800x600/444444/ffffff?text=Logo+Design+8'
            ]
        },
        'graphic-3': {
            title: 'Print Design',
            images: [
                'https://via.placeholder.com/800x600/666666/ffffff?text=Print+Design+1',
                'https://via.placeholder.com/800x600/666666/ffffff?text=Print+Design+2',
                'https://via.placeholder.com/800x600/666666/ffffff?text=Print+Design+3',
                'https://via.placeholder.com/800x600/666666/ffffff?text=Print+Design+4',
                'https://via.placeholder.com/800x600/666666/ffffff?text=Print+Design+5',
                'https://via.placeholder.com/800x600/666666/ffffff?text=Print+Design+6',
                'https://via.placeholder.com/800x600/666666/ffffff?text=Print+Design+7',
                'https://via.placeholder.com/800x600/666666/ffffff?text=Print+Design+8'
            ]
        },
        'graphic-4': {
            title: 'Social Media Design',
            images: [
                'https://via.placeholder.com/800x600/777777/ffffff?text=Social+Media+1',
                'https://via.placeholder.com/800x600/777777/ffffff?text=Social+Media+2',
                'https://via.placeholder.com/800x600/777777/ffffff?text=Social+Media+3',
                'https://via.placeholder.com/800x600/777777/ffffff?text=Social+Media+4',
                'https://via.placeholder.com/800x600/777777/ffffff?text=Social+Media+5',
                'https://via.placeholder.com/800x600/777777/ffffff?text=Social+Media+6',
                'https://via.placeholder.com/800x600/777777/ffffff?text=Social+Media+7',
                'https://via.placeholder.com/800x600/777777/ffffff?text=Social+Media+8'
            ]
        },
        'graphic-5': {
            title: 'Packaging Design',
            images: [
                'https://via.placeholder.com/800x600/888888/ffffff?text=Packaging+1',
                'https://via.placeholder.com/800x600/888888/ffffff?text=Packaging+2',
                'https://via.placeholder.com/800x600/888888/ffffff?text=Packaging+3',
                'https://via.placeholder.com/800x600/888888/ffffff?text=Packaging+4',
                'https://via.placeholder.com/800x600/888888/ffffff?text=Packaging+5',
                'https://via.placeholder.com/800x600/888888/ffffff?text=Packaging+6',
                'https://via.placeholder.com/800x600/888888/ffffff?text=Packaging+7',
                'https://via.placeholder.com/800x600/888888/ffffff?text=Packaging+8'
            ]
        },
        'graphic-6': {
            title: 'Editorial Design',
            images: [
                'https://via.placeholder.com/800x600/999999/ffffff?text=Editorial+1',
                'https://via.placeholder.com/800x600/999999/ffffff?text=Editorial+2',
                'https://via.placeholder.com/800x600/999999/ffffff?text=Editorial+3',
                'https://via.placeholder.com/800x600/999999/ffffff?text=Editorial+4',
                'https://via.placeholder.com/800x600/999999/ffffff?text=Editorial+5',
                'https://via.placeholder.com/800x600/999999/ffffff?text=Editorial+6',
                'https://via.placeholder.com/800x600/999999/ffffff?text=Editorial+7',
                'https://via.placeholder.com/800x600/999999/ffffff?text=Editorial+8'
            ]
        },
        'uiux-1': {
            title: 'Mobile App Design',
            images: [
                'https://via.placeholder.com/400x800/555555/ffffff?text=Mobile+App+1',
                'https://via.placeholder.com/400x800/555555/ffffff?text=Mobile+App+2',
                'https://via.placeholder.com/400x800/555555/ffffff?text=Mobile+App+3',
                'https://via.placeholder.com/400x800/555555/ffffff?text=Mobile+App+4',
                'https://via.placeholder.com/400x800/555555/ffffff?text=Mobile+App+5',
                'https://via.placeholder.com/400x800/555555/ffffff?text=Mobile+App+6',
                'https://via.placeholder.com/400x800/555555/ffffff?text=Mobile+App+7',
                'https://via.placeholder.com/400x800/555555/ffffff?text=Mobile+App+8'
            ]
        },
        'uiux-2': {
            title: 'Website Redesign',
            images: [
                'https://via.placeholder.com/1200x800/666666/ffffff?text=Website+Redesign+1',
                'https://via.placeholder.com/1200x800/666666/ffffff?text=Website+Redesign+2',
                'https://via.placeholder.com/1200x800/666666/ffffff?text=Website+Redesign+3',
                'https://via.placeholder.com/1200x800/666666/ffffff?text=Website+Redesign+4',
                'https://via.placeholder.com/1200x800/666666/ffffff?text=Website+Redesign+5',
                'https://via.placeholder.com/1200x800/666666/ffffff?text=Website+Redesign+6',
                'https://via.placeholder.com/1200x800/666666/ffffff?text=Website+Redesign+7',
                'https://via.placeholder.com/1200x800/666666/ffffff?text=Website+Redesign+8'
            ]
        },
        'uiux-3': {
            title: 'E-commerce Platform',
            images: [
                'https://via.placeholder.com/1200x800/777777/ffffff?text=Ecommerce+1',
                'https://via.placeholder.com/1200x800/777777/ffffff?text=Ecommerce+2',
                'https://via.placeholder.com/1200x800/777777/ffffff?text=Ecommerce+3',
                'https://via.placeholder.com/1200x800/777777/ffffff?text=Ecommerce+4',
                'https://via.placeholder.com/1200x800/777777/ffffff?text=Ecommerce+5',
                'https://via.placeholder.com/1200x800/777777/ffffff?text=Ecommerce+6',
                'https://via.placeholder.com/1200x800/777777/ffffff?text=Ecommerce+7',
                'https://via.placeholder.com/1200x800/777777/ffffff?text=Ecommerce+8'
            ]
        },
        'uiux-4': {
            title: 'Dashboard Design',
            images: [
                'https://via.placeholder.com/1200x800/888888/ffffff?text=Dashboard+1',
                'https://via.placeholder.com/1200x800/888888/ffffff?text=Dashboard+2',
                'https://via.placeholder.com/1200x800/888888/ffffff?text=Dashboard+3',
                'https://via.placeholder.com/1200x800/888888/ffffff?text=Dashboard+4',
                'https://via.placeholder.com/1200x800/888888/ffffff?text=Dashboard+5',
                'https://via.placeholder.com/1200x800/888888/ffffff?text=Dashboard+6',
                'https://via.placeholder.com/1200x800/888888/ffffff?text=Dashboard+7',
                'https://via.placeholder.com/1200x800/888888/ffffff?text=Dashboard+8'
            ]
        },
        'uiux-5': {
            title: 'SaaS Application',
            images: [
                'https://via.placeholder.com/1200x800/999999/ffffff?text=SaaS+App+1',
                'https://via.placeholder.com/1200x800/999999/ffffff?text=SaaS+App+2',
                'https://via.placeholder.com/1200x800/999999/ffffff?text=SaaS+App+3',
                'https://via.placeholder.com/1200x800/999999/ffffff?text=SaaS+App+4',
                'https://via.placeholder.com/1200x800/999999/ffffff?text=SaaS+App+5',
                'https://via.placeholder.com/1200x800/999999/ffffff?text=SaaS+App+6',
                'https://via.placeholder.com/1200x800/999999/ffffff?text=SaaS+App+7',
                'https://via.placeholder.com/1200x800/999999/ffffff?text=SaaS+App+8'
            ]
        },
        'uiux-6': {
            title: 'Landing Page',
            images: [
                'https://via.placeholder.com/1200x800/aaaaaa/ffffff?text=Landing+Page+1',
                'https://via.placeholder.com/1200x800/aaaaaa/ffffff?text=Landing+Page+2',
                'https://via.placeholder.com/1200x800/aaaaaa/ffffff?text=Landing+Page+3',
                'https://via.placeholder.com/1200x800/aaaaaa/ffffff?text=Landing+Page+4',
                'https://via.placeholder.com/1200x800/aaaaaa/ffffff?text=Landing+Page+5',
                'https://via.placeholder.com/1200x800/aaaaaa/ffffff?text=Landing+Page+6',
                'https://via.placeholder.com/1200x800/aaaaaa/ffffff?text=Landing+Page+7',
                'https://via.placeholder.com/1200x800/aaaaaa/ffffff?text=Landing+Page+8'
            ]
        }
    };
    
    // Open project modal
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                openModal(project);
            }
        });
    });
    
    function openModal(project) {
        modalTitle.textContent = project.title;
        currentImageIndex = 0;
        totalImages = project.images.length;
        
        // Clear existing images
        galleryTrack.innerHTML = '';
        mobileGalleryContainer.innerHTML = '';
        
        // Load images for desktop gallery
        project.images.forEach((imageSrc, index) => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `${project.title} - Image ${index + 1}`;
            img.loading = 'lazy';
            galleryTrack.appendChild(img);
            
            // Clone for mobile gallery
            const mobileImg = img.cloneNode();
            mobileImg.loading = index < 3 ? 'eager' : 'lazy'; // Load first 3 images eagerly on mobile
            mobileGalleryContainer.appendChild(mobileImg);
        });
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus management for accessibility
        modalClose.focus();
        
        // Update gallery position
        updateGalleryPosition();
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Close modal events
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Gallery navigation
    function updateGalleryPosition() {
        const imageWidth = galleryTrack.firstElementChild ? galleryTrack.firstElementChild.offsetWidth : 0;
        const gap = 20; // Gap between images
        const translateX = -(currentImageIndex * (imageWidth + gap));
        galleryTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update navigation button states
        prevBtn.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentImageIndex === totalImages - 1 ? '0.5' : '1';
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === totalImages - 1;
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateGalleryPosition();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentImageIndex < totalImages - 1) {
            currentImageIndex++;
            updateGalleryPosition();
        }
    });
    
    // Keyboard navigation for gallery
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
    
    // ===== CONTACT FORM FUNCTIONALITY =====
    const contactForm = document.querySelector('#contact-form');
    const formSuccess = document.querySelector('#form-success');
    const submitBtn = document.querySelector('#submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const errorElement = document.querySelector(`#${field.id}-error`);
            
            if (!field.value.trim()) {
                showFieldError(field, errorElement, `${field.labels[0].textContent} is required`);
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                showFieldError(field, errorElement, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearFieldError(field, errorElement);
            }
        });
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFieldError(field, errorElement, message) {
        field.style.borderColor = '#ff4444';
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearFieldError(field, errorElement) {
        field.style.borderColor = '';
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        // Create FormData object
        const formData = new FormData(contactForm);
        
        // Submit to Formspree (replace YOUR_FORM_ID with actual Formspree form ID)
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                    resetSubmitButton();
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
            resetSubmitButton();
        });
    });
    
    function resetSubmitButton() {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
    
    // ===== LAZY LOADING FOR IMAGES =====
    // Intersection Observer for lazy loading portfolio images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    // Observe all portfolio images
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    portfolioImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===== SMOOTH REVEAL ANIMATIONS =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Add reveal animation to sections
    const sectionsToReveal = document.querySelectorAll('.about, .portfolio, .testimonials, .contact');
    sectionsToReveal.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });
    
    // CSS for revealed state (add this dynamically)
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Debounce scroll events for better performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        updateActiveNavLink();
        toggleBackToTopButton();
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    
    // Keyboard navigation for portfolio items
    portfolioItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus trap for modal
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusableEls = element.querySelectorAll(focusableElements);
        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableEl) {
                        lastFocusableEl.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Apply focus trap to modal
    modal.addEventListener('transitionend', function() {
        if (this.classList.contains('active')) {
            trapFocus(this);
        }
    });
    
    // ===== WINDOW RESIZE HANDLER =====
    window.addEventListener('resize', debounce(function() {
        // Update gallery position on resize
        if (modal.classList.contains('active')) {
            updateGalleryPosition();
        }
        
        // Close mobile menu on desktop
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }, 250));
    
    // ===== TOUCH/SWIPE FUNCTIONALITY FOR MOBILE GALLERY =====
    let startX = null;
    let startY = null;
    let currentX = null;
    let currentY = null;
    
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
    
    function handleTouchMove(e) {
        if (!startX || !startY) {
            return;
        }
        
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
        
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Only handle horizontal swipes for desktop gallery
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault(); // Prevent vertical scrolling
            
            if (diffX > 50 && currentImageIndex < totalImages - 1) {
                // Swipe left - next image
                nextBtn.click();
            } else if (diffX < -50 && currentImageIndex > 0) {
                // Swipe right - previous image
                prevBtn.click();
            }
        }
    }
    
    function handleTouchEnd() {
        startX = null;
        startY = null;
        currentX = null;
        currentY = null;
    }
    
    // Add touch events to desktop gallery
    const desktopGallery = document.querySelector('.desktop-gallery');
    desktopGallery.addEventListener('touchstart', handleTouchStart, { passive: false });
    desktopGallery.addEventListener('touchmove', handleTouchMove, { passive: false });
    desktopGallery.addEventListener('touchend', handleTouchEnd);
    
    // ===== TYPING ANIMATION FOR HERO SECTION =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }
    
    // Initialize typing animation on page load
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        window.addEventListener('load', () => {
            setTimeout(() => {
                typeWriter(heroTitle, originalText, 50);
            }, 500);
        });
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== PARALLAX EFFECT FOR HERO SECTION =====
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }
    
    window.addEventListener('scroll', debounce(parallaxScroll, 10));
    
    // ===== TESTIMONIALS SLIDER =====
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;
    
    function showTestimonials() {
        // Auto-rotate testimonials on larger screens
        if (window.innerWidth > 768 && testimonialItems.length > 3) {
            testimonialItems.forEach((item, index) => {
                item.style.opacity = '0.3';
                item.style.transform = 'scale(0.9)';
            });
            
            // Show current set of 3 testimonials
            for (let i = 0; i < 3; i++) {
                const index = (currentTestimonial + i) % testimonialItems.length;
                testimonialItems[index].style.opacity = '1';
                testimonialItems[index].style.transform = 'scale(1)';
            }
            
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        }
    }
    
    // Initialize testimonials rotation
    setInterval(showTestimonials, 5000);
    
    // ===== SKILLS PROGRESS ANIMATION =====
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                entry.target.style.animationDelay = `${Array.from(skillItems).indexOf(entry.target) * 0.1}s`;
            }
        });
    }, { threshold: 0.1 });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        skillsObserver.observe(item);
    });
    
    // Add keyframes for skills animation
    const skillsStyle = document.createElement('style');
    skillsStyle.textContent = `
        @keyframes slideInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(skillsStyle);
    
    // ===== PORTFOLIO FILTER ANIMATION =====
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    function animatePortfolioItems() {
        const visibleItems = portfolioGrid.querySelectorAll('.portfolio-item');
        visibleItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Trigger animation when tab changes
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            setTimeout(animatePortfolioItems, 100);
        });
    });
    
    // ===== FORM ENHANCEMENTS =====
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    // Add floating label effect
    formInputs.forEach(input => {
        const label = input.previousElementSibling;
        
        // Check if input has value on page load
        if (input.value) {
            label.classList.add('active');
        }
        
        input.addEventListener('focus', () => {
            label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.classList.remove('active');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', () => {
            const errorElement = document.querySelector(`#${input.id}-error`);
            
            if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
                showFieldError(input, errorElement, 'Please enter a valid email address');
            } else if (input.hasAttribute('required') && !input.value.trim()) {
                showFieldError(input, errorElement, `${input.labels[0].textContent} is required`);
            } else {
                clearFieldError(input, errorElement);
            }
        });
    });
    
    // Add floating label styles
    const floatingLabelStyle = document.createElement('style');
    floatingLabelStyle.textContent = `
        .form-group {
            position: relative;
        }
        
        .form-group label {
            position: absolute;
            top: 12px;
            left: 15px;
            transition: all 0.3s ease;
            pointer-events: none;
            color: #999;
        }
        
        .form-group label.active,
        .form-group input:focus + label,
        .form-group textarea:focus + label {
            top: -8px;
            left: 10px;
            font-size: 0.8rem;
            color: #ff9800;
            background: #0f0f0f;
            padding: 0 5px;
        }
        
        .form-group input:not(:placeholder-shown) + label,
        .form-group textarea:not(:placeholder-shown) + label {
            top: -8px;
            left: 10px;
            font-size: 0.8rem;
            color: #ff9800;
            background: #0f0f0f;
            padding: 0 5px;
        }
    `;
    document.head.appendChild(floatingLabelStyle);
    
    // ===== SCROLL PROGRESS INDICATOR =====
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ff9800, #ffb74d);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', debounce(updateScrollProgress, 10));
    
    // ===== PRELOADER =====
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0f0f0f;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid #333;
        border-top: 3px solid #ff9800;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
    
    preloader.appendChild(spinner);
    document.body.appendChild(preloader);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
    
    // ===== SOCIAL MEDIA HOVER EFFECTS =====
    const socialLinks = document.querySelectorAll('.social-links a, .footer-social a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== INITIAL SETUP =====
    
    // Set initial active nav link
    updateActiveNavLink();
    
    // Initialize testimonials
    showTestimonials();
    
    // Preload critical images
    const heroImage = document.querySelector('.profile-image img');
    if (heroImage && heroImage.src) {
        const preloadImage = new Image();
        preloadImage.src = heroImage.src;
    }
    
    // Add loading completed class to body
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            animatePortfolioItems();
        }, 500);
    });
    
    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You can add error reporting here if needed
    });
    
    // ===== UTILITY FUNCTIONS =====
    
    // Smooth scroll to element
    function scrollToElement(element, offset = 80) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Get element's offset from top
    function getElementOffset(element) {
        let offsetTop = 0;
        while (element) {
            offsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        return offsetTop;
    }
    
    // Check if element is in viewport
    function isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -offset &&
            rect.left >= -offset &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
        );
    }
    
    // Format date
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }
    
    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // ===== LOCAL STORAGE UTILITIES (Optional) =====
    
    // Save user preferences
    function savePreference(key, value) {
        try {
            localStorage.setItem(`portfolio_${key}`, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    }
    
    // Get user preferences
    function getPreference(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`portfolio_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('LocalStorage not available:', e);
            return defaultValue;
        }
    }
    
    // Save last visited section
    window.addEventListener('beforeunload', () => {
        const activeLink = document.querySelector('.nav-menu a.active');
        if (activeLink) {
            savePreference('lastSection', activeLink.getAttribute('href'));
        }
    });
    
    // Restore last visited section
    const lastSection = getPreference('lastSection');
    if (lastSection && lastSection !== '#home') {
        setTimeout(() => {
            const section = document.querySelector(lastSection);
            if (section) {
                scrollToElement(section);
            }
        }, 1000);
    }
    
    // ===== ANALYTICS INTEGRATION (Optional) =====
    
    // Track portfolio item clicks
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project');
            // You can add Google Analytics or other tracking here
            console.log(`Portfolio item clicked: ${projectId}`);
        });
    });
    
    // Track form submissions
    contactForm.addEventListener('submit', () => {
        // You can add conversion tracking here
        console.log('Contact form submitted');
    });
    
    // ===== CONSOLE MESSAGES =====
    console.log('🎨 Portfolio website loaded successfully!');
    console.log('💡 To update project data, modify the projectData object in script.js');
    console.log('📧 Don\'t forget to update your Formspree form ID in the HTML');
    console.log('🚀 For best performance, optimize your images and add your own CDN');
    
    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // Press 'H' to go home
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.altKey && !e.target.matches('input, textarea')) {
            window.location.hash = '#home';
        }
        
        // Press 'P' to go to portfolio
        if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.altKey && !e.target.matches('input, textarea')) {
            window.location.hash = '#portfolio';
        }
        
        // Press 'C' to go to contact
        if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.altKey && !e.target.matches('input, textarea')) {
            window.location.hash = '#contact';
        }
    });
    
});

// ===== SERVICE WORKER REGISTRATION (Optional PWA Support) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
            console.log('✅ ServiceWorker registration successful');
        })
        .catch(function(error) {
            console.log('❌ ServiceWorker registration failed:', error);
        });
    });
}

// ===== EXTERNAL API INTEGRATIONS (Optional) =====

// GitHub API integration (if you want to show repositories)
async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

// Usage: fetchGitHubRepos('yourusername').then(repos => console.log(repos));

// ===== THEME TOGGLE (Optional Dark/Light Mode) =====
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    savePreference('theme', newTheme);
}

// Initialize theme
const savedTheme = getPreference('theme', 'dark');
document.body.setAttribute('data-theme', savedTheme);

// ===== INTERNATIONAL SUPPORT (Optional) =====
const translations = {
    en: {
        home: 'Home',
        about: 'About',
        portfolio: 'Portfolio',
        contact: 'Contact',
        downloadCV: 'Download CV',
        viewWork: 'View My Work'
    },
    es: {
        home: 'Inicio',
        about: 'Acerca',
        portfolio: 'Portafolio',
        contact: 'Contacto',
        downloadCV: 'Descargar CV',
        viewWork: 'Ver Mi Trabajo'
    }
    // Add more languages as needed
};

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    savePreference('language', lang);
}

// Initialize language
const savedLanguage = getPreference('language', 'en');
// setLanguage(savedLanguage); // Uncomment to enable translations
