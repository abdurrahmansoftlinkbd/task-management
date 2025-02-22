import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Button from "./Button";
import CloseOut from "./CloseOut";

const AddTaskModal = ({
  isAddingTask,
  setIsAddingTask,
  refetch,
  userEmail,
}) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To Do",
    timestamp: new Date().toISOString(),
    userEmail: userEmail,
  });

  // add task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://task-management-server-eta-blond.vercel.app/tasks",
        newTask
      );
      setNewTask({
        title: "",
        description: "",
        category: "To Do",
        timestamp: new Date().toISOString(),
        userEmail: userEmail,
      });
      setIsAddingTask(false);
      refetch();
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <dialog className={`modal ${isAddingTask ? "modal-open" : ""}`}>
      <div className="modal-box rounded-lg shadow-lg p-6">
        {/* head */}
        <h3 className="text-xl font-title text-default font-semibold">
          Add New Task
        </h3>
        {/* form */}
        <form onSubmit={handleAddTask} className="space-y-4 mt-4">
          {/* title */}
          <div className="form-control">
            <label className="label font-title font-medium">Title</label>
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
          {/* desc */}
          <div className="form-control">
            <label className="label font-title font-medium">Description</label>
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
          {/* category */}
          <div className="form-control">
            <label className="label font-title font-medium">Category</label>
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
          {/* btns */}
          <div className="modal-action flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-outline btn-error hover:text-white font-title"
              onClick={() => {
                setIsAddingTask(false);
              }}
            >
              Cancel
            </button>
            <Button text={"Add Task"}></Button>
          </div>
        </form>
      </div>
      {/* click outside to close */}
      <CloseOut setIsAddingTask={setIsAddingTask}></CloseOut>
    </dialog>
  );
};

AddTaskModal.propTypes = {
  isAddingTask: PropTypes.bool,
  setIsAddingTask: PropTypes.func,
  refetch: PropTypes.func,
  userEmail: PropTypes.string,
};

export default AddTaskModal;
