import { expect } from 'chai'
import ArgCollection from '../src/ArgCollection'
import ShortSwitch from '../src/Args/ShortSwitch'
import LongSwitch from '../src/Args/LongSwitch'
import Command from '../src/Args/Command'

describe('ArgCollection Class', () => {
  it('Create ArgCollection', () => {
    const argCollection1 = new ArgCollection()
    expect(argCollection1)
      .to.has.ownProperty('_data')
      .which.is.an('object')

    const _data = argCollection1['_data']
    expect(_data)
      .to.has.property('commands')
      .which.is.an('array').and.is.empty
    expect(_data)
      .to.has.property('longSwitches')
      .which.is.an('object').and.is.empty
    expect(_data)
      .to.has.property('shortSwitches')
      .which.is.an('object').and.is.empty
  })

  it('_addShortSwitch for string for "a"', () => {
    const argCollection1 = new ArgCollection()
    const addShortSwitch = argCollection1['_addShortSwitch']

    addShortSwitch('a')
    expect(argCollection1['_data'].shortSwitches)
      .has.property('a')
      .which.is.instanceOf(ShortSwitch)

    const aProperty = argCollection1['_data']['shortSwitches']['a']
    expect(aProperty)
      .has.property('argName')
      .which.is.equal('a')

    expect(aProperty)
      .has.property('argValues')
      .which.is.an('array').and.is.empty
  })

  it('_addLongSwitch for string for "ab"', () => {
    const argCollection1 = new ArgCollection()
    const addLongSwitch = argCollection1['_addLongSwitch']

    addLongSwitch('ab')
    expect(argCollection1['_data'].longSwitches)
      .has.property('ab')
      .which.is.instanceOf(LongSwitch)

    const aProperty = argCollection1['_data']['longSwitches']['ab']
    expect(aProperty)
      .has.property('argName')
      .which.is.equal('ab')

    expect(aProperty)
      .has.property('argValues')
      .which.is.an('array').and.is.empty
  })

  it('addSwitch for string for "-a"', () => {
    const argCollection1 = new ArgCollection()

    argCollection1.addSwitch('-a')
    expect(argCollection1['_data'].shortSwitches)
      .has.property('a')
      .which.is.instanceOf(ShortSwitch)

    const aProperty = argCollection1['_data']['shortSwitches']['a']
    expect(aProperty)
      .has.property('argName')
      .which.is.equal('a')

    expect(aProperty)
      .has.property('argValues')
      .which.is.an('array').and.is.empty
  })

  it('addSwitch for string for "-a" and values "[v1,v2]"', () => {
    const argCollection1 = new ArgCollection()

    argCollection1.addSwitch('-a', ['v1', 'v2'])
    expect(argCollection1['_data'].shortSwitches)
      .has.property('a')
      .which.is.instanceOf(ShortSwitch)

    const aProperty = argCollection1['_data']['shortSwitches']['a']
    expect(aProperty)
      .has.property('argName')
      .which.is.equal('a')

    expect(aProperty)
      .has.property('argValues')
      .which.is.an('array')
      .and.is.eql(['v1', 'v2'])
  })

  it('addSwitch for string for "-abc" and values "[v1,v2]"', () => {
    const argCollection1 = new ArgCollection()

    argCollection1.addSwitch('-abc', ['v1', 'v2'])
    expect(argCollection1['_data'].shortSwitches)
      .has.property('a')
      .which.is.instanceOf(ShortSwitch)
    expect(argCollection1['_data'].shortSwitches)
      .has.property('b')
      .which.is.instanceOf(ShortSwitch)
    expect(argCollection1['_data'].shortSwitches)
      .has.property('c')
      .which.is.instanceOf(ShortSwitch)

    const aProperty = argCollection1['_data']['shortSwitches']['a']
    expect(aProperty)
      .has.property('argName')
      .which.is.equal('a')

    expect(aProperty)
      .has.property('argValues')
      .which.is.an('array').and.is.empty

    const bProperty = argCollection1['_data']['shortSwitches']['b']
    expect(bProperty)
      .has.property('argName')
      .which.is.equal('b')

    expect(bProperty)
      .has.property('argValues')
      .which.is.an('array').and.is.empty

    const cProperty = argCollection1['_data']['shortSwitches']['c']
    expect(cProperty)
      .has.property('argName')
      .which.is.equal('c')

    expect(cProperty)
      .has.property('argValues')
      .which.is.an('array')
      .and.is.eql(['v1', 'v2'])
  })

  it('addSwitch for string for "--long"', () => {
    const argCollection1 = new ArgCollection()

    argCollection1.addSwitch('--long')
    expect(argCollection1['_data'].longSwitches)
      .has.property('long')
      .which.is.instanceOf(LongSwitch)

    const longProperty = argCollection1['_data']['longSwitches']['long']
    expect(longProperty)
      .has.property('argName')
      .which.is.equal('long')

    expect(longProperty)
      .has.property('argValues')
      .which.is.an('array').and.is.empty
  })

  it('addSwitch for string for "--long" and values "[v1,v2]"', () => {
    const argCollection1 = new ArgCollection()

    argCollection1.addSwitch('--long', ['v1', 'v2'])
    expect(argCollection1['_data'].longSwitches)
      .has.property('long')
      .which.is.instanceOf(LongSwitch)

    const longProperty = argCollection1['_data']['longSwitches']['long']
    expect(longProperty)
      .has.property('argName')
      .which.is.equal('long')

    expect(longProperty)
      .has.property('argValues')
      .which.is.an('array')
      .and.is.eql(['v1', 'v2'])
  })

  it('hasShortSwitch', () => {
    const argCollection1 = new ArgCollection()
    argCollection1.addSwitch('-a')

    expect(argCollection1.hasShortSwitch('a')).to.be.true
    expect(argCollection1.hasShortSwitch('b')).to.be.false
  })

  it('hasLongSwitch', () => {
    const argCollection1 = new ArgCollection()
    argCollection1.addSwitch('--long')

    expect(argCollection1.hasLongSwitch('long')).to.be.true
    expect(argCollection1.hasLongSwitch('longer')).to.be.false
  })

  it('getShortSwitch', () => {
    const argCollection1 = new ArgCollection()
    argCollection1.addSwitch('-a', ['v1', 'v2'])

    const aSwitch = argCollection1.getShortSwitch('a')
    expect(aSwitch)
      .to.be.instanceOf(ShortSwitch)
      .has.property('name', 'a')

    expect(aSwitch)
      .to.be.instanceOf(ShortSwitch)
      .has.property('values')
      .is.eql(['v1', 'v2'])

    const bSwitch = argCollection1.getShortSwitch('b')
    expect(bSwitch).is.undefined
  })

  it('getLongSwitch', () => {
    const argCollection1 = new ArgCollection()
    argCollection1.addSwitch('--long', ['v1', 'v2'])

    const longSwitch = argCollection1.getLongSwitch('long')
    expect(longSwitch)
      .to.be.instanceOf(LongSwitch)
      .has.property('name', 'long')

    expect(longSwitch)
      .to.be.instanceOf(LongSwitch)
      .has.property('values')
      .is.eql(['v1', 'v2'])

    const longerSwitch = argCollection1.getLongSwitch('longer')
    expect(longerSwitch).is.undefined
  })

  it('appendCommand', () => {
    const argCollection1 = new ArgCollection()
    argCollection1.appendCommand('cmd1')
    argCollection1.appendCommand('cmd2')

    expect(argCollection1['_data']['commands'])
      .is.an('array')
      .has.lengthOf(2)

    const cmdCommand1 = argCollection1['_data']['commands'][0]
    const cmdCommand2 = argCollection1['_data']['commands'][1]
    expect(cmdCommand1)
      .has.property('name')
      .which.is.equal('cmd1')
    expect(cmdCommand2)
      .has.property('name')
      .which.is.equal('cmd2')
  })

  it('appendCommand with switch input', () => {
    const argCollection1 = new ArgCollection()

    expect(() => {
      argCollection1.appendCommand('-a')
    }).throws()

    expect(() => {
      argCollection1.appendCommand('--long')
    }).throws()
  })

  it('hasCommand', () => {
    const argCollection1 = new ArgCollection()
    argCollection1.appendCommand('cmd1')

    expect(argCollection1.hasCommand('cmd1')).to.be.true
    expect(argCollection1.hasCommand('cmd2')).to.be.false
  })

  it('getCommand', () => {
    const argCollection1 = new ArgCollection()
    argCollection1.appendCommand('cmd1')

    const cmdCommand1 = argCollection1.getCommand('cmd1')
    expect(cmdCommand1)
      .is.instanceOf(Command)
      .has.property('name', 'cmd1')

    const cmdCommand2 = argCollection1.getCommand('cmd2')
    expect(cmdCommand2).is.undefined
  })

  it('rawData', () => {
    const argCollection1 = new ArgCollection()
    argCollection1.appendCommand('cmd1')
    argCollection1.addSwitch('-a', ['v1', 'v2'])
    argCollection1.addSwitch('-b')
    argCollection1.addSwitch('--long', ['v1', 'v2'])
    argCollection1.addSwitch('--longer')

    const rawData = argCollection1.rawdata

    expect(rawData).has.property('commands')
    expect(rawData).has.property('shortSwitches')
    expect(rawData).has.property('longSwitches')

    const commands = rawData.commands
    const shortSwitches = rawData.shortSwitches
    const longSwitches = rawData.longSwitches

    expect(commands).has.lengthOf(1)
    expect(Object.keys(shortSwitches)).has.lengthOf(2)
    expect(Object.keys(longSwitches)).has.lengthOf(2)

    expect(commands[0])
      .is.instanceof(Command)
      .has.property('name', 'cmd1')

    expect(shortSwitches['a'])
      .is.instanceof(ShortSwitch)
      .and.is.eqls({ argName: 'a', argValues: ['v1', 'v2'] })

    expect(shortSwitches['b'])
      .is.instanceof(ShortSwitch)
      .and.is.eqls({ argName: 'b', argValues: [] })

    expect(longSwitches['long'])
      .is.instanceof(LongSwitch)
      .and.is.eqls({ argName: 'long', argValues: ['v1', 'v2'] })

    expect(longSwitches['longer'])
      .is.instanceof(LongSwitch)
      .and.is.eqls({ argName: 'longer', argValues: [] })
  })

  it('data', () => {
    const argCollection1 = new ArgCollection()
    argCollection1.appendCommand('cmd1')
    argCollection1.addSwitch('-a', ['v1', 'v2'])
    argCollection1.addSwitch('-b')
    argCollection1.addSwitch('--long', ['v1', 'v2'])
    argCollection1.addSwitch('--longer')

    const data = argCollection1.data

    expect(data).eql({
      commands: ['cmd1'],
      shortSwitches: { a: ['v1', 'v2'], b: [] },
      longSwitches: { long: ['v1', 'v2'], longer: [] },
    })
  })
})
