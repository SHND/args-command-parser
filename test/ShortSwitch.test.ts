import { expect } from 'chai'
import ShortSwitch from '../src/Args/ShortSwitch'

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
})
