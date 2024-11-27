// src/scripts/api/restaurant-api.js
const API_BASE_URL = 'https://restaurant-api.dicoding.dev';

const RestaurantApi = {
  async getRestaurants() {
    const response = await fetch(`${API_BASE_URL}/list`);
    const data = await response.json();
    return data.restaurants;
  },

  async getRestaurantDetail(id) {
    const response = await fetch(`${API_BASE_URL}/detail/${id}`);
    const data = await response.json();
    return data.restaurant;
  },

  async addReview(reviewData) {
    const response = await fetch(`${API_BASE_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    const data = await response.json();
    return data;
  },
};

export default RestaurantApi;
