const { splitLines, joinLines } = require('./stringUtils.js');

const getLines = (lines, count) => lines.slice(0, count);

const head = (content, count) => {
  const lines = splitLines(content);
  const filteredLines = getLines(lines, count);

  return joinLines(filteredLines);
};

exports.head = head;
exports.getLines = getLines;
