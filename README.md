# codex-themes
<img width="1152" height="861" alt="Screenshot 2026-02-11 at 10 59 23 PM" src="https://github.com/user-attachments/assets/8a162e13-a6c5-455e-bd9e-e64688cfc586" />

Custom themes for the Codex desktop app.

## Install

```bash
git clone https://github.com/jstxn/codex-themes.git
cd codex-themes
./install.sh
```

## Usage

```bash
codex-themes
```

That's it. This launches Codex with themes enabled.

**Your data is preserved** — this uses the same data directory as the regular Codex app, so all your settings, history, and projects are intact. Just use `codex-themes` instead of clicking the Codex app icon.

Click the **Theme** button (rainbow text) in the bottom-right to pick a theme.

## Custom Themes

Create themes in `~/.config/codex-themes/` - they'll appear alongside the bundled ones.

Minimal theme JSON (only 4 required fields):

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

See `themes/README.md` for details.

## Requirements

- macOS
- Codex desktop app
- Node.js 18+
