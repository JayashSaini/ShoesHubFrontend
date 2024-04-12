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
        <div className="w-full p-16 h-full custom-flex">
          <div className="h-auto px-8 sm:px-16 py-4 border-custom">
            <form>
              <h2 className="text-[#2957FA] roboto-bold text-3xl text-center">
                Forgot your Password
              </h2>
              <p className="text-center text-sm text-gray-500 my-3">
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

              <div className="my-4 flex flex-col gap-4">
                <PrimaryButton text="Next" onClick={otpHandler} />
              </div>
              <div className="text-center">
                <a
                  className="text-[#2957FA] text-[15px] font-bold"
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
