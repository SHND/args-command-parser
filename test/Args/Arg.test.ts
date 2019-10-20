import { expect } from 'chai'
import Arg from '../../src/Args/Arg'

describe('Arg Class', () => {
  it('Create Arg object', () => {
    const arg1 = new Arg('arg1')
    expect(arg1).and.has.property('name', 'arg1')
  })
})
