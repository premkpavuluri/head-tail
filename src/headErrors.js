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

const usageError = () => {
  return {
    message: 'usage: head [-n lines | -c bytes] [file ...]'
  };
};

exports.usageError = usageError;
exports.illegalValueError = illegalValueError;
exports.canntotCombineError = canntotCombineError;
exports.illegalOptionError = illegalOptionError;