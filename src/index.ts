#!/usr/bin/env node

/* eslint-disable no-console */
import { Config, InputFile, Dimensions } from './libs/types';
import {
  checkIfOutDirExists,
  getCurrentFiles,
  checkIfInputDirExists,
  getImageSize,
} from './libs/files';
import inquirerLibs from './libs/inquirer';
import { runSharp } from './libs/sharp';
import { Spinner } from 'clui';
import * as lodash from 'lodash';
import chalk from 'chalk';
import { statSync } from 'fs';
import figlet from 'figlet';
import clear from 'clear';
clear();

console.log(
  chalk.blueBright(
    figlet.textSync('Sharp Machine', { horizontalLayout: 'full' }),
  ),
);

console.log(chalk.blueBright('Welcome to sharp machine. ver. 1.0'));

console.log(chalk.blueBright('by spaceghost, https://spaceout.pl'));
console.log('');

const run = async () => {
  const regexImage = new RegExp('.(?:jpg|gif|png|webp)', 'g');
  const regexJpg = new RegExp('.(?:jpg)', 'g');
  const regexPng = new RegExp('.(?:png)', 'g');
  const regexGif = new RegExp('.(?:gif)', 'g');
  const regexWebp = new RegExp('.(?:webp)', 'g');
  const location = await inquirerLibs.askInputQuestions();

  checkIfInputDirExists(location.inputDir);

  let filesList = [];

  try {
    filesList = await getCurrentFiles(location.inputDir);
  } catch (e) {
    console.log(e);
    process.exit();
  }

  let toFormat;
  const imagesList = filesList.filter((file) => file.name.match(regexImage));
  const pngList = filesList.filter((file) => file.name.match(regexPng));
  const jpgList = filesList.filter((file) => file.name.match(regexJpg));
  const gifList = filesList.filter((file) => file.name.match(regexGif));
  const webpList = filesList.filter((file) => file.name.match(regexWebp));

  if (lodash.isEmpty(imagesList)) {
    console.error(chalk.red(`No images`));
    process.exit();
  }
  console.log(
    chalk.blueBright(`
  Total images: ${chalk.white(
    `${imagesList.length}, jpg: ${jpgList.length}, png: ${pngList.length} gif: ${gifList.length} webp: ${webpList.length}`,
  )}
  `),
  );

  const imagesListWitfhInfo = await Promise.all(
    imagesList.map(async (item: InputFile) => {
      const dimenstions: Dimensions = await getImageSize(item);
      return {
        absolutePath: item.path,
        name: item.name,
        dimensions: `${dimenstions.width}px x ${dimenstions.height}px`,
        size: `${(statSync(item.path).size / 1000000.0).toFixed(3)}mb`,
      };
    }),
  );

  console.table(imagesListWitfhInfo);

  const whatWeDoing = await inquirerLibs.askWhatWeDoingQuestions();
  let resize;
  let rename;

  console.log(whatWeDoing);

  if (whatWeDoing.WhatWeDoing !== 'Custom config') {
    resize = await inquirerLibs.askResizeQuestion();
    rename = await inquirerLibs.askRenameQuestion();
  }

  if (whatWeDoing.WhatWeDoing === 'Default optimizing to webp') {
    toFormat = 'webp';
  }

  let config: Config = {
    quality: 90,
    rotate: false,
    trim: 0,
    jpegQuality: 90,
    pngQuality: 90,
    webpQuality: 90,
    jpegProgressive: true,
    cropFocus: 'left top',
    width: 0,
    height: 0,
    verbose: true,
    pngCompressionLevel: 9,
    // default is 4 (https://github.com/kornelski/pngquant/blob/4219956d5e080be7905b5581314d913d20896934/rust/bin.rs#L61)
    pngCompressionSpeed: 4,
    toFormat: toFormat,
    useMozJpeg: false,
  };

  if (resize?.AreWeResizing) {
    const controls = await inquirerLibs.askSharpQuestions();
    config = {
      quality: Number(controls.quality),
      rotate: false,
      trim: false as any,
      jpegQuality: Number(controls.quality),
      pngQuality: Number(controls.quality),
      webpQuality: Number(controls.quality),
      jpegProgressive: true,
      cropFocus: 'left top',
      width: Number(controls.width),
      height: Number(controls.height),
      pngCompressionLevel: 9,
      // default is 4 (https://github.com/kornelski/pngquant/blob/4219956d5e080be7905b5581314d913d20896934/rust/bin.rs#L61)
      pngCompressionSpeed: 4,
      toFormat: toFormat,
      useMozJpeg: false,
    };
  }

  if (rename?.RenameFiles) {
    const newName = await inquirerLibs.askForNewName();
    config.newName = newName.fileName;
    config.hashOn = newName.addHash;
  }

  if (whatWeDoing.WhatWeDoing === 'Custom config') {
    const customConfig = await inquirerLibs.askCustomSharpQuestions();
    config = JSON.parse(customConfig.customSharpConfig);
  }

  const outDir = location.outputDir;
  const verbose = await inquirerLibs.askVerboseQuestions();
  const status = new Spinner('working...');
  checkIfOutDirExists(outDir);
  !verbose.verbose && status.start();

  await Promise.all(
    imagesList.map((image: InputFile, index: number) =>
      runSharp(config, image, outDir, verbose.verbose, index),
    ),
  );
  !verbose.verbose && status.stop();
  console.log(
    chalk.blueBright(
      figlet.textSync('All Done!', {
        horizontalLayout: 'default',
      }),
    ),
  );
  console.log(chalk.white(`Thanks for using sharpmachine`));
};

run();
