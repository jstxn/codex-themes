#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PREFIX="${HOME}/.local/bin"

usage() {
  cat <<USAGE
Usage:
  ./install.sh [--prefix /path/to/bin]

Defaults:
  --prefix ${HOME}/.local/bin
USAGE
}

while [ $# -gt 0 ]; do
  case "$1" in
    --prefix)
      if [ $# -lt 2 ]; then
        echo "Missing value for --prefix" >&2
        exit 1
      fi
      PREFIX="$2"
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

mkdir -p "$PREFIX"

link_cmd() {
  local source_file="$1"
  local command_name="$2"
  local target="$PREFIX/$command_name"

  if [ ! -f "$source_file" ]; then
    echo "Missing source file: $source_file" >&2
    exit 1
  fi

  chmod +x "$source_file"
  ln -sfn "$source_file" "$target"
  echo "linked: $command_name -> $source_file"
}

link_cmd "$SCRIPT_DIR/src/codex-launch-dev.sh" "codex-themes"
link_cmd "$SCRIPT_DIR/src/codex-style-injector.mjs" "codex-style-injector"
link_cmd "$SCRIPT_DIR/src/codex-theme-switcher.sh" "codex-theme-switcher"

echo
echo "Install complete."
echo "Bin path: $PREFIX"

auto_path_msg=''
case ":$PATH:" in
  *":$PREFIX:"*)
    ;;
  *)
    auto_path_msg="export PATH=\"$PREFIX:\$PATH\""
    ;;
esac

if [ -n "$auto_path_msg" ]; then
  echo "Your PATH does not include $PREFIX in this shell."
  echo "Run: $auto_path_msg"
fi
