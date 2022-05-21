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
});
