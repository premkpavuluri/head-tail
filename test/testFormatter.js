const assert = require('assert');
const { format } = require('../src/formatter.js');

describe('format', () => {
  it('When file count 1', () => {
    assert.deepStrictEqual(format('a', 1, 'helo'), 'helo');
  });

  it('When file count is more than 1', () => {
    assert.deepStrictEqual(format('a', 2, 'hi'), '==>a<==\nhi\n');
  });
});
