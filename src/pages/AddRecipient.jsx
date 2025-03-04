/** @format */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../service/hook/input-hook";
import { fetch } from "../service/utils";

import Input from "../service/hook/Input.component";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { MoonLoader } from "react-spinners";
import { emailreg, fullName, numberReg } from "../service/validations/validation";
import AddBulkRecipient from "../components/modals/AddBulkRecipient";


const isNames = (value) => {
  if (value.trim() === "") {
    return { validated: false, message: "Please Enter Your Name." };
  } else if (!fullName.test(value)) {
    return { validated: false, message: "Your Name Is Invalid" };
  } else {
    return { validated: true, message: "" };
  }
};
const isEmails = (value) => {
    if (value.trim() === "") {
      return { validated: false, message: "Please Enter Your Email" };
    } else if (!emailreg.test(value)) {
      return { validated: false, message: "Your Email Is Invalid" };
    } else {
      return { validated: true, message: "" };
    }
  };
const isUniqueId = (value) => {
  if (value.trim() === "") {
    return { validated: false, message: "Please Enter Your Unique-ID" };
  } else if (!numberReg.test(value)) {
    return { validated: false, message: "Your Unique-ID Is Invalid" };
  } else {
    return { validated: true, message: "" };
  }
};




function AddRecipient(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [recipientOpen, setRecipientOpen] = useState(false);

  const [isName, setIsName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  const {
    hasError: hasErrorisName,
    enterValue: enterValueisName,
    onChangeHandler: onChangeHandlerisName,
    reset: resetisName,
    message: isNameMessage,
    isTouch: isTouchisName,
    onBlurHandler: onBlurHandlerisName,
  } = useInput(isNames, setNetworkError, setIsName);

  const {
    hasError: hasErrorisEmail,
    enterValue: enterValueisEmail,
    onChangeHandler: onChangeHandlerisEmail,
    reset: resetisEmail,
    message: isEmailMessage,
    isTouch: isTouchisEmail,
    onBlurHandler: onBlurHandlerisEmail,
  } = useInput(isEmails, setNetworkError, setIsEmail);

  const {
    hasError: hasErrorUniqueId,
    enterValue: enterValueUniqueId,
    onChangeHandler: onChangeHandlerUniqueId,
    reset: resetUniqueId,
    message: UniqueIdMessage,
    isTouch: isTouchUniqueId,
    onBlurHandler: onBlurHandlerUniqueId,
  } = useInput(isUniqueId, setNetworkError, setUniqueId);


 
  useEffect(() => {
    setNetworkError("");
    setSuccessMessage("")
    setIsName("");
    setIsEmail("");
  }, [enterValueisName,enterValueisEmail]);

  const submitHandler = async (e) => {
    // e.preventDefault();
    setIsLoading(true);
    setNetworkError("");

    if (hasErrorisName === true || hasErrorisEmail === true ) {
      setIsLoading(false);
      setNetworkError("Please Fill All Fields Appropriately!");
      return false;
    } else if (!isTouchisName || !isTouchisEmail ) {
      if (!isTouchisName) {
        setIsName("Please Enter Your Name!");
      }
      if (!isTouchisEmail) {
        setIsEmail("Please Enter Your Email!");
      }
    //   if (!isTouchUniqueId) {
    //     setUniqueId("Please Enter Your Unique Id!");
    //   }
      setIsLoading(false);
      return false;
    }
  
    const body = {
        name: enterValueisName,
        email:enterValueisEmail,
        // uniqueId: enterValueUniqueId,
    }
    try {
      const response = await fetch("/recipients/add_recipient", "post", body);
      setIsLoading(false);
      if (response.ok === false) {
        setIsLoading(false);
        setNetworkError(response.data.message);
      } else {
        setIsLoading(false);
        setSuccessMessage(response.data.message);
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
    resetisName();
    resetisEmail();
    // resetUniqueId("")
    setSuccessMessage("")
  };


  return (
    <>
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
          Add Recipient
          </h2>
        </div>

        <div className="mt-4 w-full px-10 max-[640px]:px-4 sm:px-24 md:px-32 lg:px-44 xl:px-60  ">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-1 md:grid-cols-1">
              <div className="w-[100%] mt-3">
                <Input
                  type="text"
                  label={
                    <>
                      {"Name"}
                      <span className="text-red-600 font-bold"> *</span>
                    </>
                  }
                  placeholder="Enter Name"
                  id="name"
                  name="name"
                  enterValue={enterValueisName}
                  onChangeHandler={onChangeHandlerisName}
                  hasError={hasErrorisName}
                  errorMessage={isNameMessage}
                  isTouch={isName}
                  setIsTouch={setIsName}
                  onBlurHandler={onBlurHandlerisName}
                />
              </div>


              <div className="w-[100%] mt-3">
              <Input
                  type="text"
                  label={
                    <>
                      {"Email"}
                      <span className="text-red-600 font-bold"> *</span>
                    </>
                  }
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  enterValue={enterValueisEmail}
                  onChangeHandler={onChangeHandlerisEmail}
                  hasError={hasErrorisEmail}
                  errorMessage={isEmailMessage}
                  isTouch={isEmail}
                  setIsTouch={setIsEmail}
                  onBlurHandler={onBlurHandlerisEmail}
                />
              </div>
              {/* <div className="w-[100%] mt-3">
              <Input
                  type="text"
                  label={
                    <>
                      {"Unique Id"}
                      <span className="text-red-600 font-bold"> *</span>
                    </>
                  }
                  placeholder="Enter Course Name"
                  id="uniqueid"
                  name="uniqueid"
                  enterValue={enterValueUniqueId}
                  onChangeHandler={onChangeHandlerUniqueId}
                  hasError={hasErrorUniqueId}
                  errorMessage={UniqueIdMessage}
                  isTouch={uniqueId}
                  setIsTouch={setUniqueId}
                  onBlurHandler={onBlurHandlerUniqueId}
                />
              </div> */}
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
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-10">
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

                        <>Add Recipient</>
                      )}
                  </button>
                </div>
                <div>
                  <Link to="/">
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#70a9ca] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10a659]"
                    >
                      Create Course
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/display_recipient">
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#70a9ca] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10a659]"
                    >
                      view Recipient
                    </button>
                  </Link>
                </div>
                <div>
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a62610]"
                    onClick={() => setRecipientOpen(true)}>
                    Add Bulk
                  </button>
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
    <AddBulkRecipient 
    recipientOpen={recipientOpen}
    setRecipientOpen={setRecipientOpen}/>
    </>
  );
}

export default AddRecipient;
