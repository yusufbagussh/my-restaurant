Feature('Add Review to a Restaurant');

Scenario('Menambahkan ulasan pelanggan pada sebuah restoran', async ({ I }) => {
  // Buka halaman utama
  I.amOnPage('/');

  // Pastikan elemen restoran tersedia
  I.seeElement('.restaurant-list');
  const restaurantCount = await I.grabNumberOfVisibleElements(
    '.restaurant-list'
  );
  if (restaurantCount === 0) {
    throw new Error('Tidak ada restoran yang tersedia untuk pengujian.');
  }

  // Klik tombol "See Details" pada restoran pertama
  I.seeElement('.restaurant-list .cta-button');
  I.click(locate('.restaurant-list .cta-button').first());

  // Pastikan berada di halaman detail
  I.seeElement('.detail-container');

  // Isi form ulasan
  I.fillField('#review-name', 'Test User');
  I.fillField('#review-content', 'Makanan sangat enak dan pelayanan baik.');

  // Kirim ulasan
  I.click('#submit-review');

  // Verifikasi ulasan baru ditambahkan
  I.see('Test User', '#customer-reviews');
  I.see('Makanan sangat enak dan pelayanan baik.', '#customer-reviews');
});

Scenario(
  'Menambahkan ulasan pelanggan tanpa nama atau konten ulasan (negative case)',
  async ({ I }) => {
    // Buka halaman utama
    I.amOnPage('/');

    // Klik tombol "See Details" pada restoran pertama
    I.click(locate('.restaurant-list .cta-button').first());

    // Pastikan berada di halaman detail
    I.seeElement('.detail-container');

    // Isi form ulasan tanpa nama
    I.fillField('#review-name', '');
    I.fillField('#review-content', 'Makanan enak.');

    // Kirim ulasan
    I.click('#submit-review');

    // Pastikan ulasan tidak ditambahkan
    I.dontSee('Makanan enak.', '#customer-reviews');
    I.see('Nama dan ulasan harus diisi!', '.alert-message'); // Tampilkan pesan error
  }
);
