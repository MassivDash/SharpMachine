/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
import imageSize from 'probe-image-size';
import chalk from 'chalk';
import { InputFile, Dimensions } from './types';

export const getCurrentFiles = (dir: string): InputFile[] => {
  const absoluteDir = `${process.cwd()}/${dir}`;
  return fs
    .readdirSync(absoluteDir)
    .reduce((list: InputFile[], name: string) => {
      const absolutePath = path.join(absoluteDir, name);
      const isDir = fs.statSync(absolutePath).isDirectory();
      return list.concat(isDir ? [] : [{ path: absolutePath, name: name }]);
    }, []);
};

export const getDirectories = (): string[] => {
  const absoluteDir = `${process.cwd()}/`;
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
  const dimensions = await imageSize.sync(
    toArray(fs.readFileSync(file.path || '')),
  );
  return dimensions;
};
