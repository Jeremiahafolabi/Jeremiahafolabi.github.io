document.addEventListener("DOMContentLoaded", function() {

    // --- Elements ---
    const mobileMenu = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    // --- Hamburger Menu Toggle ---
    if (mobileMenu && mainNav) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            mainNav.classList.toggle('active');
        });
    }

    // --- Auto-close mobile menu on link click ---
    if (mobileMenu && mainNav && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mobileMenu.classList.remove('is-active');
                    mainNav.classList.remove('active');
                }
            });
        });
    }

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Portfolio Image Switching ---
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    const portfolioImagesContainer = document.getElementById('portfolio-images');

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

    if (portfolioImagesContainer) {
        portfolioImagesContainer.innerHTML = graphicDesignProjects;
    }

    // Highlight active section in nav
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href").substring(1) === entry.target.id
        );
      });
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => {
  observer.observe(section);
});

    if (portfolioButtons.length > 0 && portfolioImagesContainer) {
        portfolioButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                portfolioButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.getAttribute('data-category');
                if (category === 'graphic') {
                    portfolioImagesContainer.innerHTML = graphicDesignProjects;
                } else if (category === 'uiux') {
                    portfolioImagesContainer.innerHTML = uiuxProjects;
                }
            });
        });
    }

    // Back to top button visibility
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

});
