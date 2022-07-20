const consoleMock = jest.spyOn(console, 'log');
const vlog = require('../bin/utils/logger.js');

beforeEach(() => {
  jest.clearAllMocks();
});

describe ('Utils Test Suite: logger', ()=> {
  it ('should call console.log if verbose=true', ()=> {
    vlog('message1', true);

    expect(consoleMock).toHaveBeenCalledTimes(1);
    expect(consoleMock).toHaveBeenCalledWith('message1');

  })

  it ('should not call console.log if verbose=false', ()=> {
    vlog('message1', false);

    expect(consoleMock).toHaveBeenCalledTimes(0);
  })
})