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

const print = function (logger, file, filecount, content) {
  if (filecount <= 1) {
    logger(content);
    return 0;
  }

  const header = `==>${file}<==\n`;
  logger(header + content + '\n');
};

const headMain = function (readFile, log, eLog, ...args) {
  const { fileNames, options } = parseArgs(args);

  fileNames.forEach(fileName => {
    try {
      const content = readFile(fileName, 'utf8');
      const headContent = head(options, content);
      print(log, fileName, fileNames.length, headContent);
    } catch (error) {
      const message = `head: ${fileName}: No such file or directory`;
      print(eLog, fileName, 1, message);
    }
  });
};

exports.head = head;
exports.lines = lines;
exports.charactersUpto = charactersUpto;
exports.headMain = headMain;
exports.print = print;
