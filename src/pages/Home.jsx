/** @format */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../service/hook/input-hook";
import { fetch } from "../service/utils";

import Input from "../service/hook/Input.component";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { MoonLoader } from "react-spinners";
import { fullName, numberReg } from "../service/validations/validation";


const iscourseName = (value) => {
  if (value.trim() === "") {
    return { validated: false, message: "Please Enter Your Course Name." };
  } else if (!fullName.test(value)) {
    return { validated: false, message: "Your Course Name Is Invalid" };
  } else {
    return { validated: true, message: "" };
  }
};

const isCourseID = (value) => {
  if (value.trim() === "") {
    return { validated: false, message: "Please Enter Your Course-ID" };
  } else if (!numberReg.test(value)) {
    return { validated: false, message: "Your Course-ID Is Invalid" };
  } else {
    return { validated: true, message: "" };
  }
};




function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [tenureStart, setTenureStart] = useState("");
  const [tenureStartError, setTenureStartError] = useState("");
  const [tenureEnd, setTenureEnd] = useState("");
  const [tenureEndError, setTenureEndError] = useState("");

  const [courseName, setCourseName] = useState("");
  const [courseID, setCourseID] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");



  const handleChangeDescription = (e) => {
    let slectedValue = e.target.value
    setDescription(slectedValue);
    setDescriptionError("")
  }

  const {
    hasError: hasErrorcourseName,
    enterValue: enterValuecourseName,
    onChangeHandler: onChangeHandlercourseName,
    reset: resetcourseName,
    message: courseNameMessage,
    isTouch: isTouchcourseName,
    onBlurHandler: onBlurHandlercourseName,
  } = useInput(iscourseName, setNetworkError, setCourseName);




  const handleDateTenureStart = (event) => {
    setTenureStart(event.target.value);
    setTenureStartError("")
  };
  const handleDateTenureEnd = (event) => {
    setTenureEnd(event.target.value);
    setTenureEndError("")
  };
  useEffect(() => {
    setNetworkError("");
    setSuccessMessage("")
    setCourseName("");
    setCourseID("");
  }, [enterValuecourseName]);

  const submitHandler = async (e) => {
    // e.preventDefault();
    setIsLoading(true);
    setNetworkError("");

    if (hasErrorcourseName === true ) {
      setIsLoading(false);
      setNetworkError("Please Fill All Fields Appropriately!");
      return false;
    } else if (!isTouchcourseName) {
      if (!isTouchcourseName) {
        setCourseName("Please Enter Your Course Name!");
      }

      setIsLoading(false);
      return false;
    }
    if (!description || description.trim() === "") {
      setDescriptionError("Please Enter Your Course Description!");
      setIsLoading(false);
      return false;
    }
    if (!tenureStart) {
      setTenureStartError("Please Enter Tenure Start Date!");
      setIsLoading(false);
      return false;
    }
    if (!tenureEnd) {
      setTenureEndError("Please Enter Tenure End Date!");
      setIsLoading(false);
      return false;
    }
    const body = {
      coursName: enterValuecourseName,
      description: description,
      tenureStart: tenureStart,
      tenureEnd: tenureEnd,
    }
    try {
      const response = await fetch("/course/add_course", "post", body);
      setIsLoading(false);
      if (response.ok === false) {
        setIsLoading(false);
        setNetworkError(response.data.message);
      } else {
        setIsLoading(false);
        setSuccessMessage(response.data.message);
        // toast.success("Successfully Added An Entry!");
        resetfield()
      }

    } catch (err) {

      setIsLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setNetworkError(err.response.data.message);
      } else {
        setNetworkError("Something Went Wrong. Please Try Again Later.");
      }
    } finally {
    }
  };


  const resetfield = () => {
    setNetworkError("");
    resetcourseName();
    setDescription("")
    setTenureStart("")
    setTenureEnd("")
    setDescriptionError("")
  };


  return (
    <section
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',

      }}
      className="md:h-[100vh] "
    >


      <div className="md:pt-30px] flex min-h-full flex-1 flex-col justify-center px-2 pb-20 pt-6 lg:px-8">

        <div className="w-full">
          <h2 className="-mt-2 text-center text-3xl font-bold leading-28 tracking-tight text-[#0d5781]">
            Create Certification Course
          </h2>
        </div>

        <div className="mt-4 w-full px-10 max-[640px]:px-4 sm:px-24 md:px-32 lg:px-44 xl:px-52  ">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-1 md:grid-cols-2">
              <div className="w-[100%] mt-3">
                <Input
                  type="text"
                  label={
                    <>
                      {"Course Name"}
                      <span className="text-red-600 font-bold"> *</span>
                    </>
                  }
                  placeholder="Enter Course Name"
                  id="cname"
                  name="cname"
                  enterValue={enterValuecourseName}
                  onChangeHandler={onChangeHandlercourseName}
                  hasError={hasErrorcourseName}
                  errorMessage={courseNameMessage}
                  isTouch={courseName}
                  setIsTouch={setCourseName}
                  onBlurHandler={onBlurHandlercourseName}
                />
              </div>


              <div className="w-[100%] mt-3">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-bold leading-6 text-gray-900"
                  >
                    Description
                    <span className="text-red-600 font-bold"> *</span>
                  </label>
                </div>
                <textarea
                  className="w-full p-2 border rounded-[5px] border-gray-300 focus:outline-none focus:ring-2"
                  rows={1}
                  value={description}
                  placeholder="Enter Description"
                  onChange={handleChangeDescription}
                />

                {descriptionError && (
                  <div className="flex ml-[0.5px]">
                    <ExclamationTriangleIcon className="h-4 w-4 mt-[2px] mr-[2px] ml-[0.5px] text-red-600" />{" "}
                    <p className="text-red-600 text-xs leading-16 mt-[0.5px]">
                      {descriptionError}
                    </p>
                  </div>
                )}
              </div>

            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-1 md:grid-cols-2">
              
              <div className="w-[100%] mt-3">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-bold leading-6 text-gray-900"
                  >
                    Tenure Start Date
                    <span className="text-red-600 font-bold"> *</span>
                  </label>
                </div>
                <input
                  type="date"
                  id="dateInput"
                  className="block w-full rounded-md border border-gray-300 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:outline-none transition ease-in-out duration-300  sm:text-sm sm:leading-6 px-3 font-medium"
                  value={tenureStart}
                  onChange={handleDateTenureStart}
                />
                {tenureStartError && (
                  <div className="flex ml-[0.5px]">
                    <ExclamationTriangleIcon className="h-4 w-4 mt-[2px] mr-[2px] ml-[0.5px] text-red-600" />{" "}
                    <p className="text-red-600 text-xs leading-16 mt-[0.5px]">
                      {tenureStartError}
                    </p>
                  </div>
                )}
              </div>

              <div className="w-[100%] mt-3">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-bold leading-6 text-gray-900"
                  >
                    Tenure Start End
                    <span className="text-red-600 font-bold"> *</span>
                  </label>
                </div>
                <input
                  type="date"
                  id="dateInput"
                  className="block w-full rounded-md border border-gray-300 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:outline-none transition ease-in-out duration-300  sm:text-sm sm:leading-6 px-3 font-medium"
                  value={tenureEnd}
                  onChange={handleDateTenureEnd}
                />
                {tenureEndError && (
                  <div className="flex ml-[0.5px]">
                    <ExclamationTriangleIcon className="h-4 w-4 mt-[2px] mr-[2px] ml-[0.5px] text-red-600" />{" "}
                    <p className="text-red-600 text-xs leading-16 mt-[0.5px]">
                      {tenureEndError}
                    </p>
                  </div>
                )}
              </div>
            </div>


            <div className="text-center">
              {isLoading && (
                <strong className="text-blue-800 text-sm  text-center">
                  {isLoading}
                </strong>
              )}
              {networkError && (
                <strong className="text-red-600 text-sm  text-center">
                  {networkError}
                </strong>
              )}
              {successMessage && (
                <strong className="text-green-800 text-sm  text-center">
                  {successMessage}
                </strong>
              )}
            </div>
            <div className="w-full text-center flex items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
                <div>
                  <button
                    type="submit"
                    onClick={() => submitHandler()}
                    disabled={isLoading}
                    className={`flex w-full justify-center rounded-md bg-blue-900  px-3 py-1.5  text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#70a9ca] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10a659] ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }
            }`}
                  >

                    {isLoading === true ?
                      (
                        <MoonLoader
                          color="#0d5781"
                          loading={isLoading}
                          size={20}
                          className="mx-1"
                        />
                      ) : (

                        <>Create Course</>
                      )}
                  </button>
                </div>
                <div>
                  <Link to="/display_course">
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#70a9ca] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10a659]"
                    >
                      View Course
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/add_recipient">
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#70a9ca] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10a659]"
                    >
                      Add Recipient
                    </button>
                  </Link>
                </div>
                <div>
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a62610]"
                    onClick={() => resetfield()}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Home;
