## COMMANDS:


### NAME: HEAD

### Usage: `head [-n lines | -c bytes] [file ...]`

### Description:
```
head file
  head utility will display first lines of given file. deafult line count is 10

head -n lines file
  Gives first specified number of lines from file

head -c bytes file
  Specified number of bytes from file

head [options] file...
  Gives each file content based on options and 
  each file preceded by a header `==>filename<==`
```

### NAME: TAIL

### Usage: `tail  [-r] [-q] [-c # | -n #] [file ...]`

### Description:
```
tail file
  tail utility will display last lines of given file.
  default line count is 10.

tail -n lines file
  Displays the specified number of lines from the last of the file.

tail -c bytes file
  Displays the specified number of bytes from the last of the file.

tail -r file
  Displays the content in reverse order, by line.
  By default it all the input.

tail -q file...
  Supresses the headers when multiples are given

tail options file...
  Display the content from the last of each file.
```