import * as React from 'react'
import { RiCloseCircleLine } from "react-icons/ri";
import "./Todo-item.css";

// Todo interface
interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

  // Todo item interface
interface TodoItemProps {
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoRemove: (id: string) => void;
    handleTodoComplete: (id: string) => void;
    todo: Todo;
  }


const TodoItem = (props:TodoItemProps)  => {
  return (
    <div className='todo-item'>
      <div onClick={() => props.handleTodoComplete(props.todo.id)}>
        {props.todo.isCompleted ? (
          <span className="todo-item-checked">✔</span>
        ) : (
          <span className="todo-item-unchecked" />
        )}
      </div>
      
      <div className="todo-item-input-wrapper">
        <input
          value={props.todo.text}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo.id)}
        />
      </div>
      
      <div className="icons" >
      <RiCloseCircleLine
            onClick={() => props.handleTodoRemove(props.todo.id)}
            className="delete-icon"
          />
      </div>
    </div>
  )
}

export default TodoItem;