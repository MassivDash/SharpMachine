const inquirer = require('inquirer');

module.exports = {
  askSharpQuestions: () => {
    const questions = [
      {
        name: 'size',
        type: 'input',
        message: 'Enter width in px',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Enter size in px';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askInputQuestions: () => {
    const questions = [
      {
        name: 'inputDir',
        type: 'input',
        message: 'Enter inputDir',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Enter inputDir';
          }
        }
      },
      {
        name: 'outputDir',
        type: 'input',
        message: 'Enter output directory',
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