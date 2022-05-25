const { splitLines, joinLines } = require('./stringUtils.js');

const lastNLines = (content, count) => {
  if (count === 0) {
    return '';
  }

  const lines = splitLines(content);
  return joinLines(lines.slice(-count));
};

const lastNCharacters = (content, count) => {
  return count === 0 ? '' : content.slice(-count);
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

const tailMain = function (reader, fileName) {
  const option = { flag: 'lines', value: 10 };
  const content = reader(fileName, 'utf8');

  return tail(content, option);
};

exports.tail = tail;
exports.lastNLines = lastNLines;
exports.lastNCharacters = lastNCharacters;
exports.reverseContent = reverseContent;
exports.tailMain = tailMain;
