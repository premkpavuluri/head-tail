const fs = require('fs');
const { tailMain } = require('./src/tailLib.js');

const main = function () {
  try {
    console.log(tailMain(fs.readFileSync, process.argv[2]));
  } catch (error) {
    console.error(error.message);
    console.log('usage: tail [-c # | -n #] [file ...]');
  }
};

main();
