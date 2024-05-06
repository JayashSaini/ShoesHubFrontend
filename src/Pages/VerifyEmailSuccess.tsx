import { useNavigate } from "react-router-dom";
import righttick from "../assets/righttick.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiCall } from "../utils";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

const VerifyEmailSuccess = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await ApiCall({
          url: `/api/v1/users/verify-email/${token}`,
          method: "GET",
          data: {},
        });
        setIsLoading(false);
        if (response.data) {
          setEmailVerified(true);
        }
        if (
          response.error &&
          response.error.data &&
          response.error.data.message
        ) {
          toast.error(response.error.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      } catch (error) {
        console.log("verifyemailsuccess error", error);
      }
    })();
  }, []);

  const verifySuccessHandler = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="w-full h-screen custom-flex">
        <div className="w-full sm:p-16 px-6 h-full custom-flex">
          {emailVerified && (
            <div className="md:w-[600px] w-full h-auto px-7 sm:px-16 py-4  custom-flex flex-col">
              <>
                <img
                  src={righttick}
                  className="w-[50px] my-3"
                  alt="successfull"
                />
                <h2 className="text-[#000] roboto-medium sm:text-3xl text-2xl text-center mt-1">
                  Your email has been verified successfully
                </h2>
                <div className="w-full custom-flex sm:my-4 my-4">
                  <button
                    className="w-[200px] rounded-lg sm:p-[9px] p-1 text-center sm:text-sm text-[12px] font-bold text-[#000] border-2 border-black hover:scale-[1.02]"
                    onClick={verifySuccessHandler}>
                    Go Back to Log in
                  </button>
                </div>
              </>
            </div>
          )}
        </div>
      </div>
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

export default VerifyEmailSuccess;
