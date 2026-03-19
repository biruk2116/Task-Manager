import TaskItem from "./Taskitem";

function TaskList({ tasks, toggleTask, deleteTask, updateTask }) {
  if (tasks.length === 0)
    return (
      <div className="flex justify-center p-6 rounded-2xl bg-slate-800/50 text-slate-200">
        No tasks yet.
      </div>
    );
  return (
    <ul className="w-full space-y-3 p-1">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;