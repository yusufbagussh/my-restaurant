import RestaurantApi from '../api/restaurant-api';
import '../components/restaurant-card';
import '../components/loading-indicator';

const ListPage = {
  // Fungsi render untuk menampilkan konten awal
  async render() {
    return `
    <div class="hero" role="banner">
      <picture>
        <source media="(max-width: 600px)" srcset="./images/hero-image_2-small.jpg">
        <img 
          src="./images/hero-image_2-large.jpg" 
          alt="Restaurant Hero" 
          class="hero-img"
        />
      </picture>
      <div class="hero-content">
        <h1>Selamat Datang di My Restaurant</h1>
        <p>
          Temukan restoran terbaik di kotamu dengan pilihan terlengkap dan
          pelayanan terbaik.
        </p>
      </div>
    </div>    
    <section class="restaurant-section">
      <h2>Daftar Restoran</h2>
      <div class="restaurant-list" id="restaurant-list">
        <loading-indicator></loading-indicator> <!-- Indikator loading -->
        <!-- List of restaurants will be dynamically added here by JavaScript -->
      </div>
    </section>
    `;
  },



  // afterRender untuk mengambil dan menampilkan daftar restoran setelah render HTML
  async afterRender() {
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

    try {
      const restaurants = await RestaurantApi.getRestaurants();
      restaurantListContainer.innerHTML = ''; // Hapus indikator loading

      if (restaurants.length === 0) {
        restaurantListContainer.innerHTML = `
          <p class="error-message">Tidak ada restoran yang tersedia.</p>
        `;
        return;
      }
      restaurants.forEach((restaurant) => {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.restaurant = restaurant;
        restaurantListContainer.appendChild(restaurantCard);
      });
    } catch (error) {
      restaurantListContainer.innerHTML = `
    <p class="error-message">Gagal memuat data restoran. Error: ${error}. Silakan coba lagi nanti.</p>
  `;
    }
  },
};

export default ListPage;
