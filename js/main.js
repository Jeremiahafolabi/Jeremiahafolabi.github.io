document.addEventListener('DOMContentLoaded', () => {
    // Project Data (Replace with your own project images and data)
    const projects = {
        'graphic-design': [
            {
                title: 'Brand Design: Case study 1',
                images: [
                    'https://via.placeholder.com/1200x800/ff9800',
                    'https://via.placeholder.com/1200x800/ff9800',
                    'https://via.placeholder.com/1200x800/ff9800',
                    'https://via.placeholder.com/1200x800/ff9800',
                    'https://via.placeholder.com/1200x800/ff9800',
                    'https://via.placeholder.com/1200x800/ff9800',
                    'https://via.placeholder.com/1200x800/ff9800',
                    'https://via.placeholder.com/1200x800/ff9800'
                ]
            },
            // Add more graphic design projects here
        ],
        'uiux-design': [
            {
                title: 'UI/UX Project: Landing Page',
                images: [
                    'https://via.placeholder.com/1200x800/0f0f0f',
                    'https://via.placeholder.com/1200x800/0f0f0f',
                    'https://via.placeholder.com/1200x800/0f0f0f',
                    'https://via.placeholder.com/1200x800/0f0f0f',
                    'https://via.placeholder.com/1200x800/0f0f0f',
                    'https://via.placeholder.com/1200x800/0f0f0f',
                    'https://via.placeholder.com/1200x800/0f0f0f',
                    'https://via.placeholder.com/1200x800/0f0f0f'
                ]
            },
            // Add more UI/UX projects here
        ]
    };
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a, .back-to-top, .cta-buttons a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Back-to-top button visibility
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Portfolio tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tab).classList.add('active');
        });
    });

    // Modal functionality for project viewing
    const modal = document.getElementById('modal');
    const modalImagesContainer = document.querySelector('.modal-images');
    const closeBtn = document.querySelector('.close-btn');
    const navArrows = document.querySelectorAll('.nav-arrow');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    const openModal = (project) => {
        modal.classList.add('active');
        modalImagesContainer.innerHTML = '';
        project.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = project.title;
            modalImagesContainer.appendChild(img);
        });
    };

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-btn')) {
                const projectId = card.dataset.projectId;
                const tabId = card.closest('.tab-content').id;
                const project = projects[tabId].find(p => p.id == projectId);
                if (project) {
                    openModal(project);
                }
            }
        });
    });
    
    // Add event listener to each card for modal opening
    document.querySelectorAll('.project-card').forEach((card, index) => {
        const tabId = card.closest('.tab-content').id;
        const project = projects[tabId][index];
        card.addEventListener('click', () => {
            openModal(project);
        });
    });


    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Modal navigation arrows
    navArrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const currentScroll = modalImagesContainer.scrollLeft;
            const imageWidth = modalImagesContainer.firstElementChild.offsetWidth + 16; // 16px is the gap
            if (arrow.classList.contains('left')) {
                modalImagesContainer.scrollBy({ left: -imageWidth, behavior: 'smooth' });
            } else {
                modalImagesContainer.scrollBy({ left: imageWidth, behavior: 'smooth' });
            }
        });
    });


    // Formspree Integration and Confirmation Message
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Thank you! Your message has been sent successfully.');
                form.reset();
            } else {
                alert('Oops! There was an error submitting your form.');
            }
        });
    }

    // Download CV button functionality
    const downloadCvBtn = document.querySelector('.download-cv');
    downloadCvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Replace 'your-cv-file.pdf' with the actual path to your CV file
        const cvPath = 'your-cv-file.pdf';
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'Afolabi_Jeremiah_Boluwatife_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
