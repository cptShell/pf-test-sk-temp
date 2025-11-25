import { Suspense, lazy } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'

import RemoteErrorBoundary from './components/RemoteErrorBoundary'
import './App.css'

// @ts-expect-error Module Federation remote available at runtime
const TodoRemote = lazy(() => import('todo_remote/TodoApp'))

const Landing = () => (
  <section className="panel">
    <h1>Shell-приложение</h1>
    <p>Это host, который только отрисовывает каркас и маршруты.</p>
    <ul>
      <li>Каждый роут — отдельный микрофронт</li>
      <li>Todo список загружается как remote через Module Federation</li>
    </ul>
  </section>
)

const TodoRoute = () => (
  <RemoteErrorBoundary>
    <Suspense fallback={<div className="mf-loader">Загружаем todo-remote…</div>}>
      <TodoRemote />
    </Suspense>
  </RemoteErrorBoundary>
)

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="shell-layout">
        <aside>
          <p className="brand">Host Shell</p>
          <nav>
            <Link to="/">Главная</Link>
            <Link to="/todo">Todo (remote)</Link>
          </nav>
        </aside>
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/todo" element={<TodoRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
