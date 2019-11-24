const fs = require("fs")
const sharp = require('sharp');
const chalk = require('chalk');
const imageSize = require(`probe-image-size`)

const getImageSize = file => {
    const dimensions = imageSize.sync(
      toArray(fs.readFileSync(file.path))
    )
    return dimensions
}

function getPercentageChange(oldNumber, newNumber){
  var decreaseValue = oldNumber - newNumber;

  return ((decreaseValue / oldNumber) * 100).toFixed(2);
}


function toArray(buf) {
  var arr = new Array(buf.length)

  for (var i = 0; i < buf.length; i++) {
    arr[i] = buf[i]
  }

  return arr
}

module.exports = {
  runSharp: async (config, file, outDir, verbose) => {

  let width
  let height
  // Calculate the eventual width/height of the image.
  const dimensions = getImageSize(file)
  let aspectRatio = dimensions.width / dimensions.height

  // If the width/height are both set, we're cropping so just return
  // that.
  if (config.width && config.height) {
    width = config.width
    height = config.height
    // Recalculate the aspectRatio for the cropped photo
    aspectRatio = width / height
  } else if (config.width) {
    // Use the aspect ratio of the image to calculate what will be the resulting
    // height.
    width = config.width
    height = Math.round(config.width / aspectRatio)
  } else {
    // Use the aspect ratio of the image to calculate what will be the resulting
    // width.
    height = dimensions.height
    width = dimensions.width
  }
    let pipeline
    try {
      pipeline = sharp(file.path)
  
      if (!config.rotate) {
        pipeline.rotate()
      }
    } catch (err) {
      console.log(chalk.red(`Failed to process image ${file.path}, error: ${err}`))
      return null
    }
  
    if (config.trim) {
      pipeline = pipeline.trim(config.trim)
    }

    let nameWithfileExtension = file.name
    if (config.toFormat === 'webp' || config.toFormat === 'png' || config.toFormat === 'jpg'){
      nameWithfileExtension = `${file.name.slice(0, -3)}${config.toFormat}`
    }
  
  
    await pipeline
      .resize(width, height, {
        position: config.cropFocus,
      })
      .png({
        compressionLevel: config.pngCompressionLevel,
        adaptiveFiltering: false,
        force: config.toFormat === `png`,
      })
      .jpeg({
        quality: config.jpegQuality || config.quality,
        progressive: config.jpegProgressive,
        force: config.toFormat === `jpg`,
      })
      .webp({
        quality: config.webpQuality || config.quality,
        force: config.toFormat === `webp`,
      })
      .toFile(`${outDir}/${nameWithfileExtension}`)

    
    if(verbose.verbose){
        const before = await (fs.statSync(file.path).size / 1000000.0).toFixed(3)
        const after = await (fs.statSync(`${process.cwd()}/${outDir}/${nameWithfileExtension}`).size / 1000000.0).toFixed(3) 
        console.log(chalk.blueBright(`
        new file: ${chalk.white(`${nameWithfileExtension}`)}
        size: ${chalk.white(`${after} MB`)}
        
        size before: ${chalk.white(`${before} MB`)}  
        change in size: ${chalk.white(`${getPercentageChange(before, after)}%`)},
        
        resolution before: ${chalk.white(`${dimensions.width} px, ${dimensions.height} px`)},
        resolution after: ${chalk.white(`${width} px, ${height} px`)}`
    ));
    }
    
    return pipeline
  },
};

