/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TODO_REMOTE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

import type { ComponentType } from 'react'

declare module 'todo_remote/TodoApp' {
  const TodoApp: ComponentType
  export default TodoApp
}
