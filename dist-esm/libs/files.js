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
exports.changeInSizeBar = exports.getTotalSize = exports.getImageSize = exports.toArray = exports.checkIfOutDirExists = exports.checkIfInputDirExists = exports.getDirectories = exports.getCurrentFiles = void 0;
/* eslint-disable no-console */
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var mkdirp_1 = __importDefault(require("mkdirp"));
var probe_image_size_1 = __importDefault(require("probe-image-size"));
var chalk_1 = __importDefault(require("chalk"));
var getCurrentFiles = function (dir) {
    var absoluteDir = "" + path_1.default.join(process.cwd(), '/', dir);
    return fs_1.default
        .readdirSync(absoluteDir)
        .reduce(function (list, name) {
        var absolutePath = path_1.default.join(absoluteDir, name);
        var isDir = fs_1.default.statSync(absolutePath).isDirectory();
        return list.concat(isDir ? [] : [{ path: absolutePath, name: name }]);
    }, []);
};
exports.getCurrentFiles = getCurrentFiles;
var getDirectories = function () {
    var absoluteDir = "" + path_1.default.join(process.cwd(), '/');
    return fs_1.default
        .readdirSync(absoluteDir, { withFileTypes: true })
        .filter(function (dirent) { return dirent.isDirectory(); })
        .map(function (dirent) { return dirent.name; });
};
exports.getDirectories = getDirectories;
var checkIfInputDirExists = function (dir) {
    if (!fs_1.default.existsSync(dir)) {
        console.error(chalk_1.default.red('Directory with name:'), chalk_1.default.white(dir), chalk_1.default.red('does not exist')),
            console.error(chalk_1.default.red("Did you want any one of these ?"));
        console.table((0, exports.getDirectories)());
        process.exit();
    }
};
exports.checkIfInputDirExists = checkIfInputDirExists;
var checkIfOutDirExists = function (dir) {
    if (!fs_1.default.existsSync(dir)) {
        mkdirp_1.default.sync(dir);
    }
};
exports.checkIfOutDirExists = checkIfOutDirExists;
var toArray = function (buf) {
    var arr = new Array(buf.length);
    for (var i = 0; i < buf.length; i++) {
        arr[i] = buf[i];
    }
    return arr;
};
exports.toArray = toArray;
var getImageSize = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var dimensions, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, probe_image_size_1.default.sync((0, exports.toArray)(fs_1.default.readFileSync(file.path || '')))];
            case 1:
                dimensions = _a.sent();
                return [2 /*return*/, dimensions];
            case 2:
                e_1 = _a.sent();
                throw new Error("Error at file " + file.path + ": " + e_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getImageSize = getImageSize;
var getTotalSize = function (files) {
    var size = files.reduce(function (total, file) {
        return total + fs_1.default.statSync(file.path).size;
    }, 0);
    return Number((size / 1000000.0).toFixed(3));
};
exports.getTotalSize = getTotalSize;
var getPercentageChange = function (oldNumber, newNumber) {
    var decreaseValue = Number(oldNumber) - Number(newNumber);
    return ((decreaseValue / Number(oldNumber)) * 100).toFixed(2);
};
var changeInSizeBar = function (before, after) {
    var arrayBar = chalk_1.default.green('||||||||||||||||||||');
    var extraBar = '';
    var text = '0%';
    var changeInSize = 100 - Number(getPercentageChange(before, after));
    if (changeInSize > 100) {
        var howManyBars = Number(((changeInSize - 100) / 5).toFixed());
        var lineArray = new Array(howManyBars);
        extraBar = chalk_1.default.red("" + lineArray.join('|'));
        text = chalk_1.default.red("+ " + (changeInSize - 100).toFixed(2) + "%");
    }
    if (changeInSize < 100) {
        var howManyGreen = new Array(Number((changeInSize / 5).toFixed()));
        var howManyGray = new Array(Number(((100 - changeInSize) / 5).toFixed()));
        console.log();
        arrayBar = chalk_1.default.green("" + howManyGreen.join('|'));
        extraBar = chalk_1.default.gray("" + howManyGray.join('|'));
        text = chalk_1.default.green((changeInSize - 100).toFixed(2) + "%");
    }
    return { arrayBar: arrayBar, extraBar: extraBar, text: text };
};
exports.changeInSizeBar = changeInSizeBar;
//# sourceMappingURL=files.js.map