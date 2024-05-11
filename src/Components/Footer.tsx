import React, { useState } from "react";
import { MdOutlineSendToMobile } from "react-icons/md";
import { FaInstagram, FaSquareGithub, FaLinkedin } from "react-icons/fa6";
import { ApiCall } from "@/utils";
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isLoading, setIsLoading] = useState(false);

  const subscribeHandler = () => {
    if (!email || email.trim().length === 0) {
      toast.error("Email is required");
      return;
    }
    if (!email.match(emailRegex)) {
      toast.error("Invalid Email");
      return;
    } else {
      setIsLoading(true);
      ApiCall({
        url: "/api/v1/subscribe/",
        method: "POST",
        data: {
          email: email,
        },
      })
        .then((response) => {
          if (response.data) {
            const message = response.data.message;
            setIsLoading(false);
            toast.success(message);
            return;
          }
          if (response.error) {
            setIsLoading(false);
            const errorMessage = response.error.data.message;
            toast.error(errorMessage);
            return;
          }
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("Try again something went wrong");
          return;
        });
    }
  };

  return (
    <div className="w-full py-10 px-5 custom-flex bg-black text-white">
      <div className="sm:max-w-[75%] w-full">
        <div className="w-full flex md:flex-row flex-col sm:py-10 py-3">
          <div className="md:w-[45%] w-full md:p-2">
            <h2 className="text-base font-medium">NEWSLETTER</h2>
            <p className="text-base font-normal my-2">
              Subscribe and Get Your Rs.500 FLAT OFF Coupon Today!
            </p>
            <div className="flex h-auto w-full my-4 max-w-[400px]">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                className="w-full sm:p-[9px] p-2 text-black text-sm focus:outline-none"
              />
              <button
                className="primary-button-bg min-w-20 sm:p-[9px] p-1 text-center sm:text-sm text-[12px] font-bold text-white button custom-flex"
                onClick={subscribeHandler}>
                {isLoading ? (
                  <TailSpin
                    visible={true}
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
            <div className="flex gap-2 py-2 text-xl text-black ">
              <a
                href="https://www.linkedin.com/in/jayash-saini-371bb0267/"
                className="p-3 bg-gray-100 rounded-full"
                target="_blank"
                rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/JayashSaini/"
                className="p-3 bg-gray-100 rounded-full"
                target="_blank"
                rel="noopener noreferrer">
                <FaSquareGithub />
              </a>
              <a
                href="https://www.instagram.com/jayash_7361/"
                className="p-3 bg-gray-100 rounded-full"
                target="_blank"
                rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="md:w-[55%] w-full md:px-16 flex sm:flex-row flex-col sm:gap-16 px-2 py-5  gap-5 ">
            <ul className="  sm:text-base text-sm text-white ">
              <li className="mb-2 font-bold">Customer Care</li>
              <li>
                <Link to="#"> Start Return</Link>
              </li>
              <li>
                <Link to="#"> Order Tracking</Link>
              </li>
              <li>
                <Link to="#"> My Account</Link>
              </li>
              <li>
                <Link to="#"> FAQ</Link>
              </li>
              <li>
                <Link to="#"> Contact Us</Link>
              </li>
            </ul>
            <ul className="sm:text-base text-sm text-white">
              <li className="mb-2 font-bold">Service</li>
              <li>
                <Link to="#">About Us</Link>
              </li>
              <li>
                <Link to="#">Store Locator</Link>
              </li>
              <li>
                <Link to="#">Careers</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className=" w-full h-auto custom-flex gap-1  sm:text-sm text-[10px] pb-1">
            <MdOutlineSendToMobile /> <span>Call Us: +91 9079830785</span>
          </h3>
          <h2 className="sm:text-sm text-[9px] text-center ">
            Copyright © 2024 by Group Shoes Hub. All rights reserved Privacy
            Policy Legal Use Do not sell my personal information
          </h2>
        </div>
      </div>
      <Toaster position="top-center" className="bg-black" />
    </div>
  );
};

export default Footer;
