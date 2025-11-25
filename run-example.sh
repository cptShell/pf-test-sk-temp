#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UIKIT_LOG="$ROOT_DIR/ui-kit.preview.log"
TODO_LOG="$ROOT_DIR/todo-remote.preview.log"
NODE_VERSION="20.9.0"

# Ensure Node 20.9 (required for the repo)
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck source=/dev/null
  . "$HOME/.nvm/nvm.sh"
  nvm use "$NODE_VERSION"
else
  echo "⚠️  nvm не найден. Убедись, что используешь Node $NODE_VERSION." >&2
fi

cleanup() {
  if [[ -n "${UIKIT_PID:-}" ]]; then
    kill "$UIKIT_PID" >/dev/null 2>&1 || true
  fi
  if [[ -n "${TODO_PID:-}" ]]; then
    kill "$TODO_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

echo "→ Собираю ui-kit (build + types)"
(cd "$ROOT_DIR/ui-kit" && npm run build >"$UIKIT_LOG" 2>&1)

echo "→ Запускаю ui-kit preview на 4174"
(cd "$ROOT_DIR/ui-kit" && npm run preview -- --host 0.0.0.0 --port 4174 >>"$UIKIT_LOG" 2>&1) &
UIKIT_PID=$!

echo "→ Собираю todo-remote (ожидает types из ui-kit)"
(cd "$ROOT_DIR/todo-remote" && npm run build >"$TODO_LOG" 2>&1)

echo "→ Запускаю todo-remote preview на 4175"
(cd "$ROOT_DIR/todo-remote" && npm run preview -- --host 0.0.0.0 --port 4175 >>"$TODO_LOG" 2>&1) &
TODO_PID=$!

sleep 4

echo "→ ui-kit лог: $UIKIT_LOG"
echo "→ todo-remote лог: $TODO_LOG"
echo "→ Запускаю host (dev на 4173). Ctrl+C остановит цепочку."

cd "$ROOT_DIR/host"
npm run dev

