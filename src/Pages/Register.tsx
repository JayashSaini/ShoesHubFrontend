import { useState, useEffect, useRef } from "react";
import sidesection from "../assets/sidesection.jpg";
import { Input, PrimaryButton, SSOButton } from "../Components";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const imgRef = useRef(null);

  useEffect(() => {
    gsap.to(imgRef.current, {
      duration: 3,
      opacity: 1,

      ease: "power3.out",
    });
  }, []);

  const registerHandler = () => {
    navigate("/email-verification");
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
        <div className="w-full md:w-[45%] p-2 md:p-4 h-full custom-flex">
          <div className="w-full md:w-[90%]  sm:w-[60%] w-[70%] h-auto px-4 md:px-8 py-3 border-custom">
            <form>
              <h2 className="roboto-bold sm:text-3xl text-2xl md:text-4xl text-center mb-6">
                Sign up
              </h2>
              <Input
                label="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                placeholder="Username here"
                value={username}
              />
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
                }}
                type="password"
                placeholder="At least 8 characters"
                value={password}
              />
              <Input
                label="Confirm password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                type="confirmPassword"
                placeholder="Re-enter Password"
                value={confirmPassword}
              />
              <div className="sm:my-10 my-6  flex flex-col sm:gap-4 gap-3">
                <PrimaryButton text="Sign up" onClick={registerHandler} />
                <SSOButton onClick={() => {}} />
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
      </div>
    </>
  );
};

export default Register;
