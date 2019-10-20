import { expect } from 'chai'
import ShortSwitch from '../../src/Args/ShortSwitch'

describe('ShortSwitch Class', () => {
  it('isShortSwitch for "-a"', () => {
    expect(ShortSwitch.isShortSwitch('-a')).to.be.true
  })

  it('isShortSwitch for "-ab"', () => {
    expect(ShortSwitch.isShortSwitch('-a')).to.be.true
  })

  it('isShortSwitch for "--a"', () => {
    expect(ShortSwitch.isShortSwitch('--a')).to.be.false
  })

  it('isShortSwitch for "--ab"', () => {
    expect(ShortSwitch.isShortSwitch('--ab')).to.be.false
  })

  it('isShortSwitch for "a"', () => {
    expect(ShortSwitch.isShortSwitch('a')).to.be.false
  })

  it('isShortSwitch for "ab"', () => {
    expect(ShortSwitch.isShortSwitch('ab')).to.be.false
  })

  it('getAllSwitches for "-a"', () => {
    const switches = ShortSwitch.getAllSwitches('-a')
    expect(switches)
      .to.be.an('array')
      .that.has.lengthOf(1)

    const switch1 = switches[0]
    expect(switch1)
      .to.be.instanceOf(ShortSwitch)
      .that.has.property('name', 'a')
  })

  it('getAllSwitches for "-ab"', () => {
    const switches = ShortSwitch.getAllSwitches('-ab')
    expect(switches)
      .to.be.an('array')
      .that.has.lengthOf(2)

    const switch1 = switches[0]
    expect(switch1)
      .to.be.instanceOf(ShortSwitch)
      .that.has.property('name', 'a')

    const switch2 = switches[1]
    expect(switch2)
      .to.be.instanceOf(ShortSwitch)
      .that.has.property('name', 'b')
  })

  it('getAllSwitches for "a" throws exception', () => {
    expect(() => {
      ShortSwitch.getAllSwitches('a')
    }).to.throw()
  })

  it('Create ShortSwitch object from string', () => {
    const switch1 = new ShortSwitch('switch1')
    expect(switch1)
      .to.be.instanceOf(ShortSwitch)
      .and.has.property('name', 'switch1')

    const switch2 = new ShortSwitch('switch2', ['value1', 'value2'])
    expect(switch2)
      .to.be.instanceOf(ShortSwitch)
      .and.has.property('name', 'switch2')

    expect(switch2.values).is.lengthOf(2)
    expect(switch2.values[0]).is.equal('value1')
    expect(switch2.values[1]).is.equal('value2')
  })

  it('Create ShortSwitch object from another ShortSwitch', () => {
    const switch1 = new ShortSwitch('switch', ['value1', 'value2'])
    const switch2 = new ShortSwitch(switch1)

    expect(switch2)
      .to.be.instanceOf(ShortSwitch)
      .and.has.property('name', 'switch')

    expect(switch2.values).is.lengthOf(2)
    expect(switch2.values[0]).is.equal('value1')
    expect(switch2.values[1]).is.equal('value2')
  })
})
