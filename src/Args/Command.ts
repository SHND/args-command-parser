import Arg from './Arg';

class Command extends Arg {

  static isCommand(arg: string): boolean {
    return !arg.startsWith('-') && !arg.startsWith('--')
  }

  constructor(argName:string) {
    super(argName);
  }

}

export default Command;