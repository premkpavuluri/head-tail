const assert = require('assert');
const { formatArgs, validateArgs, parseArgs } =
  require('../src/parseArguments.js');

describe('formatArgs', () => {
  it('Should format the args and return array', () => {
    assert.deepStrictEqual(formatArgs(['-n', '10']), ['-n', '10']);
    assert.deepStrictEqual(formatArgs(['-n', '1', '-c', '1']),
      ['-n', '1', '-c', '1']);
  });

  it('When option and value together', () => {
    assert.deepStrictEqual(formatArgs(['-n10']), ['-n', '10']);
    assert.deepStrictEqual(formatArgs(['-c1']), ['-c', '1']);
  });

  it('When option is `-`', () => {
    assert.deepStrictEqual(formatArgs(['-10']), ['-n', '10']);
  });
});

describe('validateArgs', () => {
  it('Should throw error if option is invalid', () => {
    const args = ['-a', '1'];
    const error = { message: 'head: illegal option -- -a' };

    assert.throws(() => validateArgs(args), error);
  });

  it('Should throw error if both options specified', () => {
    const args = ['-n', '1', '-c', '1'];
    const error = { message: 'can not combine line and byte counts' };

    assert.throws(() => validateArgs(args), error);
  });

  it('Should throw error if option value is valid', () => {
    const args = ['-n', 'a', 'a'];
    const lineError = {
      message: 'head: illegal -n count'
    };
    const byteError = {
      message: 'head: illegal -c count'
    };

    assert.throws(() => validateArgs(args), lineError);
    assert.throws(() => validateArgs(['-c', 'a']), byteError);
  });
});

describe('parseArgs', () => {
  it('Should parse options along with fileNames', () => {
    const args = ['-n', '1', 'a'];
    const parsedArgs = {
      options: { 'option': 'lines', 'value': 1 },
      fileNames: ['a']
    };

    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('Should give default count if no options mentioned', () => {
    const parsedArgs = {
      options: { 'option': 'lines', 'value': 10 },
      fileNames: ['a.txt']
    };

    assert.deepStrictEqual(parseArgs(['a.txt']), parsedArgs);
  });

  it('Should give bytes count along with file name', () => {
    const args = ['-c', '1', 'a'];
    const parsedArgs = {
      options: { 'option': 'bytes', 'value': 1 },
      fileNames: ['a']
    };

    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('Should throw error if option is invalid', () => {
    const error = {
      message: 'head: illegal option -- -a'
    };

    assert.throws(() => parseArgs(['-a']), error);
  });

  it('Should throw error if both options are specified', () => {
    const args = ['-n', '1', '-c', '1', 'a'];
    const error = { message: 'can not combine line and byte counts' };

    assert.throws(() => parseArgs(args), error);
  });

  it('Should throw error if option value is valid', () => {
    const args = ['-n', 'a'];
    const lineError = {
      message: 'head: illegal -n count'
    };
    const byteError = {
      message: 'head: illegal -c count'
    };

    assert.throws(() => parseArgs(args), lineError);
    assert.throws(() => parseArgs(['-c', 'a']), byteError);
  });
});
