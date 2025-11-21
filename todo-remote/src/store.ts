import { create } from 'zustand'
import { nanoid } from 'nanoid'

type Todo = {
  id: string
  text: string
  completed: boolean
}

type TodoStore = {
  items: Todo[]
  add: (text: string) => void
  toggle: (id: string) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  items: [
    { id: '1', text: 'Развернуть todo-remote', completed: true },
    { id: '2', text: 'Подключить к host через Module Federation', completed: false }
  ],
  add: (text) =>
    set((state) => ({
      items: [...state.items, { id: nanoid(), text, completed: false }]
    })),
  toggle: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }))
}))

