const assert = require('assert'); // Tambahkan ini di bagian atas

Feature("Favorite Restaurant");

Scenario("Menyukai salah satu restoran", async ({ I }) => {
  // Navigasikan ke halaman Favorit terlebih dahulu
  I.amOnPage("/#/favorites");

  // Pastikan tidak ada restoran di daftar Favorit
  I.seeElement(".restaurant-list"); // Pastikan halaman kosong tersedia
  I.dontSeeElement(".restaurant-card"); // Tidak ada restoran yang difavoritkan

  // Buka halaman utama
  I.amOnPage("/");

  // Pastikan elemen restoran tersedia
  I.seeElement(".restaurant-list");
  const restaurantName = await I.grabTextFrom(
    ".restaurant-card .restaurant-name"
  );

  // Klik tombol "See Details" pada restoran pertama
  I.seeElement(".restaurant-list .cta-button");
  I.click(locate(".restaurant-list .cta-button").first());

  // Klik tombol Favorite
  I.seeElement("#favorite-button");
  I.click("#favorite-button");

  // Verifikasi tombol berubah status
  I.see("Favorited", "#favorite-button");

  // Navigasikan ke halaman Favorit
  I.amOnPage("/#/favorites");

  // Verifikasi restoran yang disukai ada di daftar Favorit
  I.seeElement(".restaurant-list");
  I.see(restaurantName, ".restaurant-list");

  const favoritedRestaurantName = await I.grabTextFrom(
    locate(".restaurant-card .restaurant-name").first()
  );

  // Bandingkan nama restoran yang difavoritkan dengan nama restoran awal
  assert.strictEqual(restaurantName, favoritedRestaurantName);
});

Scenario("Membatalkan suka pada restoran", async ({ I }) => {
  // Buka halaman utama
  I.amOnPage("/");

  // Pastikan elemen restoran tersedia
  I.seeElement(".restaurant-list");
  const restaurantCount = await I.grabNumberOfVisibleElements(
    ".restaurant-list"
  );
  if (restaurantCount === 0) {
    throw new Error("Tidak ada restoran yang tersedia untuk pengujian.");
  }

  // Klik tombol "See Details" pada restoran pertama
  I.seeElement(".restaurant-list .cta-button");
  I.click(locate(".restaurant-list .cta-button").first());

  // Klik tombol Favorite
  I.seeElement("#favorite-button");
  I.click("#favorite-button");

  // Navigasikan ke halaman Favorit
  I.amOnPage("/#/favorites");

  // Verifikasi restoran yang disukai ada di daftar Favorit
  I.seeElement(".restaurant-list");

  // Klik restoran untuk membuka detail
  I.click(locate(".restaurant-list .cta-button").first());

  // Klik tombol "Favorited" untuk membatalkan suka
  I.seeElement("#favorite-button");
  I.click("#favorite-button");

  // Verifikasi tombol berubah menjadi "Favorite"
  I.see("Favorite", "#favorite-button");

  // Kembali ke halaman Favorit
  I.amOnPage("/#/favorites");

  // Verifikasi daftar favorit kosong
  I.dontSeeElement(".restaurant-card");
});