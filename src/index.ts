import Parser from './Parser';
import ArgCollection from './ArgCollection';

const argv = process.argv.slice(2);

function Application(argv: string[]): ArgCollection {
  const argCollection = Parser.parse(argv);
  console.log(argCollection.data)
  console.log(argCollection.rawdata)
  return argCollection;
}

Application(argv);


export default Application;