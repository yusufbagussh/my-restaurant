const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images/heros");
const destination = path.resolve(__dirname, "dist/images");

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  const imageName = image.split(".").slice(0, -1).join("."); // Nama file tanpa ekstensi

  // Large image (1200px)
  sharp(`${target}/${image}`)
    .resize(1200)
    .jpeg({ quality: 75 })
    .toFile(`${destination}/${imageName}-large.jpg`);

  // Medium image (768px)
  sharp(`${target}/${image}`)
    .resize(768)
    .jpeg({ quality: 75 })
    .toFile(`${destination}/${imageName}-medium.jpg`);

  // Small image (480px)
  sharp(`${target}/${image}`)
    .resize(480)
    .jpeg({ quality: 75 })
    .toFile(`${destination}/${imageName}-small.jpg`);
});
