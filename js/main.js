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

 // ==================================
// NEW MODAL SETUP
// ==================================
const newModal = document.getElementById('new-modal');
const closeNewModalBtn = document.querySelector('.close-new-modal');
const modalTitle = document.getElementById('modal-title');
const modalImageContainer = document.getElementById('modal-image-container');

// A function to open the new modal
function openNewModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  modalTitle.textContent = project.name;
  modalImageContainer.innerHTML = ''; // Clear previous images

  // For mobile mode, display all images in a vertical, scrollable stack
  if (window.matchMedia('(max-width: 768px)').matches) {
    project.images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      modalImageContainer.appendChild(img);
    });
    // This will force the scroll to the top once the images are loaded
    // We use a small delay to ensure the modal is fully rendered
    setTimeout(() => {
        modalImageContainer.scrollTop = 0;
    }, 100);
  } else {
    // For desktop, just display the first image (or handle as per your desktop logic)
    const img = document.createElement('img');
    img.src = project.images[0];
    modalImageContainer.appendChild(img);
  }

  newModal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevents background scrolling
}

// A function to close the new modal
function closeNewModal() {
  newModal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enables background scrolling
}

// Event listeners for opening and closing the modal
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Make sure you have a way to get the project ID from your card
    const projectId = e.currentTarget.getAttribute('data-project-id'); 
    openNewModal(projectId);
  });
});

closeNewModalBtn.addEventListener('click', closeNewModal);

// Close when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === newModal) {
    closeNewModal();
  }
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
