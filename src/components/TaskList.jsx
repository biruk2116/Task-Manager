import TaskItem from "./Taskitem";

function TaskList({ tasks, toggleTask, deleteTask }) {
  if (tasks.length === 0)
    return <p className="flex text-red-900 justify-center pb-2">No tasks yet.</p>;

  return (
    <ul className="w-full max-w-md p-5 bg-purple-400 rounded-3xl">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;