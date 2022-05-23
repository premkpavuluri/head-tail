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

  const contents = fileNames.map((fileName) => {
    try {
      return readFile(fileName, 'utf8');
    } catch (error) {
      throw {
        name: 'FileReadError',
        message: `head: ${fileName}: No such file or directory`
      };
    }
  });

  return contents.map((content) => {
    return head(options, content);
  }).join('\n');
};

exports.head = head;
exports.lines = lines;
exports.charactersUpto = charactersUpto;
exports.headMain = headMain;
