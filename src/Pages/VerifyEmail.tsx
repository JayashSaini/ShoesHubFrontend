import { PrimaryButton } from "../Components";
import blueEnvelope from "../assets/blueEnvelope.jpg";

const VerifyEmail = () => {
  const verifyEmailHandler = () => {};
  return (
    <>
      <div className="w-full h-screen custom-flex">
        <div className="w-full sm:p-16 px-4  h-full custom-flex">
          <div className="md:w-[500px] h-auto px-7 sm:px-16 py-4 border-custom custom-flex flex-col">
            <img
              src={blueEnvelope}
              className="w-[140px] transform rotate-[-15deg]"
              alt="enevelope"
            />
            <form>
              <h2 className="text-[#2957FA] roboto-bold sm:text-3xl text-2xl text-center">
                Verify your email address
              </h2>
              <p className="text-center sm:text-sm text-[12px] text-gray-500 sm:my-3 my-2">
                A verification link sent to your{" "}
                <a href="#" className="text-[#2957FA]">
                  123@gmail.com
                </a>
                <br />
                Please check your email and click on the link provided in the
                email to complete your account registration.
              </p>
              <p className="text-center sm:text-sm text-[12px] text-gray-500 sm:mb-3 mb-2 sm:mt-8 mt-4">
                if you didn't receive the email within the 2 minutes, use the
                button below to resend the verification email
              </p>
              <div className="sm:my-4 my-2 flex flex-col gap-4">
                <PrimaryButton text="Resend OTP" onClick={verifyEmailHandler} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
