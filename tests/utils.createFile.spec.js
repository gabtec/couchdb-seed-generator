jest.mock('fs');
const fs = require('fs');
const createFile = require('../bin/utils/createFile');

beforeEach(()=>{
  jest.clearAllMocks();
});

const verbose = false;

describe('CreateFile Test Suite', function (){
  it ('should call fs.writeFileSync ', function() {
    createFile(verbose, './tests/runner', 'testFile.txt', 'someData');

    expect(fs.writeFileSync.mock.calls.length).toBe(1);

    const argsObj = fs.writeFileSync.mock.calls[0]; // args of 1st call

    const filename = './tests/runner/testFile.txt';
    expect(argsObj[0]).toBe(filename);
    expect(argsObj[1]).toBe("\"someData\"");
  });

  it ('should call fs.writeFileSync with no "data" arg', function() {
    createFile(verbose, './tests/runner', 'testFile.txt'); // no 3rd arg (data to save on file)

    expect(fs.writeFileSync.mock.calls.length).toBe(1);

    const argsObj = fs.writeFileSync.mock.calls[0]; // args of 1st call

    const filename = './tests/runner/testFile.txt';
    expect(argsObj[0]).toBe(filename);
    expect(argsObj[1]).toBe("");
  });

  it ('should return -1 on error', function() {
    fs.writeFileSync.mockImplementation(()=>{throw new Error('xpto')});
    const r = createFile(verbose, './tests/runner', 'testFile.txt'); // no 3rd arg (data to save on file)
    
    expect(r).toBe(-1);
  });
});