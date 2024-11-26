import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss'; // Impor file SASS

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

// Ambil elemen container untuk daftar restoran
const restaurantListElement = document.querySelector('#restaurant-list');

// Fungsi untuk mengambil data dari JSON
const fetchRestaurants = async () => {
  try {
    const response = await fetch('./data/DATA.json');
    const data = await response.json();
    return data.restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
  }
};

// Fungsi untuk menampilkan daftar restoran
const displayRestaurants = (restaurants) => {
  restaurants.forEach((restaurant) => {
    const restaurantItem = document.createElement('div');
    restaurantItem.classList.add('restaurant-item');
    // restaurantItem.setAttribute('tabindex', '0');

    restaurantItem.innerHTML = `
        <img src="${restaurant.pictureId}" alt="Gambar restoran ${
  restaurant.name
}" class="restaurant-img" />
        <div class="restaurant-info">
          <h3 class="restaurant-name">${restaurant.name}</h3>
          <p class="restaurant-city">Kota: ${restaurant.city}</p>
          <p class="restaurant-rating">Rating: ${restaurant.rating}</p>
          <p class="restaurant-description">${restaurant.description.substring(
    0,
    150
  )}...</p>
        </div>
      `;

    restaurantListElement.appendChild(restaurantItem);
  });
};

// Panggil fungsi fetch dan tampilkan restoran
document.addEventListener('DOMContentLoaded', async () => {
  const restaurants = await fetchRestaurants();
  displayRestaurants(restaurants);
});
