const isOption = (option) => /^-[a-z]/.test(option);
const isObjectEmpty = object => Object.keys(object).length === 0;

const throwIfIllegal = (option) => {
  if (!['bytes', 'count'].includes(option)) {
    throw { message: 'head: illegal option' };
  }
};

const throwIfNotSame = (oldOption, newOption) => {
  if (oldOption.option !== newOption.option && !isObjectEmpty(oldOption)) {
    throw { message: 'can not combine line and byte counts' };
  }
};

const throwIfInvalidValue = (option) => {
  if (!isFinite(option.value)) {
    throw { message: `head: illegal ${option.option} count` };
  }
};

const validateOption = function (oldOption, newOption) {
  throwIfIllegal(newOption.option);
  throwIfNotSame(oldOption, newOption);
  throwIfInvalidValue(newOption);

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
exports.validateOption = validateOption;
