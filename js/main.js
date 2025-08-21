// ===== PORTFOLIO WEBSITE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== GLOBAL VARIABLES =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const backToTopBtn = document.querySelector('.back-to-top');
    const portfolioFilters = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    const modal = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const contactForm = document.querySelector('.contact-form');
    const formSuccess = document.querySelector('.form-success');
    
    // Modal navigation elements
    const modalImages = document.querySelector('.modal-images');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');
    const modalTitle = document.querySelector('.modal-title');
    
    // Current project data
    let currentProject = null;
    let currentImageIndex = 0;
    
    // ===== PROJECT DATA =====
    // Note: Replace placeholder images with actual project images
    const projectData = {
        'graphic-1': {
            title: 'Brand Design: Case Study 1',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=Project+Image+1',
                'https://via.placeholder.com/800x600/333/666?text=Project+Image+2',
                'https://via.placeholder.com/800x600/333/666?text=Project+Image+3',
                'https://via.placeholder.com/800x600/333/666?text=Project+Image+4',
                'https://via.placeholder.com/800x600/333/666?text=Project+Image+5',
                'https://via.placeholder.com/800x600/333/666?text=Project+Image+6',
                'https://via.placeholder.com/800x600/333/666?text=Project+Image+7',
                'https://via.placeholder.com/800x600/333/666?text=Project+Image+8'
            ]
        },
        'graphic-2': {
            title: 'Logo Design Project',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=Logo+Design+1',
                'https://via.placeholder.com/800x600/333/666?text=Logo+Design+2',
                'https://via.placeholder.com/800x600/333/666?text=Logo+Design+3',
                'https://via.placeholder.com/800x600/333/666?text=Logo+Design+4',
                'https://via.placeholder.com/800x600/333/666?text=Logo+Design+5',
                'https://via.placeholder.com/800x600/333/666?text=Logo+Design+6',
                'https://via.placeholder.com/800x600/333/666?text=Logo+Design+7',
                'https://via.placeholder.com/800x600/333/666?text=Logo+Design+8'
            ]
        },
        'graphic-3': {
            title: 'Product Packaging Design',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=Packaging+1',
                'https://via.placeholder.com/800x600/333/666?text=Packaging+2',
                'https://via.placeholder.com/800x600/333/666?text=Packaging+3',
                'https://via.placeholder.com/800x600/333/666?text=Packaging+4',
                'https://via.placeholder.com/800x600/333/666?text=Packaging+5',
                'https://via.placeholder.com/800x600/333/666?text=Packaging+6',
                'https://via.placeholder.com/800x600/333/666?text=Packaging+7',
                'https://via.placeholder.com/800x600/333/666?text=Packaging+8'
            ]
        },
        'graphic-4': {
            title: 'Brand Identity Design',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=Brand+Identity+1',
                'https://via.placeholder.com/800x600/333/666?text=Brand+Identity+2',
                'https://via.placeholder.com/800x600/333/666?text=Brand+Identity+3',
                'https://via.placeholder.com/800x600/333/666?text=Brand+Identity+4',
                'https://via.placeholder.com/800x600/333/666?text=Brand+Identity+5',
                'https://via.placeholder.com/800x600/333/666?text=Brand+Identity+6',
                'https://via.placeholder.com/800x600/333/666?text=Brand+Identity+7',
                'https://via.placeholder.com/800x600/333/666?text=Brand+Identity+8'
            ]
        },
        'graphic-5': {
            title: 'Marketing Materials',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=Marketing+1',
                'https://via.placeholder.com/800x600/333/666?text=Marketing+2',
                'https://via.placeholder.com/800x600/333/666?text=Marketing+3',
                'https://via.placeholder.com/800x600/333/666?text=Marketing+4',
                'https://via.placeholder.com/800x600/333/666?text=Marketing+5',
                'https://via.placeholder.com/800x600/333/666?text=Marketing+6',
                'https://via.placeholder.com/800x600/333/666?text=Marketing+7',
                'https://via.placeholder.com/800x600/333/666?text=Marketing+8'
            ]
        },
        'graphic-6': {
            title: 'Print Design Collection',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=Print+Design+1',
                'https://via.placeholder.com/800x600/333/666?text=Print+Design+2',
                'https://via.placeholder.com/800x600/333/666?text=Print+Design+3',
                'https://via.placeholder.com/800x600/333/666?text=Print+Design+4',
                'https://via.placeholder.com/800x600/333/666?text=Print+Design+5',
                'https://via.placeholder.com/800x600/333/666?text=Print+Design+6',
                'https://via.placeholder.com/800x600/333/666?text=Print+Design+7',
                'https://via.placeholder.com/800x600/333/666?text=Print+Design+8'
            ]
        },
        'uiux-1': {
            title: 'Mobile App UI Design',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=Mobile+UI+1',
                'https://via.placeholder.com/800x600/333/666?text=Mobile+UI+2',
                'https://via.placeholder.com/800x600/333/666?text=Mobile+UI+3',
                'https://via.placeholder.com/800x600/333/666?text=Mobile+UI+4',
                'https://via.placeholder.com/800x600/333/666?text=Mobile+UI+5',
                'https://via.placeholder.com/800x600/333/666?text=Mobile+UI+6',
                'https://via.placeholder.com/800x600/333/666?text=Mobile+UI+7',
                'https://via.placeholder.com/800x600/333/666?text=Mobile+UI+8'
            ]
        },
        'uiux-2': {
            title: 'Web Application Design',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=Web+App+1',
                'https://via.placeholder.com/800x600/333/666?text=Web+App+2',
                'https://via.placeholder.com/800x600/333/666?text=Web+App+3',
                'https://via.placeholder.com/800x600/333/666?text=Web+App+4',
                'https://via.placeholder.com/800x600/333/666?text=Web+App+5',
                'https://via.placeholder.com/800x600/333/666?text=Web+App+6',
                'https://via.placeholder.com/800x600/333/666?text=Web+App+7',
                'https://via.placeholder.com/800x600/333/666?text=Web+App+8'
            ]
        },
        'uiux-3': {
            title: 'Dashboard UI Design',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=Dashboard+1',
                'https://via.placeholder.com/800x600/333/666?text=Dashboard+2',
                'https://via.placeholder.com/800x600/333/666?text=Dashboard+3',
                'https://via.placeholder.com/800x600/333/666?text=Dashboard+4',
                'https://via.placeholder.com/800x600/333/666?text=Dashboard+5',
                'https://via.placeholder.com/800x600/333/666?text=Dashboard+6',
                'https://via.placeholder.com/800x600/333/666?text=Dashboard+7',
                'https://via.placeholder.com/800x600/333/666?text=Dashboard+8'
            ]
        },
        'uiux-4': {
            title: 'E-commerce UX Design',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=Ecommerce+1',
                'https://via.placeholder.com/800x600/333/666?text=Ecommerce+2',
                'https://via.placeholder.com/800x600/333/666?text=Ecommerce+3',
                'https://via.placeholder.com/800x600/333/666?text=Ecommerce+4',
                'https://via.placeholder.com/800x600/333/666?text=Ecommerce+5',
                'https://via.placeholder.com/800x600/333/666?text=Ecommerce+6',
                'https://via.placeholder.com/800x600/333/666?text=Ecommerce+7',
                'https://via.placeholder.com/800x600/333/666?text=Ecommerce+8'
            ]
        },
        'uiux-5': {
            title: 'Landing Page Design',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=Landing+Page+1',
                'https://via.placeholder.com/800x600/333/666?text=Landing+Page+2',
                'https://via.placeholder.com/800x600/333/666?text=Landing+Page+3',
                'https://via.placeholder.com/800x600/333/666?text=Landing+Page+4',
                'https://via.placeholder.com/800x600/333/666?text=Landing+Page+5',
                'https://via.placeholder.com/800x600/333/666?text=Landing+Page+6',
                'https://via.placeholder.com/800x600/333/666?text=Landing+Page+7',
                'https://via.placeholder.com/800x600/333/666?text=Landing+Page+8'
            ]
        },
        'uiux-6': {
            title: 'User Experience Research',
            images: [
                'https://via.placeholder.com/800x600/333/666?text=UX+Research+1',
                'https://via.placeholder.com/800x600/333/666?text=UX+Research+2',
                'https://via.placeholder.com/800x600/333/666?text=UX+Research+3',
                'https://via.placeholder.com/800x600/333/666?text=UX+Research+4',
                'https://via.placeholder.com/800x600/333/666?text=UX+Research+5',
                'https://via.placeholder.com/800x600/333/666?text=UX+Research+6',
                'https://via.placeholder.com/800x600/333/666?text=UX+Research+7',
                'https://via.placeholder.com/800x600/333/666?text=UX+Research+8'
            ]
        }
    };
    
    // ===== INITIALIZATION =====
    init();
    
    function init() {
        // Initialize all functionality
        setupNavigation();
        setupScrollEffects();
        setupPortfolioFilters();
        setupModalFunctionality();
        setupContactForm();
        setupLazyLoading();
        
        // Update active navigation on scroll
        updateActiveNavigation();
        
        console.log('Portfolio website initialized successfully!');
    }
    
    // ===== NAVIGATION FUNCTIONALITY =====
    function setupNavigation() {
        // Mobile menu toggle
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Handle internal navigation
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Close mobile menu if open
                        closeMobileMenu();
                        
                        // Smooth scroll to target
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update active navigation
                        setTimeout(updateActiveNavigation, 500);
                    }
                }
            });
        });
        
        // Close mobile menu when clicking overlay
        if (mobileNavOverlay) {
            mobileNavOverlay.addEventListener('click', (e) => {
                if (e.target === mobileNavOverlay) {
                    closeMobileMenu();
                }
            });
        }
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
                closeModal();
            }
        });
    }
    
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update navigation active states
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // ===== SCROLL EFFECTS =====
    function setupScrollEffects() {
        // Back to top button
        window.addEventListener('scroll', throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show/hide back to top button
            if (backToTopBtn) {
                if (scrollTop > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }
            
            // Update active navigation
            updateActiveNavigation();
            
            // Header background opacity
            const header = document.querySelector('.header');
            if (header) {
                const opacity = Math.min(scrollTop / 100, 0.95);
                header.style.background = `rgba(15, 15, 15, ${opacity})`;
            }
        }, 100));
        
        // Back to top button click
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Intersection Observer for fade-in animations
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
        const animateElements = document.querySelectorAll('.portfolio-card, .testimonial-card, .skill-tag');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // ===== PORTFOLIO FILTERS =====
    function setupPortfolioFilters() {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                const filterValue = filter.getAttribute('data-filter');
                
                // Update active filter button
                portfolioFilters.forEach(btn => btn.classList.remove('active'));
                filter.classList.add('active');
                
                // Filter portfolio items with animation
                portfolioItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    setTimeout(() => {
                        if (category === filterValue) {
                            item.classList.remove('hidden');
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            
                            setTimeout(() => {
                                item.classList.add('hidden');
                            }, 300);
                        }
                    }, index * 50);
                });
            });
        });
        
        // Set initial filter styles
        portfolioItems.forEach(item => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }
    
    // ===== MODAL FUNCTIONALITY =====
    function setupModalFunctionality() {
        // View project buttons
        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                openModal(projectId);
            });
        });
        
        // Modal close button
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        // Close modal when clicking overlay
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
        
        // Modal navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => navigateModal('prev'));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => navigateModal('next'));
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal && modal.classList.contains('active')) {
                switch(e.key) {
                    case 'ArrowLeft':
                        navigateModal('prev');
                        break;
                    case 'ArrowRight':
                        navigateModal('next');
                        break;
                    case 'Escape':
                        closeModal();
                        break;
                }
            }
        });
        
        // Touch/swipe support for mobile
        setupTouchNavigation();
    }
    
    function openModal(projectId) {
        currentProject = projectData[projectId];
        
        if (!currentProject) {
            console.error(`Project ${projectId} not found`);
            return;
        }
        
        currentImageIndex = 0;
        
        // Update modal content
        if (modalTitle) {
            modalTitle.textContent = currentProject.title;
        }
        
        if (totalPagesSpan) {
            totalPagesSpan.textContent = currentProject.images.length;
        }
        
        // Load images
        loadModalImages();
        
        // Show modal
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        updateModalNavigation();
    }
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        currentProject = null;
        currentImageIndex = 0;
    }
    
    function loadModalImages() {
        if (!currentProject || !modalImages) return;
        
        modalImages.innerHTML = '';
        
        currentProject.images.forEach((imageSrc, index) => {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'modal-image';
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `${currentProject.title} - Image ${index + 1}`;
            img.loading = 'lazy';
            
            // Add error handling for images
            img.onerror = () => {
                img.src = 'https://via.placeholder.com/800x600/333/666?text=Image+Not+Found';
            };
            
            imageContainer.appendChild(img);
            modalImages.appendChild(imageContainer);
        });
        
        // Set initial position
        updateModalPosition();
    }
    
    function navigateModal(direction) {
        if (!currentProject) return;
        
        const totalImages = currentProject.images.length;
        
        if (direction === 'prev') {
            currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1;
        } else if (direction === 'next') {
            currentImageIndex = currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0;
        }
        
        updateModalPosition();
        updateModalNavigation();
    }
    
    function updateModalPosition() {
        if (!modalImages) return;
        
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile: vertical scroll
            const targetImage = modalImages.children[currentImageIndex];
            if (targetImage) {
                targetImage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Desktop: horizontal navigation
            const translateX = -currentImageIndex * 100;
            modalImages.style.transform = `translateX(${translateX}%)`;
        }
    }
    
    function updateModalNavigation() {
        if (currentPageSpan) {
            currentPageSpan.textContent = currentImageIndex + 1;
        }
        
        // Update navigation button states
        if (prevBtn) {
            prevBtn.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.style.opacity = currentImageIndex === currentProject.images.length - 1 ? '0.5' : '1';
        }
    }
    
    function setupTouchNavigation() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        if (modalImages) {
            modalImages.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
            });
            
            modalImages.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                currentX = e.touches[0].clientX;
            });
            
            modalImages.addEventListener('touchend', () => {
                if (!isDragging) return;
                
                const diffX = startX - currentX;
                const threshold = 50;
                
                if (Math.abs(diffX) > threshold) {
                    if (diffX > 0) {
                        navigateModal('next');
                    } else {
                        navigateModal('prev');
                    }
                }
                
                isDragging = false;
            });
        }
    }
    
    // ===== CONTACT FORM =====
    function setupContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
    }
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const formData = new FormData(contactForm);
        
        // Update button state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Replace with your actual Formspree endpoint
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.classList.remove('hidden');
                    formSuccess.classList.add('hidden');
                }, 5000);
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
            } else {
                throw new Error('Network response was not ok');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error sending your message. Please try again or contact me directly.');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    // ===== LAZY LOADING =====
    function setupLazyLoading() {
        // Lazy load images that are not immediately visible
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading animation
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ===== UTILITY FUNCTIONS =====
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
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Preload critical images
    function preloadCriticalImages() {
        const criticalImages = [
            'profile.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Initialize critical image preloading
    preloadCriticalImages();
    
    // ===== ERROR HANDLING =====
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // Could implement error reporting here
    });
    
    // ===== ADDITIONAL FUNCTIONALITY =====
    
    // Smooth reveal animations for elements
    function setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.hero-text, .about-text, .section-title');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            revealObserver.observe(el);
        });
    }
    
    // Initialize reveal animations
    setupRevealAnimations();
    
    // Dynamic year update for copyright
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.footer-content p');
    copyrightElements.forEach(el => {
        el.textContent = el.textContent.replace('2024', currentYear);
    });
    
    // Console welcome message
    console.log(`
    🎨 Portfolio Website Loaded Successfully!
    
    Built with:
    - Vanilla JavaScript
    - CSS Grid & Flexbox  
    - Intersection Observer API
    - Touch/Swipe Support
    - Responsive Design
    - Performance Optimizations
    
    Developer: Afolabi Jeremiah Boluwatife
    `);
    
});
