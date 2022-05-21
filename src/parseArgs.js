const parseArgs = function (args) {
  const options = { count: 10 };
  options.fileName = args[0];

  return options;
};
exports.parseArgs = parseArgs;
