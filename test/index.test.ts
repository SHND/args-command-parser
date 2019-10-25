import { expect } from 'chai'
import { parser } from '../src/index'

describe('Parser Class and index', () => {
  /* ===================================
                  Empty
  =================================== */

  it('parser "[]"', () => {
    const args: string[] = []
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: {},
      longSwitches: {},
    })
  })

  /* ===================================
              Only Commands
  =================================== */

  it('parser "[cmd1]"', () => {
    const args: string[] = ['cmd1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {},
      longSwitches: {},
    })
  })

  it('parser "[cmd1, cmd2]"', () => {
    const args: string[] = ['cmd1', 'cmd2']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {},
      longSwitches: {},
    })
  })

  /* ===================================
            Only Short Switches
  =================================== */

  it('parser "[-a]"', () => {
    const args: string[] = ['-a']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: { a: [] },
      longSwitches: {},
    })
  })

  it('parser "[-a, v1]"', () => {
    const args: string[] = ['-a', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: { a: ['v1'] },
      longSwitches: {},
    })
  })

  it('parser "[-a, v1, v2]"', () => {
    const args: string[] = ['-a', 'v1', 'v2']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: { a: ['v1', 'v2'] },
      longSwitches: {},
    })
  })

  it('parser "[-a, -b]"', () => {
    const args: string[] = ['-a', '-b']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: { a: [], b: [] },
      longSwitches: {},
    })
  })

  it('parser "[-a, v1, v2, -b]"', () => {
    const args: string[] = ['-a', 'v1', 'v2', '-b']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: { a: ['v1', 'v2'], b: [] },
      longSwitches: {},
    })
  })

  it('parser "[-a, v1, v2, -b, v1]"', () => {
    const args: string[] = ['-a', 'v1', 'v2', '-b', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: {
        a: ['v1', 'v2'],
        b: ['v1'],
      },
      longSwitches: {},
    })
  })

  /* ===================================
            Only Long Switches
  =================================== */

  it('parser "[--long]"', () => {
    const args: string[] = ['--long']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: {},
      longSwitches: { long: [] },
    })
  })

  it('parser "[--long, v1]"', () => {
    const args: string[] = ['--long', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: {},
      longSwitches: { long: ['v1'] },
    })
  })

  it('parser "[--long, v1, v2]"', () => {
    const args: string[] = ['--long', 'v1', 'v2']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: {},
      longSwitches: { long: ['v1', 'v2'] },
    })
  })

  it('parser "[--long, v1, v2, --longer]"', () => {
    const args: string[] = ['--long', 'v1', 'v2', '--longer']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: {},
      longSwitches: { long: ['v1', 'v2'], longer: [] },
    })
  })

  it('parser "[--long, v1, v2, --longer, v1]"', () => {
    const args: string[] = ['--long', 'v1', 'v2', '--longer', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: {},
      longSwitches: { long: ['v1', 'v2'], longer: ['v1'] },
    })
  })

  /* ===================================
      Mix of Short and Long Switches
  =================================== */

  it('parser "[-a, v1, v2, --longer]"', () => {
    const args: string[] = ['-a', 'v1', 'v2', '--longer']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: { a: ['v1', 'v2'] },
      longSwitches: { longer: [] },
    })
  })

  it('parser "[-a, v1, v2, --longer, v1]"', () => {
    const args: string[] = ['-a', 'v1', 'v2', '--longer', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: {
        a: ['v1', 'v2'],
      },
      longSwitches: { longer: ['v1'] },
    })
  })

  it('parser "[--long, v1, v2, -b]"', () => {
    const args: string[] = ['--long', 'v1', 'v2', '-b']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: { b: [] },
      longSwitches: { long: ['v1', 'v2'] },
    })
  })

  it('parser "[--long, v1, v2, -b, v1]"', () => {
    const args: string[] = ['--long', 'v1', 'v2', '-b', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: [],
      shortSwitches: {
        b: ['v1'],
      },
      longSwitches: { long: ['v1', 'v2'] },
    })
  })

  /* ===================================
  Mix of Command Short and Long Switches
  =================================== */

  it('parser "[cmd1, -a]"', () => {
    const args: string[] = ['cmd1', '-a']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: { a: [] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, -a, v1]"', () => {
    const args: string[] = ['cmd1', '-a', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: { a: ['v1'] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, -a, v1, v2]"', () => {
    const args: string[] = ['cmd1', '-a', 'v1', 'v2']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: { a: ['v1', 'v2'] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, -a, v1, v2, -b]"', () => {
    const args: string[] = ['cmd1', '-a', 'v1', 'v2', '-b']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: { a: ['v1', 'v2'], b: [] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, -a, v1, v2, -b, v1]"', () => {
    const args: string[] = ['cmd1', '-a', 'v1', 'v2', '-b', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {
        a: ['v1', 'v2'],
        b: ['v1'],
      },
      longSwitches: {},
    })
  })

  // -----------------

  it('parser "[cmd1, cmd2, -a]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '-a']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: { a: [] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, cmd2, -a, v1]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '-a', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: { a: ['v1'] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, cmd2, -a, v1, v2]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '-a', 'v1', 'v2']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: { a: ['v1', 'v2'] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, cmd2, -a, v1, v2, -b]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '-a', 'v1', 'v2', '-b']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: { a: ['v1', 'v2'], b: [] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, cmd2, -a, v1, v2, -b, v1]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '-a', 'v1', 'v2', '-b', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {
        a: ['v1', 'v2'],
        b: ['v1'],
      },
      longSwitches: {},
    })
  })

  // -----------------

  it('parser "[cmd1, -a]"', () => {
    const args: string[] = ['cmd1', '-a']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: { a: [] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, -a, v1]"', () => {
    const args: string[] = ['cmd1', '-a', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: { a: ['v1'] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, -a, v1, v2]"', () => {
    const args: string[] = ['cmd1', '-a', 'v1', 'v2']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: { a: ['v1', 'v2'] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, -a, v1, v2, --longer]"', () => {
    const args: string[] = ['cmd1', '-a', 'v1', 'v2', '--longer']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: { a: ['v1', 'v2'] },
      longSwitches: { longer: [] },
    })
  })

  it('parser "[cmd1, -a, v1, v2, --longer, v1]"', () => {
    const args: string[] = ['cmd1', '-a', 'v1', 'v2', '--longer', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {
        a: ['v1', 'v2'],
      },
      longSwitches: { longer: ['v1'] },
    })
  })

  //-----------------

  it('parser "[cmd1, --long]"', () => {
    const args: string[] = ['cmd1', '--long']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {},
      longSwitches: { long: [] },
    })
  })

  it('parser "[cmd1, --long, v1]"', () => {
    const args: string[] = ['cmd1', '--long', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {},
      longSwitches: { long: ['v1'] },
    })
  })

  it('parser "[cmd1, --long, v1, v2]"', () => {
    const args: string[] = ['cmd1', '--long', 'v1', 'v2']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {},
      longSwitches: { long: ['v1', 'v2'] },
    })
  })

  it('parser "[cmd1, --long, v1, v2, -b]"', () => {
    const args: string[] = ['cmd1', '--long', 'v1', 'v2', '-b']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: { b: [] },
      longSwitches: { long: ['v1', 'v2'] },
    })
  })

  it('parser "[cmd1, --long, v1, v2, -b, v1]"', () => {
    const args: string[] = ['cmd1', '--long', 'v1', 'v2', '-b', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {
        b: ['v1'],
      },
      longSwitches: { long: ['v1', 'v2'] },
    })
  })

  //---------------

  it('parser "[cmd1, cmd2, -a]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '-a']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: { a: [] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, cmd2, -a, v1]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '-a', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: { a: ['v1'] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, cmd2, -a, v1, v2]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '-a', 'v1', 'v2']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: { a: ['v1', 'v2'] },
      longSwitches: {},
    })
  })

  it('parser "[cmd1, cmd2, -a, v1, v2, --longer]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '-a', 'v1', 'v2', '--longer']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: { a: ['v1', 'v2'] },
      longSwitches: { longer: [] },
    })
  })

  it('parser "[cmd1, cmd2, -a, v1, v2, --longer, v1]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '-a', 'v1', 'v2', '--longer', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {
        a: ['v1', 'v2'],
      },
      longSwitches: { longer: ['v1'] },
    })
  })

  //-----------------

  it('parser "[cmd1, cmd2, --long]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '--long']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {},
      longSwitches: { long: [] },
    })
  })

  it('parser "[cmd1, cmd2, --long, v1]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '--long', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {},
      longSwitches: { long: ['v1'] },
    })
  })

  it('parser "[cmd1, cmd2, --long, v1, v2]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '--long', 'v1', 'v2']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {},
      longSwitches: { long: ['v1', 'v2'] },
    })
  })

  it('parser "[cmd1, cmd2, --long, v1, v2, -b]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '--long', 'v1', 'v2', '-b']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: { b: [] },
      longSwitches: { long: ['v1', 'v2'] },
    })
  })

  it('parser "[cmd1, cmd2, --long, v1, v2, -b, v1]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '--long', 'v1', 'v2', '-b', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {
        b: ['v1'],
      },
      longSwitches: { long: ['v1', 'v2'] },
    })
  })

  // ----------------

  it('parser "[cmd1, --long]"', () => {
    const args: string[] = ['cmd1', '--long']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {},
      longSwitches: { long: [] },
    })
  })

  it('parser "[cmd1, --long, v1]"', () => {
    const args: string[] = ['cmd1', '--long', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {},
      longSwitches: { long: ['v1'] },
    })
  })

  it('parser "[cmd1, --long, v1, v2]"', () => {
    const args: string[] = ['cmd1', '--long', 'v1', 'v2']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {},
      longSwitches: { long: ['v1', 'v2'] },
    })
  })

  it('parser "[cmd1, --long, v1, v2, --longer]"', () => {
    const args: string[] = ['cmd1', '--long', 'v1', 'v2', '--longer']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {},
      longSwitches: { long: ['v1', 'v2'], longer: [] },
    })
  })

  it('parser "[cmd1, --long, v1, v2, --longer, v1]"', () => {
    const args: string[] = ['cmd1', '--long', 'v1', 'v2', '--longer', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1'],
      shortSwitches: {},
      longSwitches: { long: ['v1', 'v2'], longer: ['v1'] },
    })
  })

  // -------------------

  it('parser "[cmd1, cmd2, --long]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '--long']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {},
      longSwitches: { long: [] },
    })
  })

  it('parser "[cmd1, cmd2, --long, v1]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '--long', 'v1']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {},
      longSwitches: { long: ['v1'] },
    })
  })

  it('parser "[cmd1, cmd2, --long, v1, v2]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '--long', 'v1', 'v2']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {},
      longSwitches: { long: ['v1', 'v2'] },
    })
  })

  it('parser "[cmd1, cmd2, --long, v1, v2, --longer]"', () => {
    const args: string[] = ['cmd1', 'cmd2', '--long', 'v1', 'v2', '--longer']
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {},
      longSwitches: { long: ['v1', 'v2'], longer: [] },
    })
  })

  it('parser "[cmd1, cmd2, --long, v1, v2, --longer, v1]"', () => {
    const args: string[] = [
      'cmd1',
      'cmd2',
      '--long',
      'v1',
      'v2',
      '--longer',
      'v1',
    ]
    const argCollection1 = parser(args)

    expect(argCollection1.data).is.eql({
      commands: ['cmd1', 'cmd2'],
      shortSwitches: {},
      longSwitches: { long: ['v1', 'v2'], longer: ['v1'] },
    })
  })
})
