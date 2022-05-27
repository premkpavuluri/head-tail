# TAIL

- **TODO:**
  - [ ] Make tail work for `content` instead of `files`
  - [ ] Make tail work for -n option
  - [ ] Make tail work for -c option
  - [ ] splitLines to splitToLines
  - [ ] Make tail work without options
  - [ ] Implement tailMain
  - [ ] Implement parser for tail
  - [ ] Use parseArguments for tail with tail errorFunctions

- **MAY BE:**
  - [ ] Investigate how `tail` works


- **DONE:**
  - [x] Extract errorFunctions from parseArguments
  - [x] Connect tailMain with tail.js
  - [x] Make tail work for single option
  - [x] Implement lastNCharacters
  - [x] Implement reverseContent
  - [x] Test `lastNLines`
  - [x] Create `tailLib.js` and `testTailLib.js`
  - [x] Make tail work for `single line`
  - [x] Extract lastNLines from tail
  - [x] `tail` dir structure
  - [x] Get the contract of tail

----

# HEAD

- **TODO**
  - [ ] Refactor `headMain`
    - [x] Extract try-catch block.
    - [x] Seperate the `head` and `display` responsibility in try-catch

<br/>

- **MAY BE:**

- **DONE:**
  - [x] Test `validateOptions` in parseArguments
  - [x] Implement parser for non-space options `-n1,-c1,-1`
  - [x] ~~Extract parseOptions from parseArgs~~
  - [x] change option name `count` to `lines`
  - [x] check if option value is 0 or not.
  - [x] Implement parser
    1. Structure the data
    2. Parse the data
    3. Validate the parsed data
  - [x] ~~Validate args before parsing~~
    - [x] arrange the options
    - [x] validate options(like:both present,invalid,invalid value )
  - [x] Implement for multiple files `head options file...`
    - [x] Implement formatter for multiple files
  - [x] handle --help
  - [x] Test `validateOptions` function
  - [x] Refactor `parseArgs`
  - [x] Implement head for `--help`
  - [x] Implement try catch in `head.js`
  - [x] Implement parser for user input
    - [x] single file
    - [x] single option
    - [x] multiple options(same option multiple times, Invalid)
    - [x] multiple files
  - [x] file validation in headMain
  - [x] Change the contract of `head` function
  - [x] Change return structure of parser
  - [x] Take the input from command line
  - [x] Implement `headMain`
  - [x] Implement `head file`
  - [x] Link `parseArgs` and `head`
  - [x] Seperate test files
  - [x] ~~Move lines functionality into another file~~
  - [x] Refactor `head`
  - [x] Make `head` works for content instead of files
  - [x] Make `head` to take options
  - [x] Make `head` work for -c option
  - [x] Consider getLines takes content and count and give back specified lines.
  - [x] Consider options structure for `head`
  - [x] Change the inputs order of `head`
  - [x] Make `head` work for count option (-n)
  - [x] Refactor `getLines`
  - [x] Make `head` work without any options
  - [x] Extract `split`, `join` into new functions and into new file
  - [x] Make `head` to take content
  - [x] Test `getLines` function
  - [x] Refactor `head` function
  - [x] Extract `lines` functionality from `head`
  - [x] Implement `head` which gives 10 lines if content is more than 10 lines
  - [x] Consider data structure of content in `head` function
  - [x] Make test works for multi-line content
  - [x] Make test that works for `single line`
  - [x] Create headLib.js
  - [x] Verify mocha
  - [x] src/ test/ directory structure
