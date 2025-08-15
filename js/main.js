document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // Mobile Navigation
  // ======================
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Improved hamburger menu animation
  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // Fix mobile social media links
  const socialIcons = document.querySelectorAll('.header-social-icons a');
  socialIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
    });
  });

  // ======================
  // Smooth Scrolling
  // ======================
  navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ======================
  // Portfolio Filtering
  // ======================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.querySelector('.portfolio-grid');

  // Project data with 3 projects for each category
  const projects = [
    // Graphic Design Projects
    {
      id: 1,
      title: 'Project Title 1',
      category: 'graphic',
      image: 'assets/project1.jpg',
      images: [
        'assets/project1-1.jpg',
        'assets/project1-2.jpg',
        'assets/project1-3.jpg',
        'assets/project1-4.jpg',
        'assets/project1-5.jpg',
        'assets/project1-6.jpg',
        'assets/project1-7.jpg',
        'assets/project1-8.jpg'
      ]
    },
    {
      id: 2,
      title: 'Project Title 2',
      category: 'graphic',
      image: 'assets/project2.jpg',
      images: [
        'assets/project2-1.jpg',
        'assets/project2-2.jpg',
        'assets/project2-3.jpg',
        'assets/project2-4.jpg',
        'assets/project2-5.jpg',
        'assets/project2-6.jpg',
        'assets/project2-7.jpg',
        'assets/project2-8.jpg'
      ]
    },
    {
      id: 3,
      title: 'Project Title 3',
      category: 'graphic',
      image: 'assets/project3.jpg',
      images: [
        'assets/project3-1.jpg',
        'assets/project3-2.jpg',
        'assets/project3-3.jpg',
        'assets/project3-4.jpg',
        'assets/project3-5.jpg',
        'assets/project3-6.jpg',
        'assets/project3-7.jpg',
        'assets/project3-8.jpg'
      ]
    },
    // UI/UX Design Projects
    {
      id: 4,
      title: 'Project Title 4',
      category: 'uiux',
      image: 'assets/project4.jpg',
      images: [
        'assets/project4-1.jpg',
        'assets/project4-2.jpg',
        'assets/project4-3.jpg',
        'assets/project4-4.jpg',
        'assets/project4-5.jpg',
        'assets/project4-6.jpg',
        'assets/project4-7.jpg',
        'assets/project4-8.jpg'
      ]
    },
    {
      id: 5,
      title: 'Project Title 5',
      category: 'uiux',
      image: 'assets/project5.jpg',
      images: [
        'assets/project5-1.jpg',
        'assets/project5-2.jpg',
        'assets/project5-3.jpg',
        'assets/project5-4.jpg',
        'assets/project5-5.jpg',
        'assets/project5-6.jpg',
        'assets/project5-7.jpg',
        'assets/project5-8.jpg'
      ]
    },
    {
      id: 6,
      title: 'Project Title 6',
      category: 'uiux',
      image: 'assets/project6.jpg',
      images: [
        'assets/project6-1.jpg',
        'assets/project6-2.jpg',
        'assets/project6-3.jpg',
        'assets/project6-4.jpg',
        'assets/project6-5.jpg',
        'assets/project6-6.jpg',
        'assets/project6-7.jpg',
        'assets/project6-8.jpg'
      ]
    }
  ];

  // Set first filter button as active by default
  filterButtons[0].classList.add('active');
  displayProjects('graphic');

  // Filter projects
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter projects
      const filter = button.dataset.filter;
      displayProjects(filter);
    });
  });

  function displayProjects(filter) {
    portfolioGrid.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
      ? projects 
      : projects.filter(project => project.category === filter);
    
    filteredProjects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.dataset.id = project.id;
      projectCard.dataset.category = project.category;
      
      projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-img">
        <div class="project-overlay">
          <h3 class="project-title">${project.title}</h3>
          <span class="project-category">${project.category === 'graphic' ? 'Graphic Design' : 'UI/UX Design'}</span>
        </div>
        <button class="view-project-btn">View</button>
      `;
      
      // Click handler for the entire card
      projectCard.addEventListener('click', () => {
        openModal(project.id);
      });
      
      // Click handler for the view button (stops event bubbling)
      projectCard.querySelector('.view-project-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(project.id);
      });
      
      portfolioGrid.appendChild(projectCard);
    });
  }

  // ======================
  // Project Modal
  // ======================
  const modal = document.getElementById('project-modal');
  const modalImages = document.querySelector('.modal-images');
  const modalTitle = document.getElementById('modal-project-title');
  const closeModalBtn = document.querySelector('.close-modal');
  const prevProjectBtn = document.getElementById('prev-project');
  const nextProjectBtn = document.getElementById('next-project');
  const successModal = document.getElementById('success-modal');

  let currentProjectIndex = 0;
  let currentProjectImages = [];
  let currentImageIndex = 0;

  function openModal(projectId) {
    // Find the project
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return;
    
    const project = projects[projectIndex];
    currentProjectImages = project.images;
    currentImageIndex = 0;
    
    // Update modal content
    modalTitle.textContent = project.title;
    updateModalImages();
    
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function updateModalImages() {
    modalImages.innerHTML = '';
    
    // Add all images to modal
    currentProjectImages.forEach((img, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = img;
      imgElement.alt = `Project Image ${index + 1}`;
      if (index === currentImageIndex) {
        imgElement.style.display = 'block';
      } else {
        imgElement.style.display = 'none';
      }
      modalImages.appendChild(imgElement);
    });
  }

  function navigateImages(direction) {
    if (direction === 'prev') {
      currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
    } else {
      currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
    }
    updateModalImages();
  }

  function closeModal() {
    modal.classList.remove('active');
    successModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  // Event listeners
  closeModalBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  });

  prevProjectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateImages('prev');
  });

  nextProjectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateImages('next');
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      navigateImages('prev');
    } else if (e.key === 'ArrowRight') {
      navigateImages('next');
    }
  });

  // ======================
  // Contact Form Handling
  // ======================
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form validation
      const name = this.elements['name'].value.trim();
      const email = this.elements['email'].value.trim();
      const message = this.elements['message'].value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Submit form (using Formspree)
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
      }).catch(error => {
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
