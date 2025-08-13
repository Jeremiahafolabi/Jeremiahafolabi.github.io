// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.main-nav');
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('is-active');
  navMenu.classList.toggle('active');
});

// Auto-close mobile menu
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      mobileMenu.classList.remove('is-active');
      navMenu.classList.remove('active');
    }
  });
});

// Back to top
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 300);
});

/* Projects data — replace paths with your actual images */
const projects = {
  graphic: Array.from({ length: 4 }, (_, idx) => ({
    title: `Graphic Project ${idx + 1}`,
    tools: idx % 2 === 0 ? 'Photoshop, Illustrator' : 'CorelDraw',
    images: Array.from({ length: 10 }, (_, i) => `assets/graphic/project${idx + 1}/img${i + 1}.jpg`)
  })),
  uiux: Array.from({ length: 4 }, (_, idx) => ({
    title: `UI/UX Project ${idx + 1}`,
    tools: idx % 2 === 0 ? 'Figma' : 'Adobe XD',
    images: Array.from({ length: 10 }, (_, i) => `assets/uiux/project${idx + 1}/img${i + 1}.jpg`)
  }))
};

const portfolioBtns = document.querySelectorAll('.portfolio-btn');
const portfolioGrid = document.getElementById('portfolio-images');
const modal = document.getElementById('project-modal');
const modalImage = document.getElementById('modal-image');
const mobileScrollGallery = document.getElementById('mobile-scroll-gallery');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');

let currentProjectImages = [];
let currentImageIndex = 0;

function displayProjects(category) {
  portfolioGrid.innerHTML = '';
  projects[category].forEach(project => {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.innerHTML = `
      <img src="${project.images[0]}" alt="${project.title}">
      <div class="project-overlay">
        <button class="view-btn">View</button>
      </div>
    `;
    card.addEventListener('click', () => openModal(project, 0));
    portfolioGrid.appendChild(card);
  });
}

function openModal(project, imgIndex) {
  currentProjectImages = project.images;
  currentImageIndex = imgIndex;
  if (window.innerWidth > 768) {
    modalImage.src = currentProjectImages[currentImageIndex];
  } else {
    mobileScrollGallery.innerHTML = '';
    project.images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      mobileScrollGallery.appendChild(img);
    });
  }
  modal.style.display = 'flex';
}

function closeModalFunc() {
  modal.style.display = 'none';
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
  modalImage.src = currentProjectImages[currentImageIndex];
}
function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
  modalImage.src = currentProjectImages[currentImageIndex];
}

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
window.addEventListener('click', e => {
  if (e.target === modal) closeModalFunc();
});

// Initial load
displayProjects('graphic');
