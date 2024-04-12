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
      <div className="w-full my-1 mt-5 relative">
        <label className="text-[16px]">{label}</label>
        <br />
        <input
          type={type === "password" ? inputType : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="p-3 remove-arrow w-full border-gray-300 hover:border-gray-400 border-2 rounded-md text-gray-800 p-1 appearance-none roboto-light text-sm tracking-wider focus:border-gray-400 outline-none duration-200 ease-out"
        />
        {type === "password" && ( // Conditionally render eye button section
          <button
            type="button"
            className="w-auto absolute top-1/2 right-2 transform -translate-y-1/3 h-full px-3 flex items-center"
            onClick={togglePasswordVisibility}>
            {showPassword ? (
              <span className="material-symbols-outlined">visibility</span>
            ) : (
              <span className="material-symbols-outlined">visibility_off</span>
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default Input;
