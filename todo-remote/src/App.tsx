import { Suspense, lazy, useState, type ComponentType } from 'react'

import { useTodoStore } from './store'

import './App.css'

type RemoteTextInputProps = {
  value: string
  placeholder?: string
  disabled?: boolean
  onChange?: (value: string) => void
  onSubmit?: () => void
}

type RemoteTodoItemProps = {
  text: string
  completed?: boolean
  onToggle?: () => void
}

const TextInput = lazy<ComponentType<RemoteTextInputProps>>(async () => {
  // @ts-expect-error Module Federation remote, типы подтягиваются в runtime
  const module = await import('ui-kit/TextInput')
  return { default: module.TextInput as ComponentType<RemoteTextInputProps> }
})

const TodoItem = lazy<ComponentType<RemoteTodoItemProps>>(async () => {
  // @ts-expect-error Module Federation remote, типы подтягиваются в runtime
  const module = await import('ui-kit/TodoItem')
  return { default: module.TodoItem as ComponentType<RemoteTodoItemProps> }
})

function TodoApp() {
  const [text, setText] = useState('')
  const items = useTodoStore((state) => state.items)
  const add = useTodoStore((state) => state.add)
  const toggle = useTodoStore((state) => state.toggle)

  const handleSubmit = () => {
    const value = text.trim()
    if (!value) {
      return
    }
    add(value)
    setText('')
  }

  return (
    <div className="todo-app">
      <header>
        <p>Remote: todo-remote</p>
        <h1>Todo список как микрофронт</h1>
      </header>

      <section className="composer">
        <Suspense fallback={<div className="mf-loader">Подключаем ui-kit…</div>}>
          <TextInput value={text} placeholder="Добавить задачу..." onChange={setText} onSubmit={handleSubmit} />
        </Suspense>
        <button type="button" onClick={handleSubmit}>
          Добавить
        </button>
      </section>

      <section className="todo-list">
        <Suspense fallback={<div className="mf-loader">Загружаем карточки…</div>}>
          {items.map((item) => (
            <TodoItem key={item.id} text={item.text} completed={item.completed} onToggle={() => toggle(item.id)} />
          ))}
        </Suspense>
      </section>
    </div>
  )
}

export default TodoApp
