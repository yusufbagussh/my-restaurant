// src/scripts/db/__tests__/favorite-db.test.js
import FavoriteDb from "../../src/scripts/db/favorite-db";

describe("Favorite Restaurant Database Scenarios", () => {
  const mockRestaurant = {
    id: "rqdv5juczeskfw1e867",
    name: "Mock Restaurant",
    city: "Mock City",
    rating: 4.5,
  };

  afterEach(async () => {
    // Bersihkan database setelah setiap pengujian
    const restaurants = await FavoriteDb.getAllRestaurants();
    restaurants.forEach(async (restaurant) => {
      await FavoriteDb.deleteRestaurant(restaurant.id);
    });
  });

  // A. Menyukai Restaurant
  describe("Liking a Restaurant", () => {
    it("should display the widget to like the restaurant when it has not been liked", async () => {
      const restaurant = await FavoriteDb.getRestaurant(mockRestaurant.id);
      expect(restaurant).toBeUndefined(); // Restaurant belum disukai
    });

    it("should add the restaurant to the favorites when the like button is pressed", async () => {
      await FavoriteDb.addRestaurant(mockRestaurant); // Menyukai restaurant
      const restaurant = await FavoriteDb.getRestaurant(mockRestaurant.id);
      expect(restaurant).toEqual(mockRestaurant); // Berhasil ditambahkan
    });

    it("should not re-add the restaurant if it is already in favorites", async () => {
      await FavoriteDb.addRestaurant(mockRestaurant); // Tambah pertama kali
      await FavoriteDb.addRestaurant(mockRestaurant); // Tambah kedua kali (tidak perlu menyimpan kembali)

      const restaurants = await FavoriteDb.getAllRestaurants();
      expect(restaurants.length).toBe(1); // Harus tetap 1 karena tidak ada duplikasi
    });

    it("should not add a restaurant without an ID", async () => {
      const invalidRestaurant = { name: "Invalid Restaurant" }; // Restaurant tanpa ID
      try {
        await FavoriteDb.addRestaurant(invalidRestaurant); // Coba simpan
      } catch (error) {
        expect(error.message).toBeDefined(); // Error harus muncul
      }

      const restaurants = await FavoriteDb.getAllRestaurants();
      expect(restaurants.length).toBe(0); // Tidak ada restaurant yang disimpan
    });
  });

  // B. Batal Menyukai Restaurant
  describe("Unliking a Restaurant", () => {
    it("should display the widget to unlike the restaurant when it has been liked", async () => {
      await FavoriteDb.addRestaurant(mockRestaurant); // Tambah ke favorit
      const restaurant = await FavoriteDb.getRestaurant(mockRestaurant.id);
      expect(restaurant).toEqual(mockRestaurant); // Widget untuk unlike muncul
    });

    it("should remove the restaurant from the favorites when the unlike button is pressed", async () => {
      await FavoriteDb.addRestaurant(mockRestaurant); // Tambah ke favorit
      await FavoriteDb.deleteRestaurant(mockRestaurant.id); // Hapus dari favorit

      const restaurant = await FavoriteDb.getRestaurant(mockRestaurant.id);
      expect(restaurant).toBeUndefined(); // Restaurant berhasil dihapus
    });

    it("should do nothing when trying to unlike a restaurant that is not in favorites", async () => {
      const result = await FavoriteDb.deleteRestaurant("non-existent-id"); // Hapus restaurant yang tidak ada
      expect(result).toBeUndefined(); // Tidak ada error dan tidak ada yang dihapus
    });
  });
});
