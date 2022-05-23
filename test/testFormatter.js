const assert = require('assert');
const { format } = require('../src/formatter.js');

describe('format', () => {
  it('When sigle file is given', () => {
    const files = ['a.txt'];
    const contents = ['helo'];

    assert.deepStrictEqual(format(files, contents), 'helo');
  });

  it('When multiple files are given', () => {
    const files = ['a.txt', 'b.txt'];
    const contents = ['hello', 'bye'];

    assert.deepStrictEqual(format(files, contents),
      '==>a.txt<==\nhello\n\n==>b.txt<==\nbye');
  });
});
