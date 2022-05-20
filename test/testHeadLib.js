const assert = require('assert');
const { head, getLines } = require('../src/headLib.js');

describe('head', () => {
  it('Should give single line', () => {
    assert.deepStrictEqual(head('hello'), 'hello');
    assert.deepStrictEqual(head('ok'), 'ok');
  });

  it('Should give multiple lines', () => {
    assert.deepStrictEqual(head('hello\nbye'), 'hello\nbye');
    assert.deepStrictEqual(head('hello\nbye\nok'),
      'hello\nbye\nok');
  });

  it('should give 10 lines if lines are more than 10', () => {
    const lines = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expectedLines = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.deepStrictEqual(head(lines), expectedLines);
  });
});

describe('getLines', () => {
  it('Should return given number of lines', () => {
    assert.deepStrictEqual(getLines(['h', 'i'], 1), ['h']);
    assert.deepStrictEqual(getLines(['h', 'i'], 2), ['h', 'i']);
  });

  it('Should return all lines if count is greater than lines', () => {
    assert.deepStrictEqual(getLines(['a', 'b'], 3), ['a', 'b']);
  });

  it('When lines are empty', () => {
    assert.deepStrictEqual(getLines([], 1), []);
  });
});
