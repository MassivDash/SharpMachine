"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
var askCustomSharpQuestions = function () {
    var questions = [
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
    return inquirer_1.default.prompt(questions);
};
var askSharpQuestions = function () {
    var questions = [
        {
            name: 'width',
            type: 'input',
            message: 'Enter width in px: ',
            default: 1920,
        },
        {
            name: 'height',
            type: 'input',
            message: 'Enter height in px (leave empty for the same aspect ratio, otherwise image will be cropped):',
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
            validate: function (value) {
                if (value.length) {
                    return true;
                }
                else {
                    return 'Pick sth';
                }
            },
        },
    ];
    return inquirer_1.default.prompt(questions);
};
var askWhatWeDoingQuestions = function () {
    var questions = [
        {
            name: 'WhatWeDoing',
            type: 'list',
            message: 'What are we doing today ?',
            choices: [
                'Default optimizing (quality: 80)',
                'Default optimizing to webp',
                'Custom config',
            ],
            validate: function (value) {
                if (value.length) {
                    return true;
                }
                else {
                    return 'Pick sth';
                }
            },
        },
    ];
    return inquirer_1.default.prompt(questions);
};
var askResizeQuestion = function () {
    var questions = [
        {
            name: 'AreWeResizing',
            type: 'confirm',
            message: 'Are we resizing images ?',
            default: false,
        },
    ];
    return inquirer_1.default.prompt(questions);
};
var askRenameQuestion = function () {
    var questions = [
        {
            name: 'RenameFiles',
            type: 'confirm',
            message: 'Are we renaming files ?',
            default: false,
        },
    ];
    return inquirer_1.default.prompt(questions);
};
var askForNewName = function () {
    var questions = [
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
    return inquirer_1.default.prompt(questions);
};
var askVerboseQuestions = function () {
    var questions = [
        {
            name: 'verbose',
            type: 'confirm',
            message: 'Show stats ?',
            default: true,
        },
    ];
    return inquirer_1.default.prompt(questions);
};
var askInputQuestions = function () {
    var questions = [
        {
            name: 'inputDir',
            type: 'input',
            message: 'Enter input directory (type . for current folder): ',
            validate: function (value) {
                if (value.length) {
                    return true;
                }
                else {
                    return 'Gotta type in something';
                }
            },
        },
        {
            name: 'outputDir',
            type: 'input',
            message: 'Enter output directory :',
            validate: function (value) {
                if (value.length) {
                    return true;
                }
                else {
                    return 'Please Enter output directory';
                }
            },
        },
    ];
    return inquirer_1.default.prompt(questions);
};
var askWatermarkQuestion = function () {
    var questions = [
        {
            name: 'watermark',
            type: 'confirm',
            message: 'Watermark ? Please place watermark.png file in the photos folder',
            default: true,
        },
    ];
    return inquirer_1.default.prompt(questions);
};
var inquirerLibs = {
    askCustomSharpQuestions: askCustomSharpQuestions,
    askForNewName: askForNewName,
    askInputQuestions: askInputQuestions,
    askRenameQuestion: askRenameQuestion,
    askResizeQuestion: askResizeQuestion,
    askSharpQuestions: askSharpQuestions,
    askVerboseQuestions: askVerboseQuestions,
    askWhatWeDoingQuestions: askWhatWeDoingQuestions,
    askWatermarkQuestion: askWatermarkQuestion,
};
exports.default = inquirerLibs;
//# sourceMappingURL=inquirer.js.map