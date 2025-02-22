import { Edit, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

const TaskCard = ({
  task,
  handleEditTask,
  handleDeleteTask,
  dragListeners,
}) => {
  return (
    <div className="card bg-base-200">
      <div className="card-body p-4">
        <div {...dragListeners} className="cursor-move">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold font-title">{task.title}</h4>
          </div>
          <p className="text-sm text-base-content/70">{task.description}</p>
          {task.timestamp && (
            <div className="text-xs text-base-content/50 mt-2">
              {new Date(task.timestamp).toLocaleString()}
            </div>
          )}
        </div>

        {/* buttons */}
        <div className="flex gap-2 justify-center items-center mt-4 bg-base-300 rounded-md">
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
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  handleEditTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  dragListeners: PropTypes.object.isRequired,
};

export default TaskCard;
