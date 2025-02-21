import { useContext, useState } from "react";
import { Plus, Menu, X } from "lucide-react";
import AuthContext from "../context/AuthContext";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

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
          <div className="flex items-center gap-2 mb-8">
            <h1 className="text-xl font-bold">TaskFlow</h1>
          </div>

          <nav className="space-y-2">
            {["Dashboard", "My Tasks", "Projects", "Team", "Calendar"].map(
              (item) => (
                <button
                  key={item}
                  className="w-full btn btn-ghost justify-start"
                >
                  {item}
                </button>
              )
            )}
          </nav>
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
              <p className="text-base-content/60">
                Track and manage your tasks efficiently
              </p>
            </div>
            <button className="btn btn-primary">
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
                    <div className="badge badge-primary">{3}</div>
                  </div>

                  {/* Task Cards */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((task) => (
                      <div key={task} className="card bg-base-200">
                        <div className="card-body p-4">
                          <h4 className="font-medium">Example Task {task}</h4>
                          <p className="text-sm text-base-content/70">
                            This is a sample task description that shows how
                            tasks will look in the UI.
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="badge badge-ghost">Frontend</div>
                            <div className="avatar-group -space-x-4">
                              {[1, 2].map((user) => (
                                <div key={user} className="avatar">
                                  <div className="w-6 h-6">
                                    <img
                                      src="/api/placeholder/24/24"
                                      alt={`user ${user}`}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
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
    </div>
  );
}
