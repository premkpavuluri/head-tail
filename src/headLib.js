const { splitLines, joinLines } = require('./stringUtils.js');

const min = (number1, number2) => Math.min(number1, number2);

const getLines = (lines, count) => {
  const linesCount = min(count, lines.length);
  return lines.slice(0, linesCount);
};

const head = (content) => {
  const lines = splitLines(content);
  const defaultCount = 10;
  const filteredLines = getLines(lines, defaultCount);

  return joinLines(filteredLines);
};

exports.head = head;
exports.getLines = getLines;
