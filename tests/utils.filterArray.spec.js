const filterArray = require('../bin/utils/filterArray');

describe ('Utils Test Suite: filterArray', ()=> {
  it ('should exclude values from list', ()=> {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const values = ['b', 'e'];
    const res = filterArray(list, {i:[], e: values});

    expect(res).toEqual(['a', 'c', 'd']);
  })

  it ('should ignore exclude values from list, that have no match', ()=> {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const values = ['b', 'e', 'y'];
    const res = filterArray(list, {i:[], e: values});

    expect(res).toEqual(['a', 'c', 'd']);
  })

  it ('should return list values that are on values', ()=> {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const values = ['b', 'e'];
    const res = filterArray(list, {e:[], i: values});

    expect(res).toEqual(['b', 'e']);
  })

  it ('should ignore values on values not on list', ()=> {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const values = ['b', 'e', 'x'];
    const res = filterArray(list, {e:[], i: values});

    expect(res).toEqual(['b', 'e']);
    expect(res.includes('x')).toEqual(false);
  })

  it ('should return original list if include []', ()=> {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const values = [];
    const res = filterArray(list, {e:[], i: values});

    expect(res).toEqual(list);
  })

  it ('should return original list if exclude []', ()=> {
    const list = ['a', 'b', 'c', 'd', 'e'];
    const values = [];
    const res = filterArray(list, {i:[], e: values});

    expect(res).toEqual(list);
  })
})