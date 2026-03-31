import type { Todo } from "../Types/Todo";
import './TodoItem.css'

interface Props {
    todo: Todo;
    toogleTodo: (id: number) => void;
    updateTodo: (id: number, newText: string) => void;
    deleteTodo: (id: number) => void;
    setEditingText: (text: string) => void;
    setEditingId: (id: number | null) => void;
}

const TodoItem = ({ todo, toogleTodo, deleteTodo, setEditingId, setEditingText }: Props) => {
    const handleDel = (id: number) => {
        if (window.confirm("Bạn Có Chắc Chắn Muốn Xóa Cái Này Không !")) {
            deleteTodo(id);
        }
    };

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''} ${/* nếu có editing thì thêm sau */ ''}`}>
            <div className="todo-item-inner">
                <span
                    className="todo-item-text"
                    onClick={() => toogleTodo(todo.id)}
                >
                    {todo.text}
                </span>

                <div className="todo-item-action">
                    <button 
                        onClick={() => handleDel(todo.id)} 
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                    <button 
                        onClick={() => {
                            setEditingId(todo.id);
                            setEditingText(todo.text);
                        }} 
                        className="btn btn-primary"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </li>
    );
};

export default TodoItem;