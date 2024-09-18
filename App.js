import React, { useState } from 'react';
import './App.css'; // Import the styling

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, assignedTo: "User 1", status: "Completed", dueDate: "12/10/2024", priority: "Low", comments: "This task is good" },
    { id: 2, assignedTo: "User 2", status: "In Progress", dueDate: "14/09/2024", priority: "High", comments: "Important task" },
    { id: 3, assignedTo: "User 3", status: "Not Started", dueDate: "18/08/2024", priority: "Low", comments: "Needs review" },
    { id: 4, assignedTo: "User 4", status: "In Progress", dueDate: "12/06/2024", priority: "Normal", comments: "This task is good" },
  ]);

  const [newTask, setNewTask] = useState({
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: '',
  });

  const [editingTask, setEditingTask] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Add task handler
  const addTask = () => {
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    setTasks([...tasks, { id, ...newTask }]);
    setNewTask({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
  };

  // Edit task handler
  const editTask = (task) => {
    setEditingTask(task);
    setDropdownOpen(null); // Close the dropdown when editing a task
  };

  // Save edited task
  const saveTask = () => {
    setTasks(tasks.map(task =>
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
    setDropdownOpen(null); // Close the dropdown after saving
  };

  // Delete task handler
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setDropdownOpen(null); // Close the dropdown after deleting
  };

  // Toggle dropdown
  const toggleDropdown = (taskId) => {
    setDropdownOpen(dropdownOpen === taskId ? null : taskId);
  };

  // Filter tasks based on search input
  const filteredTasks = tasks.filter(task =>
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Task Management</h1>

      {/* Task Search and Buttons */}
      <div className="task-controls">
        <input
          type="text"
          placeholder="Search tasks by Assigned To or Status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => alert("New Task Modal")}>New Task</button>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </div>

      {editingTask ? (
        <div className="task-form">
          <input
            type="text"
            placeholder="Assigned To"
            value={editingTask.assignedTo}
            onChange={(e) => setEditingTask({ ...editingTask, assignedTo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Status"
            value={editingTask.status}
            onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
          />
          <input
            type="text"
            placeholder="Due Date"
            value={editingTask.dueDate}
            onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
          />
          <input
            type="text"
            placeholder="Priority"
            value={editingTask.priority}
            onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
          />
          <input
            type="text"
            placeholder="Comments"
            value={editingTask.comments}
            onChange={(e) => setEditingTask({ ...editingTask, comments: e.target.value })}
          />
          <button onClick={saveTask}>Save</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
      ) : (
        <div className="task-form">
          <input
            type="text"
            placeholder="Assigned To"
            value={newTask.assignedTo}
            onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          />
          <input
            type="text"
            placeholder="Due Date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <input
            type="text"
            placeholder="Priority"
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          />
          <input
            type="text"
            placeholder="Comments"
            value={newTask.comments}
            onChange={(e) => setNewTask({ ...newTask, comments: e.target.value })}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      )}

      <div className="task-table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.assignedTo}</td>
                <td>{task.status}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.comments}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="dropdown-button"
                      onClick={() => toggleDropdown(task.id)}
                    >
                      Actions
                    </button>
                    {dropdownOpen === task.id && (
                      <div className="dropdown-content">
                        <button onClick={() => editTask(task)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
