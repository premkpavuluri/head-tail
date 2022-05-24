const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = function () {
  try {
    headMain(fs.readFileSync, console.log, console.error,
      ...process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
  }
};

main();
