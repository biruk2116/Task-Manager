import { useState, useEffect } from "react";
import deleteIcon from "../assets/delete.png";

function TaskItem({ task, toggleTask, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  useEffect(() => {
    setEditedText(task.text);
  }, [task.text]);

  const handleSave = () => {
    const trimmed = editedText.trim();
    if (!trimmed) return;
    updateTask(task.id, trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditedText(task.text);
    }
  };

  return (
    <li className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow">
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-4 h-4"
        />

        {isEditing ? (
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-1 border rounded"
            autoFocus
          />
        ) : (
          <span
            onClick={() => toggleTask(task.id)}
            className={`flex-1 cursor-pointer ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedText(task.text);
              }}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => deleteTask(task.id)}
          className="p-1 rounded-md hover:bg-red-200"
          aria-label="Delete task"
        >
          <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;