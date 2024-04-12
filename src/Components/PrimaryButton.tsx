import React from "react";
import { ButtonData } from "../types";

const PrimaryButton: React.FC<ButtonData> = ({ text = "Click", onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className=" w-full primary-button-bg rounded-md p-3 text-center text-sm font-bold text-white my-3">
        {text}
      </button>
    </div>
  );
};

export default PrimaryButton;
