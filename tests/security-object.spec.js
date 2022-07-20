const makeSec = require('../bin/templates/security-object.js');

const expectedRes = {
  admins: {
    names: [],
    roles: [],
  },
  members: {
    names: [],
    roles: [],
  }
};

describe('Templates Test Suite: security', () => {
  it('should use defaut values with no params', () => {
    const result = makeSec();
    expect(result).toEqual(expectedRes);
  });

  it('should use defaut values with nulls', () => {
    const result = makeSec(null, null, 'teste', null);
    const wanted = JSON.parse(JSON.stringify(expectedRes));
    wanted.members.names = ['teste'];
    expect(result).toEqual(wanted);
  });

  it('should use defaut values with undefined', () => {
    const result = makeSec(undefined, undefined, 'teste', undefined);
    const wanted = JSON.parse(JSON.stringify(expectedRes));
    wanted.members.names = ['teste'];
    expect(result).toEqual(wanted);
  });

  it('should override defaults', () => {
    const result = makeSec(['a'], ['b'], ['c'], ['d']);
    const newSec = {
      admins: { names: ['a'], roles: ['b']},
      members: { names: ['c'], roles: ['d']},
    };
    expect(result).toEqual(newSec);
  });

  it('should convert single params to array', () => {
    const result = makeSec('a', 1, 'c', 'd');
    const newSec = {
      admins: { names: ['a'], roles: ['1']},
      members: { names: ['c'], roles: ['d']},
    };
    expect(result).toEqual(newSec);
  });

});