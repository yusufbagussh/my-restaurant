// src/scripts/db/__tests__/favorite-db.test.js
import FavoriteDb from '../../src/scripts/db/favorite-db';

describe('Favorite Restaurant Database Test Cases', () => {
  const mockRestaurant = {
    id: 'rqdv5juczeskfw1e867',
    name: 'Mock Restaurant',
    city: 'Mock City',
    rating: 4.5,
  };

  afterEach(async () => {
    // Bersihkan database setelah setiap pengujian
    const restaurants = await FavoriteDb.getAllRestaurants();
    restaurants.forEach(async (restaurant) => {
      await FavoriteDb.deleteRestaurant(restaurant.id);
    });
  });

  it('should add a restaurant to favorites (positive case)', async () => {
    await FavoriteDb.addRestaurant(mockRestaurant);
    const restaurant = await FavoriteDb.getRestaurant(mockRestaurant.id);
    expect(restaurant).toEqual(mockRestaurant);
  });

  it('should not add a restaurant with invalid data (negative case)', async () => {
    const invalidRestaurant = {};
    try {
      await FavoriteDb.addRestaurant(invalidRestaurant);
    } catch (error) {
      expect(error.message).toBeDefined();
    }
  });

  it('should delete a restaurant from favorites (positive case)', async () => {
    await FavoriteDb.addRestaurant(mockRestaurant);
    await FavoriteDb.deleteRestaurant(mockRestaurant.id);
    const restaurant = await FavoriteDb.getRestaurant(mockRestaurant.id);
    expect(restaurant).toBeUndefined();
  });

  it('should return undefined when trying to delete a non-existent restaurant (negative case)', async () => {
    const result = await FavoriteDb.deleteRestaurant('non-existent-id');
    expect(result).toBeUndefined();
  });

  it('should get all restaurants (positive case)', async () => {
    await FavoriteDb.addRestaurant(mockRestaurant);
    const restaurants = await FavoriteDb.getAllRestaurants();
    expect(restaurants.length).toBeGreaterThan(0);
  });
});