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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-700 flex flex-col items-center py-10 px-3">
      <div className="w-full max-w-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl animate-fadeIn">
        <Header />
        <TaskInput addTask={addTask} />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-3">
          <p className="text-slate-200 text-sm">Tasks: <strong className="text-cyan-300">{tasks.length}</strong></p>
          <button
            onClick={clearCompleted}
            className="transition duration-300 bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-600 shadow-lg hover:shadow-red-500/30"
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