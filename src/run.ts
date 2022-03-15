import fs from 'fs'
import YAML from 'yaml'
import { exec } from 'child_process'
import { DefaultsFile } from './types'
import { fileToCommands } from './mapper'

export function run(filePath: string) {
  try {
    const rawFile = fs.readFileSync(filePath, 'utf8')
    const parsedFile = YAML.parse(rawFile) as DefaultsFile

    if (!parsedFile) {
      console.log('You cannot use an empty file.')
      return
    }

    const commands = fileToCommands(parsedFile)
    commands.forEach(command => {
      console.log(command)
      exec(command, err => {
        if (err) {
          console.error(err)
        }
      })
    })
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('File not found.')
    } else {
      throw error
    }
  }
}
