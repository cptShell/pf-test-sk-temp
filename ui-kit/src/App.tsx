import { useState } from 'react'

import './App.css'
import TextInput from './components/TextInput'
import TodoItem from './components/TodoItem'

const mockItems = [
  { id: '1', text: 'Вынести мусор', completed: false },
  { id: '2', text: 'Сделать кофе', completed: true }
]

function App() {
  const [value, setValue] = useState('')

  return (
    <div className="preview-container">
      <div className="preview">
        <h1>UI Kit Playground</h1>
        <TextInput value={value} placeholder="Введите задачу" onChange={setValue} />
        <div className="preview-list">
          {mockItems.map((item) => (
            <TodoItem key={item.id} text={item.text} completed={item.completed} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
