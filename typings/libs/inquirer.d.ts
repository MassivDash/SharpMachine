declare const inquirerLibs: {
    askCustomSharpQuestions: () => any;
    askForNewName: () => Promise<{
        fileName: string;
        addHash: boolean;
    }>;
    askInputQuestions: () => Promise<{
        inputDir: string;
        outputDir: string;
    }>;
    askRenameQuestion: () => Promise<{
        RenameFiles: boolean;
    }>;
    askResizeQuestion: () => Promise<{
        AreWeResizing: boolean;
    }>;
    askSharpQuestions: () => Promise<{
        width: number;
        height: number;
        quality: number;
        convert: 'no' | 'jpg' | 'png' | 'webp';
    }>;
    askVerboseQuestions: () => Promise<{
        verbose: boolean;
    }>;
    askWhatWeDoingQuestions: () => Promise<{
        WhatWeDoing: string;
    }>;
    askWatermarkQuestion: () => Promise<{
        watermark: boolean;
    }>;
};
export default inquirerLibs;
//# sourceMappingURL=inquirer.d.ts.map