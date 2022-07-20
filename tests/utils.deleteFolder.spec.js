jest.mock('fs');
const fs = require('fs');
const deleteFolder = require('../bin/utils/deleteFolder');

beforeEach(()=>{
  jest.clearAllMocks();
});

const foldername = './some/test/path';
const verbose = false;

describe('DeleteFolder Test Suite', function (){
  it ('should call fs.rmSync', function() {

    deleteFolder(verbose, foldername);

    expect(fs.rmSync.mock.calls.length).toBe(1);

    const argsObj = fs.rmSync.mock.calls[0]; // args of 1st call

    expect(argsObj[0]).toBe(foldername);
    expect(argsObj[1].recursive).toBe(true);
    expect(argsObj[1].force).toBe(true);
  });

  it ('should return 0 if OK', function() {
    fs.rmSync.mockReturnValue(jest.fn());

    const res = deleteFolder(verbose, foldername);
    expect(res).toBe(0);
  });

  it ('should return -1 if Error', function() {
    fs.rmSync.mockImplementation(jest.fn(()=> {throw ('erro')}));

    const res = deleteFolder(verbose, foldername);
    expect(res).toBe(-1);
  });
});