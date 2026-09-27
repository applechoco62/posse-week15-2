import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (text === "") return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タスク管理</h1>

      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          className="border rounded px-3 py-2 flex-1"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="新しいタスクを入力..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          追加
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-2 bg-white rounded-lg shadow px-4 py-2"
          >
            <span
              className={`flex-1 cursor-pointer ${task.done ? "line-through text-gray-400" : ""}`}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <button
              className="text-red-400 hover:text-red-600 text-sm"
              onClick={() => deleteTask(task.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-center text-gray-400 mt-8">タスクがありません</p>
      )}
    </main>
  );
}

export default App;