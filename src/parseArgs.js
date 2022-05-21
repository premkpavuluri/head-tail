/* eslint-disable max-statements */
const isOption = (option) => /^-.$/.test(option);

const parseArgs = function (args) {
  if (!isOption(args[0])) {
    return { fileName: args[0], options: { 'option': 'count', 'value': 10 } };
  }

  const keys = { '-n': 'count', '-c': 'bytes' };
  const optionsSet = {};
  let index = 0;
  while (index < args.length && isOption(args[index])) {
    const option = keys[args[index]];
    optionsSet['options'] = { option, 'value': +args[index + 1] };
    index += 2;
  }

  optionsSet.fileName = args[index];

  return optionsSet;
};

exports.parseArgs = parseArgs;
