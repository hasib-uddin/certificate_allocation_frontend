import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MoonLoader } from "react-spinners";
import { fetch } from "../../service/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";


export default function AddTemplateAndBadge({
    templateOpen,
    setTemplateOpen,
    courseId
}) {
  const cancelButtonRef = useRef(null);
  const [selectedFileTemplate, setSelectedFileTemplate] = useState(null);
  const [selectedFileBadge, setSelectedFileBadge] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChangeTemplate = (event) => {
    setSelectedFileTemplate(event.target.files[0]);
  };
  const handleFileChangeBadge = (event) => {
    setSelectedFileBadge(event.target.files[0]);
  };

  useEffect(() => {
    setSuccessMessage("");
  }, [templateOpen,courseId]);

  const submithandleBulkRecipient = async () => {
    setLoading(true);
    setNetworkError("");
    setLoadingMessage("adding bulk an Entry...");
    if (!selectedFileTemplate) {
      setLoading(false);
      setNetworkError("Please select Template.");
      return;
    }
    if (!selectedFileBadge) {
        setLoading(false);
        setNetworkError("Please select Badge.");
        return;
      }

    try {
      const formData = new FormData();
      formData.append("template", selectedFileTemplate);
      formData.append("badge", selectedFileBadge);
      const body = formData
      // const token = localStorage.getItem("assign_token");
      // const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch(`/course/add_template/${courseId}`, "post", body);
    
      if (response.ok === false) {
        setLoading(false);
        setNetworkError(response.data.message);
      }
      setLoading(false);
      setSuccessMessage(response.data.message);
      setTemplateOpen(false);


    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setNetworkError(err.response.data.message);
      } else {
        setNetworkError("Something Went Wrong. Please Try Again Later.");
      }
    }
  };

  const addHandler = () => {
    submithandleBulkRecipient();
  };
  const resetfield = () => {
    setNetworkError("");

  };


  return (
    <Transition.Root show={templateOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setTemplateOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="max-[400px]:w-[50%] max-[640px]:w-[90%] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 lg:w-[50%] sm:w-[70%] md:w-[70%] xl:w-[30%]">
                <div className="flex flex-row justify-between items-center">
                  <div className=" px-4 text-start  bg-white">
                    <h2 className="text-gray-600 text-lg font-semibold">
                      Add Temlate & Badge
                    </h2>
                  </div>
                  <div className="px-4 py-3 sm:px-6  ">
                    <button
                      type="button"
                      className="w-full sm:w-auto justify-center rounded-md border border-transparent bg-white px-1 py-1 text-base font-semibold text-gray-900  focus:outline-none  "
                      onClick={() => {
                        setTemplateOpen(false);
                        resetfield();
                      }}
                      ref={cancelButtonRef}
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="ml-[7%] mb-6">

                  <div className="w-[93%] gap-x-2 grid grid-cols-1 max-[640px]:grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="gender"
                          className="block text-sm font-bold leading-6 text-gray-900"
                        >
                          Upload Template
                          <span className="text-red-600 font-bold"> *</span>
                        </label>
                      </div>
                      <input type="file"
                        className="block w-full rounded-md border border-gray-300 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:outline-none transition ease-in-out duration-300  sm:text-sm sm:leading-6 px-3 font-medium"
                        onChange={handleFileChangeTemplate} 
                        />

                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="gender"
                          className="block text-sm font-bold leading-6 text-gray-900"
                        >
                          Upload Badge
                          <span className="text-red-600 font-bold"> *</span>
                        </label>
                      </div>
                      <input type="file"
                        className="block w-full rounded-md border border-gray-300 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:outline-none transition ease-in-out duration-300  sm:text-sm sm:leading-6 px-3 font-medium"
                        onChange={handleFileChangeBadge} />

                    </div>
                  </div>
                </div>


                <div className="text-center">
                  {loading && (
                    <strong className="text-blue-800 text-sm  text-center">
                      {loadingMessage}
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
                <div className=" bg-gray-50 px-4 py-3 mb-4 mt-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    disabled={loading}
                    className="inline-flex ml-[4%] w-[92%] justify-center rounded-md  px-3 py-2 text-sm font-medium text-white shadow-sm sm:ml-3 sm:w-auto mt-[15px] bg-[#10a659] hover:bg-[#0d5781] "
                    onClick={() => {
                      addHandler();
                    }}
                  >
                    {loading === true ?
                      (
                        <MoonLoader
                          color="#fff"
                          loading={loading}
                          size={20}
                          className="mx-1"
                        />
                      ) : (

                        <>Add</>
                      )}
                  </button>
                  <button
                    type="button"
                    className="inline-flex ml-[4%] w-[92%] justify-center rounded-md  px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:ml-3 sm:w-auto mt-[15px] bg-white hover:bg-gray-50  "
                    onClick={() => {
                      resetfield();
                      setTemplateOpen(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}