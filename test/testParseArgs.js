const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should return default count and fileName when file is given', () => {
    assert.deepStrictEqual(parseArgs(['hi.js']),
      { 'count': 10, 'fileName': 'hi.js' });
    assert.deepStrictEqual(parseArgs(['a']), { 'count': 10, 'fileName': 'a' });
  });
});
