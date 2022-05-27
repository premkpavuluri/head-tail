const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFile = function (mockFile, content) {
  return function (filename, encoding) {
    assert.equal(filename, mockFile);
    assert.equal(encoding, 'utf8');
    return content;
  };
};

const mockReadFiles = function (fileContents) {
  let index = 0;
  return function (fileName, encoding) {
    const file = fileContents[index];
    assert.equal(fileName, file.fileName);
    assert.equal(encoding, 'utf8');
    index++;
    return file.content;
  };
};

const mocklog = function (inputs) {
  return function (content) {
    inputs.push(content);
  };
};

describe('headMain', () => {
  it('Should give specified number of lines', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hello');
    const logInputs = [];
    const errors = [];
    const eLog = mocklog(errors);
    const log = mocklog(logInputs);
    const args = ['-n', '1', 'a.txt'];

    const exitCode = headMain(mockedReadFile, log, eLog, ...args);
    assert.deepStrictEqual(logInputs, ['hello']);
    assert.deepStrictEqual(errors, []);
    assert.equal(exitCode, 0);
  });

  it('When count is more than file content', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hello\nhi');
    const logInputs = [];
    const errors = [];
    const eLog = mocklog(errors);
    const log = mocklog(logInputs);
    const args = ['-n', '3', 'a.txt'];
    const exitCode = headMain(mockedReadFile, log, eLog, ...args);

    assert.deepStrictEqual(logInputs, ['hello\nhi']);
    assert.deepStrictEqual(errors, []);
    assert.equal(exitCode, 0);
  });

  it('Should give specified number of bytes', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hii');
    const logInputs = [];
    const errors = [];
    const eLog = mocklog(errors);
    const log = mocklog(logInputs);
    const args = ['-c', '1', 'a.txt'];

    const exitCode = headMain(mockedReadFile, log, eLog, ...args);
    assert.deepStrictEqual(logInputs, ['h']);
    assert.deepStrictEqual(errors, []);
    assert.equal(exitCode, 0);
  });

  it('Should throw error when file is not found', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hi');
    const args = ['-n', '1', 'not.txt'];
    const logInputs = [];
    const errors = [];
    const expectedErr = ['head: not.txt: No such file or directory'];
    const eLog = mocklog(errors);
    const log = mocklog(logInputs);

    const exitCode = headMain(mockedReadFile, log, eLog, ...args);
    assert.deepStrictEqual(errors, expectedErr);
    assert.deepStrictEqual(logInputs, []);
    assert.equal(exitCode, 1);
  });

  it('Should throw error if option is invalid', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hi');
    const args = ['--help', '1', 'a.txt'];
    const error = {
      message: 'head: illegal option -- undefined'
    };
    const logInputs = [];
    const errors = [];
    const eLog = mocklog(errors);
    const log = mocklog(logInputs);

    assert.throws(() => headMain(mockedReadFile, log, eLog, ...args), error);
  });

  it('Should throw error if both options are specified', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hi');
    const args = ['-n', '1', '-c', '1', 'a.txt'];
    const error = {
      message: 'head: can\'t combine line and byte counts'
    };
    const logInputs = [];
    const errors = [];
    const eLog = mocklog(errors);
    const log = mocklog(logInputs);

    assert.throws(() => headMain(mockedReadFile, log, eLog, ...args), error);
  });

  it('Should throw error if option value is invalid', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hi');
    const args = ['-n', 'a', 'a.txt'];
    const error = {
      message: 'head: illegal lines count'
    };
    const logInputs = [];
    const errors = [];
    const eLog = mocklog(errors);
    const log = mocklog(logInputs);

    assert.throws(() => headMain(mockedReadFile, log, eLog, ...args), error);
  });

  it('Should give head content of multiple files', () => {
    const filesSet = [
      { fileName: 'a.txt', content: 'hello' },
      { fileName: 'b.txt', content: 'bye' }];
    const mockedReadFiles = mockReadFiles(filesSet);
    const args = ['-n', '1', 'a.txt', 'b.txt'];
    const logInputs = [];
    const errors = [];
    const expectedOutput = ['==>a.txt<==\nhello\n', '==>b.txt<==\nbye\n'];
    const eLog = mocklog(errors);
    const log = mocklog(logInputs);

    headMain(mockedReadFiles, log, eLog, ...args);
    assert.deepStrictEqual(expectedOutput, logInputs);
    assert.deepStrictEqual([], errors);
  });

  it('Should give error when one of the file is not present', () => {
    const filesSet = [
      { fileName: 'a', content: 'hello' },
      { fileName: 'b', content: 'bye' }];
    const mockedReadFiles = mockReadFiles(filesSet);
    const args = ['-n', '1', 'a', 'badfile'];
    const logInputs = [];
    const errors = [];
    const expectedOutput = ['==>a<==\nhello\n'];
    const expectedErr = ['head: badfile: No such file or directory'];
    const eLog = mocklog(errors);
    const log = mocklog(logInputs);

    headMain(mockedReadFiles, log, eLog, ...args);
    assert.deepStrictEqual(logInputs, expectedOutput);
    assert.deepStrictEqual(errors, expectedErr);
  });
});
