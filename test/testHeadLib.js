const assert = require('assert');
const { head, getLines, charactersUpto } = require('../src/headLib.js');

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

describe('charactersUpto', () => {
  it('Should give specified number of characters', () => {
    assert.deepStrictEqual(charactersUpto('ab', 1), 'a');
    assert.deepStrictEqual(charactersUpto('a\nc', 3), 'a\nc');
  });

  it('When content have empty characters', () => {
    assert.deepStrictEqual(charactersUpto('a b', 2), 'a ');
    assert.deepStrictEqual(charactersUpto(' ', 1), ' ');
  });

  it('When given limit is more than no of characters', () => {
    assert.deepStrictEqual(charactersUpto('ab', 3), 'ab');
  });
});
