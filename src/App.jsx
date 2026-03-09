import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/Taskinput";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (!task) return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
  };

  const toggleTask = (id) => {
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
};

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-600 flex flex-col items-center p-10">
<div   className="bg-slate-800 rounded-3xl border border-gray-700
                shadow-[0_15px_40px_rgba(0,0,0,0.5)]
                hover:shadow-[0_25px_60px_rgba(0,0,0.9,0.6)]
                transition-all duration-300 p-6 max-w-md">
        <Header />
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
</div>
    </div>
  );
}

export default App;