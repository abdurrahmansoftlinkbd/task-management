import PropTypes from "prop-types";
import TaskCard from "./TaskCard";

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
                  <TaskCard
                    key={task._id}
                    task={task}
                    handleEditTask={handleEditTask}
                    handleDeleteTask={handleDeleteTask}
                  ></TaskCard>
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
