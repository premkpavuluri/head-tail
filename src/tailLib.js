const splitToLines = (text) => text.split('\n');
const joinLines = (lines) => lines.join('\n');

const lastNLines = (content, count) => {
  const lines = splitToLines(content);
  const linesCount = lines.length - count;
  return joinLines(lines.slice(linesCount));
};

const tail = function (content) {
  return lastNLines(content, 10);
};

exports.tail = tail;
