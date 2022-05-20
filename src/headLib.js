const { splitLines, joinLines } = require('./stringUtils.js');

const getLines = (content, count) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, count));
};

const head = (option, content) => {
  return getLines(content, option.count);
};

exports.head = head;
exports.getLines = getLines;
