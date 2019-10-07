import Switch from './Switch';

class LongSwitch extends Switch {

  static isLongSwitch(arg: string): boolean {
    return arg.startsWith('--') && arg.length > 2;
  }

  constructor(longSwitch: LongSwitch)
  constructor(argName: string, argValues?: string[])
  constructor(switchOrArgName: string | LongSwitch, argValues: string[] = []) {
    if (switchOrArgName instanceof LongSwitch) {
      super(switchOrArgName.name, switchOrArgName.values);
    } else if (typeof (switchOrArgName) === 'string') {
      super(switchOrArgName, argValues);
    }
  }

}

export default LongSwitch;