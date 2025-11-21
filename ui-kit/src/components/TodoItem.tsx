import './todo-item.css'

export type TodoItemProps = {
  text: string
  completed?: boolean
  onToggle?: () => void
}

export const TodoItem = ({ text, completed, onToggle }: TodoItemProps) => {
  return (
    <label className="todo-item">
      <input type="checkbox" checked={completed} onChange={onToggle} />
      <span className="todo-text" data-completed={completed}>
        {text}
      </span>
    </label>
  )
}

export default TodoItem
