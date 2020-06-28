/// <reference types="node" />
import { InputFile, Dimensions } from './types';
export declare const getCurrentFiles: (dir: string) => InputFile[];
export declare const getDirectories: () => string[];
export declare const checkIfInputDirExists: (dir: string) => void;
export declare const checkIfOutDirExists: (dir: string) => void;
export declare const toArray: (buf: Buffer) => Buffer[];
export declare const getImageSize: (file: InputFile) => Promise<Dimensions>;
//# sourceMappingURL=files.d.ts.map
