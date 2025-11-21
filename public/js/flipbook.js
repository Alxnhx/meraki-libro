// public/js/flipbook.js

// Ajusta este número si agregas más páginas:
const TOTAL_PAGES = 27;

// Generamos el arreglo de imágenes: /items/1.jpeg ... /items/27.jpeg
const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => `/items/${i + 1}.jpeg`);

document.addEventListener('DOMContentLoaded', () => {
  const left = document.querySelector('[data-page="left"]');
  const right = document.querySelector('[data-page="right"]');
  const prevBtn = document.getElementById('btnPrev');
  const nextBtn = document.getElementById('btnNext');
  const flipArea = document.querySelector('.flip-book');

  if (!left || !right || !prevBtn || !nextBtn || !flipArea) return;

  // índice de la página izquierda (de dos en dos)
  let index = 0;

  function render() {
    left.src = pages[index];
    right.src = pages[index + 1] || pages[index];

    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= pages.length - 2;
  }

  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index = Math.max(0, index - 2);
      render();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (index < pages.length - 2) {
      index = Math.min(pages.length - 2, index + 2);
      render();
    }
  });

  // Gestos táctiles (si Hammer.js está cargado)
  if (window.Hammer) {
    const hammer = new Hammer(flipArea);
    hammer.on('swipeleft', () => {
      if (!nextBtn.disabled) {
        index = Math.min(pages.length - 2, index + 2);
        render();
      }
    });
    hammer.on('swiperight', () => {
      if (!prevBtn.disabled) {
        index = Math.max(0, index - 2);
        render();
      }
    });
  }

  render();
});
