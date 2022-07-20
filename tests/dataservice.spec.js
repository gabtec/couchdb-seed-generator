jest.mock('axios');
const axios = require('axios');

const db = require('../bin/dataService/index');

beforeEach(() => {
  axios.get.mockImplementation(jest.fn());
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Data Service Test Suite', () => {
  it('should call axios from pingDatabase()', () => {
    axios.get.mockResolvedValueOnce({data: {couchdb: 'Welcome'}});
    db.pingDatabase('some url');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should return true if res.data.couchdb=welcome', async () => {
    axios.get.mockResolvedValueOnce({data: {couchdb: 'Welcome'}});
    const res = await db.pingDatabase('some url');
    expect(res).toBe(true);
  });

  it('should return false if res.data.couchdb!=welcome', async () => {
    axios.get.mockResolvedValueOnce({data: {couchdb: 'fake value'}});
    const res = await db.pingDatabase('some url');
    expect(res).toBe(false);
  });

  it('should throw error if cannot pingDatabase()', () => {
    axios.get.mockImplementation(()=>Promise.reject(new Error('xpto')));
    return db.pingDatabase('fale url').catch((err)=>{
      expect(err.message).toBe('xpto');
    })
  });

  it('should call axios from getGlobalConfigData()', () => {
    db.getGlobalConfigData('some url');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should call axios from getSecurityData()', () => {
    db.getSecurityData('some url', 'dbX');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should call axios from getDbsList()', () => {
    db.getDbsList('some url', 'dbX');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should call axios from getDDocs()', () => {
    db.getDDocs('some url', 'dbX');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});