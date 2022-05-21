const isOption = (option) => /^-.$/.test(option);

const parseArgs = function (args) {
  const keys = { '-n': 'count', '-c': 'bytes' };

  if (!isOption(args[0])) {
    return { fileName: args[0], count: 10 };
  }

  const options = {};
  const option = keys[args[0]];
  options[option] = +args[1];
  options.fileName = args[2];

  return options;
};

exports.parseArgs = parseArgs;
