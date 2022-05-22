const assert = require('assert');
const { parseArgs, validateOption } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should return default count and fileName when file is given', () => {
    assert.deepStrictEqual(parseArgs(['hi.js']),
      {
        'options': { 'option': 'count', 'value': 10 },
        'fileNames': ['hi.js']
      });
  });

  it('Should return count along with fileName', () => {
    assert.deepStrictEqual(parseArgs(['-n', '2', 'a']),
      { 'options': { 'option': 'count', 'value': 2 }, 'fileNames': ['a'] });
  });

  it('Should return bytes and file name', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', 'b']),
      { 'options': { 'option': 'bytes', 'value': 2 }, 'fileNames': ['b'] });
  });

  it('When same option is repeating', () => {
    const args = ['-n', '1', '-n', '3', 'a'];
    assert.deepStrictEqual(parseArgs(args),
      { 'options': { 'option': 'count', 'value': 3 }, 'fileNames': ['a'] });

    const args2 = ['-c', '1', '-c', '3', 'a'];
    assert.deepStrictEqual(parseArgs(args2),
      { 'options': { 'option': 'bytes', 'value': 3 }, 'fileNames': ['a'] });
  });

  it('Should throw error when both options are given', () => {
    const args = ['-n', '1', '-c', '2', 'a'];
    const error = {
      'message': 'can not combine line and byte counts'
    };
    assert.throws(() => parseArgs(args), error);

    const args2 = ['-c', '1', '-n', '1', 'a'];
    assert.throws(() => parseArgs(args2), error);
  });

  it('Should give files in array', () => {
    const args = ['-n', '1', 'a', 'b'];

    assert.deepStrictEqual(parseArgs(args), {
      'options': { 'option': 'count', 'value': 1 },
      'fileNames': ['a', 'b']
    });
  });

  it('Should throw error when option value is not valid', () => {
    const countError = {
      message: 'head: illegal count count'
    };
    const byteError = {
      message: 'head: illegal bytes count'
    };
    assert.throws(() => parseArgs(['-n', 'a', 'b']), countError);
    assert.throws(() => parseArgs(['-c', 'a', 'b']), byteError);
  });

  it('Should throw error when option is not valid', () => {
    const error = {
      message: 'head: illegal option'
    };

    assert.throws(() => parseArgs(['-a', 'a', 'b']), error);
    assert.throws(() => parseArgs(['-p', 'a', 'b']), error);
  });
});

describe('validateOption', () => {
  it('Should return new option if it is valid', () => {
    const option1 = { 'option': 'count', 'value': 10 };
    const option2 = { 'option': 'count', 'value': 1 };

    assert.deepStrictEqual(validateOption(option1, option2), option2);
  });

  it('Should throw error if option is not valid', () => {
    const error = { message: 'head: illegal option' };
    const option1 = { 'option': 'count', 'value': 10 };
    const option2 = { 'option': 'new', 'value': 1 };

    assert.throws(() => validateOption(option1, option2), error);

  });

  it('Should throw error if both options are present', () => {
    const error = { message: 'can not combine line and byte counts' };
    const option1 = { 'option': 'count', 'value': 10 };
    const option2 = { 'option': 'bytes', 'value': 1 };

    assert.throws(() => validateOption(option1, option2), error);
  });

  it('Should throw error if value is invalid', () => {
    const countError = { message: 'head: illegal count count' };
    const bytesError = { message: 'head: illegal bytes count' };
    const countOption1 = { 'option': 'count', 'value': 10 };
    const countOption2 = { 'option': 'count', 'value': NaN };
    const bytesOption1 = { 'option': 'bytes', 'value': 10 };
    const bytesOption2 = { 'option': 'bytes', 'value': NaN };

    assert.throws(() => validateOption(countOption1, countOption2), countError);
    assert.throws(() => validateOption(bytesOption1, bytesOption2), bytesError);
  });
});
