const assert = require('assert');
const { head, lines, charactersUpto, print } = require('../src/headLib.js');

describe('head', () => {
  it('Should give single line', () => {
    assert.deepStrictEqual(head({ 'option': 'lines', 'value:': 10 },
      'hello'), 'hello');
    assert.deepStrictEqual(head({ 'option': 'lines', 'value': 10 },
      'ok'), 'ok');
  });

  it('Should give multiple lines', () => {
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

describe('lines', () => {
  it('Should return given number of lines', () => {
    assert.deepStrictEqual(lines('h\ni', 1), 'h');
    assert.deepStrictEqual(lines('h\ni', 2), 'h\ni');
  });

  it('Should return all lines if count is greater than lines', () => {
    assert.deepStrictEqual(lines('a\nb', 3), 'a\nb');
  });

  it('When lines are empty', () => {
    assert.deepStrictEqual(lines('', 1), '');
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

const mocklog = function (expectedContents, inputs) {
  let index = 0;
  return function (content) {
    inputs.push(content);
    assert.deepEqual(content, expectedContents[index]);
    index++;
  };
};

describe('print', () => {
  it('Should log the content without header when filecount is 1', () => {
    const logInputs = [];
    const log = mocklog(['hi'], logInputs);
    print(log, 'a.txt', 1, 'hi');

    assert.deepStrictEqual(logInputs, ['hi']);
  });

  it('Shuould log the content with header when filecount is more than 1',
    () => {
      const logInputs = [];
      const log = mocklog(['==>a.txt<==\nhi\n'], logInputs);
      print(log, 'a.txt', 2, 'hi');

      assert.deepStrictEqual(logInputs, ['==>a.txt<==\nhi\n']);
    });
});
