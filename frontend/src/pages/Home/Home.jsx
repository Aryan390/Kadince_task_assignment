import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TaskItem from "../../components/TaskItem/TaskItem";
import showToast from "../../utils/showToast";
import TaskItemModal from "../../components/TaskItem/TaskItemModal";
import EmptyList from "../../components/EmptyList/EmptyList";
import AddTasksImg from "../../assets/images/add-notes.svg";
import NoDataImg from "../../assets/images/no-data.svg";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../../components/Loader/Loader";
import { Check, Clock, Filter } from "lucide-react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ListTodo } from "lucide-react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import StatusFilter from "../../components/StatusFilter/StatusFilter";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // Get task counts for filter badges
  const taskCounts = useMemo(() => {
    const pending = tasks.filter((task) => !task.isCompleted).length;
    const completed = tasks.filter((task) => task.isCompleted).length;
    return {
      all: tasks.length,
      pending,
      completed,
    };
  }, [tasks]);

  const handleEdit = (taskDetails) => {
    setOpenAddEditModal({ isShown: true, data: taskDetails, type: "edit" });
  };

  // Get all notes
  const getAllTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/tasks/get-all-tasks");

      if (response.data && response.data.data) {
        setTasks(response.data.data.data);
        setFilteredTasks(response.data.data.data);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Note
  const deleteTask = async (data) => {
    const taskId = data._id;
    try {
      const response = await axiosInstance.delete(
        "/tasks/delete-task/" + taskId
      );

      if (response.data === "") {
        showToast("Note Deleted Successfully", "delete");
        getAllTasks();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.", error);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (taskData) => {
    const taskId = taskData._id;
    try {
      // Update UI immediately for better UX
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        )
      );
      const response = await axiosInstance.put(`/tasks/toggle-task/${taskId}`, {
        isCompleted: !taskData.isCompleted,
      });

      if (response.data && !response.data.error) {
        showToast(
          `Task ${!taskData.isCompleted ? "completed" : "marked as pending"}`,
          "success"
        );
      }
    } catch (error) {
      // Revert the change if API call fails
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? { ...task, isCompleted: taskData.isCompleted }
            : task
        )
      );
      console.log("An unexpected error occurred. Please try again.", error);
      showToast("Failed to update task status", "error");
    }
  };

  // Get current filter display info
  const getFilterInfo = () => {
    if (searchQuery.trim() !== "") {
      return {
        title: `Search Results (${filteredTasks.length} found)`,
        subtitle: `Searching for "${searchQuery}" in ${statusFilter} tasks`,
      };
    }

    switch (statusFilter) {
      case "pending":
        return {
          title: `Pending Tasks (${filteredTasks.length})`,
          subtitle: "Tasks that need to be completed",
        };
      case "completed":
        return {
          title: `Completed Tasks (${filteredTasks.length})`,
          subtitle: "Tasks you've finished",
        };
      default:
        return {
          title: `All Tasks (${filteredTasks.length})`,
          subtitle: "All your tasks",
        };
    }
  };

  useEffect(() => {
    let filtered = [...tasks];

    // Apply status filter first
    if (statusFilter === "pending") {
      filtered = filtered.filter((task) => !task.isCompleted);
    } else if (statusFilter === "completed") {
      filtered = filtered.filter((task) => task.isCompleted);
    }

    // Apply search filter if searching
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, statusFilter]);

  useEffect(() => {
    console.log("from useEffect");
    getAllTasks();
  }, []);
  const filterInfo = getFilterInfo();
  return (
    <>
      {loading && <Loader />}
      <div className="mx-auto w-[95%]">
        {/*Search and Navigation  */}
        <div className="sticky top-0 z-20 w-full backdrop-blur-glass bg-card/80 border-b border-border/50 my-2 rounded-lg">
          <Navbar />
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            onClearSearch={() => setSearchQuery("")}
          />
        </div>
        <div>
          {searchQuery.trim() !== "" && (
            <h3 className="text-lg font-medium mt-5">Search Results</h3>
          )}

          <StatusFilter
            taskCounts={taskCounts}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* Filter Info */}
          <div className="mb-6">
            <h3 className="text-xl font-medium text-white">
              {filterInfo.title}
            </h3>
            <p className="text-md text-white mt-2">{filterInfo.subtitle}</p>
          </div>

          {filteredTasks.length > 0 ? (
            <div className="flex justify-center items-center flex-col gap-4 mt-8">
              {filteredTasks.map((task) => {
                return (
                  <div key={task._id} className="relative w-full ">
                    {/* check Button Toggle */}
                    <div className="absolute bottom-3 right-3 z-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={() => toggleTaskCompletion(task)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            task.isCompleted
                              ? "bg-green-500 border-green-500"
                              : "bg-white border-gray-300 hover:border-green-400"
                          }`}
                        >
                          {task.isCompleted && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </label>
                    </div>
                    <div>
                      <TaskItem
                        title={task.title}
                        content={task.content}
                        date={task.createdOn}
                        isPinned={task.isPinned}
                        onEdit={() => handleEdit(task)}
                        onDelete={() => deleteTask(task)}
                        isCompleted={task.isCompleted}
                        // onPinNote={() => updateIsPinned(task)}
                      />
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          task.isCompleted
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {task.isCompleted ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            !loading && (
              <EmptyList
                imgSrc={
                  searchQuery.trim() !== ""
                    ? NoDataImg
                    : statusFilter === "completed"
                    ? NoDataImg
                    : AddTasksImg
                }
                message={
                  searchQuery.trim() !== ""
                    ? `No tasks found matching "${searchQuery}" in ${statusFilter} tasks.`
                    : statusFilter === "pending"
                    ? "No pending tasks! All caught up! 🎉"
                    : statusFilter === "completed"
                    ? "No completed tasks yet. Start checking off some tasks!"
                    : `Start creating your first task! Click the 'Add' button to jot down your
          thoughts, ideas, and reminders. Let's get started!`
                }
              />
            )
          )}
          {/* Progress Bar */}
          <ProgressBar taskCounts={taskCounts} taskLength={tasks.length} />
        </div>

        <button
          className="flex items-center justify-center bg-primary hover:bg-blue-600 absolute right-10 bottom-10 fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 cursor-pointer z-100"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>

        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
          }}
          contentLabel="Example Modal"
          className="w-[50%] bg-accent text-white rounded-md mx-auto mt-14 p-5 overflow-hidden z-6 transform translate-y-[40%]"
        >
          <TaskItemModal
            type={openAddEditModal.type}
            taskData={openAddEditModal.data}
            onClose={() => {
              setOpenAddEditModal({ isShown: false, type: "add", data: null });
            }}
            getAllTasks={getAllTasks}
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;
