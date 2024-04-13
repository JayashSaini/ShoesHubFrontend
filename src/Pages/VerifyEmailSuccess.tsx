import { PrimaryButton } from "../Components";
import { useNavigate } from "react-router-dom";

const VerifyEmailSuccess = () => {
  const navigate = useNavigate();

  const verifySuccessHandler = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="w-full h-screen custom-flex">
        <div className="w-full sm:p-16 px-6  h-full custom-flex">
          <div className="md:w-[600px] w-full h-auto px-7 sm:px-16 py-4 border-custom custom-flex flex-col">
            {/* <img
              src={blueEnvelope}
              className="w-[140px] transform rotate-[-15deg] "
              alt="enevelope"
            /> */}
            <form>
              <h2 className="text-[#2957FA] roboto-bold sm:text-3xl text-2xl text-center mt-1">
                Your email has been verified successfully
              </h2>
              <div className="w-full custom-flex sm:my-4 my-4">
                <button
                  className="w-[200px] rounded-lg sm:p-[9px] p-1  text-center sm:text-sm text-[12px] font-bold text-[#2857FA] border-[#2857FA] border-2 hover:scale-[1.02] "
                  onClick={verifySuccessHandler}>
                  Back to Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailSuccess;
