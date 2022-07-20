const fs = require("fs");
const utils = require('../utils/_index.js');
const templates = require('../templates/_index.js');

const setupCors = {
  origins: "*",
  credentials: true,
  methods: ["GET", "PUT", "POST", "HEAD", "DELETE"],
  headers: [
    "accept",
    "authorization",
    "content-type",
    "origin",
    "referer",
    "x-csrf-token",
  ],
};

const setupNode = {
  single_node: true,
};

const setupHttpd = {
  bind_address: "0.0.0.0",
  enable_cors: true,
};

// const securityObject = {
//   admins: {
//     names: [],
//     roles: ['_admin'],
//   },
//   members: {
//     names: [],
//     roles: ['_admin'],
//   },
// };

// const userOne = {
//   _id: "org.couchdb.user:userone",
//   type: "user",
//   name: "userone",
//   roles: [],
//   firstName: "User",
//   lastName: "One",
// };

function generate(configs) {
  const userOne = templates.makeUser('Userone', 'UserFamily');
  const securityObject = templates.makeSecurity(null, '_admin', null, '_admin');

  const v = configs.verbose;
  console.log("Generating Basic Setup");
  utils.vlog("Progress:", v);

  // delete existing output folder if '-D' arg present
  if(configs.deleteFolder) {
    utils.deleteFolder(v, configs.outputFolder);
  }

  utils.createFolder(v, configs.outputFolder);
  utils.createFile(v, configs.outputFolder, '_config.json', { couchdb: setupNode, chttpd: setupHttpd, cors: setupCors});
  const usersFolder = configs.outputFolder + "/_users";
  utils.createFolder(v, usersFolder);
  utils.createFile(v, usersFolder, "_security.json", securityObject);
  utils.createFile(v, usersFolder, userOne.name + ".json", userOne);
}

module.exports = generate;
