
const path = require('path');
const sharp = require('sharp')

module.exports = {
  runSharp: (config, file) => {
    const fileName = file.substring(4);
    return sharp(file)
    .resize(config.size)
    .toFile(`${config.outDir}/${fileName}`)
  },
};

