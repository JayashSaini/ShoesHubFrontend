import React, { useState } from "react";
import { MdOutlineSendToMobile } from "react-icons/md";
import { FaInstagram, FaSquareGithub, FaLinkedin } from "react-icons/fa6";
import { ApiCall } from "@/utils";
import { toast, ToastContainer } from "react-toastify";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const subscribeHandler = () => {
    if (!email || email.trim().length === 0) {
      toast.error("Email is required", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }
    if (!email.match(emailRegex)) {
      toast.error("Invalid Email", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    } else {
      ApiCall({
        url: "/api/v1/subscribe/",
        method: "POST",
        data: {
          email: email,
        },
      })
        .then((response) => {
          if (response.data) {
            console.log("response : " + JSON.stringify(response.data));
            const message = response.data.message;
            toast.success(message, {
              position: "top-center",
              autoClose: 4000,
            });
            return;
          }
          if (response.error) {
            const errorMessage = response.error.data.message;
            toast.error(errorMessage, {
              position: "top-center",
              autoClose: 4000,
            });
            return;
          }
        })
        .catch((err) => {
          console.log("error custom" + err);
          toast.error("Try again something went wrong", {
            position: "top-center",
            autoClose: 4000,
          });
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
              Subscribe and Get Your 10% OFF Coupon Today!
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
                className="primary-button-bg sm:p-[9px] p-1 text-center sm:text-sm text-[12px] font-bold text-white button"
                onClick={subscribeHandler}>
                Subscribe
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
            <ul className="  text-base sm:text-white ">
              <li className="mb-2 font-bold">Customer Care</li>
              <li>
                <a href="#"> Start Return</a>
              </li>
              <li>
                <a href="#"> Order Tracking</a>
              </li>
              <li>
                <a href="#"> My Account</a>
              </li>
              <li>
                <a href="#"> FAQ</a>
              </li>
              <li>
                <a href="#"> Contact Us</a>
              </li>
            </ul>
            <ul className="text-base  sm:text-white">
              <li className="mb-2 font-bold">Service</li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Store Locator</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className=" w-full h-auto custom-flex gap-1  text-sm pb-1">
            <MdOutlineSendToMobile /> <span>Call Us: +91 9079830785</span>
          </h3>
          <h2 className="sm:text-sm text-[12px] text-center ">
            Copyright © 2024 by Grupo Shoes Hub. All rights reserved Privacy
            Policy Legal Use Do not sell my personal information
          </h2>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Footer;
