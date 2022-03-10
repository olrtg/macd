import { describe, expect, it } from 'vitest'
import { readConfigFile } from '../src/utils'

describe('defaults.ts', () => {
  it('should have a config file', () => {
    const filePath = './examples/defaults.yml'
    const defaults = readConfigFile(filePath)

    expect(defaults).toMatchObject({ dock: { autohide: true } })
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
  it('should have a list of available commands')
  it('should take the config file and find the commands from the list')
  it('should perform the commands')
})
