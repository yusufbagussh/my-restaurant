// src/scripts/pages/favorite-page.js
import FavoriteDb from '../db/favorite-db';

const FavoritePage = {
  // Fungsi render untuk menampilkan konten awal
  async render() {
    return ` 
     <section class="restaurant-section">
        <h2>Daftar Restoran Favorit</h2>
        <div class="restaurant-list" id="restaurant-list">
          <!-- List of restaurants will be dynamically added here by JavaScript -->
        </div>
      </section>

    `;
  },

  // afterRender untuk mengambil dan menampilkan daftar restoran setelah render HTML
  async afterRender() {
    const restaurants = await FavoriteDb.getAllRestaurants();
    const restaurantListContainer = document.getElementById('restaurant-list');

    // Tambahkan Skeleton UI
    const skeletonCount = 6; // Jumlah skeleton yang ditampilkan
    restaurantListContainer.innerHTML = '';
    for (let i = 0; i < skeletonCount; i++) {
      restaurantListContainer.innerHTML += `
      <div class="skeleton-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-text skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
      </div>
    `;
    }

    if (restaurants.length === 0) {
      restaurantListContainer.innerHTML = '<p>No favorite restaurants yet.</p>';
      return;
    } else {
      restaurantListContainer.innerHTML = '';
    }

    restaurants.forEach((restaurant) => {
      const restaurantCard = document.createElement('restaurant-card');
      restaurantCard.restaurant = restaurant;
      restaurantListContainer.appendChild(restaurantCard);
    });
  },
};

export default FavoritePage;
