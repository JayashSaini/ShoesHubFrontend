import React from "react";
import { SSOButtonData } from "../types";

const SSOButton: React.FC<SSOButtonData> = ({ onClick }) => {
  return (
    <div className="button-wrapper rounded-lg">
      <button
        onClick={onClick}
        className=" button w-full rounded-md sm:p-3 p-2 text-center text-sm font-medium  flex items-center justify-center gap-2 text-black rounded-lg ">
        <img
          src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
          alt=""
          className="w-[15px] sm:w-[20px]"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default SSOButton;
