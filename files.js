
const path = require('path');
const fs = require("fs")
const mkdirp = require('mkdirp');

module.exports = {

  getCurrentFiles: getCurrentFiles = dir => {
      let absoluteDir = `${process.cwd()}/${dir}`
        return fs.readdirSync(absoluteDir).reduce((list, name) => {
          const absolutePath = path.join(absoluteDir, name);
          const isDir = fs.statSync(absolutePath).isDirectory();
          return list.concat(isDir ? [] : [{ path: absolutePath, name: name }]);
        }, []);
    },
  checkIfOutDirExists: dir => { 
        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
          }
    } 
};


