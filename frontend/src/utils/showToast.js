// src/utils/toast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, type = "default") => {
  switch (type) {
    case "success":
    case "add":
    case "update":
    case "delete":
      toast.success(message || "Operation completed successfully");
      break;

    case "error":
      toast.error(message || "An unexpected error occurred.");
      break;

    case "info":
      toast.info(message);
      break;

    case "warn":
      toast.warn(message);
      break;

    default:
      toast(message);
      break;
  }
};

export default showToast;
