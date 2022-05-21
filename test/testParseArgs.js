const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should return default count and fileName when file is given', () => {
    assert.deepStrictEqual(parseArgs(['hi.js']),
      { 'count': 10, 'fileName': 'hi.js' });
    assert.deepStrictEqual(parseArgs(['a']), { 'count': 10, 'fileName': 'a' });
  });

  it('Should return count along with fileName', () => {
    assert.deepStrictEqual(parseArgs(['-n', '2', 'a']),
      { 'count': 2, 'fileName': 'a' });
  });

  it('Should return bytes and file name', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', 'b']),
      { 'bytes': 2, 'fileName': 'b' });
  });
});
