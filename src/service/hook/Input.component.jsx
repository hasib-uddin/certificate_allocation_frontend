/** @format */

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import React from "react";
// import EyeIcon from "../eye-icon/EyeIcon";

const Input = ({
  type,
  label,
  placeholder,
  id,
  name,
  enterValue,
  onChangeHandler,
  onKeyDownHandler = () => {},
  hasError,
  errorMessage,
  isTouch,
  setIsTouch,
  onBlurHandler,
  handleToggle,
  handleToggleParam,
  subError,
  disabled,
  multiple = false,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="block text-sm font-bold leading-6 text-gray-900"
        >
          {label}
        </label>
      </div>
      <div className="mt-2 flex">
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          className={`block w-full rounded-md border border-gray-300 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:outline-none transition ease-in-out duration-300  sm:text-sm sm:leading-6 px-3 font-medium  ${
            hasError || isTouch || subError
              ? "border-red-600 bg-red-50"
              : "focus:border-[#134c49]"
          }`}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          value={enterValue}
          onBlur={() => {
            onBlurHandler();
            // setIsTouch("");
          }}
          disabled={disabled}
          multiple={multiple && type === "file"}
        />
        {(handleToggleParam === "password" ||
          handleToggleParam === "con-password") && (
          <span
            className="flex justify-around items-center cursor-pointer"
            onClick={() => handleToggle(handleToggleParam)}
          >
            {/* <EyeIcon type={type} /> */}
          </span>
        )}
      </div>
      {hasError && (
        <div className="flex ml-[0.5px]">
          <ExclamationTriangleIcon className="h-4 w-4 mt-[3px] mr-[2px] ml-[0.5px] text-red-600" />{" "}
          <p className="text-red-600 text-xs leading-16 mt-[3.5px]">
            {errorMessage}
          </p>
        </div>
      )}
      {isTouch && (
        <div className="flex ml-[0.5px]">
          <ExclamationTriangleIcon className="h-4 w-4 mt-[3px] mr-[2px] ml-[0.5px] text-red-600" />{" "}
          <p className="text-red-600 text-xs leading-16 mt-[3.5px]">
            {isTouch}
          </p>
        </div>
      )}
    </div>
  );
};

export default Input;
