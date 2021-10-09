/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
import imageSize from 'probe-image-size';
import chalk from 'chalk';
import { InputFile, Dimensions } from './types';

export const getCurrentFiles = (dir: string): InputFile[] => {
  const absoluteDir = `${path.join(process.cwd(), '/', dir)}`;
  return fs
    .readdirSync(absoluteDir)
    .reduce((list: InputFile[], name: string) => {
      const absolutePath = path.join(absoluteDir, name);
      const isDir = fs.statSync(absolutePath).isDirectory();
      return list.concat(isDir ? [] : [{ path: absolutePath, name: name }]);
    }, []);
};

export const getDirectories = (): string[] => {
  const absoluteDir = `${path.join(process.cwd(), '/')}`;
  return fs
    .readdirSync(absoluteDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

export const checkIfInputDirExists = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    console.error(
      chalk.red('Directory with name:'),
      chalk.white(dir),
      chalk.red('does not exist'),
    ),
      console.error(chalk.red(`Did you want any one of these ?`));
    console.table(getDirectories());
    process.exit();
  }
};

export const checkIfOutDirExists = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};

export const toArray = (buf: Buffer): Buffer[] => {
  const arr = new Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    arr[i] = buf[i];
  }
  return arr;
};

export const getImageSize = async (file: InputFile): Promise<Dimensions> => {
  try {
    const dimensions = await imageSize.sync(
      toArray(fs.readFileSync(file.path || '')),
    );
    return dimensions;
  } catch (e) {
    throw new Error(`Error at file ${file.path}: ${e}`);
  }
};

export const getTotalSize = (files: InputFile[]): number => {
  const size = files.reduce((total: number, file: InputFile) => {
    return total + fs.statSync(file.path).size;
  }, 0);
  return Number((size / 1000000.0).toFixed(3));
};

interface Bar {
  arrayBar: string;
  extraBar: string;
  text: string;
}

const getPercentageChange = (
  oldNumber: string | number,
  newNumber: string | number,
): string => {
  const decreaseValue = Number(oldNumber) - Number(newNumber);
  return ((decreaseValue / Number(oldNumber)) * 100).toFixed(2);
};

export const changeInSizeBar = (
  before: number | string,
  after: number | string,
): Bar => {
  let arrayBar = chalk.green('||||||||||||||||||||');
  let extraBar = '';
  let text = '0%';
  const changeInSize = 100 - Number(getPercentageChange(before, after));
  if (changeInSize > 100) {
    const howManyBars = Number(((changeInSize - 100) / 5).toFixed());
    const lineArray = new Array(howManyBars);
    extraBar = chalk.red(`${lineArray.join('|')}`);
    text = chalk.red(`+ ${(changeInSize - 100).toFixed(2)}%`);
  }

  if (changeInSize < 100) {
    const howManyGreen = new Array(Number((changeInSize / 5).toFixed()));
    const howManyGray = new Array(Number(((100 - changeInSize) / 5).toFixed()));
    console.log();
    arrayBar = chalk.green(`${howManyGreen.join('|')}`);
    extraBar = chalk.gray(`${howManyGray.join('|')}`);
    text = chalk.green(`${(changeInSize - 100).toFixed(2)}%`);
  }

  return { arrayBar, extraBar, text };
};
