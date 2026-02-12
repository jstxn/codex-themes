# Codex Theme Presets (Ghostty Source)

This directory stores theme assets used by the Codex theming scripts.

- `raw/`: copied Ghostty preset source files (`*.ghostty`)
- `css/`: generated CSS snapshots for each included preset

## Included Presets

- Gruber Darker
- Catppuccin Mocha
- Dracula
- Ayu Mirage
- Everforest Dark Hard
- Flexoki Dark
- GitHub Dark
- Gruvbox Dark
- Nightfox
- Nord
- One Half Dark
- TokyoNight Storm
- Monokai Pro
- Sonokai
- Catppuccin Macchiato
- Material

## Apply a Preset

From repo root:

```bash
./codex-theme-switcher.sh --menu
# or
./codex-theme-switcher.sh "Dracula"
```

## Use In-App Theme Button

From repo root:

```bash
./codex-style-injector.mjs \
  --css "$(pwd)/codex-theme.css" \
  --js "$(pwd)/codex-theme-switcher-ui.js" \
  --port 9333
```
