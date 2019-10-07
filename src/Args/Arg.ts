class Arg {

  constructor(private argName: string) {}

  get name(): string {
    return this.argName;
  }

}

export default Arg;