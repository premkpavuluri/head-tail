const assert = require('assert');
const { head, firstNLines, firstNCharacters } =
  require('../src/headLib.js');

describe('head', () => {
  it('Should give single line when content is single line', () => {
    assert.deepStrictEqual(head({ 'option': 'lines', 'value:': 10 },
      'hello'), 'hello');
    assert.deepStrictEqual(head({ 'option': 'lines', 'value': 10 },
      'ok'), 'ok');
  });

  it('When content has multiple lines', () => {
    assert.deepStrictEqual(head({ 'option': 'lines', 'value': 10 },
      'hello\nbye'), 'hello\nbye');
    assert.deepStrictEqual(head({ 'option': 'lines', 'value': 10 },
      'hello\nbye\nok'),
      'hello\nbye\nok');
  });

  it('should give 10 lines if lines are more than 10', () => {
    const lines = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expectedLines = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';

    assert.deepStrictEqual(head({ 'option': 'lines', 'value': 10 },
      lines), expectedLines);
  });

  it('Should give specified number of bytes', () => {
    assert.deepStrictEqual(head({ 'option': 'bytes', 'value': 1 }, 'ab'), 'a');
    assert.deepStrictEqual(head({ 'option': 'bytes', 'value': 2 },
      'a\nc'), 'a\n');
  });
});

describe('firstNLines', () => {
  it('Should return given number of lines', () => {
    assert.deepStrictEqual(firstNLines('h\ni', 1), 'h');
    assert.deepStrictEqual(firstNLines('h\ni', 2), 'h\ni');
  });

  it('Should return all lines if count is greater than lines', () => {
    assert.deepStrictEqual(firstNLines('a\nb', 3), 'a\nb');
  });

  it('When lines are empty', () => {
    assert.deepStrictEqual(firstNLines('', 1), '');
  });
});

describe('firstNCharacters', () => {
  it('Should give specified number of characters', () => {
    assert.deepStrictEqual(firstNCharacters('ab', 1), 'a');
    assert.deepStrictEqual(firstNCharacters('a\nc', 3), 'a\nc');
  });

  it('When content have empty characters', () => {
    assert.deepStrictEqual(firstNCharacters('a b', 2), 'a ');
    assert.deepStrictEqual(firstNCharacters(' ', 1), ' ');
  });

  it('When given limit is more than no of characters', () => {
    assert.deepStrictEqual(firstNCharacters('ab', 3), 'ab');
  });
});
