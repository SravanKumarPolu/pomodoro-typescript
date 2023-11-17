import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

type Props = {
  task: {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
  };
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
};

const Todo: React.FC<Props> = ({
  task,
  toggleComplete,
  deleteTodo,
  editTodo,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 py-2 bg-gray-800 text-white mb-2">
      <p
        className="flex-grow h-8 cursor-pointer mb-2  md:mr-2 md:mb-0"
        onClick={() => toggleComplete(task.id)}>
        {task.task}
      </p>
      <div className="flex gap-2">
        <FontAwesomeIcon icon={faPenSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};

export default Todo;
