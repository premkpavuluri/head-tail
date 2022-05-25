const assert = require('assert');
const { tail, lastNLines, lastNCharacters, reverseContent } =
  require('../src/tailLib.js');

describe('tail', () => {
  it('When content is sigle line', () => {
    const option = { flag: 'lines', value: 10 };
    assert.deepStrictEqual(tail('hi', option), 'hi');
  });

  it('When content is multiple lines', () => {
    const option = { flag: 'lines', value: 10 };
    assert.deepStrictEqual(tail('hi\nhello', option), 'hi\nhello');
  });

  it('Should give last 10 lines when options are not given', () => {
    const option = { flag: 'lines', value: 10 };
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    const expectedContent = 'b\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    assert.deepStrictEqual(tail(content, option), expectedContent);
  });

  it('Should give specified number of bytes in content from last', () => {
    const option = { flag: 'bytes', value: 2 };
    assert.deepStrictEqual(tail('abcd', option), 'cd');
  });

  it('When option is reverse', () => {
    const option = { flag: 'reverse', value: 2 };
    assert.deepStrictEqual(tail('a\nb', option), 'b\na');
    assert.deepStrictEqual(tail('a\nb\nc', option), 'c\nb\na');
  });
});

describe('lastNLines', () => {
  it('Should give sepcified number of lines from content from last', () => {
    assert.deepStrictEqual(lastNLines('a', 1), 'a');
    assert.deepStrictEqual(lastNLines('a\nb\nc', 1), 'c');
  });

  it('When given number count is more than actual lines', () => {
    assert.deepStrictEqual(lastNLines('a\nb', 3), 'a\nb');
    assert.deepStrictEqual(lastNLines('a\nb\nc', 3), 'a\nb\nc');
  });

  it('When given line count is 0', () => {
    assert.deepStrictEqual(lastNLines('a\nb', 0), '');
  });
});

describe('lastNCharacters', () => {
  it('Should give specified number of characters from content from last',
    () => {
      assert.deepStrictEqual(lastNCharacters('ab', 1), 'b');
      assert.deepStrictEqual(lastNCharacters('abc', 2), 'bc');
    });

  it('When given count is more than actual content', () => {
    assert.deepStrictEqual(lastNCharacters('ab', 3), 'ab');
    assert.deepStrictEqual(lastNCharacters('a\nb', 5), 'a\nb');
  });

  it('When given count is 0', () => {
    assert.deepStrictEqual(lastNCharacters('ab', 0), '');
  });
});

describe('reverseContent', () => {
  it('Should reverse the given content', () => {
    assert.deepStrictEqual(reverseContent('a'), 'a');
    assert.deepStrictEqual(reverseContent('a\nb'), 'b\na');
    assert.deepStrictEqual(reverseContent('a\nb\nc'), 'c\nb\na');
  });
});
