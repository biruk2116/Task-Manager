import { useState } from "react";
import deleteIcon from "../assets/delete.png";

function TaskItem({ task, toggleTask, deleteTask, updateTask, theme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.title);

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
      setEditedText(task.title);
    }
  };

  const isDark = theme === "dark";

  return (
    <li className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 animate-slideIn ${isDark ? 'bg-slate-900/90 border border-slate-700' : 'bg-white border border-slate-200'}`}>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-5 h-5 accent-cyan-500"
        />
      </div>
      <div className="flex-1 w-full">
        {isEditing ? (
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
              isDark
                ? "bg-slate-100 text-slate-900 border-slate-300"
                : "bg-slate-50 text-slate-900 border-slate-300"
            }`}
            autoFocus
          />
        ) : (
          <p
            className={`wrap-break-word text-left ${
              isDark
                ? task.completed
                  ? "line-through text-slate-400"
                  : "text-slate-100"
                : task.completed
                ? "line-through text-slate-500"
                : "text-slate-800"
            }`}
          >
            {task.title}
          </p>
        )}
      </div>
      <div className="flex gap-2 items-center">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-emerald-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedText(task.title);
              }}
              className="bg-slate-200 text-slate-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-slate-300 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setEditedText(task.title);
              setIsEditing(true);
            }}
            disabled={task.completed}
            className={`bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold transition ${
              task.completed ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            Edit
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          disabled={!task.completed}
          className={`p-1 rounded-lg transition ${
            task.completed
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-slate-700 text-slate-300 opacity-50 cursor-not-allowed"
          }`}
          aria-label="Delete task"
        >
          <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;