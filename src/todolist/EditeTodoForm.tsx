// EditTodoForm.tsx
import { useState } from "react";
import updateSvg from "@/assets/taskUpdate.svg";
type Props = {
  task: any; // Change the type to the complete Todo object
  editTodo: (id: string, newTask: string) => void;
};

const EditTodoForm = ({ editTodo, task }: Props) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    editTodo(value, task.id);

    setValue("");
  };

  return (
    <div className="ml-4 ">
      <form onSubmit={handleSubmit} className=" flex sm:flex-row flex-col">
        <input
          type="text"
          className="todo-input m-1 p-3 border-2 text-black rounded"
          placeholder="update task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className=" flex mr-4 justify-center items-center flex-row todo-btn   mt-2 p-2 rounded  todo-btn text-white">
          <img src={updateSvg} width={20} height={20} />
          <span> Task</span>
        </button>
      </form>
    </div>
  );
};

export default EditTodoForm;
