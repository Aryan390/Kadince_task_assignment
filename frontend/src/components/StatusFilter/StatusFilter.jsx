import { Check, Clock, Filter, ListTodo } from "lucide-react";
import React from "react";

const StatusFilter = ({ statusFilter, setStatusFilter, taskCounts }) => {
  return (
    <div className="mt-6 mb-4 w-full p-6  bg-card/60 backdrop-blur-glass rounded-xl text-white border border-border/50 shadow-lg shadow-primary/5">
      <div className="flex items-center">
        <Filter className="h-4 w-4 mb-2" />
        <h2 className="mb-2 ml-1 font-bold text-lg">Filter By Status</h2>
      </div>
      <div className="flex space-x-1 p-1 rounded-lg max-w-md">
        <button
          onClick={() => setStatusFilter("all")}
          className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-2xl hover:scale-105 transition-all ease-in-out text-sm font-medium  ${
            statusFilter === "all"
              ? "bg-indigoBlue text-white shadow-sm"
              : "text-gray-800 bg-slate-400 hover:text-gray-900"
          }`}
        >
          <ListTodo className="h-4 w-4" />
          <span>All</span>
          <span className="bg-gray-200 text-gray-700 cursor-pointer px-2 py-1 rounded-full text-xs">
            {taskCounts.all}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter("pending")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-2xl hover:scale-105 transition-all ease-in-out  cursor-pointer text-sm font-medium ${
            statusFilter === "pending"
              ? "bg-orange-400 text-white shadow-sm"
              : "text-gray-800 bg-slate-400 "
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>Pending</span>
          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
            {taskCounts.pending}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter("completed")}
          className={`flex items-center space-x-2 px-4 py-2 cursor-pointer rounded-2xl hover:scale-105 transition-all ease-in-out text-sm font-medium  ${
            statusFilter === "completed"
              ? "bg-green-400  text-white shadow-sm"
              : "text-gray-800 bg-slate-400 "
          }`}
        >
          <Check className="h-4 w-4" />
          <span>Completed</span>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
            {taskCounts.completed}
          </span>
        </button>
      </div>
    </div>
  );
};

export default StatusFilter;
