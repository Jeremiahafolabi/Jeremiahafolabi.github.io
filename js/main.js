document.addEventListener('DOMContentLoaded', () => {
    // Portfolio Data (can be replaced with a dynamic data source)
    const portfolioData = {
        'graphic-design': [
            { id: 1, title: 'Project Title 1', images: ['https://via.placeholder.com/800x600?text=Graphic+Design+1+Image+1', 'https://via.placeholder.com/800x600?text=Graphic+Design+1+Image+2'] },
            { id: 2, title: 'Project Title 2', images: ['https://via.placeholder.com/800x600?text=Graphic+Design+2+Image+1', 'https://via.placeholder.com/800x600?text=Graphic+Design+2+Image+2'] },
            { id: 3, title: 'Project Title 3', images: ['https://via.placeholder.com/800x600?text=Graphic+Design+3+Image+1', 'https://via.placeholder.com/800x600?text=Graphic+Design+3+Image+2'] },
            { id: 4, title: 'Project Title 4', images: ['https://via.placeholder.com/800x600?text=Graphic+Design+4+Image+1', 'https://via.placeholder.com/800x600?text=Graphic+Design+4+Image+2'] },
            { id: 5, title: 'Project Title 5', images: ['https://via.placeholder.com/800x600?text=Graphic+Design+5+Image+1', 'https://via.placeholder.com/800x600?text=Graphic+Design+5+Image+2'] },
            { id: 6, title: 'Project Title 6', images: ['https://via.placeholder.com/800x600?text=Graphic+Design+6+Image+1', 'https://via.placeholder.com/800x600?text=Graphic+Design+6+Image+2'] },
        ],
        'uiux-design': [
            { id: 7, title: 'UIUX Project 1', images: ['https://via.placeholder.com/800x600?text=UIUX+Design+1+Image+1', 'https://via.placeholder.com/800x600?text=UIUX+Design+1+Image+2'] },
            { id: 8, title: 'UIUX Project 2', images: ['https://via.placeholder.com/800x600?text=UIUX+Design+2+Image+1', 'https://via.placeholder.com/800x600?text=UIUX+Design+2+Image+2'] },
            { id: 9, title: 'UIUX Project 3', images: ['https://via.placeholder.com/800x600?text=UIUX+Design+3+Image+1', 'https://via.placeholder.com/800x600?text=UIUX+Design+3+Image+2'] },
            { id: 10, title: 'UIUX Project 4', images: ['https://via.placeholder.com/800x600?text=UIUX+Design+4+Image+1', 'https://via.placeholder.com/800x600?text=UIUX+Design+4+Image+2'] },
            { id: 11, title: 'UIUX Project 5', images: ['https://via.placeholder.com/800x600?text=UIUX+Design+5+Image+1', 'https://via.placeholder.com/800x600?text=UIUX+Design+5+Image+2'] },
            { id: 12, title: 'UIUX Project 6', images: ['https://via.placeholder.com/800x600?text=UIUX+Design+6+Image+1', 'https://via.placeholder.com/800x600?text=UIUX+Design+6+Image+2'] },
        ]
    };

    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const portfolioGrids = document.querySelectorAll('.portfolio-grid');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and grids
            tabButtons.forEach(btn => btn.classList.remove('active'));
            portfolioGrids.forEach(grid => grid.classList.remove('active'));

            // Add active class to the clicked button and corresponding grid
            const targetTab = button.getAttribute('data-tab');
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Modal Functionality
    const modal = document.getElementById("project-modal");
    const closeButton = document.querySelector(".close-button");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const modalImage = document.getElementById("modal-image");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const modalMobileImages = document.querySelector(".modal-images-mobile");
    const modalDesktopCarousel = document.querySelector(".modal-carousel-desktop");

    let currentProjectImages = [];
    let currentImageIndex = 0;
    let currentProjectType = '';
    
    // Function to handle opening the modal
    const openModal = (projectId) => {
        let foundProject = null;
        for (const type in portfolioData) {
            foundProject = portfolioData[type].find(p => p.id == projectId);
            if (foundProject) {
                currentProjectType = type;
                break;
            }
        }
    
        if (foundProject) {
            currentProjectImages = foundProject.images;
            currentImageIndex = 0;
    
            if (window.innerWidth <= 768) {
                // Mobile View
                modalDesktopCarousel.style.display = 'none';
                modalMobileImages.style.display = 'flex';
                modalMobileImages.innerHTML = ''; // Clear previous images
                currentProjectImages.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = foundProject.title;
                    modalMobileImages.appendChild(img);
                });
                const scrollIndicator = document.createElement('div');
                scrollIndicator.className = 'scroll-indicator';
                scrollIndicator.innerHTML = '<small>Scroll up/down to see more</small>';
                modalMobileImages.prepend(scrollIndicator);
            } else {
                // Desktop View
                modalDesktopCarousel.style.display = 'flex';
                modalMobileImages.style.display = 'none';
                modalImage.src = currentProjectImages[currentImageIndex];
            }
            modal.style.display = "block";
        }
    };
    
    // Function to change image in desktop view
    const showImage = (n) => {
        currentImageIndex += n;
        if (currentImageIndex >= currentProjectImages.length) {
            currentImageIndex = 0;
        }
        if (currentImageIndex < 0) {
            currentImageIndex = currentProjectImages.length - 1;
        }
        modalImage.src = currentProjectImages[currentImageIndex];
    };
    
    // Event listeners for portfolio items
    portfolioItems.forEach(item => {
        item.querySelector('.view-button').addEventListener('click', () => {
            const projectId = item.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    // Event listeners for modal navigation
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    prevButton.addEventListener("click", () => showImage(-1));
    nextButton.addEventListener("click", () => showImage(1));

    // Responsive behavior for the modal
    window.addEventListener('resize', () => {
        if (modal.style.display === "block") {
            const projectId = document.querySelector(`.portfolio-item[data-project-id='${currentProjectImages[0].split('/').pop().match(/\d+/)}']`).getAttribute('data-project-id');
            openModal(projectId);
        }
    });
});
