const assert = require('assert');
const { head, getLines } = require('../src/headLib.js');

describe('head', () => {
  it('Should give single line', () => {
    assert.deepStrictEqual(head(['hello']), ['hello']);
    assert.deepStrictEqual(head(['ok']), ['ok']);
  });

  it('Should give multiple lines', () => {
    assert.deepStrictEqual(head(['hello', 'bye']), ['hello', 'bye']);
    assert.deepStrictEqual(head(['hello', 'bye', 'ok']),
      ['hello', 'bye', 'ok']);
  });

  it('should give 10 lines if lines are more than 10', () => {
    const lines = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    const expectedLines = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    assert.deepStrictEqual(head(lines), expectedLines);
  });
});

describe('getLines', () => {
  it('Should return given number of lines', () => {
    assert.deepStrictEqual(getLines(['h', 'i'], 1), ['h']);
    assert.deepStrictEqual(getLines(['h', 'i'], 2), ['h', 'i']);
  });

  it('Should return all lines if count is greater than lines', () => {
    assert.deepStrictEqual(getLines(['a', 'b'], 3), ['a', 'b']);
  });
});
