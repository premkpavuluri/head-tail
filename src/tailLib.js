const { splitLines, joinLines } = require('./stringUtils.js');

const lastNLines = (content, count) => {
  if (count === 0) {
    return '';
  }

  const lines = splitLines(content);
  return joinLines(lines.slice(-count));
};

const lastNCharacters = (content, count) => {
  if (count === 0) {
    return '';
  }

  return content.slice(-count);
};

const reverseContent = (content) => {
  const lines = splitLines(content);
  return joinLines(lines.reverse());
};

const tail = function (content, option) {
  const references = {
    'lines': lastNLines,
    'bytes': lastNCharacters,
    'reverse': reverseContent
  };

  const optionName = option.flag;
  const value = option.value;
  const fnToCall = references[optionName];
  return fnToCall(content, value);
};

exports.tail = tail;
exports.lastNLines = lastNLines;
exports.lastNCharacters = lastNCharacters;
exports.reverseContent = reverseContent;
