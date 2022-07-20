const main = require('../main.js');
const defaults = require('../bin/configs/defaults.js');

jest.mock('../bin/commands/_index.js');
const cmds = require('../bin/commands/_index.js');

const mockGet = jest.spyOn(cmds, 'generateSetupFromInstance');
const mockBuild = jest.spyOn(cmds, 'generateBasicSetup');
const mockDeploy = jest.spyOn(cmds, 'makeDeploy');
const mockMakeUser = jest.spyOn(cmds, 'makeUser');

beforeEach(()=>{
  jest.clearAllMocks();
});

describe('CLI CMD Test Suite', function (){
  it ('should use defaults with cmd "build" ', function() {
    main(['build']);
    expect(mockBuild).toHaveBeenCalledTimes(1);
    const values = mockBuild.mock.lastCall[0];
    expect(values._[0]).toBe('build');
    expect(values.deleteFolder).toBe(defaults.deleteFolder);
    expect(values.outputFolder).toBe(defaults.outputFolder);
    expect(values.verbose).toBe(defaults.verbose);
  })

  it ('should setup outputFolder with cmd "build -o ./newFolder" ', function() {
    main(['build', '-o', './newFolder']);
    expect(mockBuild).toHaveBeenCalledTimes(1);
    const values = mockBuild.mock.lastCall[0];
    expect(values._[0]).toBe('build');
    expect(values.deleteFolder).toBe(defaults.deleteFolder);
    expect(values.outputFolder).toBe('./newFolder');
    expect(values.verbose).toBe(defaults.verbose);
  })

  it ('should setup outputFolder and deleteFolder with cmd "build -Do ./newFolder" ', function() {
    main(['build', '-Do', './newFolder']);
    expect(mockBuild).toHaveBeenCalledTimes(1);
    const values = mockBuild.mock.lastCall[0];
    expect(values._[0]).toBe('build');
    expect(values.deleteFolder).toBe(true);
    expect(values.outputFolder).toBe('./newFolder');
    expect(values.verbose).toBe(defaults.verbose);
  })

  it ('should setup outputFolder and deleteFolder with cmd "build -D -o ./newFolder" ', function() {
    main(['build', '-D', '-o', './newFolder']);
    expect(mockBuild).toHaveBeenCalledTimes(1);
    const values = mockBuild.mock.lastCall[0];
    expect(values._[0]).toBe('build');
    expect(values.deleteFolder).toBe(true);
    expect(values.outputFolder).toBe('./newFolder');
    expect(values.verbose).toBe(defaults.verbose);
  })

  it ('should setup outputFolder and exclude with cmd "get -o ./newFolder -e db_one" ', function() {
    main(['get', '-e', 'db_one', '-o', './newFolder']);

    expect(mockGet).toHaveBeenCalledTimes(1);
    const values = mockGet.mock.lastCall[0];
    expect(values._[0]).toBe('get');
    expect(values.deleteFolder).toBe(defaults.deleteFolder);
    expect(values.outputFolder).toBe('./newFolder');
    expect(values.verbose).toBe(defaults.verbose);
    expect(values.exclude.length).toBe(1);
    expect(values.exclude[0]).toBe('db_one');
    expect(values.url).toBe(defaults.url);
  })
  it ('should setup exclude and output with cmd "get -e db_one -o ./newFolder" ', function() {
    main(['get', '-e', 'db_one', '-o', './newFolder']);

    expect(mockGet).toHaveBeenCalledTimes(1);
    const values = mockGet.mock.lastCall[0];
    expect(values._[0]).toBe('get');
    expect(values.deleteFolder).toBe(defaults.deleteFolder);
    expect(values.outputFolder).toBe('./newFolder');
    expect(values.verbose).toBe(defaults.verbose);
    expect(values.exclude.length).toBe(1);
    expect(values.exclude[0]).toBe('db_one');
    expect(values.url).toBe(defaults.url);
  })

  it ('should setup multiple exclude with cmd "get -e db_one db_two db_three" ', function() {
    main(['get', '-e', 'db_one', 'db_two', 'db_three']);

    expect(mockGet).toHaveBeenCalledTimes(1);
    const values = mockGet.mock.lastCall[0];
    expect(values['_'][0]).toBe('get');
    expect(values.deleteFolder).toBe(defaults.deleteFolder);
    expect(values.outputFolder).toBe(defaults.outputFolder);
    expect(values.exclude.length).toBe(3);
    expect(values.exclude[0]).toBe('db_one');
    expect(values.exclude[1]).toBe('db_two');
    expect(values.exclude[2]).toBe('db_three');
    expect(values.url).toBe(defaults.url);
  })
 
  it ('should setup multiple exclude with cmd "get -e db_one db_two db_three"  and -u after', function() {
    main(['get', '-e', 'db_one', 'db_two', 'db_three', '-u', 'someURL']);

    expect(mockGet).toHaveBeenCalledTimes(1);
    const values = mockGet.mock.lastCall[0];
    expect(values['_'][0]).toBe('get');
    expect(values.deleteFolder).toBe(defaults.deleteFolder);
    expect(values.outputFolder).toBe(defaults.outputFolder);
    expect(values.exclude.length).toBe(3);
    expect(values.exclude[0]).toBe('db_one');
    expect(values.exclude[1]).toBe('db_two');
    expect(values.exclude[2]).toBe('db_three');
    expect(values.url).toBe('someURL');
  })

  it ('should call deploy', function() {
    main(['deploy', '-u', 'someURL']);

    expect(mockDeploy).toHaveBeenCalledTimes(1);
  })

  it ('should call make-user', function() {
    main(['make-user', 'Marie Curie']);

    expect(mockMakeUser).toHaveBeenCalledTimes(1);
  })
})