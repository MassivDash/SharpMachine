#!/usr/bin/env node
const files = require('./files');
const sharp = require('./sharp');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer  = require('./inquirer');
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
  console.log(chalk.yellowBright(`Total_Images: ${imagesList.length}, jpg: ${jpgList.length}, gif: ${gifList.length}`))
  
  const controls = await inquirer.askSharpQuestions();
  const config = {
    size: Number(controls.size),
    outDir: location.outputDir
}
const status = new Spinner('working...');
files.checkIfOutDirExists(config.outDir);
status.start();
Promise.all(imagesList.map(image => sharp.runSharp(config, image)))
status.stop();


console.log('all done!');
};

run();


