/* eslint-disable max-statements */
const isOption = (option) => ['-c', '-n'].includes(option);

const validateOption = function (oldOption, newOption) {
  if (oldOption.option !== newOption.option && oldOption.option !== undefined) {
    throw { message: 'can not combine line and byte counts' };
  }

  if (!isFinite(newOption.value)) {
    throw { message: `head: illegal ${newOption.option} count` };
  }

  return newOption;
};

const optionName = function (key) {
  const keys = { '-n': 'count', '-c': 'bytes' };
  return keys[key];
};

const parseArgs = function (args) {
  const parsedArgs = { options: { 'option': 'count', 'value': 10 } };

  let index = 0;
  let parsedOption = {};
  while (isOption(args[index])) {
    const option = optionName(args[index]);
    const value = +args[index + 1];
    parsedOption = validateOption(parsedOption, { option, value });
    index += 2;
    parsedArgs.options = parsedOption;
  }

  parsedArgs.fileNames = args.slice(index);
  return parsedArgs;
};

exports.parseArgs = parseArgs;
