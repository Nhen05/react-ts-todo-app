import TodoForm from './Components/TodoForm'
import { useTodo } from './Hook/UseTodo'
import TodoItem from './Components/TodoItem';
import { useState } from 'react';
function App() {
  type FILTER = "all" | "completed" | "active";
  const { todos, addTodo, toogleTodo, deleteTodo, updateTodo } = useTodo();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState<FILTER>("all");
  const filterTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  })
  const completedTodo = () => {
    const completedQuanlity = todos.filter((todos) => todos.completed)
    return completedQuanlity.length
  }
  const completed = todos.filter(t => t.completed).length;
  const total = todos.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="container-fluid min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">

          <h1 className="text-center mb-5 display-3 fw-bold text-primary">Todo List</h1>

          <TodoForm
            addTodo={addTodo}
            updateTodo={updateTodo}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
            setEditingId={setEditingId}
          />

          <div className="d-flex justify-content-between align-items-center mb-4 px-2">
            <select
              className="form-select w-auto shadow-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value as FILTER)}
            >
              <option value="all">Tất Cả</option>
              <option value="completed">Hoàn Thành</option>
              <option value="active">Chưa Hoàn Thành</option>
            </select>
            <div className='d-flex gap-3'>
              <span className="text-danger fw-medium">{percent}% Hoàn Thành</span>
              <span className="text-muted fw-medium">{filterTodos.length} Công việc</span>
              <span className="text-success fw-medium">{completedTodo()} Đã hoàn thành</span>
            </div>

          </div>

          <ul className='list-group'>
            {filterTodos.length !== 0 ? (
              filterTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toogleTodo={toogleTodo}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                  setEditingId={setEditingId}
                  setEditingText={setEditingText}
                />
              ))
            ) : (
              <div className="text-center py-5">
                <p className="text-muted fs-3">Không có công việc nào</p>
                <p className="text-muted">Hãy thêm nhiệm vụ mới nào ✨</p>
              </div>
            )}
          </ul>

        </div>
      </div>
    </div>
  )
}

export default App
