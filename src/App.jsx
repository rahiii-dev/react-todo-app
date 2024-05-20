import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import "./App.css";
import { v4 as uid } from "uuid";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [todos, setTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterdTodos, setFilterdTodos] = useState([]);
  const [activeTodosCount, setActiveTodosCount] = useState(0);

  useEffect(() => {
    const allTodos = localStorage.getItem("todos");
    if (allTodos) {
      const todoList = JSON.parse(allTodos);
      setTodos(todoList);
      filterTodoFn(activeFilter);
      setActiveTodosCount((todoList.filter(todo => !todo.completed)).length)
    }
}, [todos,filterdTodos]);

  const filterTodoFn = (filter) => {
    let filteredItems;
   
    switch(filter){
      case 'active':
        filteredItems = todos.filter((todo) => {
          return todo.completed === false;
        });
        setActiveFilter('active');
        break
      
      case 'completed':
        filteredItems = todos.filter((todo) => {
          return todo.completed === true;
        });
        setActiveFilter('completed');
        break
      
        default :
          filteredItems = todos;
          setActiveFilter('all');
    }

    setFilterdTodos(filteredItems);
  }

  const toggleCompleteTodoById = (id) =>{
    const updatedTodo = todos.map((todo, index) => {

      if(todo.id == id){
        todo.completed = todo.completed ? false : true;
      }
      
      return todo;
    })
    setTodos(updatedTodo);
    filterTodoFn(activeFilter);
    localStorage.setItem('todos', JSON.stringify(updatedTodo))
  };

  const deletTodoById = (id) => {
    const updatedTodo = todos.filter((todo) => {
      if(todo.id !== id){
        return todo;
      }

    })
    setTodos(updatedTodo);
    filterTodoFn(activeFilter);
    localStorage.setItem('todos', JSON.stringify(updatedTodo))
  }
  function addTodo(e){
    
      e.preventDefault()
     
      const todoInp = document.getElementById("todo_inp");
      const todo = todoInp.value.trim();
      if (todo && todo.length > 2) {
        const newTodo = { id: uid(), task: todo, completed: false };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        setFilterdTodos(updatedTodos)
        setActiveFilter('all')
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        todoInp.value = "";
  
    }

  }

  return (
    <>
      <div id="main">
        <div id="img-bg"></div>
        <div id="todo_container">
          <div className="head">
            <span className="title">Todo</span>
            <button
              id="modechanger"
              onClick={() => {
                if (isDark) {
                  setIsDark(false);
                  document.body.classList.remove("dark");
                } else {
                  setIsDark(true);
                  document.body.classList.add("dark");
                }
              }}
            >
              {isDark ? (
                <i className="bi bi-brightness-high-fill"></i>
              ) : (
                <i className="bi bi-moon-fill"></i>
              )}
            </button>
          </div>

          <div className="body">
            <form
              id="todo_form"
              onSubmit={(e)=>addTodo(e)}
            >
              <input
                type="text"
                id="todo_inp"
                placeholder="Create new todo.."
                autoComplete="off"
              />
              <button type="submit" className="todo_check_btn">
                <i className="bi bi-check-lg"></i>
              </button>
            </form>

            <div id="todo_results">
              <div className="result_body">
                {filterdTodos.map((todo) => {
                  return <Todo key={todo.id} todo={todo} toggleCompleteTodoById={toggleCompleteTodoById} deletTodoById={deletTodoById}/>;
                })}
              </div>

              <div className="result_footer">
                <div id="todo_left">
                  <span>{activeTodosCount}</span> items left
                </div>
                <div className="todo_filter">
                  <button
                    id="all_todo"
                    className={activeFilter === 'all' ? 'active' : ''}
                    onClick={() => {
                      filterTodoFn('all')
                    }}
                  >
                    All
                  </button>
                  <button
                    id="active_todo"
                    className={activeFilter === 'active' ? 'active' : ''}
                    onClick={() => {
                      filterTodoFn('active');
                    }}
                  >
                    Active
                  </button>
                  <button
                    id="completed_todo"
                    className={activeFilter === 'completed' ? 'active' : ''}
                    onClick={() => {
                      filterTodoFn('completed');
                    }}
                  >
                    Completed
                  </button>

                </div>
                <div>
                  <button id="clear_completed" onClick={() => {
                    const unCompletedTodos = todos.filter(todo => {
                      return todo.completed === false;
                    });

                    setTodos(unCompletedTodos);
                    setFilterdTodos(unCompletedTodos);
                    localStorage.setItem('todos', JSON.stringify(unCompletedTodos));
                    if(activeFilter !== 'all'){
                      setActiveFilter('all')
                    }
                  }}>Clear Completed</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
