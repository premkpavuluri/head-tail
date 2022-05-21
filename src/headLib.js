const { parseArgs } = require('./parseArgs.js');
const { splitLines, joinLines } = require('./stringUtils.js');

const charactersUpto = (content, limit) => content.slice(0, limit);
const lines = (content, count) => {
  const splitedLines = splitLines(content);
  return joinLines(splitedLines.slice(0, count));
};

const head = ({ option, value }, content) => {
  if (option === 'count') {
    return lines(content, value);
  }

  return charactersUpto(content, value);
};

const headMain = function (readFile, ...args) {
  const { fileNames, options } = parseArgs(args);
  let content = '';

  try {
    content = readFile(fileNames[0], 'utf8');
  } catch (error) {
    throw {
      name: 'FileReadError',
      message: `Can not read ${fileNames[0]}`
    };
  }

  return head(options, content);
};

exports.head = head;
exports.lines = lines;
exports.charactersUpto = charactersUpto;
exports.headMain = headMain;
