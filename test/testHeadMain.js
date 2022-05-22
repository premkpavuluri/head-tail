const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFile = function (mockFile, content) {
  return function (filename, encoding) {
    assert.equal(filename, mockFile);
    assert.equal(encoding, 'utf8');
    return content;
  };
};

describe('headMain', () => {
  it('Should give specified number of lines', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hello');
    const args = ['-n', '1', 'a.txt'];
    assert.deepStrictEqual(headMain(mockedReadFile, ...args), 'hello');

    const args2 = ['-n', '3', 'a.txt'];
    assert.deepStrictEqual(headMain(mockedReadFile, ...args2), 'hello');
  });

  it('When count is more than file content', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hello\nhi');
    const args = ['-n', '3', 'a.txt'];

    assert.deepStrictEqual(headMain(mockedReadFile, ...args), 'hello\nhi');
  });

  it('Should give specified number of bytes', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hii');
    const args = ['-c', '1', 'a.txt'];

    assert.deepStrictEqual(headMain(mockedReadFile, ...args), 'h');
  });

  it('Should throw error when file is not found', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hi');
    const args = ['-n', '1', 'not.txt'];
    const error = {
      name: 'FileReadError',
      message: 'Can not read not.txt'
    };

    assert.throws(() => headMain(mockedReadFile, ...args), error);
  });

  it('Should throw error if option is invalid', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hi');
    const args1 = ['--help', '1', 'a.txt'];
    const args2 = ['-a', '1', 'a.txt'];
    const error = {
      message: 'head: illegal option'
    };

    assert.throws(() => headMain(mockedReadFile, ...args1), error);
    assert.throws(() => headMain(mockedReadFile, ...args2), error);
  });

  it('Should throw error if both options are specified', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hi');
    const args = ['-n', '1', '-c', '1', 'a.txt'];
    const error = {
      message: 'can not combine line and byte counts'
    };

    assert.throws(() => headMain(mockedReadFile, ...args), error);
  });

  it('Should throw error if option value is valid', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hi');
    const args = ['-n', 'a', 'a.txt'];
    const error = {
      message: 'head: illegal count count'
    };

    assert.throws(() => headMain(mockedReadFile, ...args), error);
  });
});
