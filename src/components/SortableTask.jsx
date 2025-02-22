import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PropTypes from "prop-types";
import TaskCard from "./TaskCard";

const SortableTask = ({ id, task, handleEditTask, handleDeleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TaskCard
        task={task}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        dragListeners={listeners}
      />
    </div>
  );
};

SortableTask.propTypes = {
  id: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
  handleEditTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
};

export default SortableTask;
