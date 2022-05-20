const { splitLines, joinLines } = require('./stringUtils.js');

const charactersUpto = (content, limit) => content.slice(0, limit);
const lines = (content, count) => {
  const splitedLines = splitLines(content);
  return joinLines(splitedLines.slice(0, count));
};

const head = (option, content) => {
  const count = option.count;
  if (count) {
    return lines(content, count);
  }

  return charactersUpto(content, option.bytes);
};

const headMain = function (readFile, ...args) {
  const filename = args[args.length - 1];
  const content = readFile(filename, 'utf8');
  return head({ count: args[1] }, content);
};

exports.head = head;
exports.lines = lines;
exports.charactersUpto = charactersUpto;
exports.headMain = headMain;
