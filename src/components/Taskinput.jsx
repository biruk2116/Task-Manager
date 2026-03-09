import { useState } from "react";

function TaskInput({ addTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task.trim());
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-6 w-full max-w-md pl-5">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task..."
        className="flex-grow p-2 bg-white border   rounded-md focus:outline-none"
      />
      <button className="bg-blue-500 text-white px-4 pr-5 rounded-md mr-5 hover:bg-blue-600">
        Add
      </button>
    </form>
  );
}

export default TaskInput;