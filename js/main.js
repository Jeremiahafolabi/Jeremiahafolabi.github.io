document.addEventListener('DOMContentLoaded', function () {
  // Add this line to reset the scroll position on page load
  window.scrollTo(0, 0);

  // ======================
  // Page Loader
  // ======================
  const pageLoader = document.getElementById('page-loader');

  // Hide the loader once the page content is fully loaded
  window.addEventListener('load', () => {
    if (pageLoader) {
      pageLoader.classList.add('hidden');
    }
  });

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

  navLinks.forEach(link => link.addEventListener('click', smoothScroll));

  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  }

  // ======================
  // Back to Top Button
  // ======================
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ======================
  // Portfolio Filtering & Lazy Loading
  // ======================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.querySelector('.portfolio-grid');
  const placeholder = 'assets/placeholder.jpg';

  const projects = [
    { id: 1, title: 'Grolie', category: 'graphic', image: 'assets/project1.webp', images: ['assets/project1-1.webp', 'assets/project1-2.webp', 'assets/project1-3.webp', 'assets/project1-4.webp', 'assets/project1-5.webp', 'assets/project1-6.webp', 'assets/project1-7.webp', 'assets/project1-8.webp', 'assets/project1-9.webp', 'assets/project1-10.webp', 'assets/project1-11.webp', 'assets/project1-12.webp', 'assets/project1-13.webp', 'assets/project1-14.webp'] },
    { id: 2, title: 'Revive Skincare', category: 'graphic', image: 'assets/project2.webp', images: ['assets/project2-1.webp', 'assets/project2-2.webp', 'assets/project2-3.webp', 'assets/project2-4.webp', 'assets/project2-5.webp', 'assets/project2-6.webp', 'assets/project2-7.webp', 'assets/project2-8.webp', 'assets/project2-9.webp', 'assets/project2-10.webp', 'assets/project2-11.webp', 'assets/project2-12.webp', 'assets/project2-13.webp', 'assets/project2-14.webp'] },
    { id: 3, title: 'Azurae', category: 'graphic', image: 'assets/project3.webp', images: ['assets/project3-1.webp', 'assets/project3-2.webp', 'assets/project3-3.webp', 'assets/project3-4.webp', 'assets/project3-5.webp', 'assets/project3-6.webp', 'assets/project3-7.webp', 'assets/project3-8.webp', 'assets/project3-9.webp', 'assets/project3-10.webp', 'assets/project3-11.webp', 'assets/project3-12.webp', 'assets/project3-13.webp', 'assets/project3-14.webp'] },
    { id: 4, title: 'Project Title', category: 'graphic', image: 'assets/project4.webp', images: ['assets/project4-1.webp', 'assets/project4-2.webp', 'assets/project4-3.webp', 'assets/project4-4.webp', 'assets/project4-5.webp', 'assets/project4-6.webp', 'assets/project4-7.webp', 'assets/project4-8.webp'] },
    { id: 5, title: 'Project Title', category: 'uiux', image: 'assets/project5.webp', images: ['assets/project5-1.webp', 'assets/project5-2.webp', 'assets/project5-3.webp', 'assets/project5-4.webp', 'assets/project5-5.webp', 'assets/project5-6.webp', 'assets/project5-7.webp', 'assets/project5-8.webp'] },
    { id: 6, title: 'Project Title', category: 'uiux', image: 'assets/project6.webp', images: ['assets/project6-1.webp', 'assets/project6-2.webp', 'assets/project6-3.webp', 'assets/project6-4.webp', 'assets/project6-5.webp', 'assets/project6-6.webp', 'assets/project6-7.webp', 'assets/project6-8.webp'] },
    { id: 7, title: 'Project Title', category: 'uiux', image: 'assets/project7.webp', images: ['assets/project7-1.webp', 'assets/project7-2.webp', 'assets/project7-3.webp', 'assets/project7-4.webp', 'assets/project7-5.webp', 'assets/project7-6.webp', 'assets/project7-7.webp', 'assets/project7-8.webp'] },
    { id: 8, title: 'Project Title', category: 'uiux', image: 'assets/project8.webp', images: ['assets/project8-1.webp', 'assets/project8-2.webp', 'assets/project8-3.webp', 'assets/project8-4.webp', 'assets/project8-5.webp', 'assets/project8-6.webp', 'assets/project8-7.webp', 'assets/project8-8.webp'] },
    { id: 9, title: 'Project Title', category: 'uiux', image: 'assets/project9.webp', images: ['assets/project9-1.webp', 'assets/project9-2.webp', 'assets/project9-3.webp', 'assets/project9-4.webp', 'assets/project9-5.webp', 'assets/project9-6.webp', 'assets/project9-7.webp', 'assets/project9-8.webp'] },
    { id: 10, title: 'Project Title', category: 'uiux', image: 'assets/project10.webp', images: ['assets/project10-1.webp', 'assets/project10-2.webp', 'assets/project10-3.webp', 'assets/project10-4.webp', 'assets/project10-5.webp', 'assets/project10-6.webp', 'assets/project10-7.webp', 'assets/project10-8.webp'] },
  ];

  filterButtons[0].classList.add('active');
  displayProjects('graphic');

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

      // Use a data attribute for the real image and a placeholder src
      projectCard.innerHTML = `
        <img src="${placeholder}" data-src="${project.image}" alt="Project image" class="project-img lazy-load" />
        <div class="project-caption"><span>Project Title</span></div>
        <button class="view-project-btn" type="button" aria-label="View Project">View</button>
      `;

      projectCard.querySelector('.project-img').addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(project.id, 0);
      });
      projectCard.querySelector('.view-project-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(project.id, 0);
      });
      projectCard.addEventListener('click', () => openModal(project.id, 0));

      portfolioGrid.appendChild(projectCard);
    });

    // Observe the newly created images for lazy loading
    lazyLoadImages();
  }

  // New IntersectionObserver for lazy loading
  function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-load');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '0px 0px 100px 0px'
    });

    lazyImages.forEach(img => {
      observer.observe(img);
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
      currentProject.images.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Project image ${idx + 1}`;
        modalImages.appendChild(img);
      });
    } else {
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

  closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });

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

  prevImageBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (isMobile() || !currentProject) return;
    showDesktopImage(currentImageIndex - 1);
  });

  nextImageBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (isMobile() || !currentProject) return;
    showDesktopImage(currentImageIndex + 1);
  });

  document.addEventListener('keydown', e => {
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
        headers: {
          'Accept': 'application/json'
        }
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
