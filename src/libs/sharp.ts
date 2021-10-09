/* eslint-disable no-console */
import { Config, InputFile, Dimensions } from './types';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
import { getImageSize, changeInSizeBar } from './files';

export const runSharp = async (
  config: Config,
  file: InputFile,
  outDir: string,
  verbose: boolean,
  index: number,
): Promise<any> => {
  let width: number;
  let height: number;
  // Calculate the eventual width/height of the image.
  const dimensions: Dimensions = await getImageSize(file);
  let aspectRatio = dimensions.width / dimensions.height;

  // If the width/height are both set, we're cropping so just return
  // that.
  if (config.width && config.height) {
    width = Number(config.width);
    height = Number(config.height);
    // Recalculate the aspectRatio for the cropped photo
    aspectRatio = width / height;
  } else if (config.width) {
    // Use the aspect ratio of the image to calculate what will be the resulting
    // height.
    width = Number(config.width);
    height = Math.round(width / aspectRatio);
  } else {
    // Use the aspect ratio of the image to calculate what will be the resulting
    // width.
    height = dimensions.height;
    width = dimensions.width;
  }
  let pipeline;
  try {
    pipeline = sharp(file.path);

    if (!config.rotate) {
      pipeline.rotate();
    }
  } catch (err) {
    console.log(
      chalk.red(`Failed to process image ${file.path}, error: ${err}`),
    );
    return null;
  }

  if (config.trim) {
    pipeline = pipeline.trim(config.trim);
  }

  let nameWithfileExtension = file.name;
  const changeFileExtension =
    config.toFormat === 'webp' ||
    config.toFormat === 'png' ||
    config.toFormat === 'jpg';

  if (changeFileExtension) {
    if (file?.name.slice(0, -3) === 'web') {
      nameWithfileExtension = `${file?.name.slice(0, -4)}${config.toFormat}`;
    } else {
      nameWithfileExtension = `${file?.name.slice(0, -3)}${config.toFormat}`;
    }
  }

  if (config.newName) {
    nameWithfileExtension = `${config.newName}-${index + 1}${
      config.hashOn ? `-${uuidv4()}` : ``
    }.${
      changeFileExtension
        ? config.toFormat
        : file.name.slice(file.name.length - 3)
    }`;
  }

  if (config.watermark) {
    pipeline.composite([{ input: config.watermarkFile, gravity: 'southeast' }]);
  }

  await pipeline
    .resize(width, height, {
      position: config.cropFocus,
    })
    .png({
      compressionLevel: config.pngCompressionLevel,
      adaptiveFiltering: true,
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
    .toFile(path.join(process.cwd(), outDir, '/', nameWithfileExtension));

  if (verbose) {
    const before = await (fs.statSync(file.path).size / 1000000.0).toFixed(3);
    const after = await (
      fs.statSync(path.join(process.cwd(), '/', outDir, nameWithfileExtension))
        .size / 1000000.0
    ).toFixed(3);

    const { arrayBar, extraBar, text } = changeInSizeBar(before, after);

    console.log(
      chalk.blueBright(`
        new file: ${chalk.white(`${nameWithfileExtension}`)}
        original size: ${chalk.white(`${before} MB`)}  
        new size: ${chalk.white(`${after} MB`)}
        ${arrayBar}${extraBar} ${text}

        resolution before: ${chalk.white(
          `${dimensions.width} px, ${dimensions.height} px`,
        )},
        resolution after: ${chalk.white(`${width} px, ${height} px`)}`),
    );
  }

  try {
    return await pipeline;
  } catch (e) {
    throw new Error(`Pipeline error: ${e}`);
  }
};
