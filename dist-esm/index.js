#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var files_1 = require("./libs/files");
var inquirer_1 = __importDefault(require("./libs/inquirer"));
var sharp_1 = require("./libs/sharp");
var clui_1 = require("clui");
var lodash = __importStar(require("lodash"));
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = require("fs");
var figlet_1 = __importDefault(require("figlet"));
var clear_1 = __importDefault(require("clear"));
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var regexImage, regexJpg, regexPng, regexGif, regexWebp, regexWatermark, location, filesList, e_1, toFormat, imagesList, pngList, jpgList, gifList, webpList, imagesListWitfhInfo, e_2, totalSize, jpgSize, pngSize, gifSize, webpSize, whatWeDoing, resize, rename, config, controls, newName, customConfig, watermark, watermarkPersent, outDir, verbose, status, outFilesList, e_3, outImagesList, outTotalSize, _a, arrayBar, extraBar, text;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                (0, clear_1.default)();
                console.log(chalk_1.default.blueBright(figlet_1.default.textSync('Sharp Machine', { horizontalLayout: 'full' })));
                console.log(chalk_1.default.blueBright('Welcome to sharp machine. ver. 1.2.5'));
                console.log(chalk_1.default.blueBright('by spaceghost, https://spaceout.pl'));
                console.log('');
                regexImage = new RegExp('.(?:jpg|JPG|jpeg|JEPG|PNG|GIF|WEBP|gif|png|webp)', 'g');
                regexJpg = new RegExp('.(?:jpg|JPEG|JPG|jpeg)', 'g');
                regexPng = new RegExp('.(?:png|PNG)', 'g');
                regexGif = new RegExp('.(?:gif|GIF)', 'g');
                regexWebp = new RegExp('.(?:webp|WEBP)', 'g');
                regexWatermark = new RegExp('watermark.png', 'g');
                return [4 /*yield*/, inquirer_1.default.askInputQuestions()];
            case 1:
                location = _b.sent();
                (0, files_1.checkIfInputDirExists)(location.inputDir);
                filesList = [];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, files_1.getCurrentFiles)(location.inputDir)];
            case 3:
                filesList = _b.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _b.sent();
                throw new Error("Error at the input location: " + e_1);
            case 5:
                imagesList = filesList
                    .filter(function (file) { return file.name.match(regexImage); })
                    .filter(function (file) { return file.name !== 'watermark.png'; });
                pngList = filesList.filter(function (file) { return file.name.match(regexPng); });
                jpgList = filesList.filter(function (file) { return file.name.match(regexJpg); });
                gifList = filesList.filter(function (file) { return file.name.match(regexGif); });
                webpList = filesList.filter(function (file) { return file.name.match(regexWebp); });
                if (lodash.isEmpty(imagesList)) {
                    console.error(chalk_1.default.red("No images"));
                    process.exit();
                }
                _b.label = 6;
            case 6:
                _b.trys.push([6, 8, , 9]);
                return [4 /*yield*/, Promise.all(imagesList.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        var dimenstions, e_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, (0, files_1.getImageSize)(item)];
                                case 1:
                                    dimenstions = _a.sent();
                                    return [2 /*return*/, {
                                            absolutePath: item.path,
                                            name: item.name,
                                            dimensions: dimenstions.width + "px x " + dimenstions.height + "px",
                                            size: ((0, fs_1.statSync)(item.path).size / 1000000.0).toFixed(3) + "mb",
                                        }];
                                case 2:
                                    e_4 = _a.sent();
                                    throw new Error("Error at file " + item.path + ": " + e_4);
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 7:
                imagesListWitfhInfo = _b.sent();
                return [3 /*break*/, 9];
            case 8:
                e_2 = _b.sent();
                throw new Error("List of images caught error: " + e_2);
            case 9:
                console.table(imagesListWitfhInfo);
                console.log(chalk_1.default.blueBright("\n  Total images: " + chalk_1.default.white(imagesList.length + ", jpg: " + jpgList.length + ", png: " + pngList.length + " gif: " + gifList.length + " webp: " + webpList.length) + "\n  "));
                totalSize = (0, files_1.getTotalSize)(imagesList);
                jpgSize = (0, files_1.getTotalSize)(jpgList);
                pngSize = (0, files_1.getTotalSize)(pngList);
                gifSize = (0, files_1.getTotalSize)(gifList);
                webpSize = (0, files_1.getTotalSize)(webpList);
                console.log(chalk_1.default.blueBright("\n  Total size of images: " + chalk_1.default.white(totalSize + " MB, jpg: " + jpgSize + " MB, png: " + pngSize + " MB, gif: " + gifSize + " MB, webp: " + webpSize + " MB") + "\n  "));
                return [4 /*yield*/, inquirer_1.default.askWhatWeDoingQuestions()];
            case 10:
                whatWeDoing = _b.sent();
                console.log(whatWeDoing);
                if (!(whatWeDoing.WhatWeDoing !== 'Custom config')) return [3 /*break*/, 13];
                return [4 /*yield*/, inquirer_1.default.askResizeQuestion()];
            case 11:
                resize = _b.sent();
                return [4 /*yield*/, inquirer_1.default.askRenameQuestion()];
            case 12:
                rename = _b.sent();
                _b.label = 13;
            case 13:
                if (whatWeDoing.WhatWeDoing === 'Default optimizing to webp') {
                    toFormat = 'webp';
                }
                config = {
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
                if (!(resize === null || resize === void 0 ? void 0 : resize.AreWeResizing)) return [3 /*break*/, 15];
                return [4 /*yield*/, inquirer_1.default.askSharpQuestions()];
            case 14:
                controls = _b.sent();
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
                    toFormat: controls.convert === 'no' ? toFormat : controls.convert,
                    useMozJpeg: false,
                };
                _b.label = 15;
            case 15:
                if (!(rename === null || rename === void 0 ? void 0 : rename.RenameFiles)) return [3 /*break*/, 17];
                return [4 /*yield*/, inquirer_1.default.askForNewName()];
            case 16:
                newName = _b.sent();
                config.newName = newName.fileName;
                config.hashOn = newName.addHash;
                _b.label = 17;
            case 17:
                if (!(whatWeDoing.WhatWeDoing === 'Custom config')) return [3 /*break*/, 19];
                return [4 /*yield*/, inquirer_1.default.askCustomSharpQuestions()];
            case 18:
                customConfig = _b.sent();
                config = JSON.parse(customConfig.customSharpConfig);
                _b.label = 19;
            case 19: return [4 /*yield*/, inquirer_1.default.askWatermarkQuestion()];
            case 20:
                watermark = _b.sent();
                if (watermark === null || watermark === void 0 ? void 0 : watermark.watermark) {
                    watermarkPersent = filesList.filter(function (file) {
                        return file.name.match(regexWatermark);
                    });
                    if (lodash.isEmpty(watermarkPersent)) {
                        throw new Error('No watermark file found');
                    }
                    config.watermark = true;
                    config.watermarkFile = watermarkPersent[0].path;
                }
                outDir = location.outputDir;
                return [4 /*yield*/, inquirer_1.default.askVerboseQuestions()];
            case 21:
                verbose = _b.sent();
                status = new clui_1.Spinner('working...');
                (0, files_1.checkIfOutDirExists)(outDir);
                !verbose.verbose && status.start();
                return [4 /*yield*/, Promise.all(imagesList.map(function (image, index) {
                        return (0, sharp_1.runSharp)(config, image, outDir, verbose.verbose, index);
                    }))];
            case 22:
                _b.sent();
                !verbose.verbose && status.stop();
                outFilesList = [];
                _b.label = 23;
            case 23:
                _b.trys.push([23, 25, , 26]);
                return [4 /*yield*/, (0, files_1.getCurrentFiles)(outDir)];
            case 24:
                outFilesList = _b.sent();
                return [3 /*break*/, 26];
            case 25:
                e_3 = _b.sent();
                throw new Error("Error at the input location: " + e_3);
            case 26:
                outImagesList = outFilesList.filter(function (file) {
                    return file.name.match(regexImage);
                });
                outTotalSize = (0, files_1.getTotalSize)(outImagesList);
                _a = (0, files_1.changeInSizeBar)(totalSize, outTotalSize), arrayBar = _a.arrayBar, extraBar = _a.extraBar, text = _a.text;
                console.log();
                console.log(chalk_1.default.white("before total size: " + totalSize + " MB"));
                console.log(chalk_1.default.blueBright("after total size: " + outTotalSize + " MB"));
                console.log(chalk_1.default.blueBright("" + arrayBar + extraBar + " " + text));
                console.log('');
                console.log(chalk_1.default.blueBright(figlet_1.default.textSync('All Done!', {
                    horizontalLayout: 'default',
                })));
                console.log(chalk_1.default.white("         Thank you for using sharpmachine"));
                return [2 /*return*/];
        }
    });
}); };
exports.default = run;
//# sourceMappingURL=index.js.map