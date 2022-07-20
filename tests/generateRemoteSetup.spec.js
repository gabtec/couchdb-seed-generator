// this will supress all console.log statement and make tests output clear
// BUG is dangerous for DEBUG...
// jest.spyOn(console, 'log').mockImplementation(jest.fn());

jest.mock('../bin/dataService/index');
jest.mock('../bin/utils/_index.js');
jest.mock('fs');
const fs = require('fs');

const db = require('../bin/dataService/index')
const utils = require('../bin/utils/_index.js');

const remoteSetup = require('../bin/commands/generateSetupFromInstance.js');

const exampleDDOC = {
  "total_rows": 1,
  "offset": 0,
  "rows": [
    {
      "id": "_design/get",
      "key": "_design/get",
      "value": {
        "rev":"1-c27a6d6e97dfe2f00cd41297ea92c7f3"
      },
      "doc": {
        "_id":"_design/get",
        "_rev":"1-c27a6d6e97dfe2f00cd41297ea92c7f3",
        "views": {
          "users_list": {
            "map": "function(doc) {\n    if(doc.type === \"user\"){\n  emit(doc.name, 1);  \n    }\n\n}",
            "reduce": "_count"
          }
          },
          "language": "javascript"
        }
      }
    ]
  };

afterEach(() => {
  jest.clearAllMocks();
});

const cfgs = {deleteFolder: true, outputFolder: './couchdb', url: "fake url", verbose: false};

describe('Remote Setup Test Suite', ()=>{
  it('should call deleteFolder if config.D=true', async () => {
    await remoteSetup(cfgs);
    expect(utils.deleteFolder.mock.calls.length).toBe(1);
  });

  it('should not call deleteFolder if config.D=false', async () => {
    const conf2 = JSON.parse(JSON.stringify(cfgs));
    conf2.deleteFolder = false;
    await remoteSetup(conf2);
    expect(utils.deleteFolder.mock.calls.length).toBe(0);
  });

  it('should call getGlobalConfig and createFolder 1x createFile 1x" ', async () => {
    db.pingDatabase.mockImplementation(jest.fn(()=>true));
    db.getGlobalConfigData.mockImplementation(jest.fn(()=> Promise.resolve({"data": "empty"})));

    await remoteSetup(cfgs);
   
    expect(utils.createFolder.mock.calls.length).toBe(1);
    expect(utils.createFolder.mock.calls[0][0]).toBe(cfgs.verbose);   
    expect(utils.createFolder.mock.calls[0][1]).toBe('./couchdb');   
    expect(utils.createFile.mock.calls[0][1]).toBe('./couchdb');   
    expect(utils.createFile.mock.calls[0][2]).toBe('_config.json');   
    expect(utils.createFile.mock.calls[0][3]).toBe('empty');   
  });

  it('should ddoc total_rows=0 wont write map.js" ', async () => {
    db.pingDatabase.mockImplementation(jest.fn(()=>true));
    db.getGlobalConfigData.mockResolvedValue({"data": "empty"});
    db.getDbsList.mockResolvedValue({'data': ['db1']});
    utils.filterArray.mockReturnValue(['db1']);
    db.getSecurityData.mockResolvedValue({"data": {}});
    db.getDDocs.mockResolvedValue({"data": {"total_rows": 0}});

    await remoteSetup(cfgs);
    expect(utils.createFolder.mock.calls.length).toBe(2);   
    expect(utils.createFolder.mock.calls[0][1]).toEqual('./couchdb');   
    expect(utils.createFolder.mock.calls[1][1]).toEqual('./couchdb/db1');   

    expect(fs.writeFileSync.mock.calls.length).toBe(0);   
  
  });

  it('should ddoc total_rows=0 wont write map.js" ', async () => {
    db.pingDatabase.mockImplementation(jest.fn(()=>true));
    db.getGlobalConfigData.mockResolvedValue({"data": "empty"});
    db.getDbsList.mockResolvedValue({'data': ['db1']});
    utils.filterArray.mockReturnValue(['db1']);
    db.getSecurityData.mockResolvedValue({"data": {}});
    db.getDDocs.mockResolvedValue({"data": {"total_rows": 1, "rows": [{"id": "_design/get", "doc": {"views": []}}]}});

    await remoteSetup(cfgs);
    expect(utils.createFolder.mock.calls.length).toBe(2);   
    expect(utils.createFolder.mock.calls[0][1]).toEqual('./couchdb');   
    expect(utils.createFolder.mock.calls[1][1]).toEqual('./couchdb/db1');   

    expect(fs.writeFileSync.mock.calls.length).toBe(0);   
  
  });

  it('should get dbsList and createFolder Nx" ', async () => {
    db.pingDatabase.mockImplementation(jest.fn(()=>true));
    db.getGlobalConfigData.mockResolvedValue({"data": "empty"});
    db.getDbsList.mockResolvedValue({'data': ['db1', 'db2']});
    utils.filterArray.mockReturnValue(['db1', 'db2']);
    db.getSecurityData.mockResolvedValue({"data": {}});
    db.getDDocs.mockResolvedValue({"data": exampleDDOC});

    await remoteSetup(cfgs);
  
    expect(utils.createFolder.mock.calls.length).toBe(5);  
    expect(utils.createFolder.mock.calls[0][1]).toEqual('./couchdb');   
    expect(utils.createFolder.mock.calls[1][1]).toEqual('./couchdb/db1');   
    expect(utils.createFolder.mock.calls[2][1]).toEqual('./couchdb/db2');   
    expect(utils.createFolder.mock.calls[3][1]).toEqual('./couchdb/db1/_design/get/views/users_list');  
    expect(utils.createFolder.mock.calls[4][1]).toEqual('./couchdb/db2/_design/get/views/users_list');  

    expect(utils.createFile.mock.calls[0][1]).toBe("./couchdb");   
    expect(utils.createFile.mock.calls[0][2]).toBe("_config.json");   
    expect(utils.createFile.mock.calls[0][3]).toBe("empty");   

    expect(utils.createFile.mock.calls[1][1]).toBe('./couchdb/db1');   
    expect(utils.createFile.mock.calls[1][2]).toBe('_security.json');   
    expect(utils.createFile.mock.calls[1][3]).toEqual({}); 

    expect(utils.createFile.mock.calls[2][1]).toBe('./couchdb/db2');   
    expect(utils.createFile.mock.calls[2][2]).toBe('_security.json');   
    expect(utils.createFile.mock.calls[2][3]).toEqual({}); 

    expect(fs.writeFileSync.mock.calls[0][0]).toBe('./couchdb/db1/_design/get/views/users_list/map.js');   
    expect(fs.writeFileSync.mock.calls[1][0]).toBe('./couchdb/db1/_design/get/views/users_list/reduce');   
  
  });

})