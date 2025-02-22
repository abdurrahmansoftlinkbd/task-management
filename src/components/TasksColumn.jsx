import PropTypes from "prop-types";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import axios from "axios";
import Column from "./Column";

const TasksColumn = ({ tasks, handleEditTask, handleDeleteTask, refetch }) => {
  const [columns] = useState(["To Do", "In Progress", "Done"]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id) => {
    const task = tasks.find((task) => task._id === id);
    if (task) {
      return task.category;
    }
    return columns.find((col) => col === id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) return;

    // tasks in the active container
    const containerTasks = tasks
      .filter((task) => task.category === activeContainer)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const activeIndex = containerTasks.findIndex(
      (task) => task._id === activeId
    );
    const overIndex = containerTasks.findIndex((task) => task._id === overId);

    if (activeContainer === overContainer) {
      // reordering within same category
      if (activeIndex !== overIndex) {
        const newOrder = arrayMove(containerTasks, activeIndex, overIndex);
        try {
          await Promise.all(
            newOrder.map((task, index) =>
              axios.patch(`http://localhost:5000/tasks/${task._id}`, {
                order: index,
                timestamp: new Date().toISOString(),
              })
            )
          );
          refetch();
        } catch (error) {
          console.error("Failed to reorder tasks:", error);
        }
      }
    } else {
      // moving to different category
      const targetTasks = tasks
        .filter((task) => task.category === overContainer)
        .sort((a, b) => (b.order || 0) - (a.order || 0));

      try {
        await axios.patch(`http://localhost:5000/tasks/${activeId}`, {
          category: overContainer,
          order: targetTasks.length,
          timestamp: new Date().toISOString(),
        });
        refetch();
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((status) => {
          const columnTasks = tasks
            .filter((task) => task.category === status)
            .sort((a, b) => (b.order || 0) - (a.order || 0));

          return (
            <Column
              key={status}
              id={status}
              title={status}
              tasks={columnTasks}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          );
        })}
      </div>
    </DndContext>
  );
};

TasksColumn.propTypes = {
  tasks: PropTypes.array,
  handleEditTask: PropTypes.func,
  handleDeleteTask: PropTypes.func,
  refetch: PropTypes.func,
};

export default TasksColumn;
