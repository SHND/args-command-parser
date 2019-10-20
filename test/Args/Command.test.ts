import { expect } from 'chai'
import Command from '../../src/Args/Command'

describe('Command Class', () => {
  it('isCommand for "-a"', () => {
    expect(Command.isCommand('-a')).to.be.false
  })

  it('isCommand for "-ab"', () => {
    expect(Command.isCommand('-a')).to.be.false
  })

  it('isCommand for "--a"', () => {
    expect(Command.isCommand('--a')).to.be.false
  })

  it('isCommand for "--ab"', () => {
    expect(Command.isCommand('--ab')).to.be.false
  })

  it('isCommand for "a"', () => {
    expect(Command.isCommand('a')).to.be.true
  })

  it('isCommand for "ab"', () => {
    expect(Command.isCommand('ab')).to.be.true
  })

  it('Create Command object from string', () => {
    const command1 = new Command('command1')
    expect(command1)
      .to.be.instanceOf(Command)
      .and.has.property('name', 'command1')
  })
})
