const min = (number1, number2) => Math.min(number1, number2);

const getLines = (lines, count) => {
  const linesCount = min(count, lines.length);

  return lines.filter((line, index) => index < linesCount);
};

const head = (lines) => {
  const defaultCount = 10;
  const filteredLines = getLines(lines, defaultCount);

  return filteredLines;
};

exports.head = head;
exports.getLines = getLines;
