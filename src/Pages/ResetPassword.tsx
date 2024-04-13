import { useState } from "react";
import { Input, PrimaryButton } from "../Components";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const resetHandler = () => {
    navigate("/login");
  };
  return (
    <>
      <>
        <div className="w-full h-screen custom-flex">
          <div className="w-full sm:p-16 px-6  h-full custom-flex">
            <div className="md:w-[500px] w-full h-auto md:px-16  px-8 py-4 border-custom">
              <form>
                <h2 className="text-[#2957FA] roboto-bold sm:text-3xl text-2xl text-center">
                  Reset Password
                </h2>

                <Input
                  label="New Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="atleast 8 characters"
                  value={password}
                />
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
                  <PrimaryButton text="Reset Password" onClick={resetHandler} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ResetPassword;
