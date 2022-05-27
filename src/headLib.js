const { parseArgs } = require('./parseArguments.js');
const { splitLines, joinLines } = require('./stringUtils.js');
const { formatter } = require('./formatter.js');

const fileError = (file) => `head: ${file}: No such file or directory`;

const exitCode = (records) => {
  return records.some(record => record.error) ? 1 : 0;
};

const firstNCharacters = (content, limit) => content.slice(0, limit);
const firstNLines = (content, count) => {
  const lines = splitLines(content);
  const firstLines = lines.slice(0, count);
  return joinLines(firstLines);
};

const head = ({ option, value }, content) => {
  if (option === 'lines') {
    return firstNLines(content, value);
  }

  return firstNCharacters(content, value);
};

const print = (contents, { log, eLog }, format) => {
  contents.forEach(content => {
    if (content.error) {
      eLog(content.error);
      return;
    }
    log(format(content));
  });
};

const headOfFile = (fileName, options, readFile) => {
  try {
    const content = readFile(fileName, 'utf8');
    const headContent = head(options, content);
    return { fileName, content: headContent };
  } catch (err) {
    const error = fileError(fileName);
    return { fileName, error };
  }
};

const headMain = function (readFile, logger, ...args) {
  const { fileNames, options } = parseArgs(args);

  const headContents = fileNames.map((fileName) => {
    return headOfFile(fileName, options, readFile);
  });

  const format = formatter(fileNames);
  print(headContents, logger, format);

  return exitCode(headContents);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNCharacters = firstNCharacters;
exports.headMain = headMain;
exports.headOfFile = headOfFile;
