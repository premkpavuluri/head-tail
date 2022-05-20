const assert = require('assert');
const { head } = require('../src/headLib.js');

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
