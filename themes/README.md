# Codex Theme Presets

This directory contains theme definitions used by the Codex theming scripts.

## Theme Format

Themes are JSON files with a simple structure:

```json
{
  "name": "Theme Name",
  "background": "#1e1e2e",
  "foreground": "#cdd6f4",
  "cursor": "#f5e0dc",
  "selectionBg": "#585b70",
  "selectionFg": "#cdd6f4",
  "palette": [
    "#45475a", "#f38ba8", "#a6e3a1", "#f9e2af",
    "#89b4fa", "#f5c2e7", "#94e2d5", "#a6adc8",
    "#585b70", "#f37799", "#89d88b", "#ebd391",
    "#74a8fc", "#f2aede", "#6bd7ca", "#bac2de"
  ]
}
```

### Required Fields

| Field | Description |
|-------|-------------|
| `name` | Display name (used in menus) |
| `background` | Main background color (hex) |
| `foreground` | Main text color (hex) |
| `palette` | 16 ANSI colors (array of hex values, indices 0-15) |

### Optional Fields

| Field | Default | Description |
|-------|---------|-------------|
| `cursor` | `foreground` | Cursor/caret color |
| `selectionBg` | `background` | Selection background |
| `selectionFg` | `foreground` | Selection text color |

All colors must be valid hex: `#RGB` or `#RRGGBB`.

### Palette Indices

The 16-color palette follows standard ANSI terminal ordering:

| Index | Color | Index | Color |
|-------|-------|-------|-------|
| 0 | Black | 8 | Bright Black |
| 1 | Red | 9 | Bright Red |
| 2 | Green | 10 | Bright Green |
| 3 | Yellow | 11 | Bright Yellow |
| 4 | Blue | 12 | Bright Blue |
| 5 | Magenta | 13 | Bright Magenta |
| 6 | Cyan | 14 | Bright Cyan |
| 7 | White | 15 | Bright White |

Colors at indices 4 and 5 are also used for UI accents and gradients.

## Creating a New Theme

### Option 1: Copy an Existing Theme

```bash
cp themes/Dracula.json themes/My-Theme.json
# Edit the file, then test:
codex-theme-switcher "My Theme"
```

### Option 2: Start from Template

```bash
cp themes/example.template.json themes/My-Theme.json
# Edit the file, then test:
codex-theme-switcher "My Theme"
```

### Option 3: User Directory (No Git)

```bash
mkdir -p ~/.config/codex-themes
cp themes/example.template.json ~/.config/codex-themes/My-Theme.json
# Edit, then test:
codex-theme-switcher "My Theme"
```

## Testing Your Theme

1. Run `codex-themes` to launch Codex with theme support
2. Click the **Theme** button (rainbow text) in the bottom-right
3. Select your theme to preview and apply

## File Naming

- Use `Theme-Name.json` format (spaces become hyphens)
- The `name` field in JSON is used for display
- Files ending in `.template.json` are ignored

## Bundled Themes

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

## How CSS is Generated

The `codex-theme-generator.mjs` script derives ~100 CSS variables from your 4 required fields using color mixing. This means:

- You only define core colors
- All semantic colors (borders, hover states, etc.) are auto-generated
- The generated CSS handles terminal colors, diff views, code blocks, etc.
