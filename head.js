const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = function (args) {
  let exitCode = 0;

  try {
    exitCode = headMain(fs.readFileSync, console.log, console.error, ...args);
  } catch (error) {
    exitCode = 1;
    console.error(error.message);
  }

  process.exitCode = exitCode;
};

main(process.argv.slice(2));
