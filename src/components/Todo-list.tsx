import React, { useEffect, useState } from "react";

import TodoForm from "./Todo-form";
import TodoItem from "./Todo-item";
import DateTime from "./Date";

// Todo interface
interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

const TodoList = () => {
  let intTodo: Todo[];
  if (localStorage.getItem("todos") === null) {
    intTodo = [];
  } else {
    intTodo = JSON.parse(localStorage.getItem("todos") || "{}");
  }

  const [todos, setTodos] = useState<Todo[]>(intTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Creating new todo item
  const handleTodoCreate = (todo: Todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    // Prepare new todos state
    const newTodos: Todo[] = [...todos];
    // Update new todos state
    newTodos.push(todo);
    // Update todos state
    setTodos(newTodos);
  };

  // Update existing todo item
  const handleTodoUpdate = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    // Prepare new todos state
    const newTodos: Todo[] = [...todos];

    // Find correct todo item to update
    newTodos.find((todo: Todo) => todo.id === id)!.text = event.target.value;

    // Update todos state
    setTodos(newTodos);
  };

  const handleTodoComplete = (id: string) => {
    // Copy current todos state
    const newTodos: Todo[] = [...todos];

    // Find the correct todo item and update its 'isCompleted' key
    newTodos.find((todo: Todo) => todo.id === id)!.isCompleted = !newTodos.find(
      (todo: Todo) => todo.id === id
    )!.isCompleted;

    // Update todos state
    setTodos(newTodos);
  };

  // Remove existing todo item
  const handleTodoRemove = (id: string) => {
    // Prepare new todos state
    const newTodos: Todo[] = todos.filter((todo: Todo) => todo.id !== id);

    // Update todos state
    setTodos(newTodos);
  };

  return (
    <>
      <div className="todo-app">
        <header>
          <h3>
            <DateTime />
          </h3>
        </header>
        {todos.map((todo) => (
          <div key={todo.id}>
            <TodoItem
              todo={todo}
              handleTodoUpdate={handleTodoUpdate}
              handleTodoRemove={handleTodoRemove}
              handleTodoComplete={handleTodoComplete}
            />
          </div>
        ))}
        <TodoForm
          onSubmit={handleTodoCreate}
          todos={[]}
          handleTodoCreate={function (todo: Todo): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </>
  );
};

export default TodoList;
