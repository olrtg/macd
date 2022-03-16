export const commandsMap: any = {
  dock: {
    position: (val: 'top' | 'right' | 'bottom' | 'left' = 'bottom') =>
      `defaults write com.apple.dock orientation -string ${val}`,
    autohide: (val = false) =>
      `defaults write com.apple.dock autohide -bool ${val}`,
    autohide_delay: (val = 0.5) =>
      `defaults write com.apple.dock autohide-delay -float ${val}`,
    icon_size: (val = 48) =>
      `defaults write com.apple.dock tilesize -int ${val}`,
    show_recent_apps: (val = true) =>
      `defaults write com.apple.dock show-recents -bool ${val}`,
    minimize_animation: (val: 'genie' | 'scale' | 'suck' = 'genie') =>
      `defaults write com.apple.dock mineffect -string ${val}`,
  },

  menubar: {
    autohide: (val = false) =>
      `defaults write NSGlobalDomain _HIHideMenuBar -bool ${val}`,
    flash_time_separators: (val = false) =>
      `defaults write com.apple.menuextra.clock FlashDateSeparators -bool ${val}`,
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

  screenshots: {
    disable_shadows: (val = false) =>
      `defaults write com.apple.screencapture disable-shadow -bool ${val}`,
    include_date: (val = true) =>
      `defaults write com.apple.screencapture include-date -bool ${val}`,
    location: (val = '~/Desktop') =>
      `defaults write com.apple.screencapture location -string ${val}`,
    display_thumbnail: (val = true) =>
      `defaults write com.apple.screencapture show-thumbnail -bool ${val}`,
    output_format: (val: 'png' | 'jpg' = 'png') =>
      `defaults write com.apple.screencapture type -string ${val}`,
  },
}

export function fileToCommands(file: any) {
  const parentKeys = Object.keys(file)

  const commands = parentKeys
    .map((parent: any) => {
      const childKeys = Object.keys(file[parent])

      return childKeys.map((child: any) => {
        return commandsMap[parent][child](file[parent][child])
      })
    })
    .flat()

  return commands
}
