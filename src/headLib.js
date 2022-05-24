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

const headMain = function (readFile, log, eLog, ...args) {
  const { fileNames, options } = parseArgs(args);
  let exitCode = 0;

  fileNames.forEach(fileName => {
    try {
      const content = readFile(fileName, 'utf8');
      const headContent = head(options, content);
      const formattedContent = format(fileName, fileNames.length, headContent);
      log(formattedContent);
    } catch (error) {
      const message = `head: ${fileName}: No such file or directory`;
      eLog(message);
      exitCode = 1;
    }
  });

  return exitCode;
};

exports.head = head;
exports.lines = lines;
exports.charactersUpto = charactersUpto;
exports.headMain = headMain;
