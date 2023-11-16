import useMediaQuery from "@/hooks/useMediaQuery";
import React from "react";

type Props = {};

const TodoForm = (props: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 670px");
  return (
    <div>
      {isAboveMediumScreens ? (
        <form className="flex flex-row ">
          <input
            type="text"
            className="todo-input m-2 p-3 border-2 rounded-lg  "
            placeholder="What is the task today"
          />
          <button
            type="submit"
            className="todo-btn text-white  mt-2 p-2 rounded-lg">
            Add Task
          </button>
        </form>
      ) : (
        <form className="flex flex-col ">
          <input
            type="text"
            className="todo-input m-2 p-3 border-2 rounded-lg  "
            placeholder="What is the task today"
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
