const fs = require("fs")
const path = require('path');
const sharp = require('sharp');
const chalk = require('chalk');

module.exports = {
  runSharp: async (config, file) => {
    
    const image = await sharp(file.path)
    .resize(config.size)
    .toFile(`${config.outDir}/${file.name}`)
    if(config.verbose){
        const before = (fs.statSync(file.path).size / 1000000.0).toFixed(3)
        const after = (fs.statSync(`${process.cwd()}/${config.outDir}/${file.name}`).size / 1000000.0).toFixed(3)
        const less = before * after * 100 - 100
        console.log(chalk.blueBright(`
        name: ${file.name}
        size before: ${before} MB
        size after: ${after} MB
        change: ${less.toFixed(2)}%,`,
        
    ));
    }    
    return image
  },
};

