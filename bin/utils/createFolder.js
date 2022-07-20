const fs = require("fs");
const vlog = require('./logger');

/**
 * Creates one or more folder, building full path
 * @param {Boolean} verbose - The flag to show/hide console.log
 * @param {String} path - The name or the path of the folder
 * @return -1=err, 0=did nothing, already exists, 1=created
 */
function createFolder(verbose, path) {
  if (!fs.existsSync(path)) {
    try {
      fs.mkdirSync(path, { recursive: true });
      vlog(`...Output folder "${path}" created.`, verbose)
      return 1;
    } catch (error) {
      vlog(`...Error: folder "${path}" was not created.`, verbose)
      return -1;
    }
  } else {
    vlog(`...Output folder "${path}" already exists.`, verbose)
    return 0;
  }
  // if (!fs.existsSync(path)) {
  //   fs.mkdirSync(path, { recursive: true });
  //   console.log(`...Output folder "${path}" created.`);
  // } else {
  //   console.log(`...Output folder "${path}" already exists.`);
  // }
}

module.exports = createFolder;
