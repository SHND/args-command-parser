import Parser from './Parser'
import ArgCollection from './ArgCollection'

export default function argsCommandParser(
  argv: string[] = process.argv.slice(2)
): ArgCollection {
  return Parser.parse(argv)
}
