import { useState, useEffect, useRef } from "react";
import { Input, PrimaryButton } from "../Components";
import { ApiCall } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
// import shield from "../assets/shield .png";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [currentState, setCurrentState] = useState("sendEmail");
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // Initialize an array with 6 empty strings for OTP
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const naviagate = useNavigate();

  // OTP Verification
  const handleChange = (
    index: number,
    value: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field if not the last one
      if (index < otpInputs.current.length - 1 && value !== "") {
        otpInputs.current[index + 1]?.focus();
      }
    } else if (e.key === "Backspace" && index > 0) {
      // Move focus to the previous input field on backspace press
      otpInputs.current[index - 1]?.focus();
    }
  };
  useEffect(() => {
    // Set focus to the first input field when the component mounts
    otpInputs.current[0]?.focus();
  }, []);
  // End OTP Verification

  // api's
  const emailHandler = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await ApiCall({
        url: "/api/v1/users/forgot-password",
        method: "POST",
        data: {
          email,
        },
      });
      setIsLoading(false);
      if (res.data) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
        setCurrentState("otpVerification");
      }
      if (res.error) {
        toast.error(res.error.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    } catch (error) {}
  };
  const verifyOtpHandler = async (e: any) => {
    e.preventDefault();
    if (otp.join("").length < 6) {
      toast.error("Invalid OTP", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      try {
        setIsLoading(true);
        const response = await ApiCall({
          url: "/api/v1/users/verify-otp",
          method: "POST",
          data: {
            email: email,
            otp: otp.join(""),
          },
        });
        setIsLoading(false);
        if (response.data) {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 3000,
          });
          naviagate(`/reset-password/${response.data.data.token}`);
        }
        if (response.error) {
          toast.error(response.error.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      } catch (error) {
        toast.error("verify OTP Failed", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <>
      <div className="z-50">
        {currentState === "sendEmail" && (
          <div className="w-full h-screen custom-flex">
            <div className="w-full sm:p-16 px-6  h-full custom-flex">
              <div className="md:w-auto w-full h-auto py-12 px-7 sm:px-10   custom-flex flex-col">
                {/* <img src={shield} className="w-[60px] my-3 " alt="successfull" /> */}
                <form onSubmit={emailHandler}>
                  <h2 className="text-[#000] roboto-bold sm:text-3xl text-2xl text-center">
                    Forgot your Password?
                  </h2>
                  {/* <p className="text-center sm:text-sm text-[12px] text-gray-500 sm:my-3 my-2">
                Please enter your email we will sent a code <br />
                to restart your password
              </p> */}
                  <Input
                    label="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    placeholder="enter your email address"
                    value={email}
                  />

                  <div className="sm:my-4 my-2 flex flex-col gap-4">
                    <PrimaryButton text="Confirm email" />
                  </div>
                  <div className="text-center">
                    <a
                      className="text-[#fa2045] sm:text-sm text-[10px] font-medium"
                      href="/login">
                      Back to log in
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {currentState === "otpVerification" && (
          <div className="w-full h-screen flex justify-center items-center">
            <div className="max-w-[450px] h-auto px-4 sm:px-16 sm:py-8 py-4">
              <form onSubmit={verifyOtpHandler}>
                <h2 className="text-[#000] font-bold sm:text-3xl text-2xl text-center mb-3">
                  OTP Verification!
                </h2>
                <p className="text-center sm:text-sm text-[12px] text-gray-500 mb-6">
                  Enter the 6-digit "OTP" that has been sent <br /> to your
                  email address
                </p>
                <div className="flex justify-center gap-3 my-8">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      value={value}
                      maxLength={1}
                      inputMode="numeric"
                      onChange={(e: any) =>
                        handleChange(index, e.target.value, e)
                      }
                      className="no-arrows sm:w-12 sm:h-12 sm:text-3xl text-2xl w-10 h-10 text-center border rounded-lg border-[#000] "
                      ref={(input) => (otpInputs.current[index] = input)}
                    />
                  ))}
                </div>
                <div className="flex justify-center my-2">
                  <PrimaryButton text="Confirm OTP" />
                </div>
              </form>
            </div>
          </div>
        )}

        <ToastContainer />
        {isLoading && (
          <div className="w-full h-screen custom-flex fixed top-0 left-0 bg-white z-50">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#ce0e2d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
