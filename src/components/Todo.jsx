function Todo({todo, toggleCompleteTodoById, deletTodoById}) {
  return (
    <div className={`todo ${todo.completed ? 'todo_completed' : ''}`}>
      <button className="todo_check_btn" onClick={() => {
        toggleCompleteTodoById(todo.id)
      }}>
        <i className="bi bi-check-lg"></i>
      </button>
      <div className="todo_text">{todo?.task}</div>
      <button className="todo_remove_btn" onClick={() => {
        console.log("clicked");
        deletTodoById(todo.id);
      }}>
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  );
}

export default Todo;
