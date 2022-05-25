const assert = require('assert');
const { tailMain } = require('../src/tailLib.js');

const mockReadFile = function (mockFile, content) {
  return function (filename, encoding) {
    assert.equal(filename, mockFile);
    assert.equal(encoding, 'utf8');
    return content;
  };
};

describe('tailMain', () => {
  it('Should give last 10 lines from file', () => {
    const mockedReadFile = mockReadFile('a.txt', 'hello');
    assert.deepStrictEqual(tailMain(mockedReadFile, 'a.txt'), 'hello');
  });
});
