#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="${BASH_SOURCE[0]}"
while [ -h "$SCRIPT_PATH" ]; do
  LINK_DIR="$(cd -P "$(dirname "$SCRIPT_PATH")" && pwd)"
  SCRIPT_PATH="$(readlink "$SCRIPT_PATH")"
  if [[ "$SCRIPT_PATH" != /* ]]; then
    SCRIPT_PATH="$LINK_DIR/$SCRIPT_PATH"
  fi
done
SCRIPT_DIR="$(cd -P "$(dirname "$SCRIPT_PATH")" && pwd)"

GENERATOR="${SCRIPT_DIR}/codex-theme-generator.mjs"
CSS_TARGET="${SCRIPT_DIR}/codex-theme.css"

USER_THEMES_DIR="${HOME}/.config/codex-themes"
BUNDLED_THEMES_DIR="${SCRIPT_DIR}/../themes"

discover_themes() {
  local themes=()
  local seen_names=()
  
  if [[ -d "$USER_THEMES_DIR" ]]; then
    while IFS= read -r -d '' file; do
      if [[ "$file" == *.template.json ]]; then
        continue
      fi
      local name
      name=$(basename "$file" .json | tr '-' ' ')
      if [[ ! "$name" =~ [\"\'\\] ]] && [[ ! " ${seen_names[*]} " =~ " ${name} " ]]; then
        themes+=("$name")
        seen_names+=("$name")
      fi
    done < <(find "$USER_THEMES_DIR" -maxdepth 1 -name "*.json" -print0 2>/dev/null || true)
  fi
  
  if [[ -d "$BUNDLED_THEMES_DIR" ]]; then
    while IFS= read -r -d '' file; do
      if [[ "$file" == *.template.json ]]; then
        continue
      fi
      local name
      name=$(basename "$file" .json | tr '-' ' ')
      if [[ ! "$name" =~ [\"\'\\] ]] && [[ ! " ${seen_names[*]} " =~ " ${name} " ]]; then
        themes+=("$name")
        seen_names+=("$name")
      fi
    done < <(find "$BUNDLED_THEMES_DIR" -maxdepth 1 -name "*.json" -print0 2>/dev/null || true)
  fi
  
  printf '%s\n' "${themes[@]}" | sort
}

find_theme_file() {
  local theme="$1"
  local filename
  filename=$(echo "$theme" | tr ' ' '-').json
  
  if [[ -f "${USER_THEMES_DIR}/${filename}" ]]; then
    echo "${USER_THEMES_DIR}/${filename}"
    return 0
  fi
  
  if [[ -f "${BUNDLED_THEMES_DIR}/${filename}" ]]; then
    echo "${BUNDLED_THEMES_DIR}/${filename}"
    return 0
  fi
  
  return 1
}

usage() {
  cat <<USAGE
Usage:
  codex-theme-switcher.sh [theme name]
  codex-theme-switcher.sh --menu
  codex-theme-switcher.sh --list

Examples:
  codex-theme-switcher.sh "Dracula"
  codex-theme-switcher.sh --menu
  codex-theme-switcher.sh --list

Theme directories (searched in order):
  1. ~/.config/codex-themes/    (user themes)
  2. bundled themes/            (built-in themes)

To create a custom theme:
  1. Copy themes/example.template.json to ~/.config/codex-themes/My-Theme.json
  2. Edit the colors
  3. Run: codex-theme-switcher.sh "My Theme"
USAGE
}

choose_menu() {
  local theme_choices=""
  local theme escaped
  while IFS= read -r theme; do
    [[ -z "$theme" ]] && continue
    escaped="${theme//\"/\\\"}"
    if [ -n "$theme_choices" ]; then
      theme_choices+=", "
    fi
    theme_choices+="\"$escaped\""
  done < <(discover_themes)

  if [[ -z "$theme_choices" ]]; then
    echo ""
    return
  fi

  osascript <<OSA
set themeChoices to {$theme_choices}
set picked to choose from list themeChoices with title "Codex Theme Switcher" with prompt "Pick a theme"
if picked is false then
  return ""
else
  return item 1 of picked
end if
OSA
}

THEME="${1:-}"

if [ "$THEME" = "--help" ] || [ "$THEME" = "-h" ]; then
  usage
  exit 0
fi

if [ "$THEME" = "--list" ]; then
  discover_themes
  exit 0
fi

if [ "$THEME" = "--menu" ] || [ -z "$THEME" ]; then
  THEME="$(choose_menu | tr -d '\r')"
fi

if [ -z "$THEME" ]; then
  echo "No theme selected."
  exit 0
fi

THEME_FILE=""
if ! THEME_FILE="$(find_theme_file "$THEME")"; then
  echo "Theme not found: $THEME" >&2
  echo "Available themes:" >&2
  discover_themes | sed 's/^/  - /' >&2
  exit 1
fi

if [[ ! -x "$(command -v node)" ]]; then
  echo "Error: Node.js is required to generate themes" >&2
  exit 1
fi

node "$GENERATOR" --generate "$THEME_FILE" --output "$CSS_TARGET"

echo "Applied $THEME -> $CSS_TARGET"
echo "Source: $THEME_FILE"
echo "If injector is running in watch mode, Codex updates automatically."
