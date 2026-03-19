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

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className="min-h-screen bg-slate-600 flex flex-col items-center p-10">
      <div
        className="bg-slate-800 rounded-3xl border border-gray-700
                shadow-[0_15px_40px_rgba(0,0,0,0.5)]
                hover:shadow-[0_25px_60px_rgba(0,0,0,0.9,0.6)]
                transition-all duration-300 p-6 max-w-md"
      >
        <Header />
        <TaskInput addTask={addTask} />
        <div className="flex justify-between mb-3">
          <p className="text-slate-200 text-sm">Tasks: {tasks.length}</p>
          <button
            onClick={clearCompleted}
            className="text-xs bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
          >
            Clear completed
          </button>
        </div>
        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
}

export default App;