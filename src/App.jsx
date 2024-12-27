import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import DarkModeToggle from "./components/DarkModeToggle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : {};
  });
  const [darkMode, setDarkMode] = useState(false);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, description, date) => {
    setTodos((prev) => {
      const updatedTodos = { ...prev };
      if (!updatedTodos[date]) updatedTodos[date] = [];
      updatedTodos[date].push({ id: Date.now(), title, description });
      return updatedTodos;
    });
  };

  const editTodo = (date, id, updatedData) => {
    setTodos((prev) => {
      const updatedTodos = { ...prev };
      updatedTodos[date] = updatedTodos[date].map((todo) =>
        todo.id === id ? { ...todo, ...updatedData } : todo
      );
      return updatedTodos;
    });
  };

  const deleteTodo = (date, id) => {
    setTodos((prev) => {
      const updatedTodos = { ...prev };
      updatedTodos[date] = updatedTodos[date].filter((todo) => todo.id !== id);
      if (updatedTodos[date].length === 0) delete updatedTodos[date];
      return updatedTodos;
    });
  };

  const clearTodosByDate = (date) => {
    setTodos((prev) => {
      const updatedTodos = { ...prev };
      delete updatedTodos[date];
      return updatedTodos;
    });
  };

  return (
    <div
      // className={darkMode ? "dark bg-dark text-white" : "bg-light text-dark"}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={`container p-4 rounded shadow-lg ${
          darkMode ? "bg-secondary text-light" : "bg-white text-dark"
        }`}
        style={{ maxWidth: "600px" }}
      >
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <h1 className="text-center mb-4">Todo Application</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          clearTodosByDate={clearTodosByDate}
        />
      </div>
    </div>
  );
};

export default App;

// className="container p-4 rounded shadow-lg bg-white"
