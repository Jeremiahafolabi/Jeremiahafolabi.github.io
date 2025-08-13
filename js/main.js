/**
 * Portfolio Website - Enhanced JavaScript
 * Features:
 * - Mobile menu toggle
 * - Smooth scrolling
 * - Portfolio filtering
 * - Project modal with navigation
 * - Back-to-top button
 * - Intersection observer for animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // Mobile Navigation
  // ======================
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Close mobile menu when link is clicked
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
    },
    // Add more projects as needed
  ];

  // Display all projects initially
  displayProjects('all');

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
          <div class="project-tools">
            ${project.tools.map(tool => `<span class="project-tool">${tool}</span>`).join('')}
          </div>
        </div>
      `;
      
      projectCard.addEventListener('click', () => openModal(project.id));
      portfolioGrid.appendChild(projectCard);
    });
  }

  // ======================
  // Project Modal
  // ======================
  const modal = document.getElementById('project-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalTools = document.getElementById('modal-tools');
  const closeModalBtn = document.querySelector('.close-modal');
  const prevProjectBtn = document.getElementById('prev-project');
  const nextProjectBtn = document.getElementById('next-project');

  let currentProjectIndex = 0;
  let filteredProjects = [];

  function openModal(projectId) {
    // Find the project
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return;
    
    currentProjectIndex = projectIndex;
    filteredProjects = [...projects]; // Copy all projects
    
    updateModal();
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function updateModal() {
    const project = filteredProjects[currentProjectIndex];
    
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    
    // Update tools
    modalTools.innerHTML = '';
    project.tools.forEach(tool => {
      const toolSpan = document.createElement('span');
      toolSpan.className = 'skill-tag';
      toolSpan.textContent = tool;
      modalTools.appendChild(toolSpan);
    });
    
    // Update navigation buttons state
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
  // Scroll Animations
  // ======================
  const animateElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(element => {
    observer.observe(element);
  });

  // ======================
  // Form Handling
  // ======================
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form validation
      const name = this.elements['name'].value.trim();
      const email = this.elements['_replyto'].value.trim();
      const message = this.elements['message'].value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Submit form (using Formspree)
      this.submit();
      
      // Reset form
      this.reset();
      alert('Thank you for your message! I will get back to you soon.');
    });
  }
});
