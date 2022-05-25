const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = function () {
  let exitCode = 0;
  try {
    exitCode = headMain(fs.readFileSync, console.log,
      console.error, ...process.argv.slice(2));
  } catch (error) {
    exitCode = 1;
    console.error(error.message);
  }

  process.exit(exitCode);
};

main();
