import { describe, expect, it } from 'vitest'
import { readConfigFile } from '../src/utils'

describe('defaults.ts', () => {
  it('should read a config file', () => {
    const filePath = './examples/defaults.yml'
    const defaults = readConfigFile(filePath)

    const expected = { dock: { autohide: true } }

    expect(defaults).toMatchObject(expected)
  })

  it('should throw an error when the file is empty', () => {
    const filePath = './examples/defaults.empty.yml'
    const defaults = readConfigFile(filePath)

    expect(defaults).toThrowError
  })

  it('should throw an error when the file could not be found', () => {
    const filePath = './examples/some_file_that_doesnt_exist.yml'
    const defaults = readConfigFile(filePath)

    expect(defaults).toThrowError
  })
})
