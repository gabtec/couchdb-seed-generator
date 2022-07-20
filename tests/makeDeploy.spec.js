jest.mock('couchdb-bootstrap');

const bootstrap = require('couchdb-bootstrap');
const main = require('../main.js');

describe('Deploy Test Suite', () => {
  it('should call couchdb-bootstrap', () => {
    main(['deploy']);

    expect(bootstrap.mock.calls[0][0]).toBe("http://admin:admin@localhost:5984");
    expect(bootstrap.mock.calls[0][1]).toBe("./couchdb");
  });
});