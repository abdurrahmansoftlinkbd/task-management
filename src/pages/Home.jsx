import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import AddTaskModal from "../components/AddTaskModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function Home() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/tasks");
      // Sort tasks by timestamp in descending order (newest first)
      return response.data.sort((a, b) => {
        const dateA = new Date(a.timestamp || 0);
        const dateB = new Date(b.timestamp || 0);
        return dateB - dateA;
      });
    },
  });

  const handleDeleteTask = async (taskId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        customClass: {
          container: "font-sans",
        },
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/tasks/${taskId}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
          customClass: {
            container: "font-sans",
          },
        });
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsEditingTask(true);
  };

  const [isUpdating, setIsUpdating] = useState(false);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // Only include the fields we want to update
      const updatedTask = {
        title: currentTask.title,
        description: currentTask.description,
        category: currentTask.category,
        timestamp: new Date().toISOString(),
      };

      const response = await axios.patch(
        `http://localhost:5000/tasks/${currentTask._id}`,
        updatedTask
      );

      if (response.data.modifiedCount) {
        setIsEditingTask(false);
        setCurrentTask(null);
        refetch();
        toast.success("Task updated successfully");
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error(error.response?.data?.message || "Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className="bg-base-200 font-body">
      {/* nav */}
      <nav className="bg-base-100 shadow-sm sticky top-0 z-10 py-1">
        <Navbar></Navbar>
      </nav>
      {/* body */}
      <div className="container w-11/12 mx-auto flex flex-col">
        <div className="mt-8">
          {/* header section */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold font-title">My Tasks</h2>
            </div>
            <button
              className="btn bg-default border-default text-white"
              onClick={() => setIsAddingTask(true)}
            >
              <Plus size={20} />
              Add New Task
            </button>
          </header>

          {/* Task Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["To Do", "In Progress", "Done"].map((status) => (
              <div key={status} className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="card-title text-lg">{status}</h3>
                    <div className="badge badge-primary">
                      {tasks.filter((task) => task.category === status).length}
                    </div>
                  </div>

                  {/* Task Cards */}
                  <div className="space-y-4">
                    {tasks
                      .filter((task) => task.category === status)
                      .map((task) => (
                        <div key={task._id} className="card bg-base-200">
                          <div className="card-body p-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{task.title}</h4>
                              <div className="flex gap-2">
                                <button
                                  className="btn btn-ghost btn-sm"
                                  onClick={() => handleEditTask(task)}
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  className="btn btn-ghost btn-sm text-error"
                                  onClick={() => handleDeleteTask(task._id)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-base-content/70">
                              {task.description}
                            </p>
                            {task.timestamp && (
                              <div className="text-xs text-base-content/50 mt-2">
                                {new Date(task.timestamp).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Add Task Modal */}
      <AddTaskModal
        isAddingTask={isAddingTask}
        setIsAddingTask={setIsAddingTask}
        refetch={refetch}
      />
      {/* Replace your existing edit modal with this updated version: */}
      {isEditingTask && (
        <dialog className="modal modal-open">
          <div className="modal-box rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800">Edit Task</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label font-medium">Title</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={currentTask?.title}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-medium">Description</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={currentTask?.description}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-medium">Category</label>
                <select
                  className="select select-bordered w-full"
                  value={currentTask?.category}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, category: e.target.value })
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
                    setIsEditingTask(false);
                    setCurrentTask(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
          {/* Click outside to close */}
          <form method="dialog" className="modal-backdrop">
            <button
              onClick={() => {
                setIsEditingTask(false);
                setCurrentTask(null);
              }}
            >
              close
            </button>
          </form>
        </dialog>
      )}
    </div>
  );
}
