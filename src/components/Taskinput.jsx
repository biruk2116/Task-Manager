import { useState } from "react";

function TaskInput({ addTask, theme }) {
  const [task, setTask] = useState("");
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task.trim());
    setTask("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mb-6 w-full"
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task..."
        className={`flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-400 transition ${
          isDark
            ? "border-slate-600 bg-slate-800 text-slate-100"
            : "border-slate-300 bg-white text-slate-900"
        }`}
      />
      <button
        type="submit"
        className={`px-4 py-3 rounded-xl font-semibold transition hover:scale-[1.02] hover:shadow-lg ${
          isDark
            ? "bg-linear-to-r from-cyan-400 to-indigo-500 text-white"
            : "bg-linear-to-r from-blue-500 to-cyan-500 text-white"
        }`}
      >
        Add task
      </button>
    </form>
  );
}

export default TaskInput;