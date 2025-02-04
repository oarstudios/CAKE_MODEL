import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useNotify = () => {
  const notify = (message, type) => {
    const config = {
      theme: "light",
      className: `toast-custom`, // Use type here for styling
      autoClose: 5000, // You can adjust the autoClose time as needed
      pauseOnHover: true, // Allows pausing the toast when hovered
      closeButton: true, // Adds a close button for the toast
    };

    // Dismiss all toasts before showing a new one
    toast.dismiss();

    if (type === "success") {
      toast.success(message, config);
    } else if (type === "error") {
      toast.error(message, config);
    } else if (type === "info") {
      toast.info(message, config);
    }
  };

  return { notify };
};

export default useNotify;
