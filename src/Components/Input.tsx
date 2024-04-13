import React, { useState } from "react";
import { InputData } from "../types";

const Input: React.FC<InputData> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType: string =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <>
      <div className="w-full my-1 sm:mt-5 mt-2 relative">
        <label className="sm:text-[16px] text-[12px]">{label}</label>
        <br />
        <input
          type={type === "password" ? inputType : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="sm:p-3 p-[5px] remove-arrow w-full border-gray-300 hover:border-gray-400 border-2 rounded-md text-gray-800  appearance-none  sm:text-sm text-[10px] tracking-wider focus:border-gray-400 outline-none duration-200 ease-out"
        />
        {type === "password" && ( // Conditionally render eye button section
          <button
            type="button"
            className="w-auto absolute top-1/2 sm:right-2 right-0  transform -translate-y-1/3 h-full px-3 flex items-center"
            onClick={togglePasswordVisibility}>
            {showPassword ? (
              <span className="material-symbols-outlined text-sm sm:text-xl text-gray-400">
                visibility
              </span>
            ) : (
              <span className="material-symbols-outlined  text-sm sm:text-xl text-gray-400">
                visibility_off
              </span>
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default Input;
