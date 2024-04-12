import { useState, useRef, useEffect } from "react";
import { PrimaryButton } from "../Components";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // Initialize an array with 6 empty strings for OTP

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field if not the last one
      if (index < otpInputs.current.length - 1) {
        otpInputs.current[index + 1]?.focus();
      }
    }
  };

  useEffect(() => {
    // Set focus to the first input field when the component mounts
    otpInputs.current[0]?.focus();
  }, []);

  const resetHandler = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="w-full h-screen custom-flex">
        <div className="w-full p-3 h-full custom-flex">
          <div className=" max-w-[450px] h-auto  px-4 sm:px-8 sm:px-16 py-4 border-custom">
            <form>
              <h2 className="text-[#2957FA] roboto-bold text-3xl text-center">
                Reset Password
              </h2>
              <p className="text-center text-sm text-gray-500 my-3">
                Enter the code that has been sent to your email address
              </p>
              <div className="flex justify-center sm:gap-4 gap-3">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    value={value}
                    maxLength={1}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="no-arrows sm:w-12 sm:h-12 w-9 h-9 text-3xl text-center border border-gray-300 rounded-lg"
                    ref={(input) => (otpInputs.current[index] = input)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && index < otp.length - 1) {
                        otpInputs.current[index + 1]?.focus();
                      }
                    }}
                  />
                ))}
              </div>
              <div className="my-4 flex flex-col gap-4">
                <PrimaryButton text="Confirm" onClick={resetHandler} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
