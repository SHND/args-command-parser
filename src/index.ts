import Parser from './Parser'
import { Data, RawData } from './Models'
import ArgCollection from './ArgCollection'
import Arg from './Args/Arg'
import Command from './Args/Command'
import Switch from './Args/Switch'
import LongSwitch from './Args/LongSwitch'
import ShortSwitch from './Args/ShortSwitch'

export const parser = function argsCommandParser(
  argv: string[] = process.argv.slice(2)
): ArgCollection {
  return Parser.parse(argv)
}

export {
  Data,
  RawData,
  ArgCollection,
  Arg,
  Command,
  Switch,
  LongSwitch,
  ShortSwitch,
}
