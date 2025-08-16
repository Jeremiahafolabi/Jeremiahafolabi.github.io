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

  // Updated project data with 6 projects for each category
  const projects = [
    // Graphic Design Projects (6 projects)
    {
      id: 1,
      title: 'Project Title',
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
      title: 'Project Title',
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
      title: 'Project Title',
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
    {
      id: 4,
      title: 'Project Title',
      category: 'graphic',
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
      title: 'Project Title',
      category: 'graphic',
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
      title: 'Project Title',
      category: 'graphic',
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
    },
    // UI/UX Design Projects (6 projects)
    {
      id: 7,
      title: 'Project Title',
      category: 'uiux',
      image: 'assets/project7.jpg',
      images: [
        'assets/project7-1.jpg',
        'assets/project7-2.jpg',
        'assets/project7-3.jpg',
        'assets/project7-4.jpg',
        'assets/project7-5.jpg',
        'assets/project7-6.jpg',
        'assets/project7-7.jpg',
        'assets/project7-8.jpg'
      ]
    },
    {
      id: 8,
      title: 'Project Title',
      category: 'uiux',
      image: 'assets/project8.jpg',
      images: [
        'assets/project8-1.jpg',
        'assets/project8-2.jpg',
        'assets/project8-3.jpg',
        'assets/project8-4.jpg',
        'assets/project8-5.jpg',
        'assets/project8-6.jpg',
        'assets/project8-7.jpg',
        'assets/project8-8.jpg'
      ]
    },
    {
      id: 9,
      title: 'Project Title',
      category: 'uiux',
      image: 'assets/project9.jpg',
      images: [
        'assets/project9-1.jpg',
        'assets/project9-2.jpg',
        'assets/project9-3.jpg',
        'assets/project9-4.jpg',
        'assets/project9-5.jpg',
        'assets/project9-6.jpg',
        'assets/project9-7.jpg',
        'assets/project9-8.jpg'
      ]
    },
    {
      id: 10,
      title: 'Project Title',
      category: 'uiux',
      image: 'assets/project10.jpg',
      images: [
        'assets/project10-1.jpg',
        'assets/project10-2.jpg',
        'assets/project10-3.jpg',
        'assets/project10-4.jpg',
        'assets/project10-5.jpg',
        'assets/project10-6.jpg',
        'assets/project10-7.jpg',
        'assets/project10-8.jpg'
      ]
    },
    {
      id: 11,
      title: 'Project Title',
      category: 'uiux',
      image: 'assets/project11.jpg',
      images: [
        'assets/project11-1.jpg',
        'assets/project11-2.jpg',
        'assets/project11-3.jpg',
        'assets/project11-4.jpg',
        'assets/project11-5.jpg',
        'assets/project11-6.jpg',
        'assets/project11-7.jpg',
        'assets/project11-8.jpg'
      ]
    },
    {
      id: 12,
      title: 'Project Title',
      category: 'uiux',
      image: 'assets/project12.jpg',
      images: [
        'assets/project12-1.jpg',
        'assets/project12-2.jpg',
        'assets/project12-3.jpg',
        'assets/project12-4.jpg',
        'assets/project12-5.jpg',
        'assets/project12-6.jpg',
        'assets/project12-7.jpg',
        'assets/project12-8.jpg'
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
        <div class="project-image-container" style="position: relative;">
          <img src="${project.image}" alt="${project.title}" class="project-img">
          <div class="project-title">${project.title}</div>
        </div>
        <button class="view-project-btn">View</button>
      `;
      
      // Make both image and button clickable
      const projectImg = projectCard.querySelector('.project-img');
      const viewBtn = projectCard.querySelector('.view-project-btn');
      
      const openModalHandler = (e) => {
        e.stopPropagation();
        openModal(project.id);
      };
      
      projectImg.addEventListener('click', openModalHandler);
      viewBtn.addEventListener('click', openModalHandler);
      
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
  const prevImageBtn = document.getElementById('prev-image');
  const nextImageBtn = document.getElementById('next-image');
  const successModal = document.getElementById('success-modal');

  let currentProject = null;
  let currentImageIndex = 0;

  function openModal(projectId) {
    // Find the project
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    currentProject = project;
    currentImageIndex = 0;
    
    // Update modal content
    modalTitle.textContent = project.title;
    modalImages.innerHTML = '';
    
    // Add all images to modal
    project.images.forEach((img, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = img;
      imgElement.alt = `${project.title} - ${index + 1}`;
      imgElement.style.display = index === 0 ? 'block' : 'none';
      modalImages.appendChild(imgElement);
    });
    
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
    
    updateModalNavigation();
  }

  function updateModalNavigation() {
    if (!currentProject) return;
    
    const images = modalImages.querySelectorAll('img');
    images.forEach((img, index) => {
      img.style.display = index === currentImageIndex ? 'block' : 'none';
    });
  }

  function showPreviousImage() {
    if (!currentProject) return;
    
    currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
    updateModalNavigation();
  }

  function showNextImage() {
    if (!currentProject) return;
    
    currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
    updateModalNavigation();
  }

  function closeModal() {
    modal.classList.remove('active');
    successModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    currentProject = null;
    currentImageIndex = 0;
  }

  // Event listeners
  closeModalBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  });

  prevImageBtn.addEventListener('click', showPreviousImage);
  nextImageBtn.addEventListener('click', showNextImage);

  // Touch/swipe support for mobile
  let startY = 0;
  let startX = 0;

  modalImages.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
  });

  modalImages.addEventListener('touchend', (e) => {
    if (!startY || !startX) return;

    const endY = e.changedTouches[0].clientY;
    const endX = e.changedTouches[0].clientX;
    const diffY = startY - endY;
    const diffX = startX - endX;

    // Determine if it's a vertical or horizontal swipe
    if (Math.abs(diffY) > Math.abs(diffX)) {
      // Vertical swipe
      if (Math.abs(diffY) > 50) { // minimum swipe distance
        if (diffY > 0) {
          showNextImage(); // swipe up = next
        } else {
          showPreviousImage(); // swipe down = previous
        }
      }
    } else {
      // Horizontal swipe
      if (Math.abs(diffX) > 50) { // minimum swipe distance
        if (diffX > 0) {
          showNextImage(); // swipe left = next
        } else {
          showPreviousImage(); // swipe right = previous
        }
      }
    }

    startY = 0;
    startX = 0;
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      showPreviousImage();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      showNextImage();
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

  // ======================
  // Social Media Icons Fix for Mobile
  // ======================
  const socialIcons = document.querySelectorAll('.header-social-icons a');
  
  socialIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      // Ensure the link works on mobile
      const href = this.getAttribute('href');
      if (href) {
        window.open(href, '_blank');
      }
    });
    
    // Add touch event for better mobile interaction
    icon.addEventListener('touchstart', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    icon.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  });
});
