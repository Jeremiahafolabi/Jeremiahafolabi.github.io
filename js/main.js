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

// Portfolio filtering
const portfolioBtns = document.querySelectorAll('.portfolio-btn');
const portfolioGrid = document.getElementById('portfolio-images');

const projects = {
  graphic: [
    { img: 'assets/graphic-placeholder1.jpg', title: 'Graphic Project 1', tools: 'Photoshop, Illustrator' },
    { img: 'assets/graphic-placeholder2.jpg', title: 'Graphic Project 2', tools: 'CorelDraw' }
  ],
  uiux: [
    { img: 'assets/uiux-placeholder1.jpg', title: 'UI/UX Project 1', tools: 'Figma' },
    { img: 'assets/uiux-placeholder2.jpg', title: 'UI/UX Project 2', tools: 'Adobe XD' }
  ]
};

function displayProjects(category) {
  portfolioGrid.innerHTML = '';
  projects[category].forEach(p => {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="project-overlay">
        <h4>${p.title}</h4>
        <p>${p.tools}</p>
      </div>
    `;
    portfolioGrid.appendChild(card);
  });
}

portfolioBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    portfolioBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    displayProjects(btn.dataset.category);
  });
});

// Initial load
displayProjects('graphic');

// Modal
const modal = document.getElementById('project-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalTools = document.getElementById('modal-tools');
const closeModal = document.querySelector('.close-modal');

document.addEventListener('click', e => {
  if (e.target.closest('.project-card')) {
    const card = e.target.closest('.project-card');
    modalImage.src = card.querySelector('img').src;
    modalTitle.textContent = card.querySelector('h4')?.textContent || '';
    modalTools.textContent = card.querySelector('p')?.textContent || '';
    modal.style.display = 'flex';
  }
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
