import { exec } from 'child_process'
import { readConfigFile } from './utils'
import { fileToCommands } from './mapper'

export function run(filePath: string) {
  const file = readConfigFile(filePath)

  if (!file) {
    return
  }

  const commands = fileToCommands(file)
  commands.forEach(command => {
    exec(command, err => {
      if (err) {
        console.error(err)
      }
    })
  })
}
