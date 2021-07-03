import * as argsCommandParser from './bundle.js';

export function parser(
  argv = Deno.args
) {
  return argsCommandParser.parser(argv)
}

export const Arg = argsCommandParser.Arg;
export const ArgCollection = argsCommandParser.ArgCollection;
export const Command = argsCommandParser.Command;
export const LongSwitch = argsCommandParser.LongSwitch;
export const ShortSwitch = argsCommandParser.ShortSwitch;
export const Switch = argsCommandParser.Switch;
