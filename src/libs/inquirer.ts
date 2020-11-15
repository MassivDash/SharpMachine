import inquirer from 'inquirer';

const askCustomSharpQuestions = (): any => {
  const questions = [
    {
      name: 'customSharpConfig',
      type: 'editor',
      message: 'please configure the config options',
      default: JSON.stringify({
        quality: 90,
        rotate: false,
        trim: 10,
        jpegQuality: 90,
        pngQuality: 90,
        webpQuality: 90,
        jpegProgressive: true,
        cropFocus: 'left top',
        width: false,
        height: false,
        pngCompressionLevel: 9,
        // default is 4 (https://github.com/kornelski/pngquant/blob/4219956d5e080be7905b5581314d913d20896934/rust/bin.rs#L61)
        pngCompressionSpeed: 4,
        toFormat: '',
        useMozJpeg: false,
        rename: false,
        hashOn: false,
        newName: '',
      }),
    },
  ];
  return inquirer.prompt(questions);
};

const askSharpQuestions = (): Promise<{
  width: number;
  height: number;
  quality: number;
  convert: 'no' | 'jpg' | 'png' | 'webp';
}> => {
  const questions = [
    {
      name: 'width',
      type: 'input',
      message: 'Enter width in px: ',
      default: 1920,
    },
    {
      name: 'height',
      type: 'input',
      message:
        'Enter height in px (leave empty for the same aspect ratio, otherwise image will be cropped):',
    },
    {
      name: 'quality',
      type: 'input',
      message: 'Enter quality setting ( 0 - 100): ',
      default: 80,
    },
    {
      name: 'convert',
      type: 'list',
      message: 'Converting files to another format ?',
      choices: ['no', 'jpg', 'png', 'webp'],
      validate: function (value: string) {
        if (value.length) {
          return true;
        } else {
          return 'Pick sth';
        }
      },
    },
  ];
  return inquirer.prompt(questions);
};

const askWhatWeDoingQuestions = (): Promise<{ WhatWeDoing: string }> => {
  const questions = [
    {
      name: 'WhatWeDoing',
      type: 'list',
      message: 'What are we doing today ?',
      choices: [
        'Default optimizing (quality: 80)',
        'Default optimizing to webp',
        'Custom config',
      ],
      validate: function (value: string) {
        if (value.length) {
          return true;
        } else {
          return 'Pick sth';
        }
      },
    },
  ];
  return inquirer.prompt(questions);
};

const askResizeQuestion = (): Promise<{ AreWeResizing: boolean }> => {
  const questions = [
    {
      name: 'AreWeResizing',
      type: 'confirm',
      message: 'Are we resizing images ?',
      default: false,
    },
  ];
  return inquirer.prompt(questions);
};

const askRenameQuestion = (): Promise<{ RenameFiles: boolean }> => {
  const questions = [
    {
      name: 'RenameFiles',
      type: 'confirm',
      message: 'Are we renaming files ?',
      default: false,
    },
  ];
  return inquirer.prompt(questions);
};

const askForNewName = (): Promise<{ fileName: string; addHash: boolean }> => {
  const questions = [
    {
      name: 'fileName',
      type: 'input',
      message: 'New file name, (-index will be added to the file name) ?',
      default: 'newSeoName',
    },
    {
      name: 'addHash',
      type: 'confirm',
      message: 'Add uuid hash to name?',
      default: false,
    },
  ];
  return inquirer.prompt(questions);
};

const askVerboseQuestions = (): Promise<{ verbose: boolean }> => {
  const questions = [
    {
      name: 'verbose',
      type: 'confirm',
      message: 'Show stats ?',
      default: true,
    },
  ];
  return inquirer.prompt(questions);
};

const askInputQuestions = (): Promise<{
  inputDir: string;
  outputDir: string;
}> => {
  const questions = [
    {
      name: 'inputDir',
      type: 'input',
      message: 'Enter input directory (type . for current folder): ',
      validate: function (value: string) {
        if (value.length) {
          return true;
        } else {
          return 'Gotta type in something';
        }
      },
    },
    {
      name: 'outputDir',
      type: 'input',
      message: 'Enter output directory :',
      validate: function (value: string) {
        if (value.length) {
          return true;
        } else {
          return 'Please Enter output directory';
        }
      },
    },
  ];
  return inquirer.prompt(questions);
};

const askWatermarkQuestion = (): Promise<{ watermark: boolean }> => {
  const questions = [
    {
      name: 'watermark',
      type: 'confirm',
      message:
        'Watermark ? Please place watermark.png file in the photos folder',
      default: true,
    },
  ];
  return inquirer.prompt(questions);
};

const inquirerLibs = {
  askCustomSharpQuestions,
  askForNewName,
  askInputQuestions,
  askRenameQuestion,
  askResizeQuestion,
  askSharpQuestions,
  askVerboseQuestions,
  askWhatWeDoingQuestions,
  askWatermarkQuestion,
};

export default inquirerLibs;
