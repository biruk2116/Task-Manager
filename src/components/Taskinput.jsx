import { useState } from "react";

function TaskInput({ addTask }) {
  const [task, setTask] = useState("");

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
        className="flex-1 p-3 rounded-xl border border-slate-300 bg-slate-100/90 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
      />
      <button
        type="submit"
        className="bg-linear-to-r from-cyan-400 to-blue-500 text-white px-4 py-3 rounded-xl font-semibold transition hover:scale-[1.02] hover:shadow-lg"
      >
        Add task
      </button>
    </form>
  );
}

export default TaskInput;