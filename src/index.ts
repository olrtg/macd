import yargs from 'yargs'
import { version } from '../package.json'
import { run } from './run'

const cli = yargs
  .scriptName('macd')
  .usage('$0 <config_file>')
  .version(version)
  .strict()
  .showHelpOnFail(true)
  .alias('h', 'help')
  .alias('v', 'version')

cli.command(
  '$0 <config_file>',
  'Apply configuration from config file',
  args => {
    args.positional('config_file', {
      description: 'path to config file',
      type: 'string',
    })
  },
  ({ config_file: configFile }) => {
    run(configFile as string)
  },
)

cli.help().parse()
