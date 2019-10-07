
import Switch from './Args/Switch'
import ArgCollection from './ArgCollection';

class Parser {

  private argCollection: ArgCollection; 

  constructor(private args: string[]) {
    this.argCollection = Parser.parse(this.args);
  }

  static parse(args: string[]): ArgCollection {
    const argCollection = new ArgCollection();
    let index = 0;
    let currentArg = args[index]
    while (currentArg && !Switch.isSwitch(currentArg)) {
      argCollection.appendCommand(currentArg);
      currentArg = args[++index];
    }

    while (currentArg) {
      let nextArg = args[index+1];

      if (nextArg) {
        if (Switch.isSwitch(nextArg)) {
          argCollection.addSwitch(currentArg);
          currentArg = args[++index]
        } else {
          const values = [];
          index++;
          while (nextArg && !Switch.isSwitch(nextArg)) {
            values.push(nextArg);
            nextArg = args[++index];
          }
          argCollection.addSwitch(currentArg, values);
          currentArg = nextArg;
        }
      } else {
        argCollection.addSwitch(currentArg);
        currentArg = args[++index];
      }
    }

    return argCollection;
  }

}

export default Parser;