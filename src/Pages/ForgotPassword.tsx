import { useState } from "react";
import { Input, PrimaryButton } from "../Components";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const otpHandler = () => {
    navigate("/reset-password");
  };
  return (
    <>
      <div className="w-full h-screen custom-flex">
        <div className="w-full sm:p-16 px-4  h-full custom-flex">
          <div className="h-auto px-4 sm:px-16 py-4 border-custom">
            <form>
              <h2 className="text-[#2957FA] roboto-bold sm:text-3xl text-2xl text-center">
                Forgot your Password
              </h2>
              <p className="text-center sm:text-sm text-[12px] text-gray-500 sm:my-3 my-2">
                Your password will be reset by email
              </p>
              <Input
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="enter your email"
                value={email}
              />

              <div className="sm:my-4 my-2 flex flex-col gap-4">
                <PrimaryButton text="Next" onClick={otpHandler} />
              </div>
              <div className="text-center">
                <a
                  className="text-[#2957FA] sm:text-sm text-[12px] font-bold"
                  href="/login">
                  Back to log in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
