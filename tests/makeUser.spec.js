
jest.mock('fs');
const commands = require('../bin/commands/_index.js');
const utils = require('../bin/utils/_index.js');
const fs = require('fs');

const mockCD = jest.spyOn(utils, 'createFolder')
const mockCF = jest.spyOn(utils, 'createFile')

afterEach(() => {
  jest.clearAllMocks();
});

const cfgs = {_: ['make-user', "John Doe"], outputFolder: './couchdb', verbose: false};

describe('Make User Test Suite', ()=>{
  it('should add config.user', () => {
    const conf = JSON.parse(JSON.stringify(cfgs));
    commands.makeUser(conf);

    expect(conf.user).toBe("John Doe");
  });

  it('should call createFolder', () => {
    commands.makeUser(cfgs);

    expect(mockCD).toHaveBeenCalledTimes(2);
  });

  it('should call createFile if not exists', () => {
    fs.existsSync.mockReturnValue(false);
    commands.makeUser(cfgs);

    expect(mockCF).toHaveBeenCalledTimes(1);
    expect(mockCF.mock.calls[0][1]).toBe('./couchdb/_users');
    expect(mockCF.mock.calls[0][2]).toBe('john.json');
  });

  it('should NOT call createFile if exists', () => {
    fs.existsSync.mockReturnValue(true);
    commands.makeUser(cfgs);

    expect(mockCF).toHaveBeenCalledTimes(0);
  });

})