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
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen   bg-white flex flex-col items-center p-10">
<div className="bg-purple-500 rounded-3xl">
        <Header />
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
</div>
    </div>
  );
}

export default App;