import deleteIcon from "../assets/delete.png";

function TaskItem({ task, toggleTask, deleteTask }) {


  return (
    <li className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow">

    <div className="flex items-center gap-2 flex-1" >
      
            <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-4 h-4"
        />
    
        <span
        onClick={() => toggleTask(task.id)}
        className={`flex-1 cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.text}
      </span>
    </div>

      <button
         onClick={() => deleteTask(task.id)}
         disabled={!task.completed}
          className={`p-1 rounded-md ${
          task.completed
                  ? "hover:bg-green-200"
                  : " cursor-not-allowed"
  }`}
        
      >
        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
      </button>

    </li>
  );
}

export default TaskItem;