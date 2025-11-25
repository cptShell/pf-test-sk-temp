import { Suspense, lazy, useCallback, useMemo, useState, type ComponentType } from 'react'
import type { TextInputProps } from 'ui-kit/TextInput'
import type { TodoItemProps } from 'ui-kit/TodoItem'
import type { TypographyProps } from 'ui-kit/Typography'

import { useTodoStore } from './store'

import './App.css'

const MAX_ITEMS = 20

const createRemoteComponent = <Props,>(
  loader: () => Promise<{ default: ComponentType<Props> }>
) => lazy(loader)

const TextInput = createRemoteComponent<TextInputProps>(async () => {
  const module = await import('ui-kit/TextInput')
  return { default: module.default }
})

const TodoItem = createRemoteComponent<TodoItemProps>(async () => {
  const module = await import('ui-kit/TodoItem')
  return { default: module.default }
})

const Typography = createRemoteComponent<TypographyProps>(async () => {
  const module = await import('ui-kit/Typography')
  return { default: module.default }
})

function TodoApp() {
  const [text, setText] = useState('')
  const items = useTodoStore((state) => state.items)
  const add = useTodoStore((state) => state.add)
  const toggle = useTodoStore((state) => state.toggle)

  const isLimitReached = items.length >= MAX_ITEMS
  const canSubmit = text.trim().length > 0 && !isLimitReached

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return

    add(text.trim())
    setText('')
  }, [add, canSubmit, text])

  const renderedItems = useMemo(
    () =>
      items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          completed={item.completed}
          onToggle={() => toggle(item.id)}
        />
      )),
    [items, toggle]
  )

  return (
    <div className="todo-app">
      <header>
        <Suspense fallback={<div className="mf-loader">Подключаем Typography…</div>}>
          <Typography variant="eyebrow" color="inverse" transform="uppercase">
            Remote: todo-remote
          </Typography>
          <Typography variant="display" color="inverse">
            Todo список как микрофронт
          </Typography>
        </Suspense>
      </header>

      <section className="composer">
        <Suspense fallback={<div className="mf-loader">Подключаем ui-kit…</div>}>
          <TextInput
            value={text}
            placeholder="Добавить задачу..."
            onChange={setText}
            onSubmit={handleSubmit}
            disabled={isLimitReached}
          />
        </Suspense>
        <button type="button" onClick={handleSubmit} disabled={!canSubmit}>
          Добавить
        </button>
        {isLimitReached && (
          <Suspense fallback={<div className="mf-loader">Подключаем Typography…</div>}>
            <Typography variant="caption" color="danger" className="limit-warning">
              Лимит 20 задач — удалите выполненные, чтобы добавить новые.
            </Typography>
          </Suspense>
        )}
      </section>

      <section className="todo-list">
        <Suspense fallback={<div className="mf-loader">Загружаем карточки…</div>}>
          {renderedItems}
        </Suspense>
      </section>
    </div>
  )
}

export default TodoApp
