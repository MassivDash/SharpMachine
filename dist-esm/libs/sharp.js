"use strict";
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
exports.runSharp = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var chalk_1 = __importDefault(require("chalk"));
var uuid_1 = require("uuid");
var files_1 = require("./files");
var runSharp = function (config, file, outDir, verbose, index) { return __awaiter(void 0, void 0, void 0, function () {
    var width, height, dimensions, aspectRatio, pipeline, nameWithfileExtension, changeFileExtension, before, after, _a, arrayBar, extraBar, text, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, files_1.getImageSize)(file)];
            case 1:
                dimensions = _b.sent();
                aspectRatio = dimensions.width / dimensions.height;
                // If the width/height are both set, we're cropping so just return
                // that.
                if (config.width && config.height) {
                    width = Number(config.width);
                    height = Number(config.height);
                    // Recalculate the aspectRatio for the cropped photo
                    aspectRatio = width / height;
                }
                else if (config.width) {
                    // Use the aspect ratio of the image to calculate what will be the resulting
                    // height.
                    width = Number(config.width);
                    height = Math.round(width / aspectRatio);
                }
                else {
                    // Use the aspect ratio of the image to calculate what will be the resulting
                    // width.
                    height = dimensions.height;
                    width = dimensions.width;
                }
                try {
                    pipeline = (0, sharp_1.default)(file.path);
                    if (!config.rotate) {
                        pipeline.rotate();
                    }
                }
                catch (err) {
                    console.log(chalk_1.default.red("Failed to process image " + file.path + ", error: " + err));
                    return [2 /*return*/, null];
                }
                if (config.trim) {
                    pipeline = pipeline.trim(config.trim);
                }
                nameWithfileExtension = file.name;
                changeFileExtension = config.toFormat === 'webp' ||
                    config.toFormat === 'png' ||
                    config.toFormat === 'jpg';
                if (changeFileExtension) {
                    if ((file === null || file === void 0 ? void 0 : file.name.slice(0, -3)) === 'web') {
                        nameWithfileExtension = "" + (file === null || file === void 0 ? void 0 : file.name.slice(0, -4)) + config.toFormat;
                    }
                    else {
                        nameWithfileExtension = "" + (file === null || file === void 0 ? void 0 : file.name.slice(0, -3)) + config.toFormat;
                    }
                }
                if (config.newName) {
                    nameWithfileExtension = config.newName + "-" + (index + 1) + (config.hashOn ? "-" + (0, uuid_1.v4)() : "") + "." + (changeFileExtension
                        ? config.toFormat
                        : file.name.slice(file.name.length - 3));
                }
                if (config.watermark) {
                    pipeline.composite([{ input: config.watermarkFile, gravity: 'southeast' }]);
                }
                return [4 /*yield*/, pipeline
                        .resize(width, height, {
                        position: config.cropFocus,
                    })
                        .png({
                        compressionLevel: config.pngCompressionLevel,
                        adaptiveFiltering: true,
                        force: config.toFormat === "png",
                    })
                        .jpeg({
                        quality: config.jpegQuality || config.quality,
                        progressive: config.jpegProgressive,
                        force: config.toFormat === "jpg",
                    })
                        .webp({
                        quality: config.webpQuality || config.quality,
                        force: config.toFormat === "webp",
                    })
                        .toFile(path_1.default.join(process.cwd(), outDir, '/', nameWithfileExtension))];
            case 2:
                _b.sent();
                if (!verbose) return [3 /*break*/, 5];
                return [4 /*yield*/, (fs_1.default.statSync(file.path).size / 1000000.0).toFixed(3)];
            case 3:
                before = _b.sent();
                return [4 /*yield*/, (fs_1.default.statSync(path_1.default.join(process.cwd(), '/', outDir, nameWithfileExtension))
                        .size / 1000000.0).toFixed(3)];
            case 4:
                after = _b.sent();
                _a = (0, files_1.changeInSizeBar)(before, after), arrayBar = _a.arrayBar, extraBar = _a.extraBar, text = _a.text;
                console.log(chalk_1.default.blueBright("\n        new file: " + chalk_1.default.white("" + nameWithfileExtension) + "\n        original size: " + chalk_1.default.white(before + " MB") + "  \n        new size: " + chalk_1.default.white(after + " MB") + "\n        " + arrayBar + extraBar + " " + text + "\n\n        resolution before: " + chalk_1.default.white(dimensions.width + " px, " + dimensions.height + " px") + ",\n        resolution after: " + chalk_1.default.white(width + " px, " + height + " px")));
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, pipeline];
            case 6: return [2 /*return*/, _b.sent()];
            case 7:
                e_1 = _b.sent();
                throw new Error("Pipeline error: " + e_1);
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.runSharp = runSharp;
//# sourceMappingURL=sharp.js.map