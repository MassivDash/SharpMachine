const inquirer = require('inquirer');

module.exports = {
  askSharpQuestions: () => {
    const questions = [
      {
        name: 'width',
        type: 'input',
        message: 'Enter width in px: ',
        default: 1920
      },
      {
        name: 'height',
        type: 'input',
        message: 'Enter height in px (leave empty for the same aspect ratio):',
      },
      {
        name: 'quality',
        type: 'input',
        message: 'Enter quality setting ( 0 - 100): ',
        default: 80
      }
    ];
    return inquirer.prompt(questions);
  },
  askWhatWeDoingQuestions: () => {
    const questions = [
      {
        name: 'WhatWeDoing',
        type: 'list',
        message: 'What are we doing today ?',
        choices: [
          'Default optimizing (quality: 80)',
          'Default optimizing to webp',
          'Custom config'
        ],
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Pick sth';
          }
        }
      },
      {
        name: 'AreWeResizing',
        type: 'confirm',
        message: 'Are we resizing images ?',
        default: false,
      },
    ];
    return inquirer.prompt(questions);
  },
  askVerboseQuestions: () => {
    const questions = [
      {
        name: 'verbose',
        type: 'confirm',
        message: 'verbose ?',
        default: false,
      },
    ];
    return inquirer.prompt(questions);
  },
  askInputQuestions: () => {
    const questions = [
      {
        name: 'inputDir',
        type: 'input',
        message: 'Enter input directory (type . for current folder): ',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Gotta type in something';
          }
        }
      },
      {
        name: 'outputDir',
        type: 'input',
        message: 'Enter output directory :',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please Enter output directory';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
};