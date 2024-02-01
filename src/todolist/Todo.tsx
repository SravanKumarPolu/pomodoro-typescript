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
  const { timerValue1, formatTime } = useTimerContext();

  // const currentTime = new Date();
  // const finishedTime = new Date(
  //   currentTime.getTime() + timerValue1 * 60 * 1000
  // );

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 py-2 bg-gray-800 text-white mb-2">
      <p
        className="flex   h-8 cursor-pointer mb-2  justify-center items-center md:mr-2 md:mb-0"
        onClick={() => toggleComplete(task.id)}>
        {task.task}
      </p>

      {/* Display the time when the task will be completed */}
      <div className=" flex  justify-center items-center gap-2">
        <span>{formatTime(timerValue1)}</span>
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
