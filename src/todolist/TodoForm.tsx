// TodoForm.tsx
import useMediaQuery from "../hooks/useMediaQuery";
import React, { useState } from "react";
import AddSvg from "@/assets/add.svg";
type Props = {
  addTodo: (todo: string) => void;
};

const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  return (
    <div className="m-4">
      {isAboveMediumScreens ? (
        <form onSubmit={handleSubmit} className="flex flex-row ">
          <input
            type="text"
            className="todo-input m-1 p-3 border-2 rounded   "
            placeholder="What is the task today"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className=" flex justify-center items-center flex-row todo-btn text-white  mt-2 p-2 rounded-lg">
            <img src={AddSvg} width={20} height={24} />
            <span>Task</span>
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <input
            type="text"
            className="todo-input m-2 p-3 border-2 rounded-lg  "
            placeholder="What is the task today"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="todo-btn text-white  mt-2 p-2 rounded-lg">
            Add Task
          </button>
        </form>
      )}
    </div>
  );
};

export default TodoForm;
