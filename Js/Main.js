document.addEventListener("DOMContentLoaded", function() {

    // --- Hamburger Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        mainNav.classList.toggle('active');
    });

    // --- Portfolio Image Switching ---
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    const portfolioImagesContainer = document.getElementById('portfolio-images');

    // Define the HTML for your Graphic Design and UI/UX projects
    const graphicDesignProjects = `
        <div class="project-card">
            <img src="assets/graphic-placeholder1.jpg" alt="Graphic Design Project 1">
            <div class="project-overlay">
                <a href="#" class="view-btn">View <i class="fas fa-eye"></i></a>
                <div class="tools-label">Tools: Adobe Photoshop, Illustrator</div>
            </div>
        </div>
        <div class="project-card">
            <img src="assets/graphic-placeholder2.jpg" alt="Graphic Design Project 2">
            <div class="project-overlay">
                <a href="#" class="view-btn">View <i class="fas fa-eye"></i></a>
                <div class="tools-label">Tools: Adobe InDesign, Figma</div>
            </div>
        </div>
    `;

    const uiuxProjects = `
        <div class="project-card">
            <img src="assets/uiux-placeholder1.jpg" alt="UI/UX Project 1">
            <div class="project-overlay">
                <a href="#" class="view-btn">View <i class="fas fa-eye"></i></a>
                <div class="tools-label">Tools: Figma, Adobe XD</div>
            </div>
        </div>
        <div class="project-card">
            <img src="assets/uiux-placeholder2.jpg" alt="UI/UX Project 2">
            <div class="project-overlay">
                <a href="#" class="view-btn">View <i class="fas fa-eye"></i></a>
                <div class="tools-label">Tools: Sketch, InVision</div>
            </div>
        </div>
    `;

    // Set default content on page load
    portfolioImagesContainer.innerHTML = graphicDesignProjects;

    portfolioButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove 'active' class from all buttons
            portfolioButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            if (category === 'graphic') {
                portfolioImagesContainer.innerHTML = graphicDesignProjects;
            } else if (category === 'uiux') {
                portfolioImagesContainer.innerHTML = uiuxProjects;
            }
        });
    });

});
