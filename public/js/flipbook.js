// public/js/flipbook.js
// public/js/flipbook.js

// 1. Lista de páginas del libro (en pares: izquierda, derecha)
const pageImages = [
  '/items/1.jpeg',
  '/items/2.jpeg',
  '/items/3.jpeg',
  '/items/4.jpeg',
  '/items/5.jpeg',
  '/items/6.jpeg',
  '/items/7.jpeg',
  '/items/8.jpeg',
  '/items/9.jpeg',
  '/items/10.jpeg',
  '/items/11.jpeg',
  '/items/12.jpeg',
  '/items/13.jpeg',
  '/items/14.jpeg',
  '/items/15.jpeg',
  '/items/16.jpeg',
  '/items/17.jpeg',
  '/items/18.jpeg',
  '/items/19.jpeg',
  '/items/20.jpeg',
  '/items/21.jpeg',
  '/items/22.jpeg',
  '/items/23.jpeg',
  '/items/24.jpeg',
  '/items/25.jpeg',
  '/items/26.jpeg',
  '/items/27.jpeg',
  '/items/28.jpeg'
];

// Cada "spread" es un par de páginas (izquierda/derecha)
const spreads = [];
for (let i = 0; i < pageImages.length; i += 2) {
  spreads.push([pageImages[i], pageImages[i + 1] || null]);
}

let currentSpread = 0;
let isFlipping = false;

function setupFlipbook() {
  const leftEl = document.getElementById('leftPage');
  const rightEl = document.getElementById('rightPage');
  const flipEl = document.getElementById('flipPage');
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');

  if (!leftEl || !rightEl || !flipEl || !prevBtn || !nextBtn) return;

  function renderSpread() {
    const [leftSrc, rightSrc] = spreads[currentSpread];

    leftEl.style.backgroundImage = leftSrc
      ? `url(${leftSrc})`
      : 'none';

    if (rightSrc) {
      rightEl.style.display = 'block';
      rightEl.style.backgroundImage = `url(${rightSrc})`;
    } else {
      // Última hoja impar
      rightEl.style.display = 'none';
    }

    prevBtn.disabled = currentSpread === 0;
    nextBtn.disabled = currentSpread === spreads.length - 1;
  }

  function flip(direction) {
    if (isFlipping) return;

    const delta = direction === 'next' ? 1 : -1;
    const nextSpread = currentSpread + delta;

    if (nextSpread < 0 || nextSpread >= spreads.length) return;

    isFlipping = true;

    const [leftSrc, rightSrc] = spreads[currentSpread];
    const [nextLeftSrc, nextRightSrc] = spreads[nextSpread];

    // Configuramos la página que "se voltea"
    flipEl.classList.remove(
      'is-active',
      'is-flipping-next',
      'is-flipping-prev'
    );

    // Forzar reflow para reiniciar la animación
    void flipEl.offsetWidth;

    if (direction === 'next') {
      // volteo derecha -> izquierda
      flipEl.style.backgroundImage = rightSrc
        ? `url(${rightSrc})`
        : 'none';
      flipEl.classList.add('is-active', 'is-flipping-next');
    } else {
      // volteo izquierda <- derecha
      flipEl.style.backgroundImage = leftSrc
        ? `url(${leftSrc})`
        : 'none';
      flipEl.classList.add('is-active', 'is-flipping-prev');
    }

    flipEl.addEventListener(
      'animationend',
      () => {
        currentSpread = nextSpread;
        renderSpread();

        flipEl.classList.remove(
          'is-active',
          'is-flipping-next',
          'is-flipping-prev'
        );
        isFlipping = false;
      },
      { once: true }
    );
  }

  prevBtn.addEventListener('click', () => flip('prev'));
  nextBtn.addEventListener('click', () => flip('next'));

  // Navegación con teclado
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') flip('next');
    if (e.key === 'ArrowLeft') flip('prev');
  });

  // Render inicial
  renderSpread();
}

document.addEventListener('DOMContentLoaded', setupFlipbook);
