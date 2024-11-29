import { openDB } from 'idb';

const DATABASE_NAME = 'favorite-restaurants';
const STORE_NAME = 'restaurants';

const dbPromise = openDB(DATABASE_NAME, 1, {
  upgrade(database) {
    database.createObjectStore(STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteDb = {
  async addRestaurant(restaurant) {
    return (await dbPromise).put(STORE_NAME, restaurant);
  },

  async deleteRestaurant(id) {
    return (await dbPromise).delete(STORE_NAME, id);
  },

  async getRestaurant(id) {
    return (await dbPromise).get(STORE_NAME, id);
  },

  async getAllRestaurants() {
    return (await dbPromise).getAll(STORE_NAME);
  }
};

export default FavoriteDb;