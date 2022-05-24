const isOption = (option) => /^-/.test(option);
const removeEmpty = (list) => list.filter(item => item.length > 0);
const isEmpty = (object) => Object.keys(object).length === 0;

const optionName = function (key) {
  const keys = { '-n': 'lines', '-c': 'bytes' };
  return keys[key];
};

const partition = (text, partitionPoint) => {
  const part1 = text.slice(0, partitionPoint);
  const part2 = text.slice(partitionPoint);
  return [part1, part2];
};

const getOption = (argument) => {
  if (isFinite(argument.slice(1))) {
    return ['-n', argument.slice(1)];
  }

  return partition(argument, 2);
};

const seperateArgs = function (args) {
  const options = args.flatMap(argument => {
    if (isOption(argument)) {
      return getOption(argument);
    }
    return argument;
  });

  return removeEmpty(options);
};

const isNotValidOption = (option) => {
  const validOptions = ['lines', 'bytes'];
  return !validOptions.includes(option);
};
const isNotValidValue = (value) => !isFinite(value) || value <= 0;

const validateOption = (oldOption, newOption) => {
  if (isNotValidOption(newOption.option)) {
    throw { message: `head: illegal option -- ${newOption.option}` };
  }

  if (oldOption.option !== newOption.option && !isEmpty(oldOption)) {
    throw { message: 'head: can not combine line and byte counts' };
  }
};

const validateValue = ({ option, value }) => {
  if (isNotValidValue(value)) {
    throw {
      message: `head: illegal ${option} count`
    };
  }
};

const parseArgs = function (args) {
  const seperatedArgs = seperateArgs(args);
  const parsedArgs = { options: { 'option': 'lines', 'value': 10 } };

  let index = 0;
  let options = {};
  while (isOption(seperatedArgs[index])) {
    const option = optionName(seperatedArgs[index]);
    const value = +seperatedArgs[index + 1];
    validateOption(options, { option, value });
    validateValue({ option, value });
    options = { option, value };
    parsedArgs.options = options;
    index += 2;
  }

  parsedArgs.fileNames = seperatedArgs.slice(index);
  return parsedArgs;
};

exports.formatArgs = seperateArgs;
exports.seperateArgs = seperateArgs;
exports.parseArgs = parseArgs;
