import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useNotify = () => {
  const notify = (message, type) => {
    const config = {
      theme: "light",
      className: `toast-custom` // Use type here for styling
    };

    if (type === "success") {
      toast.success(message, config);
    } else if (type === "error") {
      toast.error(message, config);
    }else if (type === "info") {
      toast.info(message, config);
    } else {
      toast(message, config); // Default toast for other types
    }
  };

  return { notify };
};

export default useNotify;
