/**
 * Portfolio Website - Enhanced JavaScript
 * Color Scheme: Yellow (#efa80a) + Crimson Red (#a10e2d)
 */
document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // Mobile Navigation
  // ======================
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        mobileMenu.classList.remove('is-active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // ======================
  // Smooth Scrolling
  // ======================
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash !== '') {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

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

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: 'Brand Identity Design',
      category: 'graphic',
      tools: ['Photoshop', 'Illustrator'],
      image: 'assets/project1.jpg',
      description: 'Complete brand identity package for a tech startup'
    },
    {
      id: 2,
      title: 'Mobile App UI',
      category: 'uiux',
      tools: ['Figma', 'Adobe XD'],
      image: 'assets/project2.jpg',
      description: 'User interface design for a fitness tracking app'
    }
    // Add more projects as needed
  ];

  // Display projects with yellow/red color scheme
  function displayProjects(filter) {
    portfolioGrid.innerHTML = '';
    
    const filteredProjects = filter === 'all' ? projects : 
      projects.filter(project => project.category === filter);
    
    filteredProjects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.dataset.id = project.id;
      projectCard.dataset.category = project.category;
      
      projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-img">
        <div class="project-overlay">
          <h3 class="project-title">${project.title}</h3>
          <span class="project-category" style="color: #efa80a">
            ${project.category === 'graphic' ? 'Graphic Design' : 'UI/UX Design'}
          </span>
          <div class="project-tools">
            ${project.tools.map(tool => 
              `<span class="project-tool" style="background: rgba(239, 168, 10, 0.1); color: #efa80a">
                ${tool}
              </span>`
            ).join('')}
          </div>
        </div>
      `;
      
      // Crimson red hover effect
      projectCard.addEventListener('mouseenter', () => {
        projectCard.style.boxShadow = '0 15px 30px rgba(161, 14, 45, 0.3)';
      });
      projectCard.addEventListener('mouseleave', () => {
        projectCard.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
      });
      
      projectCard.addEventListener('click', () => openModal(project.id));
      portfolioGrid.appendChild(projectCard);
    });
  }

  // Initialize with yellow active filter
  displayProjects('all');
  document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      this.style.backgroundColor = '#efa80a';
      this.style.color = '#000';
      displayProjects(this.dataset.filter);
    });
  });

  // ======================
  // Project Modal
  // ======================
  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const prevProjectBtn = document.getElementById('prev-project');
  const nextProjectBtn = document.getElementById('next-project');

  let currentProjectIndex = 0;
  let filteredProjects = [];

  function openModal(projectId) {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return;
    
    currentProjectIndex = projectIndex;
    filteredProjects = [...projects];
    
    updateModal();
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function updateModal() {
    const project = filteredProjects[currentProjectIndex];
    
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;
    
    // Style tools with yellow
    const toolsContainer = document.getElementById('modal-tools');
    toolsContainer.innerHTML = project.tools.map(tool => 
      `<span class="skill-tag" style="background: rgba(239, 168, 10, 0.1); color: #efa80a">
        ${tool}
      </span>`
    ).join('');
    
    // Update navigation buttons
    prevProjectBtn.disabled = currentProjectIndex === 0;
    nextProjectBtn.disabled = currentProjectIndex === filteredProjects.length - 1;
  }

  function navigateProjects(direction) {
    if (direction === 'prev' && currentProjectIndex > 0) {
      currentProjectIndex--;
    } else if (direction === 'next' && currentProjectIndex < filteredProjects.length - 1) {
      currentProjectIndex++;
    }
    updateModal();
  }

  // Event listeners
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
      modal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  prevProjectBtn.addEventListener('click', () => navigateProjects('prev'));
  nextProjectBtn.addEventListener('click', () => navigateProjects('next'));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      modal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    } else if (e.key === 'ArrowLeft') {
      navigateProjects('prev');
    } else if (e.key === 'ArrowRight') {
      navigateProjects('next');
    }
  });

  // ======================
  // Form Validation
  // ======================
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      let isValid = true;
      
      this.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#a10e2d'; // Crimson red for errors
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Please fill all required fields');
      }
    });
  }

  // ======================
  // Initialize Current Year
  // ======================
  document.getElementById('year').textContent = new Date().getFullYear();
});
