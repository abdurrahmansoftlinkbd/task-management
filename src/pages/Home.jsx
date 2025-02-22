import { useState } from "react";
import AddTaskModal from "../components/AddTaskModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import TasksColumn from "../components/TasksColumn";
import EditModal from "../components/EditModal";

export default function Home() {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // fetch and get data
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/tasks");
      return response.data.sort((a, b) => {
        const dateA = new Date(a.timestamp || 0);
        const dateB = new Date(b.timestamp || 0);
        return dateB - dateA;
      });
    },
  });

  // delete data
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

  // edit modal
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsEditingTask(true);
  };

  // edit task
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
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
        {/* main content */}
        <div className="mt-8 mb-16">
          {/* header section */}
          <Header setIsAddingTask={setIsAddingTask}></Header>

          {/* tasks column */}
          <TasksColumn
            tasks={tasks}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          ></TasksColumn>
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
        <EditModal
          handleEditSubmit={handleEditSubmit}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          setIsEditingTask={setIsEditingTask}
          isUpdating={isUpdating}
        ></EditModal>
      )}
    </div>
  );
}
