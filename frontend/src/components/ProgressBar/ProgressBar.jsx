import React from "react";
import { Award } from "lucide-react";

const ProgressBar = ({ taskCounts, taskLength }) => {
  return (
    <div className="p-6 bg-gradient-card backdrop-blur-glass border-border/5 my-4">
      {taskLength > 0 && (
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-600 mb-2 w-full space-x-3">
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="flex items-center justify">
                <div className="p-1 rounded-lg bg-gradient-primary text-white mr-2">
                  <Award />
                </div>
                <div>
                  <h1 className="text-xl text-white">Progress Overview</h1>
                  <p className="text-xs text-white">
                    You're on the right track!
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    {taskCounts.completed} of {taskCounts.all} done
                  </span>
                </div>
                <span className="text-sm font-bold text-primary">
                  {taskCounts.all > 0
                    ? (taskCounts.completed / taskCounts.all) * 100
                    : 0}
                  % Complete
                </span>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  taskCounts.all > 0
                    ? (taskCounts.completed / taskCounts.all) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-500">
            {taskCounts.all > 0
              ? Math.round((taskCounts.completed / taskCounts.all) * 100)
              : 0}
            % Complete
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
