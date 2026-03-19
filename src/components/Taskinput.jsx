import { useState } from "react";

function TaskInput({ addTask, theme }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = task.trim();
    if (!trimmed) {
      setError("Task cannot be empty.");
      return;
    }

    const ok = addTask(trimmed);
    if (!ok) {
      setError("Task cannot be empty.");
      return;
    }

    setError("");
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
        onChange={(e) => {
          setTask(e.target.value);
          if (error) setError("");
        }}
        placeholder="Enter a new task..."
        className={`flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-400 transition ${
          isDark
            ? "border-slate-600 bg-slate-800 text-slate-100"
            : "border-slate-300 bg-white text-slate-900"
        }`}
      />
      {error ? (
        <p
          className={`w-full sm:w-auto text-sm font-medium -mt-2 sm:-mt-1 ${
            isDark ? "text-red-300" : "text-red-600"
          } animate-text-pop`}
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 active:scale-95 active:opacity-90 ${
          isDark
            ? "bg-cyan-500 hover:bg-cyan-600 border border-cyan-300 text-white"
            : "bg-blue-500 hover:bg-blue-600 border border-blue-300 text-white"
        }`}
      >
        <span className="text-lg leading-none">➕</span>
        <span>Add</span>
      </button>
    </form>
  );
}

export default TaskInput;