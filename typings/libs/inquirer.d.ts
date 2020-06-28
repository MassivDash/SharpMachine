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
  }>;
  askVerboseQuestions: () => Promise<{
    verbose: boolean;
  }>;
  askWhatWeDoingQuestions: () => Promise<{
    WhatWeDoing: string;
  }>;
};
export default inquirerLibs;
//# sourceMappingURL=inquirer.d.ts.map
