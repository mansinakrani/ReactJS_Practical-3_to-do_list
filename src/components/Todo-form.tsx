import * as React from 'react'
import shortid from 'shortid';
import "./Todo-form.css";


// Todo interface
interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

// Todo form interface
interface TodoFormProps {
  onSubmit: any;
  todos: Todo[];
  handleTodoCreate: (todo: Todo) => void;
}

const TodoForm = (props: TodoFormProps) => {
    // Create ref for form input
    const inputRef = React.useRef<HTMLInputElement>(null)
  const [newTodo, setNewTodo] = React.useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.addEventListener("keydown", function (event: KeyboardEventInit) {
      if (event.key === "Escape") {
        (document.getElementById("btn") as HTMLFormElement).style.display =
          "inline-block";
      }
    });
    setNewTodo((e.target as HTMLInputElement).value);
  };
  const onSubmitbtn = () => {
    (document.getElementById("btn") as HTMLFormElement).style.display = "none";
    (document.getElementById("input1") as HTMLFormElement).style.display =
      "block";
    (document.getElementById("btn2") as HTMLFormElement).style.display =
      "inline-block";
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.length === 0) {
      alert("enter something");
    } else {
      props.onSubmit({
        isComplete: false,
        id: Math.floor(Math.random() * 10000),
        text: newTodo,
      });
      setNewTodo('');
    }
  };

  const handleInputEnter = (e: React.KeyboardEvent) => {
    // Check for 'Enter' key
    if (e.key === 'Enter') {
      // Prepare new todo object
      const createTodo: Todo = {
        id: shortid.generate(),
        text: newTodo,
        isCompleted: false
      }
      
      // Create new todo item
      props.handleTodoCreate(createTodo)
      
      // Reset the input field
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

 return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          id='input1'
          type="text"
          placeholder='Enter task'
          value={newTodo}
          name="text"
          onChange={event => handleInputChange(event)}
          onKeyPress={event => handleInputEnter(event)}
          className="todo-input"
        />
      </form>
      <button id="btn" onClick={onSubmitbtn} className="todo-button">
        +
      </button>
    </>
  );
};

export default TodoForm;