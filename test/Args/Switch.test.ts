import { expect } from 'chai'
import Switch from '../../src/Args/Switch'

describe('Switch Class', () => {
  it('isSwitch for "-a"', () => {
    expect(Switch.isSwitch('-a')).to.be.true
  })

  it('isSwitch for "-ab"', () => {
    expect(Switch.isSwitch('-a')).to.be.true
  })

  it('isSwitch for "--a"', () => {
    expect(Switch.isSwitch('--a')).to.be.true
  })

  it('isSwitch for "--ab"', () => {
    expect(Switch.isSwitch('--ab')).to.be.true
  })

  it('isSwitch for "a"', () => {
    expect(Switch.isSwitch('a')).to.be.false
  })

  it('isSwitch for "ab"', () => {
    expect(Switch.isSwitch('ab')).to.be.false
  })

  it('Create Switch object from string', () => {
    const switch1 = new Switch('switch1')
    expect(switch1)
      .to.be.instanceOf(Switch)
      .and.has.property('name', 'switch1')

    const switch2 = new Switch('switch2', ['value1', 'value2'])
    expect(switch2)
      .to.be.instanceOf(Switch)
      .and.has.property('name', 'switch2')

    expect(switch2.values).is.lengthOf(2)
    expect(switch2.values[0]).is.equal('value1')
    expect(switch2.values[1]).is.equal('value2')
  })

  it('set values', () => {
    const switch1 = new Switch('switch1')
    switch1.values = ['v1', 'v2', 'v3']

    expect(switch1.values).is.lengthOf(3)
    expect(switch1.values[0]).is.equal('v1')
    expect(switch1.values[1]).is.equal('v2')
    expect(switch1.values[2]).is.equal('v3')
  })

  it('hasValues', () => {
    const switch1 = new Switch('switch1')
    const switch2 = new Switch('switch2', ['value1', 'value2'])

    expect(switch1.hasValues()).to.be.false
    expect(switch2.hasValues()).to.be.true
  })
})
