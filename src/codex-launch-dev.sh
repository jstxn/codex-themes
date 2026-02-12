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

PORT="${CODEX_REMOTE_DEBUG_PORT:-9333}"
BUILD="${CODEX_BUILD_FLAVOR:-dev}"
USER_DATA_DIR="${CODEX_USER_DATA_DIR:-$HOME/Library/Application Support/Codex-themed}"
BIN="${CODEX_BIN:-/Applications/Codex.app/Contents/MacOS/Codex}"
THEMES_DIR="${SCRIPT_DIR}/../themes"
CSS_FILE="${SCRIPT_DIR}/codex-theme.css"
JS_FILE="${SCRIPT_DIR}/codex-theme-switcher-ui.js"
INJECTOR="${SCRIPT_DIR}/codex-style-injector.mjs"

if [ ! -x "$BIN" ]; then
  echo "Codex binary not found: $BIN" >&2
  echo "Set CODEX_BIN and retry." >&2
  exit 1
fi

CODEX_PID=""
cleanup() {
  if [ -n "$CODEX_PID" ]; then
    kill "$CODEX_PID" 2>/dev/null || true
    wait "$CODEX_PID" 2>/dev/null || true
  fi
  exit 0
}
trap cleanup INT TERM

mkdir -p "$USER_DATA_DIR"

env BUILD_FLAVOR="$BUILD" "$BIN" \
  --user-data-dir="$USER_DATA_DIR" \
  --remote-debugging-address=127.0.0.1 \
  --remote-debugging-port="$PORT" \
  --no-first-run \
  --no-default-browser-check \
  "$@" >/dev/null 2>&1 &

CODEX_PID=$!

sleep 2
for i in {1..10}; do
  if curl -s "http://127.0.0.1:$PORT/json/list" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

echo "Codex running with themes (Ctrl+C to stop)"

node "$INJECTOR" \
  --css "$CSS_FILE" \
  --js "$JS_FILE" \
  --themes-dir "$THEMES_DIR" \
  --port "$PORT" \
  --quiet

cleanup
