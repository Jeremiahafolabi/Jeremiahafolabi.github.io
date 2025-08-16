document.addEventListener('DOMContentLoaded', function() {

    // Helper function to get project images by ID
    const getProjectImages = (projectId) => {
        // This is a placeholder for your project images.
        // In a real application, you would fetch these dynamically.
        // For now, we'll use a hardcoded list for demonstration.
        const projectImages = {
            '1': ['https://via.placeholder.com/800x600?text=Graphic+Design+1', 'https://via.placeholder.com/800x600?text=Graphic+Design+1-2', 'https://via.placeholder.com/800x600?text=Graphic+Design+1-3', 'https://via.placeholder.com/800x600?text=Graphic+Design+1-4', 'https://via.placeholder.com/800x600?text=Graphic+Design+1-5', 'https://via.placeholder.com/800x600?text=Graphic+Design+1-6', 'https://via.placeholder.com/800x600?text=Graphic+Design+1-7', 'https://via.placeholder.com/800x600?text=Graphic+Design+1-8'],
            '2': ['https://via.placeholder.com/800x600?text=Graphic+Design+2', 'https://via.placeholder.com/800x600?text=Graphic+Design+2-2', 'https://via.placeholder.com/800x600?text=Graphic+Design+2-3', 'https://via.placeholder.com/800x600?text=Graphic+Design+2-4', 'https://via.placeholder.com/800x600?text=Graphic+Design+2-5', 'https://via.placeholder.com/800x600?text=Graphic+Design+2-6', 'https://via.placeholder.com/800x600?text=Graphic+Design+2-7', 'https://via.placeholder.com/800x600?text=Graphic+Design+2-8'],
            '3': ['https://via.placeholder.com/800x600?text=Graphic+Design+3', 'https://via.placeholder.com/800x600?text=Graphic+Design+3-2', 'https://via.placeholder.com/800x600?text=Graphic+Design+3-3', 'https://via.placeholder.com/800x600?text=Graphic+Design+3-4', 'https://via.placeholder.com/800x600?text=Graphic+Design+3-5', 'https://via.placeholder.com/800x600?text=Graphic+Design+3-6', 'https://via.placeholder.com/800x600?text=Graphic+Design+3-7', 'https://via.placeholder.com/800x600?text=Graphic+Design+3-8'],
            '4': ['https://via.placeholder.com/800x600?text=Graphic+Design+4', 'https://via.placeholder.com/800x600?text=Graphic+Design+4-2', 'https://via.placeholder.com/800x600?text=Graphic+Design+4-3', 'https://via.placeholder.com/800x600?text=Graphic+Design+4-4', 'https://via.placeholder.com/800x600?text=Graphic+Design+4-5', 'https://via.placeholder.com/800x600?text=Graphic+Design+4-6', 'https://via.placeholder.com/800x600?text=Graphic+Design+4-7', 'https://via.placeholder.com/800x600?text=Graphic+Design+4-8'],
            '5': ['https://via.placeholder.com/800x600?text=Graphic+Design+5', 'https://via.placeholder.com/800x600?text=Graphic+Design+5-2', 'https://via.placeholder.com/800x600?text=Graphic+Design+5-3', 'https://via.placeholder.com/800x600?text=Graphic+Design+5-4', 'https://via.placeholder.com/800x600?text=Graphic+Design+5-5', 'https://via.placeholder.com/800x600?text=Graphic+Design+5-6', 'https://via.placeholder.com/800x600?text=Graphic+Design+5-7', 'https://via.placeholder.com/800x600?text=Graphic+Design+5-8'],
            '6': ['https://via.placeholder.com/800x600?text=Graphic+Design+6', 'https://via.placeholder.com/800x600?text=Graphic+Design+6-2', 'https://via.placeholder.com/800x600?text=Graphic+Design+6-3', 'https://via.placeholder.com/800x600?text=Graphic+Design+6-4', 'https://via.placeholder.com/800x600?text=Graphic+Design+6-5', 'https://via.placeholder.com/800x600?text=Graphic+Design+6-6', 'https://via.placeholder.com/800x600?text=Graphic+Design+6-7', 'https://via.placeholder.com/800x600?text=Graphic+Design+6-8'],
            '7': ['https://via.placeholder.com/800x600?text=UIUX+Design+1', 'https://via.placeholder.com/800x600?text=UIUX+Design+1-2', 'https://via.placeholder.com/800x600?text=UIUX+Design+1-3', 'https://via.placeholder.com/800x600?text=UIUX+Design+1-4', 'https://via.placeholder.com/800x600?text=UIUX+Design+1-5', 'https://via.placeholder.com/800x600?text=UIUX+Design+1-6', 'https://via.placeholder.com/800x600?text=UIUX+Design+1-7', 'https://via.placeholder.com/800x600?text=UIUX+Design+1-8'],
            '8': ['https://via.placeholder.com/800x600?text=UIUX+Design+2', 'https://via.placeholder.com/800x600?text=UIUX+Design+2-2', 'https://via.placeholder.com/800x600?text=UIUX+Design+2-3', 'https://via.placeholder.com/800x600?text=UIUX+Design+2-4', 'https://via.placeholder.com/800x600?text=UIUX+Design+2-5', 'https://via.placeholder.com/800x600?text=UIUX+Design+2-6', 'https://via.placeholder.com/800x600?text=UIUX+Design+2-7', 'https://via.placeholder.com/800x600?text=UIUX+Design+2-8'],
            '9': ['https://via.placeholder.com/800x600?text=UIUX+Design+3', 'https://via.placeholder.com/800x600?text=UIUX+Design+3-2', 'https://via.placeholder.com/800x600?text=UIUX+Design+3-3', 'https://via.placeholder.com/800x600?text=UIUX+Design+3-4', 'https://via.placeholder.com/800x600?text=UIUX+Design+3-5', 'https://via.placeholder.com/800x600?text=UIUX+Design+3-6', 'https://via.placeholder.com/800x600?text=UIUX+Design+3-7', 'https://via.placeholder.com/800x600?text=UIUX+Design+3-8'],
            '10': ['https://via.placeholder.com/800x600?text=UIUX+Design+4', 'https://via.placeholder.com/800x600?text=UIUX+Design+4-2', 'https://via.placeholder.com/800x600?text=UIUX+Design+4-3', 'https://via.placeholder.com/800x600?text=UIUX+Design+4-4', 'https://via.placeholder.com/800x600?text=UIUX+Design+4-5', 'https://via.placeholder.com/800x600?text=UIUX+Design+4-6', 'https://via.placeholder.com/800x600?text=UIUX+Design+4-7', 'https://via.placeholder.com/800x600?text=UIUX+Design+4-8'],
            '11': ['https://via.placeholder.com/800x600?text=UIUX+Design+5', 'https://via.placeholder.com/800x600?text=UIUX+Design+5-2', 'https://via.placeholder.com/800x600?text=UIUX+Design+5-3', 'https://via.placeholder.com/800x600?text=UIUX+Design+5-4', 'https://via.placeholder.com/800x600?text=UIUX+Design+5-5', 'https://via.placeholder.com/800x600?text=UIUX+Design+5-6', 'https://via.placeholder.com/800x600?text=UIUX+Design+5-7', 'https://via.placeholder.com/800x600?text=UIUX+Design+5-8'],
            '12': ['https://via.placeholder.com/800x600?text=UIUX+Design+6', 'https://via.placeholder.com/800x600?text=UIUX+Design+6-2', 'https://via.placeholder.com/800x600?text=UIUX+Design+6-3', 'https://via.placeholder.com/800x600?text=UIUX+Design+6-4', 'https://via.placeholder.com/800x600?text=UIUX+Design+6-5', 'https://via.placeholder.com/800x600?text=UIUX+Design+6-6', 'https://via.placeholder.com/800x600?text=UIUX+Design+6-7', 'https://via.placeholder.com/800x600?text=UIUX+Design+6-8']
        };
        return projectImages[projectId] || [];
    };

    const modal = document.getElementById('project-modal');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const modalImage = document.getElementById('modal-image');
    const modalImagesMobile = document.querySelector('.modal-images-mobile');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const tabButtons = document.querySelectorAll('.tab-button');

    let currentProjectImages = [];
    let currentImageIndex = 0;

    const isMobile = () => window.innerWidth <= 768;

    // Open Modal Function
    const openModal = (projectId) => {
        currentProjectImages = getProjectImages(projectId);
        currentImageIndex = 0;

        if (isMobile()) {
            modalImagesMobile.innerHTML = '';
            const scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'scroll-indicator';
            scrollIndicator.innerHTML = '<small>Scroll up/down to see more</small>';
            modalImagesMobile.appendChild(scrollIndicator);

            currentProjectImages.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                modalImagesMobile.appendChild(img);
            });
            modalImagesMobile.style.display = 'flex';
        } else {
            modalImage.src = currentProjectImages[currentImageIndex];
            modalImage.style.display = 'block';
        }

        modal.style.display = 'block';
    };

    // Modal navigation for desktop
    const showNextImage = () => {
        if (currentProjectImages.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
            modalImage.src = currentProjectImages[currentImageIndex];
        }
    };

    const showPrevImage = () => {
        if (currentProjectImages.length > 0) {
            currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
            modalImage.src = currentProjectImages[currentImageIndex];
        }
    };

    // Event Listeners
    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Check if the click was on the view button, if so, open the modal
            if (e.target.closest('.view-button') || e.target.closest('.image-wrapper')) {
                const projectId = this.getAttribute('data-project-id');
                openModal(projectId);
            }
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        modalImagesMobile.innerHTML = '';
    });

    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Close modal on outside click
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalImagesMobile.innerHTML = '';
        }
    });

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');

            document.querySelector('.tab-button.active').classList.remove('active');
            button.classList.add('active');

            document.querySelector('.portfolio-grid.active').classList.remove('active');
            document.getElementById(tab).classList.add('active');
        });
    });

});
