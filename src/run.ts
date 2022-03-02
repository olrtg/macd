import fs from 'fs'
import YAML from 'yaml'
import { exec } from 'child_process'
import { DefaultsFile } from './types'
import { configToCommands } from './mapper'

export function run(filePath: string) {
  const rawFile = fs.readFileSync(filePath, 'utf8')
  const parsedFile = YAML.parse(rawFile) as DefaultsFile

  const commands = configToCommands(parsedFile)

  commands.forEach(command => {
    exec(command, (err, stdout, stderr) => {
      console.log(command)
      if (err) {
        console.error(err)
      }
    })
  })
}
