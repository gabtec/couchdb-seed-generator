const fs = require("fs");
const vlog = require('./logger');

/**
 * Creates a file
 * @param {Boolean} verbose - The flag to show/hide console.log
 * @param {String} path - The path fro the folder to receive the file
 * @param {String} name - The filename (with extension)
 * @param {Any} data - The data to be writen. Will be stringified
 */
function createFile(verbose, path, name, data) {
  const filename = `${path}/${name}`;
  // console.log(filename);
  const dataString = data ? JSON.stringify(data) : "";
  try {
    fs.writeFileSync(filename, dataString);
    vlog(`...Output file "${filename}" created.`, verbose);
    return 0;
  } catch (error) {
    vlog(`...Output file "${filename}" NOT created.`, verbose);
    return -1;
  }
}

module.exports = createFile;