const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should return default count and fileName when file is given', () => {
    assert.deepStrictEqual(parseArgs(['hi.js']),
      { 'options': { 'option': 'count', 'value': 10 }, 'fileName': 'hi.js' });
  });

  it('Should return count along with fileName', () => {
    assert.deepStrictEqual(parseArgs(['-n', '2', 'a']),
      { 'options': { 'option': 'count', 'value': 2 }, 'fileName': 'a' });
  });

  it('Should return bytes and file name', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', 'b']),
      { 'options': { 'option': 'bytes', 'value': 2 }, 'fileName': 'b' });
  });

  it('When same option is repeating', () => {
    const args = ['-n', '1', '-n', '3', 'a'];
    assert.deepStrictEqual(parseArgs(args),
      { 'options': { 'option': 'count', 'value': 3 }, 'fileName': 'a' });

    const args2 = ['-c', '1', '-c', '3', 'a'];
    assert.deepStrictEqual(parseArgs(args2),
      { 'options': { 'option': 'bytes', 'value': 3 }, 'fileName': 'a' });
  });

  it('Should throw error when both options are given', () => {
    const args = ['-n', '1', '-c', '2', 'a'];
    const error = {
      'name': 'Invalid syntax',
      'message': 'can not combine line and byte counts'
    };
    assert.throws(() => parseArgs(args), error);

    const args2 = ['-c', '1', '-n', '1', 'a'];
    assert.throws(() => parseArgs(args2), error);
  });
});
