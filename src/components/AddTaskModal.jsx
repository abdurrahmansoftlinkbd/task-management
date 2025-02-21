import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

const AddTaskModal = ({ isAddingTask, setIsAddingTask, refetch }) => {
  //   const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To Do",
    timestamp: new Date().toISOString(),
  });
  const [error, setError] = useState("");

  // Add task handler using axios
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/tasks", newTask);
      setNewTask({
        title: "",
        description: "",
        category: "To Do",
      });
      setIsAddingTask(false);
      // You might want to refresh your task list here
      refetch();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task");
    }
  };

  return (
    <dialog className={`modal ${isAddingTask ? "modal-open" : ""}`}>
      <div className="modal-box rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800">Add New Task</h3>
        {error && <div className="alert alert-error my-3 text-sm">{error}</div>}
        <form onSubmit={handleAddTask} className="space-y-4 mt-4">
          <div className="form-control">
            <label className="label font-medium">Title</label>
            <input
              type="text"
              placeholder="Task Title"
              className="input input-bordered w-full"
              maxLength={50}
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-medium">Description</label>
            <textarea
              placeholder="Description (optional)"
              className="textarea textarea-bordered w-full"
              maxLength={200}
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <label className="label font-medium">Category</label>
            <select
              className="select select-bordered w-full"
              value={newTask.category}
              onChange={(e) =>
                setNewTask({ ...newTask, category: e.target.value })
              }
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <div className="modal-action flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setIsAddingTask(false);
                setError("");
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

AddTaskModal.propTypes = {
  isAddingTask: PropTypes.bool,
  setIsAddingTask: PropTypes.func,
  refetch: PropTypes.func,
};

export default AddTaskModal;
