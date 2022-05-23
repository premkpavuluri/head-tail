const isOption = (option) => option.startsWith('-');
const removeEmpty = (list) => list.filter(item => item.length > 0);

const optionName = function (key) {
  const keys = { '-n': 'lines', '-c': 'bytes' };
  return keys[key];
};

const throwIfIllegal = (option) => {
  if (!['-n', '-c'].includes(option)) {
    throw { message: `head: illegal option -- ${option}` };
  }
};

const throwIfMoreOptions = (option, options) => {
  if (!options.includes(option) && options.length !== 0) {
    throw { message: 'can not combine line and byte counts' };
  }
};

const throwIfInvalidValue = (option, value) => {
  if (!isFinite(value) || +value <= 0) {
    throw { message: `head: illegal ${option} count` };
  }
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

const formatArgs = function (args) {
  const options = args.flatMap(argument => {
    if (isOption(argument)) {
      return getOption(argument);
    }
    return argument;
  });

  return removeEmpty(options);
};

const validateArgs = function (args) {
  const options = [];
  for (let index = 0; isOption(args[index]); index += 2) {
    const option = args[index];
    throwIfIllegal(option);
    throwIfMoreOptions(option, options);
    throwIfInvalidValue(option, args[index + 1]);
    options.push(option);
  }

  return args;
};

const parseArgs = function (args) {
  const formattedArgs = validateArgs(formatArgs(args));
  const parsedArgs = { options: { 'option': 'lines', 'value': 10 } };

  let index = 0;
  while (isOption(formattedArgs[index])) {
    const option = optionName(formattedArgs[index]);
    const value = +formattedArgs[index + 1];
    parsedArgs.options = { option, value };
    index += 2;
  }

  parsedArgs.fileNames = formattedArgs.slice(index);
  return parsedArgs;
};

exports.formatArgs = formatArgs;
exports.validateArgs = validateArgs;
exports.parseArgs = parseArgs;
