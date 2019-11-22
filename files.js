
const path = require('path');
const fs = require("fs")
const mkdirp = require('mkdirp');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  getCurrentFiles: dir => {
        return fs.readdirSync(dir).reduce(function(list, file) {
          var name = path.join(dir, file);
          var isDir = fs.statSync(name).isDirectory();
          return list.concat(isDir ? fileList(name) : [name]);
        }, []);
    },
  checkIfOutDirExists: dir => { 
        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
          }
    } 
};


