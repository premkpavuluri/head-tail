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
});
