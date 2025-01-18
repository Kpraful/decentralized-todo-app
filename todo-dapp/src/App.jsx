import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false); // New state for adding task
  const [isMarkingComplete, setIsMarkingComplete] = useState(false); // New state for marking task as complete

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return; // Prevent empty tasks
    setIsAddingTask(true); // Start loading animation
    try {
      await axios.post("http://localhost:5000/api/tasks", { description: newTask });
      setNewTask(""); // Clear input
      // Refetch tasks to update the list
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setIsAddingTask(false); // Stop loading animation
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`);
      // Refetch tasks to update the list
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
      setIsMarkingComplete(false); // Stop loading animation
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return (
    <div className="todo-app">
      {/* Header */}
      <header className="header">
        <h1>My To-Do List</h1>
      </header>
      <input
        type="text"
        placeholder="Add a new task..."
        className="task-input"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="add-button" onClick={handleAddTask} disabled={isAddingTask}>
        {isAddingTask ? "Adding..." : "Add Task"}
      </button>

      {/* Loading spinner for adding task */}
      {isAddingTask && <div className="loading-spinner"></div>}

      {isMarkingComplete && <div className="loading-spinner">
        </div>}
      {/* Task List */}
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                disabled={task.completed}
                onChange={() => {
                  setIsMarkingComplete(true);
                  handleCompleteTask(task.id)
                }
                }
                className="task-checkbox"
              />
              {/* Loading spinner for marking task as complete */}
        
              <div className="task-details">
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#888" : "#000",
                  }}
                >
                  {task.description}
                </span>
                <p className="task-description">{task.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;