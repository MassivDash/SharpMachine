
const path = require('path');
const sharp = require('sharp')

module.exports = {
  runSharp: (config, file) => {
    return sharp(file.path)
    .resize(config.size)
    .toFile(`${config.outDir}/${file.name}`)
  },
};

