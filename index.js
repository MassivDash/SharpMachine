const files = require('./files');
const sharp = require('./sharp');


const imagesPath = files.getCurrentDirectoryBase();

const imagesList = files.getCurrentFiles('./src');

const config = {
    size: 1200,
    outDir: `out`
}

files.checkIfOutDirExists(config.outDir);


Promise.all(imagesList.map(image => sharp.runSharp(config, image)))


console.log(imagesList)
