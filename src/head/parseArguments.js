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

const illegalOptionError = (option) => {
  return {
    message: `head: illegal option -- ${option}`
  };
};

const illegalValueError = (option) => {
  return {
    message: `head: illegal ${option} count`
  };
};

const canntotCombineError = () => {
  return {
    message: 'head: can\'t combine line and byte counts'
  };
};

const validateOptions = (prevOption, currentOption) => {
  if (isNotValidOption(currentOption.option)) {
    throw illegalOptionError(currentOption.option);
  }

  if (prevOption.option !== currentOption.option && !isEmpty(prevOption)) {
    throw canntotCombineError();
  }

  if (isNotValidValue(currentOption.value)) {
    throw illegalValueError(currentOption.option);
  }
};

const usageError = () => {
  return {
    message: 'usage: head [-n lines | -c bytes] [file ...]'
  };
};

const validateFiles = (files) => {
  if (isEmpty(files)) {
    throw usageError();
  }
};

const parseArgs = function (cmdLineArgs) {
  const args = seperateArgs(cmdLineArgs);
  const parsedArgs = { options: { 'option': 'lines', 'value': 10 } };

  let index = 0;
  let options = {};
  while (isOption(args[index])) {
    const option = optionName(args[index]);
    const value = +args[index + 1];
    validateOptions(options, { option, value });
    options = { option, value };
    parsedArgs.options = options;
    index += 2;
  }

  parsedArgs.fileNames = args.slice(index);
  validateFiles(parsedArgs.fileNames);
  return parsedArgs;
};

exports.seperateArgs = seperateArgs;
exports.parseArgs = parseArgs;
