#!/usr/bin/env bash
set -euo pipefail

PORT="${CODEX_REMOTE_DEBUG_PORT:-9333}"
BUILD="${CODEX_BUILD_FLAVOR:-dev}"
USER_DATA_DIR="${CODEX_USER_DATA_DIR:-$HOME/Library/Application Support/Codex-themed}"
BIN="${CODEX_BIN:-/Applications/Codex.app/Contents/MacOS/Codex}"

if [ ! -x "$BIN" ]; then
  echo "Codex binary not found or not executable: $BIN" >&2
  echo "Set CODEX_BIN to your local Codex binary path and retry." >&2
  exit 1
fi

mkdir -p "$USER_DATA_DIR"

echo "Launching Codex"
echo "  codex-bin=$BIN"
echo "  BUILD_FLAVOR=$BUILD"
echo "  remote-debugging-port=$PORT"
echo "  user-data-dir=$USER_DATA_DIR"

exec env BUILD_FLAVOR="$BUILD" "$BIN" \
  --user-data-dir="$USER_DATA_DIR" \
  --remote-debugging-address=127.0.0.1 \
  --remote-debugging-port="$PORT" \
  --no-first-run \
  --no-default-browser-check \
  "$@"
