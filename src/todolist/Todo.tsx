import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTimerContext } from "@/components/TimerContext";

type Props = {
  task: {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
  };
  remainingTime: number;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
};

const Todo: React.FC<Props> = ({
  task,
  remainingTime,
  toggleComplete,
  deleteTodo,
  editTodo,
}) => {
  const { formatTime } = useTimerContext();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 py-2 bg-gray-800 text-white mb-1 rounded-sm shadow-sm">
      <p
        className="flex h-6 cursor-pointer mb-2 justify-center items-center md:mr-2 md:mb-0"
        onClick={() => toggleComplete(task.id)}>
        {task.task}
      </p>

      <div className="flex justify-center items-center gap-2">
        <span>{formatTime(remainingTime)}</span>
        <div className="flex gap-2">
          <FontAwesomeIcon
            icon={faPenSquare}
            onClick={() => editTodo(task.id)}
            className="cursor-pointer"
          />
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faTrash}
            onClick={() => deleteTodo(task.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
