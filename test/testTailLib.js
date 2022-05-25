const assert = require('assert');
const { tail } = require('../src/tailLib.js');

describe('tail', () => {
  it('When content is sigle line', () => {
    assert.deepStrictEqual(tail('hi'), 'hi');
  });

  it('When content is multiple lines', () => {
    assert.deepStrictEqual(tail('hi\nhello'), 'hi\nhello');
  });

  it('Should give last 10 lines when options are not given', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expectedContent = 'b\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    assert.deepStrictEqual(tail(content), expectedContent);
  });
});
