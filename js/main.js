// === Tab Switching ===
const tabs = document.querySelectorAll('.tab');
const galleries = document.querySelectorAll('.gallery');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    galleries.forEach(gallery => {
      gallery.classList.add('hidden');
    });

    const target = document.getElementById(tab.dataset.tab);
    target.classList.remove('hidden');
  });
});

// === Modal Gallery ===
const viewButtons = document.querySelectorAll('.view-btn');
const modal = document.getElementById('modal');
const imagesContainer = document.querySelector('.images-container');
const closeModal = document.querySelector('.close-modal');
const leftArrow = document.querySelector('.nav-arrow.left');
const rightArrow = document.querySelector('.nav-arrow.right');

let currentImageSet = [];

viewButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    imagesContainer.innerHTML = '';

    // Simulate loading 8 images for the selected project
    currentImageSet = Array.from({ length: 8 }, (_, i) => `project${index + 1}_img${i + 1}.jpg`);

    currentImageSet.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Project image';
      img.loading = 'lazy';
      imagesContainer.appendChild(img);
    });
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// === Modal Navigation Arrows ===
let scrollAmount = 0;
leftArrow.addEventListener('click', () => {
  imagesContainer.scrollBy({ left: -300, behavior: 'smooth' });
});
rightArrow.addEventListener('click', () => {
  imagesContainer.scrollBy({ left: 300, behavior: 'smooth' });
});

// === Hamburger Menu Toggle ===
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// === Back to Top Button ===
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Formspree Confirmation ===
const form = document.querySelector('form');
const confirmation = document.querySelector('.confirmation');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      confirmation.classList.remove('hidden');
      form.reset();
    } else {
      confirmation.textContent = 'Oops! Something went wrong.';
      confirmation.classList.remove('hidden');
    }
  });
});
