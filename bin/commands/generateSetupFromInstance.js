const fs = require("fs");
const utils = require('../utils/_index.js');
const db = require('../dataService/index.js');

async function generate(configs) {
  // console.log(configs);
  // process.exit(2);
  const v = configs.verbose;
  const topDir = configs.outputFolder;

  console.log("...Generate Setup From :" + configs.url);
  utils.vlog("Progress:", v);

  // delete existing output folder if '-D' arg present
  if(configs.deleteFolder) {
      utils.deleteFolder(v, configs.outputFolder);
  }

  try {
    const isUp = await db.pingDatabase(configs.url);
    if (isUp) utils.vlog("...Database is up and running.", v);

    const res = await db.getGlobalConfigData(configs.url);
    // console.log("...Couchdb instance global configs.");
    utils.createFolder(v, topDir);
    utils.createFile(v, topDir, "_config.json", res.data);
    // console.log("...Global security file created.");

    const list = await db.getDbsList(configs);
    // const dbsList = utils.filterArray(list.data, configs.exclude);
    const dbsList = utils.filterArray(list.data, configs);
    utils.vlog('...Working databases: ' + dbsList.toString(), v);
    const loops = dbsList.length;  

    // for each db, one folder and onde sec file
    for (let i = 0; i < loops; i++) {
      const fullPath = `${topDir}/${dbsList[i]}`;
      utils.createFolder(v, fullPath);
      const secData = await db.getSecurityData(configs.url, dbsList[i]);
      utils.createFile(v, fullPath, "_security.json", secData.data);
    }

    // for each db, N design groups and N views per group
    for (let i = 0; i < loops; i++) {
      const r = await db.getDDocs(configs.url, dbsList[i]);
      const ddocs = r.data;
      // IN each DDoc Group
      if (ddocs.total_rows > 0) {
        ddocs.rows.forEach((row) => {
          const fullPath = `${topDir}/${dbsList[i]}`;
          const viewsNames = row.doc.views ? Object.keys(row.doc.views) : [];
          const vLoops = viewsNames.length;
          
          if (vLoops > 0) {
            for (let k = 0; k < vLoops; k++) {
              const ddocPath = `${fullPath}/${row.id}/views/${viewsNames[k]}`;
              const r = utils.createFolder(v, ddocPath);
              
              row.doc.views[viewsNames[k]].map
                ? fs.writeFileSync(
                    ddocPath + "/map.js",
                    // utils.parseJSONFunction(row.doc.views[viewsNames[k]].map)
                    row.doc.views[viewsNames[k]].map
                    // utils.unStringifyFunction(row.doc.views[viewsNames[k]].map)
                  )
                : "";
              row.doc.views[viewsNames[k]].reduce
                ? fs.writeFileSync(
                    ddocPath + "/reduce",
                    // utils.unStringifyFunction(row.doc.views[viewsNames[k]].reduce)
                    row.doc.views[viewsNames[k]].reduce
                  )
                : "";
            }
          }
        });
      }
    }
    utils.vlog("\n", v);
  } catch (error) {
    utils.vlog(error.message, v);
    utils.vlog(`...CAN NOT connect to database: "${configs.url}"`, v);
  }
}

module.exports = generate;
