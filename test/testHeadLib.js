const assert = require('assert');
const { head, getLines } = require('../src/headLib.js');

describe('head', () => {
  it('Should give single line', () => {
    assert.deepStrictEqual(head({ count: 10 }, 'hello'), 'hello');
    assert.deepStrictEqual(head({ count: 10 }, 'ok'), 'ok');
  });

  it('Should give multiple lines', () => {
    assert.deepStrictEqual(head({ count: 10 }, 'hello\nbye'), 'hello\nbye');
    assert.deepStrictEqual(head({ count: 10 }, 'hello\nbye\nok'),
      'hello\nbye\nok');
  });

  it('should give 10 lines if lines are more than 10', () => {
    const lines = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expectedLines = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.deepStrictEqual(head({ count: 10 }, lines), expectedLines);
  });
});

describe('getLines', () => {
  it('Should return given number of lines', () => {
    assert.deepStrictEqual(getLines('h\ni', 1), 'h');
    assert.deepStrictEqual(getLines('h\ni', 2), 'h\ni');
  });

  it('Should return all lines if count is greater than lines', () => {
    assert.deepStrictEqual(getLines('a\nb', 3), 'a\nb');
  });

  it('When lines are empty', () => {
    assert.deepStrictEqual(getLines('', 1), '');
  });
});
