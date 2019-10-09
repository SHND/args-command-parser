import Command from './Args/Command'
import ShortSwitch from './Args/ShortSwitch'
import LongSwitch from './Args/LongSwitch'

export interface Data {
  commands: string[]
  longSwitches: { [key: string]: string[] }
  shortSwitches: { [key: string]: string[] }
}

export interface RawData {
  commands: Command[]
  longSwitches: { [key: string]: LongSwitch }
  shortSwitches: { [key: string]: ShortSwitch }
}
