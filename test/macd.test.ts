import { assert, describe, expect, it } from 'vitest'
import { DefaultsFile } from '../src/types'
import { readConfigFile } from '../src/utils'

describe('defaults.ts', () => {
  it('should read a yaml file', () => {
    const filePath = './examples/defaults.yml'
    const defaults = readConfigFile(filePath)

    const expected: DefaultsFile = { dock: { autohide: true } }

    assert.deepEqual(defaults, expected)
  })

  it('should read a json file', () => {
    const filePath = './examples/defaults.json'
    const defaults = readConfigFile(filePath)
    console.log(defaults)

    const expected: DefaultsFile = { dock: { autohide: true } }

    assert.deepEqual(defaults, expected)
  })

  it('should throw an error when the file is empty', () => {
    const filePath = './examples/defaults.empty.yml'

    expect(() => readConfigFile(filePath)).toThrow(
      /^You cannot use an empty file.$/,
    )
  })

  it('should throw an error when the file could not be found', () => {
    const filePath = './examples/some_file_that_doesnt_exist.yml'

    expect(() => readConfigFile(filePath)).toThrow(/^The file does not exist.$/)
  })
})
