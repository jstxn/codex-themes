# codex-themes

Theme toolkit for the Codex desktop app.

It includes:
- `src/codex-launch-dev.sh`: launch Codex with theme support (one command)
- `src/codex-theme-switcher.sh`: apply themes from JSON presets (supports user themes)
- `src/codex-theme-switcher-ui.js`: in-app modal theme switcher with live preview
- `src/codex-theme-generator.mjs`: generates CSS from simple theme JSON files
- `src/codex-style-injector.mjs`: hot-reload CSS/JS into Codex over the DevTools protocol

## Requirements

- macOS
- Codex desktop app installed
- Node.js 18+ (22+ recommended)

## Quick Install

```bash
git clone https://github.com/anomaly/codex-themes.git
cd codex-themes
./install.sh
```

By default, commands are symlinked into `~/.local/bin`.

## Quick Start

```bash
codex-themes
```

That's it! This launches Codex with theme support enabled. Click the **Theme** button (rainbow text) in the bottom-right corner to pick a theme.

To apply a theme via command line instead:
```bash
codex-theme-switcher --menu
# or list available: codex-theme-switcher --list
```

## Creating Custom Themes

Themes are simple JSON files. Only 4 fields are required:

```json
{
  "name": "My Theme",
  "background": "#1e1e2e",
  "foreground": "#cdd6f4",
  "palette": [
    "#45475a", "#f38ba8", "#a6e3a1", "#f9e2af",
    "#89b4fa", "#f5c2e7", "#94e2d5", "#a6adc8",
    "#585b70", "#f37799", "#89d88b", "#ebd391",
    "#74a8fc", "#f2aede", "#6bd7ca", "#bac2de"
  ]
}
```

Optional fields: `cursor`, `selectionBg`, `selectionFg` (default to foreground/background).

### User Themes (No Git Required)

1. Create the directory: `mkdir -p ~/.config/codex-themes`
2. Copy the template: `cp themes/example.template.json ~/.config/codex-themes/My-Theme.json`
3. Edit the colors
4. Apply: `codex-theme-switcher "My Theme"`

User themes in `~/.config/codex-themes/` override bundled themes with the same name.

### Contributing Themes

1. Copy `themes/example.template.json` to `themes/Your-Theme-Name.json`
2. Fill in your colors
3. Test with `codex-theme-switcher "Your Theme Name"`
4. Submit a PR

See `themes/README.md` for more details.

## Notes

- Debugging is bound to localhost by default (`127.0.0.1`).
- Do not inject untrusted JS/CSS.
- If Codex is not in `/Applications/Codex.app/...`, set `CODEX_BIN`.

## Repository Layout

- `src/codex-launch-dev.sh`
- `src/codex-style-injector.mjs`
- `src/codex-theme-generator.mjs`
- `src/codex-theme-switcher.sh`
- `src/codex-theme-switcher-ui.js`
- `src/codex-theme.css` (generated)
- `themes/*.json` (theme definitions)
- `~/.config/codex-themes/*.json` (user themes)
