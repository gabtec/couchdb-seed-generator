const axios = require("axios").default;

async function pingDatabase(url) {
  try {
    const res = await axios.get(url);
    return res.data.couchdb === "Welcome" ? true : false;
  } catch (error) {
    throw error;
  }
}

// async function getGlobalConfigData(url) {
function getGlobalConfigData(url) {
  const endpoint = `${url}/_node/nonode@nohost/_config/`;
  // try {
  //   const res = await axios.get(endpoint);
  //   return res.data;
  // } catch (error) {
  //   console.log(`...ERROR: ${error.code}`);
  //   console.log(`...Not a valid endpoint: "${endpoint}"`);
  // }
  return axios.get(endpoint);
}

function getDbsList(configs) {
  const endpoint = `${configs.url}/_all_dbs/`;
  return axios.get(endpoint);;
  // try {
  //   const res = await axios.get(endpoint);
  //   const withoutExcluded = res.data.filter((it)=>{
  //     return !configs.exclude.includes(it);
  //   });
  //   console.log("...Excluded databases: " + configs.exclude.toString());
  //   return withoutExcluded;
  // } catch (error) {
  //   console.log(`...ERROR: ${error.code}`);
  //   console.log(`...Not a valid endpoint: "${endpoint}"`);
  // }
}

function getSecurityData(url, db) {
  const endpoint = `${url}/${db}/_security/`;
  return axios.get(endpoint);

  // try {
  //   const res = await axios.get(endpoint);
  //   return res.data;
  // } catch (error) {
  //   console.log(`...ERROR: ${error.code}`);
  //   console.log(`...Not a valid endpoint: "${endpoint}"`);
  // }
}

function getDDocs(url, db) {
  const endpoint = `${url}/${db}/_design_docs?include_docs=true`;
  return axios.get(endpoint);
  // try {
  //   const endpoint = `${url}/${db}/_design_docs?include_docs=true`;
  //   const res = await axios.get(endpoint);
  //   return res.data;
  // } catch (error) {
  //   console.log(`...ERROR: ${error.code}`);
  //   console.log(`...Not a valid endpoint: "${endpoint}"`);
  // }
}

module.exports = {
  pingDatabase,
  getGlobalConfigData,
  getDbsList,
  getSecurityData,
  getDDocs,
};