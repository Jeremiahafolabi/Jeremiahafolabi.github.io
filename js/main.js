// Tab Switching
const tabs = document.querySelectorAll('.tab');
const galleries = document.querySelectorAll('.gallery');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    galleries.forEach(gallery => {
      gallery.classList.add('hidden');
      if (gallery.id === tab.dataset.tab) {
        gallery.classList.remove('hidden');
      }
    });
  });
});

// Modal Gallery
const modal = document.getElementById('projectModal');
const modalImagesContainer = modal.querySelector('.modal-images');
const closeModalBtn = modal.querySelector('.close-modal');
const viewButtons = document.querySelectorAll('.view-project');

viewButtons.forEach(button => {
  button.addEventListener('click', () => {
    const projectId = button.dataset.project;
    openModal(projectId);
  });
});

function openModal(projectId) {
  modal.classList.remove('hidden');
  modalImagesContainer.innerHTML = '';

  for (let i = 1; i <= 8; i++) {
    const img = document.createElement('img');
    img.src = `assets/images/${projectId}-${i}.jpg`;
    img.alt = `Image ${i} of ${projectId}`;
    img.loading = 'lazy';
    modalImagesContainer.appendChild(img);
  }
}

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Modal Navigation
const leftArrow = modal.querySelector('.nav-arrow.left');
const rightArrow = modal.querySelector('.nav-arrow.right');

leftArrow.addEventListener('click', () => {
  modalImagesContainer.scrollBy({ left: -300, behavior: 'smooth' });
});

rightArrow.addEventListener('click', () => {
  modalImagesContainer.scrollBy({ left: 300, behavior: 'smooth' });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Back to Top
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
  window.scrollTo
