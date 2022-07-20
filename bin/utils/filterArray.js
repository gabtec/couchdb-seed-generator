/**
 * 
 * @param {Array} dbs - Working array
 * @param {Array} values - List of values to add or remote, confort the flag
 * @param {*} flag - i = include; e = exclude
 * @returns the merged array
 */
function filterArray(dbs, config) {
  // config: { i: [], e: []}
  let flag = null;
  if(config.i && config.i.length > 0) flag = 'i';
  if(config.e && config.e.length > 0) flag = 'e';

  let result;
  if(!flag) return dbs;

  if(flag === 'e') {
    // exclude
    result = dbs.filter((it)=>{
      return !config.e.includes(it);
    });
  }else{
    // include
    result = dbs.filter((it)=>{
      return config.i.includes(it);
    });
  }
  return result;
}

module.exports = filterArray;