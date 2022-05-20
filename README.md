`head [-n lines | -c bytes] [file ...]`

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