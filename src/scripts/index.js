import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss'; // Impor file SASS
import swRegister from './utils/sw-register';

// src/scripts/app.js
import ListPage from './pages/list-page';
import DetailPage from './pages/detail-page';
import FavoritePage from './pages/favorite-page';

import 'lazysizes';


const routes = {
  '/': ListPage,
  '/detail/:id': DetailPage,
  '/favorites': FavoritePage,
};

// Navigation drawer toggle functionality
const menuButton = document.getElementById('menu-btn');
const drawer = document.getElementById('drawer');

// Fungsi untuk toggle menu
const toggleMenu = () => {
  drawer.classList.toggle('show');

  // Update ARIA expanded state
  const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
  menuButton.setAttribute('aria-expanded', !expanded);
};

// Tambahkan event listener untuk click
menuButton.addEventListener('click', toggleMenu);

// Tambahkan event listener untuk keyboard accessibility
menuButton.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault(); // Mencegah default behavior
    toggleMenu(); // Buka/tutup menu
  }
});

const parseUrlWithId = (url) => {
  const parts = url.split('/');
  return parts.length > 2 ? `/${parts[1]}/:id` : `/${parts[1]}`;
};

const renderPage = async () => {
  const url = window.location.hash.slice(1).toLowerCase() || '/';
  const parsedUrl = parseUrlWithId(url);

  const page = routes[parsedUrl] || routes['/'];

  // Panggil render dan afterRender
  document.getElementById('main-content').innerHTML = await page.render(); // Panggil render()
  await page.afterRender(); // Panggil afterRender() untuk operasi setelah render

  // Tambahkan event listener untuk Skip to Content
  const skipLinkElem = document.querySelector('.skip-link');
  skipLinkElem.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#main-content').focus();
  });
};

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', () => {
  renderPage();
  swRegister(); // Panggil swRegister untuk mendaftarkan service worker saat halaman selesai dimuat
});
