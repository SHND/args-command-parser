import Switch from './Switch'

class ShortSwitch extends Switch {
  static isShortSwitch(arg: string): boolean {
    return arg.startsWith('-') && !arg.startsWith('--') && arg.length > 1
  }

  // static isMultiple(arg: string): boolean {
  //   if (!ShortSwitch.isShortSwitch(arg))
  //     throw Error('Expecting arg to be a Short Switch string');

  //   return arg.length > 2;
  // }

  static getAllSwitches(arg: string): ShortSwitch[] {
    if (!ShortSwitch.isShortSwitch(arg))
      throw Error('Expecting arg to be a Short Switch string')

    const output = []
    const switches = arg.slice(1).split('')
    for (const s of switches) {
      output.push(new ShortSwitch(s))
    }

    return output
  }

  constructor(shortSwitch: ShortSwitch)
  constructor(argName: string, argValues?: string[])
  constructor(switchOrArgName: string | ShortSwitch, argValues: string[] = []) {
    if (switchOrArgName instanceof ShortSwitch) {
      super(switchOrArgName.name, switchOrArgName.values)
    } else if (typeof switchOrArgName === 'string') {
      super(switchOrArgName, argValues)
    }
  }
}

export default ShortSwitch
