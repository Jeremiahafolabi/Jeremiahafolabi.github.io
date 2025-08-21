// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Project data for modal display
    const projectData = {
        'graphic-1': {
            title: 'Brand Design: Case Study 1',
            images: [
                'project1-1.jpg', 'project1-2.jpg', 'project1-3.jpg', 'project1-4.jpg',
                'project1-5.jpg', 'project1-6.jpg', 'project1-7.jpg', 'project1-8.jpg'
            ]
        },
        'graphic-2': {
            title: 'Logo Design Project',
            images: [
                'project2-1.jpg', 'project2-2.jpg', 'project2-3.jpg', 'project2-4.jpg',
                'project2-5.jpg', 'project2-6.jpg', 'project2-7.jpg', 'project2-8.jpg'
            ]
        },
        'graphic-3': {
            title: 'Branding Project',
            images: [
                'project3-1.jpg', 'project3-2.jpg', 'project3-3.jpg', 'project3-4.jpg',
                'project3-5.jpg', 'project3-6.jpg', 'project3-7.jpg', 'project3-8.jpg'
            ]
        },
        'graphic-4': {
            title: 'Print Design Project',
            images: [
                'project4-1.jpg', 'project4-2.jpg', 'project4-3.jpg', 'project4-4.jpg',
                'project4-5.jpg', 'project4-6.jpg', 'project4-7.jpg', 'project4-8.jpg'
            ]
        },
        'graphic-5': {
            title: 'Packaging Design',
            images: [
                'project5-1.jpg', 'project5-2.jpg', 'project5-3.jpg', 'project5-4.jpg',
                'project5-5.jpg', 'project5-6.jpg', 'project5-7.jpg', 'project5-8.jpg'
            ]
        },
        'graphic-6': {
            title: 'Corporate Identity',
            images: [
                'project6-1.jpg', 'project6-2.jpg', 'project6-3.jpg', 'project6-4.jpg',
                'project6-5.jpg', 'project6-6.jpg', 'project6-7.jpg', 'project6-8.jpg'
            ]
        },
        'uiux-1': {
            title: 'Mobile App Design',
            images: [
                'uiux1-1.jpg', 'uiux1-2.jpg', 'uiux1-3.jpg', 'uiux1-4.jpg',
                'uiux1-5.jpg', 'uiux1-6.jpg', 'uiux1-7.jpg', 'uiux1-8.jpg'
            ]
        },
        'uiux-2': {
            title: 'Web App Design',
            images: [
                'uiux2-1.jpg', 'uiux2-2.jpg', 'uiux2-3.jpg', 'uiux2-4.jpg',
                'uiux2-5.jpg', 'uiux2-6.jpg', 'uiux2-7.jpg', 'uiux2-8.jpg'
            ]
        },
        'uiux-3': {
            title: 'E-commerce Design',
            images: [
                'uiux3-1.jpg', 'uiux3-2.jpg', 'uiux3-3.jpg', 'uiux3-4.jpg',
                'uiux3-5.jpg', 'uiux3-6.jpg', 'uiux3-7.jpg', 'uiux3-8.jpg'
            ]
        },
        'uiux-4': {
            title: 'Dashboard Design',
            images: [
                'uiux4-1.jpg', 'uiux4-2.jpg', 'uiux4-3.jpg', 'uiux4-4.jpg',
                'uiux4-5.jpg', 'uiux4-6.jpg', 'uiux4-7.jpg', 'uiux4-8.jpg'
            ]
        },
        'uiux-5': {
            title: 'Landing Page Design',
            images: [
                'uiux5-1.jpg', 'uiux5-2.jpg', 'uiux5-3.jpg', 'uiux5-4.jpg',
                'uiux5-5.jpg', 'uiux5-6.jpg', 'uiux5-7.jpg', 'uiux5-8.jpg'
            ]
        },
        'uiux-6': {
            title: 'UX Case Study',
            images: [
                'uiux6-1.jpg', 'uiux6-2.jpg', 'uiux6-3.jpg', 'uiux6-4.jpg',
                'uiux6-5.jpg', 'uiux6-6.jpg', 'uiux6-7.jpg', 'uiux6-8.jpg'
            ]
        }
    };

    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Update active navigation link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            if (!this.classList.contains('mobile-nav-link')) {
                this.classList.add('active');
            } else {
                // Find corresponding desktop nav link and make it active
                const correspondingLink = document.querySelector(`.nav-link[href="${this.getAttribute('href')}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // Active Navigation Link on Scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // Portfolio Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'graphic' && category === 'graphic') {
                    item.classList.remove('hidden');
                } else if (filter === 'uiux' && category === 'uiux') {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Project Modal Functionality
    const modal = document.getElementById('projectModal');
    const modalTitle = document.querySelector('.modal-title');
    const modalPagination = document.querySelector('.modal-pagination');
    const modalImage = document.querySelector('.modal-image');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    let currentProject = null;
    let currentImageIndex = 0;

    // Open modal when clicking view button
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openModal(projectId);
        });
    });

    function openModal(projectId) {
        currentProject = projectData[projectId];
        currentImageIndex = 0;
        
        if (currentProject) {
            modalTitle.textContent = currentProject.title;
            updateModalImage();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function updateModalImage() {
        if (currentProject && currentProject.images[currentImageIndex]) {
            modalImage.src = currentProject.images[currentImageIndex];
            modalImage.alt = `${currentProject.title} - Image ${currentImageIndex + 1}`;
            modalPagination.textContent = `Page ${currentImageIndex + 1}/${currentProject.images.length}`;
        }
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentProject = null;
        currentImageIndex = 0;
    }

    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Modal navigation
    modalPrev.addEventListener('click', function() {
        if (currentProject && currentImageIndex > 0) {
            currentImageIndex--;
            updateModalImage();
        }
    });
