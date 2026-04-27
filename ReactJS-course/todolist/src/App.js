import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Handles adding a task with basic validation
  const handleAddTask = () => {
    // CHECKING THE INPUT VALUE IF EMPTY STRING
    if (inputValue.trim() === "") return;

    const newTaskObj = {
      id: Date.now(),
      text: inputValue.trim(),
    };
    // CLONING THE CURRENT ARRAY AND ADD THE NEW TASK / PREVENT MUTATING
    setTasks((prev) => [...prev, newTaskObj]);
    setInputValue("");
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearAllTasks = () => setTasks([]);

  return (
    <div className="mainContainer flex-align-center">
      <div className="innerContainer flex-align-start-column">
        <h1>Todo App</h1>

        {/* Input Section */}
        <div className="input-btn-container">
          <input
            className="input"
            placeholder="Add your new todo"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button className="button-add btn-font-color" onClick={handleAddTask}>
            +
          </button>
        </div>

        {/* List Section */}
        <div className="list-parent-container">
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </div>

        {/* Footer Section */}
        {tasks.length > 0 && (
          <div className="clearAll-container flext-space-between">
            <p>
              You have <span>{tasks.length}</span> pending tasks
            </p>
            <button
              className="clearAll-btn btn-font-color"
              onClick={clearAllTasks}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-component for better readability
function TodoItem({ task, onDelete }) {
  return (
    <div className="list-container flext-space-between">
      <p className="text-list">{task.text}</p>
      <button className="list-del-btn btn-font-color" onClick={onDelete}>
        🗑️
      </button>
    </div>
  );
}
