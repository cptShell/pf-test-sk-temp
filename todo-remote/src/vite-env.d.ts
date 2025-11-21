/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UI_KIT_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

import type { ComponentType } from 'react'

declare module 'ui-kit/TextInput' {
  export const TextInput: ComponentType<{
    value: string
    placeholder?: string
    disabled?: boolean
    onChange?: (value: string) => void
    onSubmit?: () => void
  }>
}

declare module 'ui-kit/TodoItem' {
  export const TodoItem: ComponentType<{
    text: string
    completed?: boolean
    onToggle?: () => void
  }>
}
