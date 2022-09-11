import fs from 'fs'
import YAML from 'yaml'
import { DefaultsFile } from './types'
import { exec } from 'child_process'
import { COMMANDS } from './constants'

export function runCommands(filePath: string) {
  const file = readConfigFile(filePath)

  if (!file) {
    return
  }

  const commands = fileToCommands(file)
  commands.forEach(command => {
    exec(command, err => {
      console.log(command)

      if (err) {
        console.error(err)
      }
    })
  })
}

type ParentKey = keyof DefaultsFile
type ChildKey = keyof DefaultsFile[ParentKey]

export function fileToCommands(file: DefaultsFile) {
  const commands: string[] = []

  const parentKeys = Object.keys(file) as ParentKey[]

  parentKeys.forEach(parentKey => {
    const parent = file[parentKey]

    if (!parent) return

    const childKeys = Object.keys(parent) as ChildKey[]

    childKeys.forEach(childKey => {
      const child = parent[childKey]

      if (!child) return

      const commandParent = COMMANDS[parentKey]

      if (!commandParent) return

      const commandChild = commandParent[childKey]

      if (!commandChild) return

      // @ts-expect-error
      const command = commandChild(child!)

      commands.push(command)
    })
  })

  return commands
}

export const readConfigFile = (filePath: string): DefaultsFile | undefined => {
  try {
    const rawFile = fs.readFileSync(filePath, 'utf8')
    const parsedFile = YAML.parse(rawFile) as DefaultsFile

    if (!parsedFile) {
      throw 'You cannot use an empty file.'
    }

    return parsedFile
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw 'The file does not exist.'
    }

    if (error.code === 'EACCES') {
      throw "Looks like you don't have permission to read this file."
    }

    throw error
  }
}
