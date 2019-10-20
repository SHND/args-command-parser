import LongSwitch from './Args/LongSwitch'
import ShortSwitch from './Args/ShortSwitch'
import Command from './Args/Command'
import { Data, RawData } from './Models'

class ArgCollection {
  private _data: RawData

  constructor() {
    this._data = {
      commands: [],
      longSwitches: {},
      shortSwitches: {},
    }

    this.hasCommand = this.hasCommand.bind(this)
    this.getCommand = this.getCommand.bind(this)
    this.hasShortSwitch = this.hasShortSwitch.bind(this)
    this.getShortSwitch = this.getShortSwitch.bind(this)
    this.hasLongSwitch = this.hasLongSwitch.bind(this)
    this.getLongSwitch = this.getLongSwitch.bind(this)
    this.appendCommand = this.appendCommand.bind(this)
    this.addSwitch = this.addSwitch.bind(this)
    this._addShortSwitch = this._addShortSwitch.bind(this)
    this._addLongSwitch = this._addLongSwitch.bind(this)
  }

  get rawdata(): RawData {
    return this._data
  }

  get data(): Data {
    const commands = this._data.commands.map(command => command.name)
    const shortSwitches: { [key: string]: string[] } = {}
    Object.values(this._data.shortSwitches).forEach(s => {
      shortSwitches[s.name] = s.values
    })
    const longSwitches: { [key: string]: string[] } = {}
    Object.values(this._data.longSwitches).forEach(s => {
      longSwitches[s.name] = s.values
    })
    return { commands, shortSwitches, longSwitches }
  }

  hasCommand(argName: string): boolean {
    return (
      this._data.commands.findIndex(command => command.name === argName) >= 0
    )
  }

  getCommand(argName: string): Command | undefined {
    return this._data.commands.find(command => command.name === argName)
  }

  hasShortSwitch(argName: string): boolean {
    return this._data.shortSwitches[argName] !== undefined
  }

  getShortSwitch(argName: string): ShortSwitch {
    return this._data.shortSwitches[argName]
  }

  hasLongSwitch(argName: string): boolean {
    return this._data.longSwitches[argName] !== undefined
  }

  getLongSwitch(argName: string): LongSwitch {
    return this._data.longSwitches[argName]
  }

  appendCommand(arg: string): void {
    if (ShortSwitch.isShortSwitch(arg) || LongSwitch.isLongSwitch(arg))
      throw Error('arg is not a Command')

    const command = new Command(arg)
    this._data.commands.push(command)
  }

  addSwitch(arg: string, values: string[] = []): void {
    if (ShortSwitch.isShortSwitch(arg)) {
      const switches = ShortSwitch.getAllSwitches(arg)

      for (let i = 0; i < switches.length; i++) {
        const s = switches[i]
        if (i === switches.length - 1) s.values = values

        this._addShortSwitch(s)
      }
    } else if (LongSwitch.isLongSwitch(arg)) {
      const argName = arg.slice(2)

      this._addLongSwitch(argName, values)
    } else {
      throw Error('arg is not ShortSwitch or LongSwitch')
    }
  }

  private _addShortSwitch(shortSwitch: ShortSwitch): void
  private _addShortSwitch(argName: string, argValues?: string[]): void
  private _addShortSwitch(
    switchOrArgName: string | ShortSwitch,
    argValues: string[] = []
  ): void {
    if (switchOrArgName instanceof ShortSwitch) {
      this._data.shortSwitches[switchOrArgName.name] = new ShortSwitch(
        switchOrArgName
      )
    } else if (typeof switchOrArgName === 'string') {
      this._data.shortSwitches[switchOrArgName] = new ShortSwitch(
        switchOrArgName,
        argValues
      )
    }
  }

  private _addLongSwitch(longSwitch: LongSwitch): void
  private _addLongSwitch(argName: string, argValues?: string[]): void
  private _addLongSwitch(
    switchOrArgName: string | LongSwitch,
    argValues: string[] = []
  ): void {
    if (switchOrArgName instanceof LongSwitch) {
      this._data.longSwitches[switchOrArgName.name] = new LongSwitch(
        switchOrArgName
      )
    } else if (typeof switchOrArgName === 'string') {
      this._data.longSwitches[switchOrArgName] = new LongSwitch(
        switchOrArgName,
        argValues
      )
    }
  }
}

export default ArgCollection
