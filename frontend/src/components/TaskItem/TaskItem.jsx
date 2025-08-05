import moment from "moment";
import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const TaskItem = ({
  title,
  date,
  content,
  // isPinned,
  onEdit,
  onDelete,
  // onPinNote,
}) => {
  return (
    <div className="rounded-2xl text-white hover:border ease-in-out  bg-blue-100 w-full p-4 bg-gradient-card backdrop-blur-glass border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] group cursor-pointer truncate hover:text-primary">
      <div className="flex items-center justify-between ">
        <div>
          <h6 className="font-semibold text-foreground text-lg transition-colors truncate hover:text-primary">
            {title}
          </h6>
          <span className="text-xs text-slate-500">
            {date ? moment(date).format("Do MMM YYYY") : "-"}
          </span>
        </div>
      </div>

      <p className="text-md text-muted-foreground line-clamp-1">
        {content?.slice(0, 60)}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
