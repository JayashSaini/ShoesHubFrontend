import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ErrorMessage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedError = queryParams.get("error");
  const error = decodeURIComponent(encodedError || "");

  useEffect(() => {
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
    });
    const timeout = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error, navigate]); // Include error and navigate in the dependency array

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default ErrorMessage;
