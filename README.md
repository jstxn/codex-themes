# codex-themes

Ghostty-inspired theming toolkit for the Codex desktop app.

It includes:
- `codex-theme-switcher.sh`: generate/apply `codex-theme.css` from Ghostty presets
- `codex-theme-switcher-ui.js`: in-app modal theme switcher with live preview
- `codex-style-injector.mjs`: hot-reload CSS/JS into Codex over the DevTools protocol
- `codex-launch-dev.sh`: launch Codex with remote debugging enabled

## Requirements

- macOS
- Codex desktop app installed
- Node.js 18+ (22+ recommended)
- Ghostty installed (for preset extraction from the Ghostty themes directory)

## Quick Install

```bash
git clone https://github.com/<your-user>/codex-themes.git
cd codex-themes
./install.sh
```

By default, commands are symlinked into `~/.local/bin`.

## Standard Workflow

1. Launch Codex in debug mode:

```bash
codex-launch-dev
```

2. Generate/apply a base CSS theme:

```bash
codex-theme-switcher --menu
# or: codex-theme-switcher "Nightfox"
```

3. Start hot-reload injector:

```bash
codex-style-injector \
  --css "$(pwd)/codex-theme.css" \
  --js "$(pwd)/codex-theme-switcher-ui.js" \
  --port 9333
```

This injects the runtime theme and adds the in-app **Theme** button/modal.

## Notes

- Debugging is bound to localhost by default (`127.0.0.1`).
- Do not inject untrusted JS/CSS.
- If Codex is not in `/Applications/Codex.app/...`, set `CODEX_BIN`.
- If Ghostty themes are elsewhere, set `GHOSTTY_THEME_DIR`.

## Repository Layout

- `codex-launch-dev.sh`
- `codex-style-injector.mjs`
- `codex-theme-switcher.sh`
- `codex-theme-switcher-ui.js`
- `codex-theme.css`
- `codex-themes/raw/` (source Ghostty presets)
- `codex-themes/css/` (generated preset CSS snapshots)
