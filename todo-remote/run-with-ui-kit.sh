#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
UIKIT_LOG="$ROOT_DIR/ui-kit.preview.log"
NODE_VERSION="20.9.0"

cleanup() {
  if [[ -n "${UIKIT_PID:-}" ]]; then
    kill "$UIKIT_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck source=/dev/null
  . "$HOME/.nvm/nvm.sh"
  nvm use "$NODE_VERSION"
else
  echo "⚠️  nvm не найден. Убедись, что используешь Node $NODE_VERSION." >&2
fi

echo "→ Собираю ui-kit"
(cd "$ROOT_DIR/ui-kit" && npm run build >"$UIKIT_LOG" 2>&1)

echo "→ ui-kit preview на 4174"
(cd "$ROOT_DIR/ui-kit" && npm run preview -- --host 0.0.0.0 --port 4174 >>"$UIKIT_LOG" 2>&1) &
UIKIT_PID=$!

sleep 3

echo "→ Логи ui-kit: $UIKIT_LOG"
echo "→ Запускаю todo-remote (dev на 4175). Ctrl+C остановит и todo-remote, и ui-kit"

cd "$SCRIPT_DIR"
npm run dev

