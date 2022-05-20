const { splitLines, joinLines } = require('./stringUtils.js');

const getLines = (content, count) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, count));
};

const charactersUpto = (content, limit) => content.slice(0, limit);

const head = (option, content) => {
  return getLines(content, option.count);
};

exports.head = head;
exports.getLines = getLines;
exports.charactersUpto = charactersUpto;
