/// <reference types="node" />
import { InputFile, Dimensions } from './types';
export declare const getCurrentFiles: (dir: string) => InputFile[];
export declare const getDirectories: () => string[];
export declare const checkIfInputDirExists: (dir: string) => void;
export declare const checkIfOutDirExists: (dir: string) => void;
export declare const toArray: (buf: Buffer) => Buffer[];
export declare const getImageSize: (file: InputFile) => Promise<Dimensions>;
export declare const getTotalSize: (files: InputFile[]) => number;
interface Bar {
    arrayBar: string;
    extraBar: string;
    text: string;
}
export declare const changeInSizeBar: (before: number | string, after: number | string) => Bar;
export {};
//# sourceMappingURL=files.d.ts.map