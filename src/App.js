import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const getTodos = () => {
    let todoList = localStorage.getItem("yourTodos");
    if (todoList) {
      return JSON.parse(todoList);
    } else return [];
  };

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(getTodos());

  const todoHandler = (e) => {
    setTodo(e.target.value);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    if (todo) {
      const myTodos = { id: new Date().getTime().toString(), todo };
      setTodos((todos) => {
        return [...todos, myTodos];
      });
    } else alert("Please write something...");
    setTodo("");
  };

  const deleteHandler = (id) => {
    const newTodo = todos.filter((idTodo) => idTodo.id !== id);
    setTodos(newTodo);
  };

  useEffect(() => {
    localStorage.setItem("yourTodos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <form>
          <input
            placeholder="..."
            type="text"
            value={todo}
            onChange={(e) => todoHandler(e)}
          />
          <button type="submit" onClick={clickHandler}>
            <b>+</b>
          </button>
        </form>
      </div>

      <center>
        {todos.map((itr) => {
          const { id, todo } = itr;
          return (
            <div key={id}>
              <p>
                {" "}
                {todo}
                <label className="floatR" onClick={() => deleteHandler(id)}>
                  ❌
                </label>
              </p>
            </div>
          );
        })}
      </center>
    </div>
  );
}
