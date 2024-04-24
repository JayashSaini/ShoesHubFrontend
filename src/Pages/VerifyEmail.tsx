import { useEffect, useState } from "react";
import { PrimaryButton } from "../Components";
import blueEnvelope from "../assets/blueEnvelope.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ApiCall } from "../utils";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

const VerifyEmail = () => {
  const userEmail = useSelector((state: any) => state.user.user?.email);
  const [email, setEmail] = useState<string>(userEmail || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userEmail || userEmail.trim().length === 0) {
      navigate("/login");
    }
    setEmail(userEmail);
  }, []);

  const resendEmailVerificationHandler = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await ApiCall({
        url: "/api/v1/users/resend-verify-email",
        method: "POST",
        data: {
          email,
        },
      });
      setIsLoading(false);
      if (response.data) {
        const message: string = response.data?.message;
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
        });
      } else if (response.error.data.message) {
        toast.error(response.error.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
        });
      } else {
        console.log("else part");
      }
    } catch (error) {
      console.log("verify email error: " + error);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full sm:p-16 px-4 h-full flex justify-center items-center">
        <div className="md:w-[500px] h-auto px-7 sm:px-16 sm:py-10 py-6 border-custom flex flex-col items-center">
          <img
            src={blueEnvelope}
            className="sm:w-[80px] w-[60px] "
            alt="envelope"
          />
          <form onSubmit={resendEmailVerificationHandler} className="w-full">
            <h2 className="text-[#2957FA] font-bold text-2xl sm:text-3xl text-center mt-4">
              Verify your email address
            </h2>
            <p className="text-center text-xs sm:text-sm text-gray-500 my-4">
              A verification link has been sent to your email address:{" "}
              <span className="text-blue-500">{email}</span>
              <br />
              Please check your email and click on the link provided to complete
              your account registration.
            </p>
            <div className="flex justify-center">
              <PrimaryButton text="Resend" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      {isLoading && (
        <div className="w-full h-screen custom-flex fixed top-0 left-0 bg-white z-50">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4049f8"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
