const { splitLines, joinLines } = require('./stringUtils.js');

const charactersUpto = (content, limit) => content.slice(0, limit);
const lines = (content, count) => {
  const splitedLines = splitLines(content);
  return joinLines(splitedLines.slice(0, count));
};

const head = (option, content) => {
  if (isFinite(option.count)) {
    return lines(content, option.count);
  }

  return charactersUpto(content, option.bytes);
};

exports.head = head;
exports.lines = lines;
exports.charactersUpto = charactersUpto;
