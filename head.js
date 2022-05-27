const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = function (args) {
  let exitCode = 0;
  const { log, error: eLog } = console;

  try {
    exitCode = headMain(fs.readFileSync, { log, eLog }, ...args);
  } catch (error) {
    exitCode = 1;
    eLog(error.message);
  }

  process.exitCode = exitCode;
};

main(process.argv.slice(2));
