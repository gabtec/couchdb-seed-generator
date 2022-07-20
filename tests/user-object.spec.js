const makeUser = require('../bin/templates/user-object.js');

const expectedRes = {
  _id: "org.couchdb.user:userone",
  type: "user",
  name: "userone",
  roles: [],
  firstName: "Userone",
  lastName: "UserFamily",
  password: "userone"
};

describe('Templates Test Suite: user', () => {
  it('should create user: userone', () => {
    const result = makeUser("Userone", "UserFamily");
    expect(result).toEqual(expectedRes);
  });

  it('should return empty object if no name paran', () => {
    const result = makeUser();
    expect(result).toEqual({});
  });

  it('should create without lastname', () => {
    const result = makeUser("Userone");
    const wanted = JSON.parse(JSON.stringify(expectedRes));
    wanted.lastName = "";
    expect(result).toEqual(wanted);
  });

  it('should lowercase usename and passw', () => {
    const result = makeUser("Userone");
    expect(result.name.charAt(0)).toBe('u')
    expect(result.password.charAt(0)).toBe('u')
  });

});