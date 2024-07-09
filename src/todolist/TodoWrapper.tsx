import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

type Todo = {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
};

type Props = {
  remainingTime: number; // Add remainingTime prop
};

const TodoWrapper: React.FC<Props> = ({ remainingTime }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [timerIsActive, setTimerIsActive] = useState(false);

  const addTodo = (todo: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (newTask: string, id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, task: newTask, isEditing: !todo.isEditing }
          : todo
      )
    );
  };

  return (
    <div className="flex flex-col h-auto items-center mx-auto text-black ">
      <TodoForm
        addTodo={addTodo}
        startTimer={() => setTimerIsActive(true)}
        timerIsActive={timerIsActive}
      />

      <div className="w-full px-4 py-2 mx-auto max-h-[10rem] overflow-y-auto custom-scrollbar">
        {todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
          ) : (
            <Todo
              key={todo.id}
              task={todo}
              toggleComplete={() => toggleComplete(todo.id)}
              deleteTodo={() => deleteTodo(todo.id)}
              editTodo={() => editTodo(todo.id)}
              remainingTime={remainingTime} // Pass remainingTime to each Todo
            />
          )
        )}
      </div>
    </div>
  );
};

export default TodoWrapper;
