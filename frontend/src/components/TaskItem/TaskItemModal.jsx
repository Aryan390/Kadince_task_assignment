import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import showToast from "../../utils/showToast";

const TaskItemModal = ({ taskData, type, onClose, getAllTasks }) => {
  const [title, setTitle] = useState(taskData?.title || "");
  const [content, setContent] = useState(taskData?.content || "");
  const [error, setError] = useState(null);

  const addTask = async () => {
    try {
      const response = await axiosInstance.post("/tasks/add-task", {
        title,
        content,
      });

      if (response.data && response.data.data) {
        showToast("Task Added Successfully", "add");
        getAllTasks();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const editTask = async () => {
    const taskId = taskData._id;

    try {
      const response = await axiosInstance.put("/tasks/edit-task/" + taskId, {
        title,
        content,
        // tags,
      });

      console.log(response);

      if (response.data.data) {
        showToast("Task Updated Successfully", "update");
        getAllTasks();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleAddTask = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editTask();
    } else {
      addTask();
    }
  };

  return (
    <div className="relative z-100">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50 z-100 cursor-pointer"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400 " />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label text-white">TITLE</label>
        <input
          type="text"
          className="text-2xl text-gray-300 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-white">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-black outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddTask}
      >
        {type === "add" ? "ADD" : "Update"}
      </button>
    </div>
  );
};

export default TaskItemModal;
