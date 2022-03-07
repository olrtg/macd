export type DefaultsFile = Readonly<Partial<Defaults>>

export interface Defaults {
  dock: Dock
  menubar: Menubar
  finder: Finder
}

interface Dock {
  autohide: boolean
  icon_size: number
  show_recent_apps: boolean
}

interface Menubar {
  autohide: boolean
}

interface Finder {
  show_hidden_files: boolean
  show_all_file_extensions: boolean
  warning_on_extension_change: boolean
  show_pathbar: boolean
  pathbar_starts_at_home: boolean
}

type StrFn<T> = (val: T) => string
type CommandsChildMap<T> = { [K in keyof T]: StrFn<T[K]> }

export type CommandsParentMap<T> = { [K in keyof T]: CommandsChildMap<T[K]> }