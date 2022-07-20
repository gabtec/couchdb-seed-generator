const bootstrap = require('couchdb-bootstrap');

function deploy(configs) {
  console.log('Deploying to new couchdb instance...');
  console.log('Credits to: https://github.com/jo/couchdb-bootstrap');
  
  bootstrap(configs.url, configs.outputFolder, function(error, response) {
    if(error) console.log(error.message);
    if(!error) console.log("...CouchDB seed OK.");
  })

}

module.exports = deploy;
