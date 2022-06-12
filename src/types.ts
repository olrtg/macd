interface Defaults {
  dock: Dock
  menubar: Menubar
  finder: Finder
  screenshots: Screenshots
  mission_control: MissionControl
}

interface Dock {
  position: 'top' | 'right' | 'bottom' | 'left'
  autohide: boolean
  autohide_delay: number
  icon_size: number
  show_recent_apps: boolean
  minimize_animation: 'genie' | 'scale' | 'suck'
}

interface Menubar {
  autohide: boolean
  flash_time_separators: boolean
}

interface Finder {
  show_hidden_files: boolean
  show_all_file_extensions: boolean
  warning_on_extension_change: boolean
  show_pathbar: boolean
  pathbar_starts_at_home: boolean
  can_quit: boolean
}

interface Screenshots {
  disable_shadows: boolean
  include_date: boolean
  location: string
  display_thumbnail: boolean
  output_format: 'png' | 'jpg'
}

interface MissionControl {
  rearrange_automatically: boolean
}

export type DefaultsFile = Defaults

export type Commands = {
  [ParentKey in keyof Defaults]: {
    [ChildKey in keyof Defaults[ParentKey]]: (
      val: Defaults[ParentKey][ChildKey],
    ) => string
  }
}
