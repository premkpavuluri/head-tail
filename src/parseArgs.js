/* eslint-disable max-statements */
const isOption = (option) => ['-c', '-n'].includes(option);

const validateOption = function (oldOption, newOption) {
  if (oldOption.option !== newOption.option && oldOption.option !== undefined) {
    throw {
      name: 'Invalid syntax',
      message: 'can not combine line and byte counts'
    };
  }

  if (!isFinite(newOption.value)) {
    throw {
      message: `head: illegal ${newOption.option} count`
    };
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

  parsedArgs.fileNames = args.slice(index);
  return parsedArgs;
};

exports.parseArgs = parseArgs;
