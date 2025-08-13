// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.main-nav');

mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('is-active');
  navMenu.classList.toggle('active');
});

// Auto-close mobile menu on link click
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      mobileMenu.classList.remove('is-active');
      navMenu.classList.remove('active');
    }
  });
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

/* =========================
   Projects Data
   =========================
   Replace 'assets/graphic/projectX/imgY.jpg'
   and 'assets/uiux/projectX/imgY.jpg' with your actual images.
*/
const projects = {
  graphic: [
    {
      title: 'Graphic Project 1',
      tools: 'Photoshop, Illustrator',
      images: Array.from({ length: 10 }, (_, i) => `assets/graphic/project1/img${i+1}.jpg`)
    },
    {
      title: 'Graphic Project 2',
      tools: 'CorelDraw',
      images: Array.from({ length: 10 }, (_, i) => `assets/graphic/project2/img${i+1}.jpg`)
    },
    {
      title: 'Graphic Project 3',
      tools: 'Photoshop',
      images: Array.from({ length: 10 }, (_, i) => `assets/graphic/project3/img${i+1}.jpg`)
    },
    {
      title: 'Graphic Project 4',
      tools: 'Illustrator',
      images: Array.from({ length: 10 }, (_, i) => `assets/graphic/project4/img${i+1}.jpg`)
    }
  ],
  uiux: [
    {
      title: 'UI/UX Project 1',
      tools: 'Figma',
      images: Array.from({ length: 10 }, (_, i) => `assets/uiux/project1/img${i+1}.jpg`)
    },
    {
      title: 'UI/UX Project 2',
      tools: 'Adobe XD',
      images: Array.from({ length: 10 }, (_, i) => `assets/uiux/project2/img${i+1}.jpg`)
    },
    {
      title: 'UI/UX Project 3',
      tools: 'Figma, Photoshop',
      images: Array.from({ length: 10 }, (_, i) => `assets/uiux/project3/img${i+1}.jpg`)
    },
    {
      title: 'UI/UX Project 4',
      tools: 'Figma, Illustrator',
      images: Array.from({ length: 10 }, (_, i) => `assets/uiux/project4/img${i+1}.jpg`)
    }
  ]
};

// DOM elements
const portfolioBtns = document.querySelectorAll('.portfolio-btn');
const portfolioGrid = document.getElementById('portfolio-images');
const modal = document.getElementById('project-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalTools = document.getElementById('modal-tools');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');

// Modal state
let currentProjectImages = [];
let currentImageIndex = 0;

// Display projects
function displayProjects(category) {
  portfolioGrid.innerHTML = '';
  projects[category].forEach((project) => {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.innerHTML = `
      <img src="${project.images[0]}" alt="${project.title}">
      <div class="project-overlay">
        <h4>${project.title}</h4>
        <p>${project.tools}</p>
        <button class="view-btn">View</button>
      </div>
    `;
    card.addEventListener('click', () => openModal(project, 0));
    portfolioGrid.appendChild(card);
  });
}

// Open modal
function openModal(project, imgIndex) {
  currentProjectImages = project.images;
  currentImageIndex = imgIndex;
  modalImage.src = currentProjectImages[currentImageIndex];
  modalTitle.textContent = project.title;
  modalTools.textContent = project.tools;
  modal.style.display = 'flex';
}

// Close modal
function closeModalFunc() {
  modal.style.display = 'none';
}

// Navigation in modal
function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
  modalImage.src = currentProjectImages[currentImageIndex];
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
  modalImage.src = currentProjectImages[currentImageIndex];
}

// Event listeners
portfolioBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    portfolioBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    displayProjects(btn.dataset.category);
  });
});

closeModal.addEventListener('click', closeModalFunc);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Close when clicking outside modal content
window.addEventListener('click', e => {
  if (e.target === modal) closeModalFunc();
});

// Initial load
displayProjects('graphic');
