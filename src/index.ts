import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { version } from '../package.json'
import { runCommands } from './utils'

const y = yargs(hideBin(process.argv))

y.scriptName('macd')
y.usage('$0 <config_file>')
y.strict()

y.help()
y.alias('h', 'help')
y.showHelpOnFail(true)

y.version(version)
y.alias('v', 'version')

y.command(
  '$0 <config_file>',
  'Apply configuration from config file',
  args => {
    args.positional('config_file', {
      description: 'path to config file',
      type: 'string',
    })
  },
  ({ config_file: configFile }) => {
    runCommands(configFile as string)
  },
)

y.parse()
