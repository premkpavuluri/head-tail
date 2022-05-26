const assert = require('assert');
const { seperateArgs, parseArgs, validateOptions } =
  require('../src/parseArguments.js');

describe('seperateArgs', () => {
  it('Should format the args and return array', () => {
    assert.deepStrictEqual(seperateArgs(['-n', '10']), ['-n', '10']);
    assert.deepStrictEqual(seperateArgs(['-n', '1', '-c', '1']),
      ['-n', '1', '-c', '1']);
  });

  it('When option and value together', () => {
    assert.deepStrictEqual(seperateArgs(['-n10']), ['-n', '10']);
    assert.deepStrictEqual(seperateArgs(['-c1']), ['-c', '1']);
  });

  it('When option is `-`', () => {
    assert.deepStrictEqual(seperateArgs(['-10']), ['-n', '10']);
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
      message: 'head: illegal option -- undefined'
    };

    assert.throws(() => parseArgs(['-a']), error);
  });

  it('Should throw error if both options are specified', () => {
    const args = ['-n', '1', '-c', '1', 'a'];
    const error = { message: 'head: can\'t combine line and byte counts' };

    assert.throws(() => parseArgs(args), error);
  });

  it('Should throw error if option value is invalid', () => {
    const args = ['-n', '0'];
    const lineError = {
      message: 'head: illegal lines count'
    };
    const byteError = {
      message: 'head: illegal bytes count'
    };

    assert.throws(() => parseArgs(args), lineError);
    assert.throws(() => parseArgs(['-c', 'a']), byteError);
  });

  it('Should throw error if files are not given', () => {
    const error = {
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
    const args = ['-n', '1'];

    assert.throws(() => parseArgs(args), error);
  });
});

describe('validateOptions', () => {
  it('Should throw error if options are invalid', () => {
    const error = {
      message: 'head: illegal option -- a'
    };
    const option1 = { option: 'lines', value: 10 };
    const option2 = { option: 'a', value: 10 };

    assert.throws(() => validateOptions(option1, option2), error);
  });

  it('Should throw error if lines and bytes are present', () => {
    const error = {
      message: 'head: can\'t combine line and byte counts'
    };
    const option1 = { option: 'lines', value: 10 };
    const option2 = { option: 'bytes', value: 10 };

    assert.throws(() => validateOptions(option1, option2), error);
  });

  it('Should throw error if option value is invalid', () => {
    const lineError = {
      message: 'head: illegal lines count'
    };
    const byteError = {
      message: 'head: illegal bytes count'
    };
    const lineOp1 = { option: 'lines', value: 10 };
    const lineOp2 = { option: 'lines', value: NaN };
    const byteOp1 = { option: 'bytes', value: 10 };
    const byteOp2 = { option: 'bytes', value: NaN };

    assert.throws(() => validateOptions(lineOp1, lineOp2), lineError);
    assert.throws(() => validateOptions(byteOp1, byteOp2), byteError);
  });

  it('Should not throw error if options are valid', () => {
    const option1 = { option: 'lines', value: 10 };
    const option2 = { option: 'lines', value: 10 };

    assert.deepStrictEqual(validateOptions(option1, option2), undefined);
  });
});
