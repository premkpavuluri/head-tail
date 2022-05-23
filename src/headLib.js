const { parseArgs } = require('./parseArguments.js');
const { splitLines, joinLines } = require('./stringUtils.js');
const { format } = require('./formatter.js');

const charactersUpto = (content, limit) => content.slice(0, limit);
const lines = (content, count) => {
  const splitedLines = splitLines(content);
  return joinLines(splitedLines.slice(0, count));
};

const head = ({ option, value }, content) => {
  if (option === 'lines') {
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

  const headContents = contents.map((content) => {
    return head(options, content);
  });

  return format(fileNames, headContents);
};

exports.head = head;
exports.lines = lines;
exports.charactersUpto = charactersUpto;
exports.headMain = headMain;
