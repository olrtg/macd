import fs from 'fs'
import YAML from 'yaml'
import { DefaultsFile } from './types'

export function readConfigFile(filePath: string): DefaultsFile | undefined {
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
