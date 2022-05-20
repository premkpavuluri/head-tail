const min = (number1, number2) => Math.min(number1, number2);

const getLines = (lines, count) => {
  const linesCount = min(count, lines.length);

  return lines.filter((line, index) => index < linesCount);
};

const head = (content) => {
  const lines = content.split('\n');
  const defaultCount = 10;
  const filteredLines = getLines(lines, defaultCount);

  return filteredLines.join('\n');
};

exports.head = head;
exports.getLines = getLines;
