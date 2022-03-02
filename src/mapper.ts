// import { DefaultsOptions } from './types'

import { DefaultsFile } from './types'

export const commandsMap: {
  [category: string]: { [rule: string]: (val: boolean | number) => string }
} = {
  dock: {
    autohide: (val = false) =>
      `defaults write NSGlobalDomain _HIHideMenuBar -bool ${val}`,
    icon_size: (val = 48) =>
      `defaults write com.apple.dock tilesize -int ${val}`,
    show_recent_apps: (val = true) =>
      `defaults write com.apple.dock show-recents -bool ${val}`,
  },

  menubar: {
    autohide: (val = false) =>
      `defaults write NSGlobalDomain _HIHideMenuBar -bool ${val}`,
  },

  finder: {
    show_hidden_files: (val = false) =>
      `defaults write com.apple.finder AppleShowAllFiles ${val}`,
    show_all_file_extensions: (val = false) =>
      `defaults write NSGlobalDomain AppleShowAllExtensions -bool ${val}`,
    warning_on_extension_change: (val = true) =>
      `defaults write com.apple.finder FXEnableExtensionChangeWarning -bool ${val}`,
    show_pathbar: (val = false) =>
      `defaults write com.apple.finder ShowPathbar -bool ${val}`,
    pathbar_starts_at_home: (val = false) =>
      `defaults write com.apple.finder PathBarRootAtHome -bool ${val}`,
  },
}

export function configToCommands(config: {
  [category: string]: { [rule: string]: any }
}) {
  const commands = Object.keys(config)
    .map(category =>
      Object.keys(config[category]).map(rule =>
        commandsMap[category][rule](config[category][rule]),
      ),
    )
    .flat()

  return commands
}
