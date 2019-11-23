#!/usr/bin/env node
const files = require('./libs/files');
const sharp = require('./libs/sharp/sharp');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer  = require('./libs/inquirer');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const lodash = require('lodash');


clear();

console.log(
  chalk.blueBright(
    figlet.textSync('Sharp Machine', { horizontalLayout: 'full' })
  )
);

console.log(
    chalk.blueBright('Welcome to sharp machine. ver. 1.0')
  );

console.log(
    chalk.blueBright('by spaceghost, https://spaceout.pl')
  );
console.log('');


const run = async () => {
  
  const regexImage = new RegExp('\.(?:jpg|gif|png)', 'g');
  const regexJpg = new RegExp('\.(?:jpg)', 'g');
  const regexPng = new RegExp('\.(?:png)', 'g');
  const regexGif = new RegExp('\.(?:gif)', 'g');        
  const location = await inquirer.askInputQuestions(); 
    let filesList = [];
  try {
    filesList = await files.getCurrentFiles(location.inputDir);
  } catch(e) {
    console.log(e);  
    process.exit('wrong directory', e)
  }
  
  let toFormat;
  const imagesList = filesList.filter(( file ) => file.name.match(regexImage));
  const pngList = filesList.filter(( file ) => file.name.match(regexPng));
  const jpgList = filesList.filter(( file ) => file.name.match(regexJpg));
  const gifList = filesList.filter(( file ) => file.name.match(regexGif));
  
  if(lodash.isEmpty(imagesList)){
      console.log(
        chalk.red(`No images`) 
      )
      process.exit('No images')
  }
  console.log(chalk.yellowBright(`
  Total images: ${imagesList.length}, jpg: ${jpgList.length}, png: ${pngList.length} gif: ${gifList.length}
  `))

  const whatWeDoing = await inquirer.askWhatWeDoingQuestions();
  if(whatWeDoing.WhatWeDoing === 'Default optimizing to webp') {
    toFormat = 'webp'
  }

  let config = {
    quarlity: 90,
    rotate: false,
    trim: false,
    jpegQuality: 90,
    pngQuality: 90,
    webpQuality: 90,
    jpegProgressive: true,
    cropFocus: 'left top',
    width: false,
    height: false,
    outDir: location.outputDir,
    verbose: true,
    pngCompressionLevel: 9,
    // default is 4 (https://github.com/kornelski/pngquant/blob/4219956d5e080be7905b5581314d913d20896934/rust/bin.rs#L61)
    pngCompressionSpeed: 4,
    toFormat: toFormat,
    useMozJpeg: false
}
  
  

  console.log(whatWeDoing.AreWeResizing)
  if(whatWeDoing.AreWeResizing) {
    const controls = await inquirer.askSharpQuestions();
    config = {
      quality: Number(controls.quality),
      rotate: false,
      trim: false,
      jpegQuality: Number(controls.quality),
      pngQuality: Number(controls.quality),
      webpQuality: Number(controls.quality),
      jpegProgressive: true,
      cropFocus: 'left top',
      width: Number(controls.width),
      height: Number(controls.height),
      outDir: location.outputDir,
      pngCompressionLevel: 9,
      // default is 4 (https://github.com/kornelski/pngquant/blob/4219956d5e080be7905b5581314d913d20896934/rust/bin.rs#L61)
      pngCompressionSpeed: 4,
      toFormat: toFormat,
      useMozJpeg: false
  }
  
}


const verbose = await inquirer.askVerboseQuestions();
const status = new Spinner('working...');
files.checkIfOutDirExists(config.outDir);
status.start();

await Promise.all(imagesList.map(image => sharp.runSharp(config, image, verbose)))
status.stop();
console.log(chalk.blueBright(`

             All done!
             
             Thanks for using sharp machine.
             `));
};

run();