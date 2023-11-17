// EditTodoForm.tsx
import { useState } from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input m-4 p-2 border-2 text-black rounded-full"
          placeholder="update task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="todo-btn text-white">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTodoForm;
