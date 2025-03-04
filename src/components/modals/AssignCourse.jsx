import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MoonLoader } from "react-spinners";
import { fetch } from "../../service/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";


export default function AssignCourse({
    courseOpen,
    setCourseOpen,
    recipientId,
    recipientDetaile
}) {
    const cancelButtonRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [networkError, setNetworkError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedCourseError, setSelectedCourseError] = useState("");


    const handleSelectChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    useEffect(() => {
        setSuccessMessage("");
    }, [courseOpen, recipientId]);

    const submithandlerAssignCourse = async () => {
        setLoading(true);
        setNetworkError("");
        if (!selectedCourse) {
            setIsLoading(false);
            setSelectedCourseError("Please Select Course!");
            return false;
        }
        try {
            const body = {
                recipientId,
                courseId: selectedCourse
            }

            // const token = localStorage.getItem("assign_token");
            // const headers = { Authorization: `Bearer ${token}` };
            const response = await fetch(`/recipients/assign_course`, "post", body);

            if (response.ok === false) {
                setLoading(false);
                setNetworkError(response.data.message);
            }
            setLoading(false);
            setSuccessMessage(response.data.message);
            // setPdfUrl(response.data.data.pdfUrl);
            setCourseOpen(false);


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
        submithandlerAssignCourse();
    };
    const resetfield = () => {
        setNetworkError("");

    };

    // ================================================course Data=======================
    const [isLoading, setIsLoading] = useState(false);
    const [networkErrorG, setNetworkErrorG] = useState("");
    const [getCourseData, setGetCourseData] = useState([]);

    const getCourseDetails = async (e) => {
        setIsLoading(true);
        setNetworkErrorG("");

        try {
            //   const token = localStorage.getItem("beenayi_token");
            //   const headers = { Authorization: `Bearer ${token}` };

            const response = await fetch("/course/get_course", "get", null);
            setIsLoading(false);
            if (response.data.success === false) {
                setIsLoading(false);
                setNetworkErrorG(response.data.message);
            } else {
                setIsLoading(false);

                setGetCourseData(response.data.data);
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong. Please try again later.";
            setNetworkErrorG(errorMessage);
            console.log(err);
        }
    };

    useEffect(() => {
        getCourseDetails();
    }, []);
    return (
        <Transition.Root show={courseOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setCourseOpen}
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
                                            Assign Course
                                        </h2>
                                    </div>
                                    <div className="px-4 py-3 sm:px-6  ">
                                        <button
                                            type="button"
                                            className="w-full sm:w-auto justify-center rounded-md border border-transparent bg-white px-1 py-1 text-base font-semibold text-gray-900  focus:outline-none  "
                                            onClick={() => {
                                                setCourseOpen(false);
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
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    {recipientDetaile?.name}  {recipientDetaile?.email}
                                                </label>
                                            </div>

                                        </div>
                                        <div className="mt-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <label
                                                    htmlFor="gender"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Select Course

                                                </label>
                                            </div>
                                            <select value={selectedCourse} onChange={handleSelectChange}
                                                className=" w-full rounded-md border border-gray-300 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:outline-none transition ease-in-out duration-300  sm:text-sm sm:leading-6 px-3 font-medium ">
                                                <option value="" disabled>Select a course</option>
                                                {getCourseData.map((cr) => (
                                                    <option key={cr._id} value={cr._id}>
                                                        {cr?.coursName}
                                                    </option>
                                                ))}
                                            </select>



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

                                                <>Assign Course</>
                                            )}
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex ml-[4%] w-[92%] justify-center rounded-md  px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:ml-3 sm:w-auto mt-[15px] bg-white hover:bg-gray-50  "
                                        onClick={() => {
                                            resetfield();
                                            setCourseOpen(false);
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