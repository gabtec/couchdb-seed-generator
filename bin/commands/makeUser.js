const fs = require("fs");
const utils = require('../utils/_index.js');
const templates = require('../templates/_index.js');

function makeUser(configs) {
  const v = configs.verbose;
  
  configs.user = configs._[1];

  console.log("Adding New User to Setup...");
  utils.vlog("Progress:", v);

  const [firstname, lastname] = configs.user.split(" ");
  const newUser = templates.makeUser(firstname, lastname);

  utils.createFolder(v, configs.outputFolder);
  
  const usersFolder = configs.outputFolder + "/_users";
  utils.createFolder(v, usersFolder);

  const fileName = usersFolder + "/" + newUser.name + ".json";

  if (!fs.existsSync(fileName)){
    utils.createFile(v, usersFolder, newUser.name + ".json", newUser);
    utils.vlog(`User "${configs.user}" created.`, v);
  }else{
    utils.vlog(`...File "${fileName}" already exists.`, v);
    utils.vlog('...No user created.', v)
  }
}

module.exports = makeUser;