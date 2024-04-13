import React, { useState, useRef, useEffect } from "react";
import { PrimaryButton } from "../Components";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // Initialize an array with 6 empty strings for OTP

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

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

  const otpHandler = () => {
    navigate("/reset-password");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[450px] h-auto px-4 sm:px-16 sm:py-8 py-4 border-custom">
        <form>
          <h2 className="text-[#2957FA] font-bold text-3xl text-center mb-3">
            OTP Verification!
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Enter the 6-digit "OTP" that has been sent <br /> to your email
            address
          </p>
          <div className="flex justify-center gap-3 my-8">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                maxLength={1}
                inputMode="numeric"
                onChange={(e: any) => handleChange(index, e.target.value, e)}
                className="no-arrows w-9 h-9 text-3xl text-center border rounded-lg border-[#2957FA] "
                ref={(input) => (otpInputs.current[index] = input)}
              />
            ))}
          </div>
          <div className="flex justify-center my-2">
            <PrimaryButton text="Confirm OTP" onClick={otpHandler} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
