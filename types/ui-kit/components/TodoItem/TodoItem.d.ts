import './TodoItem.css';
export type TodoItemProps = {
    text: string;
    completed?: boolean;
    onToggle?: () => void;
};
export declare const TodoItem: ({ text, completed, onToggle }: TodoItemProps) => import("react/jsx-runtime").JSX.Element;
export default TodoItem;
