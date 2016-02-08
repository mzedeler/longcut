'use strict';
/* global describe, it */

const assert = require('chai').assert,
      f1 = {
        o1: {
          a1: [10, 20, 'last']
        },
        s1: 'some string'
      };

let longcut, k1;

describe('Initialization', () => {
  it('Is possible to import the module', () => {
    longcut = require('.').longcut;
    assert.ok(longcut);
    assert.isFunction(longcut);
  });
  it('Is possible to initialize a longcut object', () => {
    k1 = longcut(f1);
    assert.ok(k1);
    assert.isFunction(k1);
  });
});

describe('Selecting', () => {
  it('Selects leaves directly', () => {
    assert.equal(k1('s1').val(), 'some string');
    assert.equal(k1('o1')('a1')(0).val(), 10);
    assert.equal(k1('o1')('a1')(2).val(), 'last');
  });
  it('Selects nodes with regular expressions', () => {
    assert.deepEqual(k1(/^s/).val(), {s1: 'some string'});
    assert.deepEqual(k1('o1')('a1')(/^1/).val(), [10]);
  });
  it('Returns empty array if regex selecting nothing from an array', () => {
    assert.deepEqual(k1('o1')('a1')(/-/).val(), []);
  });
  it('Returns empty object if regex selecting nothing from an object', () => {
    assert.deepEqual(k1(/-/).val(), {});
  });
  it('Handles non-existing leaves by returning undefined', () => {
    assert.isUndefined(k1('-').val());
    assert.isUndefined(k1('-')(1).val());
    assert.isUndefined(k1('-')(/-/).val());
  });
});

