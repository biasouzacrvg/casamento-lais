const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "../images/fotos-pw");
const outputFile = path.join(__dirname, "../gallery-ren.json");

const files = fs.readdirSync(imagesDir)
  .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
  .sort();

fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));

console.log(`Galeria gerada com ${files.length} imagens`);