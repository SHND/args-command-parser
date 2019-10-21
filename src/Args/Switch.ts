import Arg from './Arg'

class Switch extends Arg {
  static isSwitch(arg: string): boolean {
    return arg.startsWith('-') || arg.startsWith('--')
  }

  constructor(argName: string, private argValues: string[] = []) {
    super(argName)

    this.hasValues = this.hasValues.bind(this)
  }

  get values(): string[] {
    return this.argValues
  }

  set values(values: string[]) {
    this.argValues = values || []
  }

  hasValues(): boolean {
    return this.argValues.length > 0
  }
}

export default Switch
