# args-command-parser

Nodejs opinionated command-line argument parser.

[![Build Status](https://travis-ci.org/SHND/args-command-parser.svg?branch=master)](https://travis-ci.org/SHND/args-command-parser)

## Installation

```bash
npm install args-command-parser
```

## Usage

Lets say we created JavaScript version of git and execute it like below:

```bash
node git.js commit -m "some message" --amend -abc value --between 1 10
```

And we have the **JavaScript** code below:

```js
const argv = require('args-command-parser').parser().data
```

Or **TypeScript** code below:

```js
import { parser } from 'args-command-parser'

const argv = parser().data
```

The value of the `argv` after the running the code above will be:

```
{
  commands: [ 'commit' ],
  shortSwitches: { m: [ 'some message' ], a: [], b: [], c: [ 'value' ] },
  longSwitches: { amend: [], between: [ '1', '10' ] }
}
```

args-command-parser by default parse `process.argv.slice(2)` but you can pass any array of strings to it.

## More Details

**args-command-parser** is an opinionated command-line parser. The idea is that the commands are in the format below:

```
node <file.js> [command1 [command2 [...]]] [switches]
```

### Command

Commands are the first arguments showing up. These are names without `-` or `--`. As soon as a switch is seen, the sequence of commands is considered finished.

### Switch

Switches can be in short or long format.

#### Short Switch

Short Switches are prefixed with `-` followed by one or more single-character switch. If more than one character is specified, each character is considered a Short Switch. Short Switches can be followed by zero to any number of values.

#### Long Switch

Long Switches are prefixed with `--` followed by the switch name. Long Switches can be followed by zero to any number of values.

## License

[MIT](https://choosealicense.com/licenses/mit/)
