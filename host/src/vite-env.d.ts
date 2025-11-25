/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TODO_REMOTE_URL?: string
  readonly VITE_UI_KIT_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
