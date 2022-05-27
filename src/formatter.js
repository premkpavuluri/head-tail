const singleFileFormatter = ({ content }) => content;

const multiFileFormatter = ({ fileName, content }) => {
  return `==>${fileName}<==\n${content}\n`;
};

const hasSingleFile = (fileCount) => fileCount < 2;

const formatter = (files) =>
  hasSingleFile(files.length) ? singleFileFormatter : multiFileFormatter;

exports.formatter = formatter;
