import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/Taskinput";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      // Backwards-compatible migration: older saved tasks used `text`.
      return storedTasks
        .map((t) => ({
          id: t.id ?? Date.now(),
          title: (t.title ?? t.text ?? "").toString(),
          completed: !!t.completed,
        }))
        .filter((t) => t.title);
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // Save tasks whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addTask = (task) => {
    const title = task?.toString().trim?.() ?? "";
    if (!title) return false;
    setTasks((prev) => [...prev, { id: Date.now(), title, completed: false }]);
    return true;
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newText } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-10 px-3 transition-all duration-300 animated-gradient ${
        isDark ? "app-bg-dark" : "app-bg-light"
      }`}
    >
      <div
        className={`w-full max-w-2xl rounded-3xl p-6 shadow-2xl animate-fadeIn transition-all duration-300 ${
          isDark
            ? "bg-slate-900/90 border border-white/10"
            : "bg-white/90 border border-slate-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Header theme={theme} />
          <button
            onClick={toggleTheme}
            className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
              isDark
                ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
                : "bg-slate-800 text-slate-100 hover:bg-slate-700"
            }`}
          >
            {isDark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
        <TaskInput addTask={addTask} theme={theme} />

        <div className="flex flex-wrap gap-2 justify-between items-center mb-3">
          <div className="flex gap-2">
            {['all','active','completed'].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`text-xs font-medium px-3 py-1 rounded-full transition ${
                  filter === item
                    ? 'bg-cyan-500 text-white'
                    : isDark
                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
          <p className={`text-xs font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            Showing {filteredTasks.length} tasks
          </p>
          <button
            onClick={clearCompleted}
            className="text-xs bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 transition"
          >
            Clear completed
          </button>
        </div>

        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default App;