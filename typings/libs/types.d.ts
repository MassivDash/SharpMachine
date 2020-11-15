export interface Config {
    quality: number;
    rotate: boolean;
    trim: number;
    jpegQuality: number;
    pngQuality: number;
    webpQuality: number;
    jpegProgressive: boolean;
    cropFocus: string;
    width: number;
    height: number;
    verbose?: boolean;
    pngCompressionLevel: number;
    pngCompressionSpeed: number;
    toFormat?: string | 'jpg' | 'png' | 'webp' | 'gif';
    useMozJpeg: boolean;
    reName?: boolean;
    newName?: string;
    hashOn?: boolean;
    watermark?: boolean;
    watermarkFile?: string;
}
export interface InputFile {
    path: string;
    name: string;
}
export interface Dimensions {
    width: number;
    height: number;
}
//# sourceMappingURL=types.d.ts.map