jest.mock('fs');
const fs = require('fs');
const createFolder = require('../bin/utils/createFolder');

beforeEach(()=>{
  jest.clearAllMocks();
});

const foldername = './some/test/path';
const verbose = false;

describe('CreateFolder Test Suite', function (){
  it ('should call fs.existsSync', function() {
    fs.existsSync.mockImplementation(jest.fn());

    createFolder(verbose, foldername);

    expect(fs.existsSync.mock.calls.length).toBe(1);
  });

  it ('should call fs.mkdirSync if folder not exists', function() {
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockImplementation(jest.fn());

    createFolder(verbose, foldername);

    expect(fs.mkdirSync.mock.calls.length).toBe(1);

    const argsObj = fs.mkdirSync.mock.calls[0]; // args of 1st call

    expect(argsObj[0]).toBe(foldername);
    expect(argsObj[1].recursive).toBe(true);
  });

  it ('should not call fs.mkdirSync if folder exists', function() {
    fs.existsSync.mockReturnValue(true);

    createFolder(verbose, foldername);

    expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
  });

  it ('should return 0 if folder exists', function() {
    fs.existsSync.mockReturnValue(true);

    const res = createFolder(verbose, foldername);

    expect(res).toBe(0);
  });

  it ('should return 1 if folder not exists and create OK', function() {
    fs.existsSync.mockReturnValue(false);

    const res = createFolder(verbose, foldername);

    expect(res).toBe(1);
  });

  it ('should return -1 if create = Error', function() {
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockImplementation(jest.fn(()=>{throw ('erro')}));

    const res = createFolder(verbose, foldername);
    expect(res).toBe(-1);
  });
});