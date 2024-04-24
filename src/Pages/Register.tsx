import { useState, useEffect, useRef } from "react";
import sidesection from "../assets/sidesection.jpg";
import { Input, PrimaryButton, SSOButton } from "../Components";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { ApiCall } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  //validators variables
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const SSOHandler = () => {
    try {
      window.open(
        "https://shoeshubbackend.onrender.com/api/v1/users/google",
        "_self"
      );
      // window.open("http://localhost:8000/api/v1/users/google", "_self");
    } catch (error) {
      toast.error("Sing in Failed", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };
  const imgRef = useRef(null);
  useEffect(() => {
    gsap.to(imgRef.current, {
      duration: 3,
      opacity: 1,

      ease: "power3.out",
    });
  }, []);

  // validators
  const validateUsername = (username: string) => {
    if (!/^[a-z]+$/.test(username)) {
      setErrorMessage("Username must be in lowercase letters only");
    } else if (username.length < 4) {
      setErrorMessage("Username atlease 4 characters long");
    } else {
      setErrorMessage("");
    }
  };
  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setPasswordErrorMessage("password must be at least 8 characters long");
    } else {
      setPasswordErrorMessage("");
    }
  };

  // register handler
  const registerHandler = async (e: any) => {
    e.preventDefault();

    let error: boolean = false;
    if (confirmPassword !== password) {
      setConfirmPasswordErrorMessage("Confirm password doesn't match");
      error = true;
    }

    try {
      if (!errorMessage && !error) {
        setIsLoading(true);
        const response = await ApiCall({
          url: "/api/v1/users/register",
          method: "POST",
          data: {
            username,
            email,
            password,
            confirmPassword,
            role: "USER",
          },
        });
        setIsLoading(false);
        if (response.data) {
          navigate("/email-verification");
        }
        if (response.error) {
          if (response.error.data.errors) {
            const errorKeys = Object.keys(response.error.data.errors);
            if (errorKeys.length > 0) {
              const firstErrorKey = errorKeys[0];
              const errorObject: object =
                response.error.data.errors[firstErrorKey];
              const errorMessage = Object.values(errorObject)[0];
              toast.error(errorMessage, {
                position: "top-center",
                autoClose: 3000,
              });
            } else if (response.error.data.message) {
              toast.error(response.error.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
              });
            }
          } else if (response.error.data.message) {
            toast.error(response.error.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
            });
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-around items-center">
        <div className="w-[55%] h-full custom-flex md:flex hidden">
          <img
            src={sidesection}
            alt="sidesection"
            className="w-full h-full md:flex hidden opacity-0"
            ref={imgRef}
          />
        </div>
        <div className="w-full md:w-[45%] p-6 md:p-4 h-full custom-flex">
          <div className="w-full md:w-[90%]  sm:w-[60%] w-full h-auto px-4 md:px-8 py-3 border-custom">
            <form onSubmit={registerHandler}>
              <h2 className="roboto-bold sm:text-3xl text-2xl md:text-4xl text-center mb-6">
                Sign up
              </h2>
              <Input
                label="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  validateUsername(e.target.value);
                }}
                type="text"
                placeholder="Username here"
                value={username}
              />
              {errorMessage && (
                <span className="text-red-600 sm:text-xs text-[10px]">
                  {errorMessage}
                </span>
              )}
              <Input
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter your email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                type="password"
                placeholder="At least 8 characters"
                value={password}
              />
              {passwordErrorMessage && (
                <span className="text-red-600 sm:text-xs text-[10px]">
                  {passwordErrorMessage}
                </span>
              )}
              <Input
                label="Confirm password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordErrorMessage("");
                }}
                type="confirmPassword"
                placeholder="Re-enter Password"
                value={confirmPassword}
              />
              {confirmPasswordErrorMessage && (
                <span className="text-red-600 sm:text-xs text-[10px]">
                  {confirmPasswordErrorMessage}
                </span>
              )}
              <div className="sm:my-10 my-6  flex flex-col sm:gap-4 gap-3">
                <PrimaryButton text="Sign up" />
                <SSOButton onClick={SSOHandler} />
              </div>
              <div className="text-center">
                <h3 className="sm:text-sm text-[12px] text-gray-600">
                  Already have an account?&nbsp;
                  <a href="/login" className="text-blue-500 font-bold">
                    Login
                  </a>
                </h3>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>

      {isLoading && (
        <div className="w-full h-screen custom-flex fixed top-0 left-0 bg-white z-50">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4049f8"
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

export default Register;
