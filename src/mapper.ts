import { CommandsParentMap, Defaults, DefaultsFile } from './types'

export const commandsMap: CommandsParentMap<Defaults> = {
  dock: {
    autohide: (val = false) =>
      `defaults write com.apple.dock autohide -bool ${val}`,
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

export function fileToCommands(file: DefaultsFile) {
  const parentKeys = Object.keys(file) as Array<keyof DefaultsFile>

  if (!parentKeys.length) return

  const commands = parentKeys
    .map(parent => {
      const childKeys = Object.keys(file[parent]})

      return childKeys.map(child => {
        return commandsMap[parent][child](file[parent][child])
      })
    })
    .flat()

  return commands
}
