/* eslint-disable max-statements */
const isOption = (option) => /^-.$/.test(option);

const validateOption = function (oldOption, newOption) {
  if (oldOption.option !== newOption.option && oldOption.option !== undefined) {
    throw {
      name: 'Invalid syntax',
      message: 'can not combine line and byte counts'
    }
  }

  return newOption;
};

const parseArgs = function (args) {
  const parsedArgs = { options: { 'option': 'count', 'value': 10 } };
  const keys = { '-n': 'count', '-c': 'bytes' };

  let index = 0;
  let parsedOption = {};
  while (index < args.length && isOption(args[index])) {
    const option = keys[args[index]];
    parsedOption = validateOption(parsedOption,
      { option, 'value': +args[index + 1] });
    index += 2;
    parsedArgs.options = parsedOption;
  }

  parsedArgs.fileName = args[index];
  return parsedArgs;
};

exports.parseArgs = parseArgs;
