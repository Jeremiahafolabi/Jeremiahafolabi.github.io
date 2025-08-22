document.addEventListener('DOMContentLoaded', function () {
  // ======================
  // Mobile Navigation
  // ======================
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenu.addEventListener('click', () => {
    const expanded = mobileMenu.getAttribute('aria-expanded') === 'true';
    mobileMenu.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // ======================
  // Smooth Scrolling
  // ======================
  navLinks.forEach(link => link.addEventListener('click', smoothScroll));
  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
  }

  // ======================
  // Back to Top Button
  // ======================
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTop.classList.add('active');
    else backToTop.classList.remove('active');
  });
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ======================
  // Portfolio Data (6 per category)
  // ======================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.querySelector('.portfolio-grid');

  // NOTE: Per request, remove tool descriptions and any texts on placeholders.
  // Card shows only the bottom-left "Project Title" label + sticky View button.
  const placeholder = 'assets/placeholder.jpg'; // swap with actual placeholder image
  const projects = [
    // Graphic (6)
    { id: 1, title: 'Project Title', category: 'graphic', image: 'assets/project1.jpg',
      images: ['assets/project1-1.jpg','assets/project1-2.jpg','assets/project1-3.jpg','assets/project1-4.jpg','assets/project1-5.jpg','assets/project1-6.jpg','assets/project1-7.jpg','assets/project1-8.jpg'] },
    { id: 2, title: 'Project Title', category: 'graphic', image: 'assets/project2.jpg',
      images: ['assets/project2-1.jpg','assets/project2-2.jpg','assets/project2-3.jpg','assets/project2-4.jpg','assets/project2-5.jpg','assets/project2-6.jpg','assets/project2-7.jpg','assets/project2-8.jpg'] },
    { id: 3, title: 'Project Title', category: 'graphic', image: 'assets/project3.jpg',
      images: ['assets/project3-1.jpg','assets/project3-2.jpg','assets/project3-3.jpg','assets/project3-4.jpg','assets/project3-5.jpg','assets/project3-6.jpg','assets/project3-7.jpg','assets/project3-8.jpg'] },
    { id: 7, title: 'Project Title', category: 'graphic', image: placeholder,
      images: [placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder] },
    { id: 8, title: 'Project Title', category: 'graphic', image: placeholder,
      images: [placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder] },
    { id: 9, title: 'Project Title', category: 'graphic', image: placeholder,
      images: [placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder] },

    // UI/UX (6)
    { id: 4, title: 'Project Title', category: 'uiux', image: 'assets/project4.jpg',
      images: ['assets/project4-1.jpg','assets/project4-2.jpg','assets/project4-3.jpg','assets/project4-4.jpg','assets/project4-5.jpg','assets/project4-6.jpg','assets/project4-7.jpg','assets/project4-8.jpg'] },
    { id: 5, title: 'Project Title', category: 'uiux', image: 'assets/project5.jpg',
      images: ['assets/project5-1.jpg','assets/project5-2.jpg','assets/project5-3.jpg','assets/project5-4.jpg','assets/project5-5.jpg','assets/project5-6.jpg','assets/project5-7.jpg','assets/project5-8.jpg'] },
    { id: 6, title: 'Project Title', category: 'uiux', image: 'assets/project6.jpg',
      images: ['assets/project6-1.jpg','assets/project6-2.jpg','assets/project6-3.jpg','assets/project6-4.jpg','assets/project6-5.jpg','assets/project6-6.jpg','assets/project6-7.jpg','assets/project6-8.jpg'] },
    { id:10, title: 'Project Title', category: 'uiux', image: placeholder,
      images: [placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder] },
    { id:11, title: 'Project Title', category: 'uiux', image: placeholder,
      images: [placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder] },
    { id:12, title: 'Project Title', category: 'uiux', image: placeholder,
      images: [placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder,placeholder] },
  ];

  // Default active filter
  filterButtons[0].classList.add('active');
  displayProjects('graphic');

  // Filter interactions
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      displayProjects(button.dataset.filter);
    });
  });

  function displayProjects(filter) {
    portfolioGrid.innerHTML = '';
    const filtered = projects.filter(p => p.category === filter);
    filtered.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.dataset.id = project.id;

      projectCard.innerHTML = `
        <img src="${project.image}" alt="Project image" class="project-img" />
        <div class="project-caption"><span>Project Title</span></div>
        <button class="view-project-btn" type="button" aria-label="View Project">View</button>
      `;

      // Open modal on image or button click
      projectCard.querySelector('.project-img').addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(project.id, 0);
      });
      projectCard.querySelector('.view-project-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(project.id, 0);
      });

      // Also allow clicking the whole card (optional)
      projectCard.addEventListener('click', () => openModal(project.id, 0));

      portfolioGrid.appendChild(projectCard);
    });
  }

  // ======================
  // Project Modal
  // ======================
  const modal = document.getElementById('project-modal');
  const modalImages = document.querySelector('.modal-images');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  const prevImageBtn = document.getElementById('prev-image');
  const nextImageBtn = document.getElementById('next-image');
  const successModal = document.getElementById('success-modal');

  let currentProject = null;
  let currentImageIndex = 0;

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }
  
function openModal(projectId, startIndex = 0) {
    currentProject = projects.find(p => p.id === projectId);
    if (!currentProject) return;
    
    currentImageIndex = startIndex;
    modalImages.innerHTML = '';

    if (isMobile()) {
      // Mobile: stack all 8 images, show scroll hint; nav arrows hidden via CSS
      currentProject.images.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Project image ${idx + 1}`;
        modalImages.appendChild(img);
      });
      
    } else {
      // Desktop: show only one image at a time; nav arrows cycle within THIS project only
      const img = document.createElement('img');
      img.src = currentProject.images[currentImageIndex];
      img.alt = `Project image ${currentImageIndex + 1}`;
      modalImages.appendChild(img);
    }

    modal.classList.add('active');
    document.body.classList.add('no-scroll');
}

  function closeModal() {
    modal.classList.remove('active');
    successModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    currentProject = null;
    currentImageIndex = 0;
  }

  // Close modal buttons
  closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

  // Close when clicking outside container
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Desktop-only image navigation within current project (no cross-project jumping)
  function showDesktopImage(index) {
    if (!currentProject) return;
    modalImages.innerHTML = '';
    const total = currentProject.images.length;
    currentImageIndex = (index + total) % total;
    const img = document.createElement('img');
    img.src = currentProject.images[currentImageIndex];
    img.alt = `Project image ${currentImageIndex + 1}`;
    modalImages.appendChild(img);
  }

  prevImageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMobile() || !currentProject) return;
    showDesktopImage(currentImageIndex - 1);
  });

  nextImageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMobile() || !currentProject) return;
    showDesktopImage(currentImageIndex + 1);
  });

  // Keyboard navigation on desktop
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active') || isMobile() || !currentProject) return;
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowLeft') showDesktopImage(currentImageIndex - 1);
    else if (e.key === 'ArrowRight') showDesktopImage(currentImageIndex + 1);
  });

  // ======================
  // Contact Form Handling
  // ======================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = this.elements['name'].value.trim();
      const email = this.elements['email'].value.trim();
      const message = this.elements['message'].value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }

      fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          successModal.classList.add('active');
          document.body.classList.add('no-scroll');
          this.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      }).catch(() => {
        alert('There was a problem sending your message. Please try again later.');
      });
    });
  }

  // Close success modal
  document.querySelector('#success-modal .close-modal').addEventListener('click', () => {
    successModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});
