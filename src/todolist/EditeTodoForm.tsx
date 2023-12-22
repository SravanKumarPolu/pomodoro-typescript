// EditTodoForm.tsx
import { useState } from "react";
// import updateSvg from "@/assets/taskUpdate.svg";
import useMediaQuery from "@/hooks/useMediaQuery";
type Props = {
  task: any; // Change the type to the complete Todo object
  editTodo: (id: string, newTask: string) => void;
};

const EditTodoForm = ({ editTodo, task }: Props) => {
  const [value, setValue] = useState(task.task);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    editTodo(value, task.id);

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
          {/* <button
          type="submit"
          className=" flex mr-4 justify-center items-center flex-row todo-btn   mt-2 p-2 rounded  todo-btn text-white">
          <img src={updateSvg} width={20} height={20} />
          <span> Task</span>
        </button> */}
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
        </form>
      )}
    </div>
  );
};

export default EditTodoForm;
