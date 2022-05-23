const { joinLines } = require('./stringUtils.js');

const format = function (files, contents) {
  if (files.length < 2) {
    return contents[0];
  }

  const formattedContents = files.map((file, index) => {
    return `==>${file}<==\n${contents[index]}`;
  });

  return joinLines(formattedContents);
};

exports.format = format;
