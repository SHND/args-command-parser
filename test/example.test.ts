import { expect } from 'chai'
import ShortSwitch from '../src/Args/ShortSwitch'

describe('example tests', () => {
  it('true is true', () => {
    let x = ShortSwitch.isShortSwitch('-a')

    expect(x).to.be.true
  })
})

// describe('example tests', () => {
//   it('true is true', () => {
//     expect(true).to.be.true
//   })
// })
