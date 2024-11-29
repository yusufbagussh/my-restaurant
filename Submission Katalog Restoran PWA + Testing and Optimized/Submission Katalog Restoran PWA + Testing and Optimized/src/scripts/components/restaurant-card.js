class RestaurantCard extends HTMLElement {
  set restaurant(data) {
    this._restaurant = data;
    this.render();
  }

  render() {
    const { id, name, pictureId, city, rating, description } = this._restaurant;

    this.innerHTML = `
        <div class="restaurant-card" tabindex="0">
        <img 
        class="restaurant-img lazyload" 
        data-src="https://restaurant-api.dicoding.dev/images/medium/${pictureId}" 
        alt="${name}" 
        />          
        <div class="restaurant-info">
            <h3 class="restaurant-name">${name}</h3>
            <p class="restaurant-city">Kota: ${city}</p>
            <p class="restaurant-rating">Rating: ${rating}</p>
            <p class="restaurant-description">${description.substring(
    0,
    150
  )}...</p>
            <a href="#/detail/${id}" class="cta-button">See Details</a>
          </div>
        </div>
      `;
  }
}

customElements.define('restaurant-card', RestaurantCard);
export default RestaurantCard;
