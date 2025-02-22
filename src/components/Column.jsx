import { useDroppable } from "@dnd-kit/core";
import PropTypes from "prop-types";
import SortableTask from "./SortableTask";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Column = ({ title, tasks, handleEditTask, handleDeleteTask }) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div className="card bg-base-100 shadow-lg h-min">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-title font-title text-lg">{title}</h3>
          <div className="badge bg-default text-white">{tasks.length}</div>
        </div>

        <div ref={setNodeRef} className="space-y-4 min-h-[200px]">
          <SortableContext
            items={tasks.map((task) => task._id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <SortableTask
                key={task._id}
                id={task._id}
                task={task}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

Column.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  handleEditTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
};

export default Column;
