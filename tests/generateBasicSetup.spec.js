const utils = require('../bin/utils/_index.js');
const delMock = jest.spyOn(utils, 'deleteFolder').mockImplementation(jest.fn());
const folderMock = jest.spyOn(utils, 'createFolder').mockImplementation(jest.fn());
const fileMock= jest.spyOn(utils, 'createFile').mockImplementation(jest.fn());
    
const basicSetup = require('../bin/commands/generateBasicSetup.js');

afterEach(() => {
  jest.clearAllMocks();
});

const cfgs = {deleteFolder: true, outputFolder: './couchdb', verbose: false};

describe('Basic Setup Test Suite', ()=>{
  it('should call deleteFolder if config.D=true', () => {
    basicSetup(cfgs);

    expect(delMock).toBeCalled();
    expect(delMock).toBeCalledTimes(1);
  });

  it('should not call deleteFolder if config.D=false', () => {
    const conf = JSON.parse(JSON.stringify(cfgs));
    conf.deleteFolder = false;

    basicSetup(conf);

    expect(delMock).not.toBeCalled();
  });

  it('should call createFolder 2x with "couchdb, _users" ', () => {
    cfgs.deleteFolder = true;
    basicSetup(cfgs);

    expect(folderMock).toBeCalledTimes(2);  
    expect(folderMock).toBeCalledWith(cfgs.verbose, './couchdb');   
    expect(folderMock).toBeCalledWith(cfgs.verbose, './couchdb/_users');   
  });

  it('should call createFile 3x with "_security, userone, _config" ', () => {
    cfgs.deleteFolder = true;
    basicSetup(cfgs);

    expect(fileMock).toBeCalledTimes(3);  
    expect(fileMock.mock.calls[0][1]).toBe('./couchdb');   
    expect(fileMock.mock.calls[0][2]).toBe('_config.json');   
    expect(fileMock.mock.calls[1][1]).toBe('./couchdb/_users');
    expect(fileMock.mock.calls[1][2]).toBe('_security.json');
    expect(fileMock.mock.calls[2][1]).toBe('./couchdb/_users');
    expect(fileMock.mock.calls[2][2]).toBe('userone.json');
  });
})