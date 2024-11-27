// src/scripts/pages/detail-page.js
import RestaurantApi from '../api/restaurant-api';
import FavoriteDb from '../db/favorite-db';
import '../components/loading-indicator';

// const DetailPage = {
//   async render() {
//     return `<section id="restaurant-detail" class="restaurant-detail"></section>`;
//   },

//   async afterRender() {
//     const id = window.location.hash.split("/")[2];
//     const restaurant = await RestaurantApi.getRestaurantDetail(id);
//     const restaurantContainer = document.getElementById("restaurant-detail");

//     restaurantContainer.innerHTML = `
//       <img src="https://restaurant-api.dicoding.dev/images/large/${
//         restaurant.pictureId
//       }" alt="${restaurant.name}">
//       <h2>${restaurant.name}</h2>
//       <p>${restaurant.city}</p>
//       <p>${restaurant.address}</p>
//       <p>${restaurant.description}</p>
//       <h3>Foods:</h3>
//       <ul>${restaurant.menus.foods
//         .map((food) => `<li>${food.name}</li>`)
//         .join("")}</ul>
//       <h3>Drinks:</h3>
//       <ul>${restaurant.menus.drinks
//         .map((drink) => `<li>${drink.name}</li>`)
//         .join("")}</ul>
//       <button id="favorite-button" class="favorite-button">Favorite</button>
//     `;

//     const favoriteButton = document.getElementById("favorite-button");
//     favoriteButton.addEventListener("click", async () => {
//       if (await FavoriteDb.getRestaurant(id)) {
//         await FavoriteDb.deleteRestaurant(id);
//         favoriteButton.innerText = "Favorite";
//       } else {
//         await FavoriteDb.addRestaurant(restaurant);
//         favoriteButton.innerText = "Unfavorite";
//       }
//     });
//   },
// };

// Fungsi skeleton untuk halaman detail
const createSkeletonDetail = () => `
  <div class="skeleton skeleton-image" style="width: 100%; height: 200px; border-radius: 8px;"></div>
  <div class="skeleton skeleton-text" style="width: 60%; height: 20px; margin: 20px 0;"></div>
  <div class="skeleton skeleton-text" style="width: 80%; height: 20px; margin: 10px 0;"></div>
  <div class="skeleton skeleton-text" style="width: 90%; height: 20px; margin: 10px 0;"></div>
`;

const DetailPage = {
  async render() {
    return `
      <section id="restaurant-detail" class="restaurant-detail">
        <loading-indicator></loading-indicator>
      </section>
    `;
  },

  async afterRender() {
    const restaurantContainer = document.getElementById('restaurant-detail');

    // Tampilkan skeleton sebelum data dimuat
    restaurantContainer.innerHTML = createSkeletonDetail();


    const url = window.location.hash.split('/');
    const id = url[url.length - 1];

    try {
      const restaurant = await RestaurantApi.getRestaurantDetail(id);
      restaurantContainer.innerHTML = `
        <div class="detail-container">
          <div class="restaurant-header">
            <img src="https://restaurant-api.dicoding.dev/images/large/${
  restaurant.pictureId
}" alt="${restaurant.name}" class="restaurant-image">
            <button id="favorite-button" class="favorite-button">
              Favorite
            </button>
            <div class="restaurant-main-info">
              <h2>${restaurant.name}</h2>
              <p><strong>Kota:</strong> ${restaurant.city}</p>
              <p><strong>Alamat:</strong> ${restaurant.address}</p>
              <p><strong>Rating:</strong> ${restaurant.rating}</p>
              <p class="restaurant-description-text"><strong>Deskripsi:</strong> ${
  restaurant.description
}</p>
            </div>
          </div>
      
          <div class="restaurant-menus">
            <div class="menu-foods">
              <h3>Menu Makanan</h3>
              <ul>${restaurant.menus.foods
    .map((food) => `<li>${food.name}</li>`)
    .join('')}</ul>
            </div>
            <div class="menu-drinks">
              <h3>Menu Minuman</h3>
              <ul>${restaurant.menus.drinks
    .map((drink) => `<li>${drink.name}</li>`)
    .join('')}</ul>
            </div>
          </div>
      
          <div class="review-form">
            <h3>Tambahkan Ulasan Anda</h3>
            <div id="alert-message" class="alert-message" hidden></div> <!-- Elemen alert -->
            <input type="text" id="review-name" placeholder="Nama Anda" required />
            <textarea id="review-content" rows="4" placeholder="Tulis ulasan Anda..." required></textarea>
            <button id="submit-review">Kirim Ulasan</button>
          </div>

          <div class="restaurant-reviews">
            <h3>Ulasan Pelanggan</h3>
            <ul id="customer-reviews">
              ${restaurant.customerReviews
    .map(
      (review) => `
                <li>
                  <strong>${review.name}</strong> (${review.date}): 
                  <p>${review.review}</p>
                </li>
              `
    )
    .join('')}
            </ul>
          </div>
        </div>
      `;

      // Inisialisasi tombol favorite
      const favoriteButton = document.getElementById('favorite-button');
      if (await FavoriteDb.getRestaurant(id)) {
        favoriteButton.classList.add('favorited');
        favoriteButton.innerText = 'Favorited';
      }

      // Toggle favorite status
      favoriteButton.addEventListener('click', async () => {
        if (await FavoriteDb.getRestaurant(id)) {
          await FavoriteDb.deleteRestaurant(id);
          favoriteButton.classList.remove('favorited');
          favoriteButton.innerText = 'Favorite';
        } else {
          await FavoriteDb.addRestaurant(restaurant);
          favoriteButton.classList.add('favorited');
          favoriteButton.innerText = 'Favorited';
        }
      });

      // Event listener untuk ulasan pelanggan
      const submitReviewButton = document.getElementById('submit-review');
      submitReviewButton.addEventListener('click', async () => {
        const name = document.getElementById('review-name').value.trim();
        const reviewContent = document.getElementById('review-content').value.trim();
        const alertMessage = document.getElementById('alert-message');

        if (!name || !reviewContent) {
          alertMessage.innerText = 'Nama dan ulasan harus diisi!';
          alertMessage.hidden = false;
          alertMessage.classList.add('error');
          return;
        }

        alertMessage.hidden = true; // Sembunyikan pesan jika input valid

        const reviewData = { id, name, review: reviewContent };

        try {
          submitReviewButton.innerText = 'Mengirim...';
          submitReviewButton.disabled = true;

          const updatedReviews = await RestaurantApi.addReview(reviewData);

          // Update tampilan ulasan
          const reviewsContainer = document.getElementById('customer-reviews');
          reviewsContainer.innerHTML = updatedReviews.customerReviews
            .map(
              (review) => `
          <li>
            <strong>${review.name}</strong> (${review.date}): 
            <p>${review.review}</p>
          </li>
        `,
            )
            .join('');

          // Reset form
          document.getElementById('review-name').value = '';
          document.getElementById('review-content').value = '';
          submitReviewButton.innerText = 'Kirim Ulasan';
        } catch (error) {
          alert(`Gagal mengirim ulasan. Error : ${error}. Silakan coba lagi.`);
        } finally {
          submitReviewButton.disabled = false;
        }
      });
    } catch (error) {
      restaurantContainer.innerHTML = `<p class="error-message">Gagal memuat data detail restoran. Error: ${error}. Silakan coba lagi nanti.</p>`;
    }
  },
};

export default DetailPage;
