import Parser from './Parser'
import ArgCollection from './ArgCollection'

const argv = process.argv.slice(2)

function Application(argv: string[]): ArgCollection {
  const argCollection = Parser.parse(argv)

  return argCollection
}

Application(argv)

export default Application
