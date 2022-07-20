/**
 * Only show console.log msg if verbose=true on config object
 * @param {String} msg - The message to log
 * @param {Boolean} verbose 
 */
function logger(msg, verbose){
  if(verbose) console.log(msg);
}

module.exports = logger;