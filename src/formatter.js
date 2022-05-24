const format = function (file, filesCount, content) {
  if (filesCount < 2) {
    return content;
  }

  const header = `==>${file}<==\n`;
  return `${header}${content}\n`;
};

exports.format = format;
