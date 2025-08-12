document.addEventListener("DOMContentLoaded", function() {

    // Elements
    const mobileMenu = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    const portfolioImagesContainer = document.getElementById('portfolio-images');

    // Hamburger Toggle
    if (mobileMenu && mainNav) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            mainNav.classList.toggle('active');
        });
    }

    // Auto-close Menu
    if (mobileMenu && mainNav) {
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mobileMenu.classList.remove('is-active');
                    mainNav.classList.remove('active');
                }
            });
        });
    }

    // Active Section Highlight
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
    sections.forEach(section => observer.observe(section));

    // Back to Top
    const backToTop = document.querySelector(".back-to-top");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    // Projects Data
    const projects = [
        { img: "assets/graphic-placeholder1.jpg", title: "Graphic Design Project 1", tools: "Adobe Photoshop, Illustrator" },
        { img: "assets/graphic-placeholder2.jpg", title: "Graphic Design Project 2", tools: "Adobe InDesign, Figma" },
        { img: "assets/uiux-placeholder1.jpg", title: "UI/UX Project 1", tools: "Figma, Adobe XD" },
        { img: "assets/uiux-placeholder2.jpg", title: "UI/UX Project 2", tools: "Sketch, InVision" }
    ];

    // Render Projects
    function renderProjects(category) {
        const filtered = category === 'graphic' ? projects.slice(0, 2) :
                         category === 'uiux' ? projects.slice(2) : projects;
        portfolioImagesContainer.innerHTML = filtered.map((p, index) => `
            <div class="project-card fade-in" data-index="${projects.indexOf(p)}">
                <img src="${p.img}" alt="${p.title}" loading="lazy">
                <div class="project-overlay">
                    <a href="#" class="view-btn" data-index="${projects.indexOf(p)}">
                        View <i class="fas fa-eye"></i>
                    </a>
                    <div class="tools-label">Tools: ${p.tools}</div>
                </div>
            </div>
        `).join('');
    }
    if (portfolioImagesContainer) {
        renderProjects('graphic');
    }

    // Filter Buttons
    portfolioButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            portfolioImagesContainer.classList.add('fade-out');
            setTimeout(() => {
                portfolioButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderProjects(button.getAttribute('data-category'));
                portfolioImagesContainer.classList.remove('fade-out');
                attachModalEvents();
            }, 300);
        });
    });

    // Modal
    const modal = document.getElementById("project-modal");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalTools = document.getElementById("modal-tools");
    const closeModal = document.querySelector(".close-modal");
    const prevProject = document.getElementById("prev-project");
    const nextProject = document.getElementById("next-project");
    let currentProjectIndex = 0;

    function openModal(index) {
        currentProjectIndex = index;
        const p = projects[currentProjectIndex];
        modalImage.src = p.img;
        modalTitle.textContent = p.title;
        modalTools.textContent = `Tools: ${p.tools}`;
        modal.style.display = "block";
    }
    function closeModalFunc() {
        modal.style.display = "none";
    }
    function showPrevProject() {
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        openModal(currentProjectIndex);
    }
    function showNextProject() {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        openModal(currentProjectIndex);
    }

    closeModal.addEventListener("click", closeModalFunc);
    prevProject.addEventListener("click", showPrevProject);
    nextProject.addEventListener("click", showNextProject);
    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModalFunc();
    });

    function attachModalEvents() {
        document.querySelectorAll(".view-btn, .project-card img").forEach(el => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                const index = parseInt(el.getAttribute("data-index") || el.closest(".project-card").dataset.index);
                openModal(index);
            });
        });
    }
    attachModalEvents();

    // Fade-in Animation
    const faders = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    });
    faders.forEach(el => fadeObserver.observe(el));

});
