const { splitLines, joinLines } = require('./stringUtils.js');

const getLines = (lines, count) => lines.slice(0, count);

const head = (option, content) => {
  const lines = splitLines(content);
  const filteredLines = getLines(lines, option.count);

  return joinLines(filteredLines);
};

exports.head = head;
exports.getLines = getLines;
