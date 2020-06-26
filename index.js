#!/usr/bin/env node
const files = require('./libs/files');
const sharp = require('./libs/sharp');
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
  
  const regexImage = new RegExp('\.(?:jpg|gif|png|webp)', 'g');
  const regexJpg = new RegExp('\.(?:jpg)', 'g');
  const regexPng = new RegExp('\.(?:png)', 'g');
  const regexGif = new RegExp('\.(?:gif)', 'g');
  const regexWebp = new RegExp('\.(?:webp)', 'g');        
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
  const webpList = filesList.filter(( file ) => file.name.match(regexWebp));
  
  if(lodash.isEmpty(imagesList)){
      console.log(
        chalk.red(`No images`) 
      )
      process.exit('No images')
  }
  console.log(chalk.blueBright(`
  Total images: ${chalk.white(`${imagesList.length}, jpg: ${jpgList.length}, png: ${pngList.length} gif: ${gifList.length} webp: ${webpList.length}`)}
  `))

  const whatWeDoing = await inquirer.askWhatWeDoingQuestions();
  const resize = whatWeDoing.WhatWeDoing !== 'Custom config' && await inquirer.askResizeQuestion();
  const rename = whatWeDoing.WhatWeDoing !== 'Custom config' && await inquirer.askRenameQuestion();
  if(whatWeDoing.WhatWeDoing === 'Default optimizing to webp') {
    toFormat = 'webp'
  }

  let config = {
    quality: 90,
    rotate: false,
    trim: false,
    jpegQuality: 90,
    pngQuality: 90,
    webpQuality: 90,
    jpegProgressive: true,
    cropFocus: 'left top',
    width: false,
    height: false,
    verbose: true,
    pngCompressionLevel: 9,
    // default is 4 (https://github.com/kornelski/pngquant/blob/4219956d5e080be7905b5581314d913d20896934/rust/bin.rs#L61)
    pngCompressionSpeed: 4,
    toFormat: toFormat,
    useMozJpeg: false
}
  
  if(resize.AreWeResizing ) {
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
      pngCompressionLevel: 9,
      // default is 4 (https://github.com/kornelski/pngquant/blob/4219956d5e080be7905b5581314d913d20896934/rust/bin.rs#L61)
      pngCompressionSpeed: 4,
      toFormat: toFormat,
      useMozJpeg: false
  }
}

if(rename.RenameFiles){
  const newName = await inquirer.askForNewName()
  config.newName = newName.fileName;
  config.hashOn = newName.addHash
} 

  if(whatWeDoing.WhatWeDoing === 'Custom config') {
  const customConfig = await inquirer.askCustomSharpQuestions();
  config = JSON.parse(customConfig.customSharpConfig)  
}

const outDir = location.outputDir
const verbose = await inquirer.askVerboseQuestions();
const status = new Spinner('working...');
files.checkIfOutDirExists(outDir);
status.start();

await Promise.all(imagesList.map((image, index) => sharp.runSharp(config, image, outDir, verbose, index)))
status.stop();
console.log(chalk.blueBright(`

             All done!
             
             Thanks for using sharp machine.
             `));
};

run();