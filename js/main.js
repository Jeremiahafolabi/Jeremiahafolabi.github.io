document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // Mobile Navigation
  // ======================
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Improved hamburger menu animation
  mobileMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
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
    icon.addEventListener('click', function(e) {
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

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

  backToTop.addEventListener('click', function(e) {
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
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter projects
      const filter = this.dataset.filter;
      displayProjects(filter);
    });
  });

  // ======================
// Project Modal
// ======================
const modal = document.getElementById('project-modal');
const modalImages = document.querySelector('.modal-images');
const modalTitle = document.getElementById('modal-project-title');
const closeModalBtn = document.querySelector('.close-modal');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');

let currentProject = null;
let currentImageIndex = 0;

function openModal(project) {
  currentProject = project;
  currentImageIndex = 0;
  updateModalImages();
  modal.classList.add('active');
  document.body.classList.add('no-scroll');
}

function updateModalImages() {
  modalImages.innerHTML = '';
  
  currentProject.images.forEach((img, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = img;
    imgElement.alt = `${currentProject.title} - ${index + 1}`;
    imgElement.style.display = index === currentImageIndex ? 'block' : 'none';
    modalImages.appendChild(imgElement);
  });
}

function navigateImages(direction) {
  if (direction === 'prev') {
    currentImageIndex = Math.max(0, currentImageIndex - 1);
  } else {
    currentImageIndex = Math.min(currentProject.images.length - 1, currentImageIndex + 1);
  }
  updateModalImages();
}

// Event listeners
closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  navigateImages('prev');
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  navigateImages('next');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('active')) return;
  
  if (e.key === 'Escape') modal.classList.remove('active');
  if (e.key === 'ArrowLeft') navigateImages('prev');
  if (e.key === 'ArrowRight') navigateImages('next');
});
  function displayProjects(filter) {
    portfolioGrid.innerHTML = '';
    
    const filteredProjects = projects.filter(project => project.category === filter);
    
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
      projectCard.addEventListener('click', function() {
        openModal(project);
      });
      
      // Click handler for the view button (stops event bubbling)
      projectCard.querySelector('.view-project-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        openModal(project);
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
  const prevBtn = document.getElementById('prev-project');
  const nextBtn = document.getElementById('next-project');
  const successModal = document.getElementById('success-modal');

  let currentProject = null;
  let currentImageIndex = 0;

  function openModal(project) {
    currentProject = project;
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
    currentProject.images.forEach((img, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = img;
      imgElement.alt = `${currentProject.title} - ${index + 1}`;
      imgElement.style.display = index === currentImageIndex ? 'block' : 'none';
      modalImages.appendChild(imgElement);
    });
  }

  function navigateImages(direction) {
    if (direction === 'prev') {
      currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
    } else {
      currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
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

  modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  });

  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    navigateImages('prev');
  });

  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    navigateImages('next');
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        navigateImages('prev');
        break;
      case 'ArrowRight':
        navigateImages('next');
        break;
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
      })
      .then(response => {
        if (response.ok) {
          successModal.classList.add('active');
          document.body.classList.add('no-scroll');
          this.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        alert('There was a problem sending your message. Please try again later.');
        console.error('Error:', error);
      });
    });
  }

  // Close success modal
  document.querySelector('#success-modal .close-modal').addEventListener('click', function() {
    successModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });

  // Initialize projects on load
  displayProjects('graphic');
});
