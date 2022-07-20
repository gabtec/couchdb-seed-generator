const fs = require("fs");
const vlog = require('./logger');

/**
 * Deletes one folder, and its content
 * @param {Boolean} verbose - The flag to show/hide console.log
 * @param {String} path - The name or the path of the folder
 */
function deleteFolder(verbose, path) {
  try {
    fs.rmSync(path, { recursive: true, force: true});
    vlog("...Previous output folder deleted.", verbose);
    return 0;
  } catch (error) {
    vlog('...Error: cannot delete previous folder.', verbose);
    console.log(error.message)
    return -1;
  }
}

module.exports = deleteFolder;
