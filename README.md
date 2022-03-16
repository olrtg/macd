<h3 align="center">
  macd
</h3>

<p align="center">
  macOS defaults for humans.
</p>

> ⚠️ macd is still in early stages of development.

# Usage

You need to have a yaml file where you define your default config for your macOS system, for example:

```yaml
# defaults.yml
dock:
  autohide: true

menubar:
  autohide: true
```

And then you execute:

```bash
npx @olrtg/macd ~/dotfiles/macos/defaults.yml
```

# To-do

- [ ] Add the full list of commands in the README
- [ ] Add some kind of descriptive logging of the commands that are being executed
- [ ] JSON schema for text editor intellisense
- [ ] Add more commands

If you can help with one of the items above any contributions will be appreciated.
