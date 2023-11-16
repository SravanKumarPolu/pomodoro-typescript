import React from "react";
import TodoForm from "./TodoForm";

type Props = {};

const TodoWrapper = (props: Props) => {
  return (
    <div className="flex flex-col h-[32rem] items-center mx-auto mt-8 p-4 bg-slate-500 max-w-[50rem] shadow-lg">
      <div>
        <TodoForm />
      </div>
    </div>
  );
};

export default TodoWrapper;
