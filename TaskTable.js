import React, { useState } from 'react';

function TaskTable({ tasks, editTask, deleteTask }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (taskId) => {
    setDropdownOpen(dropdownOpen === taskId ? null : taskId);
  };

  return (
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
          {tasks.map((task) => (
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
  );
}

export default TaskTable;
