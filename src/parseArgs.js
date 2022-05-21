const isOption = (option) => /^-.$/.test(option);

const parseArgs = function (args) {
  const keys = { '-n': 'count', '-c': 'bytes' };

  if (!isOption(args[0])) {
    return { fileName: args[0], options: { 'option': 'count', 'value': 10 } };
  }

  const options = {};
  const option = keys[args[0]];
  options['options'] = { option, 'value': + args[1] };
  options.fileName = args[2];

  return options;
};

exports.parseArgs = parseArgs;
