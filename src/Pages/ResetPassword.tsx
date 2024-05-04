import { useState } from "react";
import { Input, PrimaryButton } from "../Components";
import { useNavigate, useParams } from "react-router-dom";
import { ApiCall } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const navigate = useNavigate();
  const { token } = useParams();

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setPasswordErrorMessage("password must be at least 8 characters long");
    } else {
      setPasswordErrorMessage("");
    }
  };
  const resetPasswordHandler = async (e: any) => {
    e.preventDefault();
    if (passwordErrorMessage === "") {
      if (password === confirmPassword) {
        try {
          setIsLoading(true);
          const response = await ApiCall({
            url: `/api/v1/users/reset-password/${token}`,
            method: "POST",
            data: {
              newPassword: password,
              confirmPassword,
            },
          });
          setIsLoading(false);
          if (response.data) {
            toast.success(response.data.message, {
              position: "top-center",
              autoClose: 3000,
            });
            navigate("/login");
          }
          if (response.error) {
            toast.error(response.error.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
            });
          }
        } catch (error) {
          toast.error("Reset Password Failed", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } else {
        toast.error("Password and Confirm Password does not match", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <>
      <>
        <div className="w-full h-screen custom-flex">
          <div className="w-full sm:p-16 px-6  h-full custom-flex">
            <div className="md:w-[500px] w-full h-auto md:px-16  px-8 md:py-10 py-6">
              <form onSubmit={resetPasswordHandler}>
                <h2 className="text-[#000] roboto-bold sm:text-3xl text-2xl text-center">
                  Reset Password
                </h2>

                <Input
                  label="New Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  type="password"
                  placeholder="atleast 8 characters"
                  value={password}
                />
                {passwordErrorMessage && (
                  <span className="text-red-600 sm:text-xs text-[10px]">
                    {passwordErrorMessage}
                  </span>
                )}
                <Input
                  label="Confirm your new password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  type="confirmPassword"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                />

                <div className="sm:my-4 my-2 flex flex-col gap-4">
                  <PrimaryButton text="Reset Password" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
      <ToastContainer />
      {isLoading && (
        <div className="w-full h-screen custom-flex fixed top-0 left-0 bg-white z-50">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#f68c23"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
};

export default ResetPassword;
