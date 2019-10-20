import { expect } from 'chai'
import LongSwitch from '../../src/Args/LongSwitch'

describe('LongSwitch Class', () => {
  it('isLongSwitch for "-a"', () => {
    expect(LongSwitch.isLongSwitch('-a')).to.be.false
  })

  it('isLongSwitch for "-ab"', () => {
    expect(LongSwitch.isLongSwitch('-a')).to.be.false
  })

  it('isLongSwitch for "--a"', () => {
    expect(LongSwitch.isLongSwitch('--a')).to.be.true
  })

  it('isLongSwitch for "--ab"', () => {
    expect(LongSwitch.isLongSwitch('--ab')).to.be.true
  })

  it('isLongSwitch for "a"', () => {
    expect(LongSwitch.isLongSwitch('a')).to.be.false
  })

  it('isLongSwitch for "ab"', () => {
    expect(LongSwitch.isLongSwitch('ab')).to.be.false
  })

  it('Create LongSwitch object from string', () => {
    const switch1 = new LongSwitch('switch1')
    expect(switch1)
      .to.be.instanceOf(LongSwitch)
      .and.has.property('name', 'switch1')

    const switch2 = new LongSwitch('switch2', ['value1', 'value2'])
    expect(switch2)
      .to.be.instanceOf(LongSwitch)
      .and.has.property('name', 'switch2')

    expect(switch2.values).is.lengthOf(2)
    expect(switch2.values[0]).is.equal('value1')
    expect(switch2.values[1]).is.equal('value2')
  })

  it('Create LongSwitch object from another LongSwitch', () => {
    const switch1 = new LongSwitch('switch', ['value1', 'value2'])
    const switch2 = new LongSwitch(switch1)

    expect(switch2)
      .to.be.instanceOf(LongSwitch)
      .and.has.property('name', 'switch')

    expect(switch2.values).is.lengthOf(2)
    expect(switch2.values[0]).is.equal('value1')
    expect(switch2.values[1]).is.equal('value2')
  })
})
