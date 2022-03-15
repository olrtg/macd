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
export type CommandsChildMap<T> = { [K in keyof T]: StrFn<T[K]> }
export type CommandsParentMap<T> = {
  [K in keyof T]: CommandsChildMap<Partial<T[K]>>
}

export type DefaultsChildMap<T> = { [K in keyof T]: T[K] }
export type DefaultsParentMap<T> = {
  [K in keyof T]: DefaultsChildMap<Partial<T[K]>>
}

export type Commands = CommandsParentMap<Partial<Defaults>>
export type DefaultsFile = DefaultsParentMap<Partial<Defaults>>
