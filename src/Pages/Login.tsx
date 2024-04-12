import { useState, useEffect, useRef } from "react";
import sidesection from "../assets/sidesection.jpg";
import { Input, PrimaryButton, SSOButton } from "../Components";
import { gsap } from "gsap";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const imgRef = useRef(null);

  useEffect(() => {
    gsap.to(imgRef.current, {
      duration: 3,
      opacity: 1,

      ease: "power3.out",
    });
  }, []);

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
        <div className="w-[45%] p-16 h-full custom-flex">
          <div className="w-full min-w-[300px] h-auto px-8 py-3 border-custom">
            <form>
              <h2 className="roboto-bold text-4xl text-center">Log in</h2>
              <Input
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="enter your email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="atleast 8 characters"
                value={password}
              />
              <div className="text-right">
                <a
                  className="text-[#2957FA] text-sm font-medium"
                  href="/forgot-password">
                  Forgot Password?
                </a>
              </div>
              <div className="my-10 flex flex-col gap-4">
                <PrimaryButton text="Log in" onClick={() => {}} />
                <SSOButton onClick={() => {}} />
              </div>
              <div className="text-center">
                <h3 className="text-sm text-[#696969]">
                  Don't have an account? &nbsp;
                  <a
                    className="text-[#2957FA] text-[15px] font-bold"
                    href="/register">
                    Register
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

export default Login;
