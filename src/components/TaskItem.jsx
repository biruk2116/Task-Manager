import deleteIcon from "../assets/delete.png";

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow">

      <span
        onClick={() => toggleTask(task.id)}
        className={`flex-1 cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.text}
      </span>

      <button
        onClick={() => deleteTask(task.id)}
        className="bg-white p-1 rounded-md hover:bg-green-100"
      >
        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
      </button>

    </li>
  );
}

export default TaskItem;