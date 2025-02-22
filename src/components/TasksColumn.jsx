import { Edit, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

const TasksColumn = ({ tasks, handleEditTask, handleDeleteTask }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {["To Do", "In Progress", "Done"].map((status) => (
        <div key={status} className="card bg-base-100 shadow-lg h-min">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h3 className="card-title font-title text-lg">{status}</h3>
              <div className="badge bg-default text-white">
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
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold font-title">
                          {task.title}
                        </h4>
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
  );
};

TasksColumn.propTypes = {
  tasks: PropTypes.array,
  handleEditTask: PropTypes.func,
  handleDeleteTask: PropTypes.func,
};

export default TasksColumn;
