import { useContext, useState } from "react";
import { Plus, Menu, X, Edit, Trash2 } from "lucide-react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import AddTaskModal from "../components/AddTaskModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isAddingTask, setIsAddingTask] = useState(false);
  // const [isEditingTask, setIsEditingTask] = useState(false);
  // const [currentTask, setCurrentTask] = useState(null);

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

  // Add Task Modal Component
  return (
    <div className="min-h-screen bg-base-200">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }
        `}
      >
        <div className="p-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Link to="/">
              <h1 className="text-2xl font-bold">Task Management</h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top Navigation */}
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <button
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div className="flex-none gap-4">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar btn btn-ghost btn-circle">
                <div className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={logOut}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">My Tasks</h2>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setIsAddingTask(true)}
            >
              <Plus size={20} />
              Add New Task
            </button>
          </div>

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
                                  // onClick={() => handleEditTask(task)}
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  className="btn btn-ghost btn-sm text-error"
                                  // onClick={() => handleDeleteTask(task._id)}
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
                                {new Date(task.timestamp).toLocaleDateString()}
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
    </div>
  );
}
