#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UIKIT_LOG="$ROOT_DIR/ui-kit.preview.log"
TODO_LOG="$ROOT_DIR/todo-remote.preview.log"

cleanup() {
  if [[ -n "${UIKIT_PID:-}" ]]; then
    kill "$UIKIT_PID" >/dev/null 2>&1 || true
  fi
  if [[ -n "${TODO_PID:-}" ]]; then
    kill "$TODO_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

echo "→ Запускаю ui-kit (build + preview на 4174)"
(cd "$ROOT_DIR/ui-kit" && npm run build && npm run preview -- --host 0.0.0.0 --port 4174 >"$UIKIT_LOG" 2>&1) &
UIKIT_PID=$!

echo "→ Запускаю todo-remote (build + preview на 4175)"
(cd "$ROOT_DIR/todo-remote" && npm run build && npm run preview -- --host 0.0.0.0 --port 4175 >"$TODO_LOG" 2>&1) &
TODO_PID=$!

sleep 4

echo "→ ui-kit лог: $UIKIT_LOG"
echo "→ todo-remote лог: $TODO_LOG"
echo "→ Запускаю host (dev на 4173). Ctrl+C остановит цепочку."

cd "$ROOT_DIR/host"
npm run dev

