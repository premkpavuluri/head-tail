const head = (lines) => {
  const defaultCount = 10;
  const linesCount = Math.min(defaultCount, lines.length);

  return lines.filter((line, index) => index < linesCount);
};

exports.head = head;
