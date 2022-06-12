import fs from 'fs'
import YAML from 'yaml'
import { DefaultsFile, ObjectKeys } from './types'
import { exec } from 'child_process'
import { COMMANDS } from './constants'

export function runCommands(filePath: string) {
  const file = readConfigFile(filePath)

  if (!file) {
    return
  }

  const commands = fileToCommands(file)
  // commands.forEach(command => {
  //   exec(command, err => {
  //     console.log(command)

  //     if (err) {
  //       console.error(err)
  //     }
  //   })
  // })
}

export function fileToCommands(file: DefaultsFile) {
  const commands: string[] = []

  const parentKeys = Object.keys(file) as Array<keyof DefaultsFile>

  parentKeys.forEach(parentKey => {
    const parent = file[parentKey]
    const childKeys = Object.keys(parent) as Array<keyof typeof parentKey>

    childKeys.forEach(childKey => {
      const child = parent[childKey]
      const command = COMMANDS[parentKey][childKey](child)

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
      console.log('You cannot use an empty file.')
      return
    }

    return parsedFile
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('The file does not exist.')
      return
    }

    if (error.code === 'EACCES') {
      console.log("Looks like you don't have permission to read this file.")
      return
    }

    throw error
  }
}
