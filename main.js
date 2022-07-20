const yargs = require('yargs/yargs');
const appDefs = require('./bin/configs/defaults.js');
const commands = require('./bin/commands/_index.js');

const outputOption = {
  alias: 'o',
  default: appDefs.outputFolder,
  describe: 'Defines the destination folder name',
  type: 'string'
};

const deleteOption =  {
  alias: 'D',
  default: appDefs.deleteFolder,
  describe: 'Deletes output folder if already exists',
  type: 'boolean'
};

const verboseOption = {
  alias: 'V',
  default: appDefs.verbose,
  describe: 'Shows detailed progress infos',
  type: 'boolean'
};

const urlOption = {
  alias: 'u',
  default: appDefs.url,
  describe: 'ConnectionString of the CouchDB Instance',
  type: 'String'
};

/**
 * @param {Array} cliArgs - Is process.argv.slice(2)
 */
function runner(cliArgs) {
  // const removeFirstTwo = require('yargs/helpers').hideBin;
  const args = yargs(cliArgs)
    .detectLocale(false)
    .alias('version', 'v')
    .help()
    .alias('help', 'h')
    .command('build', 'Creates a local folder with basic couchdb configs (e.g. CORS)', {
      outputFolder: outputOption,
      deleteFolder: deleteOption,
      verbose: verboseOption,
    },(args)=>{
      commands.generateBasicSetup(args);
    })
    .command('get', 'Copies remote database configs and ddocs to a local folder', {
      deleteFolder: deleteOption,
      outputFolder: outputOption,
      verbose: verboseOption,
      url: urlOption,
      include: {
        // cannot have default because conflict clause
        alias: 'i',
        describe: 'Defines the databases names to include (all if not defined)',
        type: 'array',
      },
      exclude: {
        // cannot have default because conflict clause
        alias: 'e',
        describe: 'Defines the databases names to include (all if not defined)',
        type: 'array',
      },
    }, (args) => {
      commands.generateSetupFromInstance(args);
    })
    .conflicts('i', 'e')
    .command('make-user', '<"Firstname Lastname"> Adds a new user file to local folder', {
      outputFolder: outputOption,
      verbose: verboseOption,
    }, (args) => {
      commands.makeUser(args);
    })
    .command('deploy', 'Deploy configs to a new couchdb instance', {
      outputFolder: outputOption,
      verbose: verboseOption,
      url: urlOption,
    }, (args) => {
      // console.log(args);
      // console.log('Call deploy');
      commands.makeDeploy(args);
    })
    .demandCommand(1, 'ERROR: You need at least one command to execute this tool')
    .usage('Usage: $0 <cmd> [options]')
    .parse();
}

module.exports = runner;