import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MoonLoader } from "react-spinners";
import { fetch } from "../../service/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";


export default function GetCertificates({
    recipientOpen,
    setRecipientOpen,
    recipientId,
    recipientDetaile,
    getCertificateData
}) {
    const cancelButtonRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [networkError, setNetworkError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");
   



    useEffect(() => {
        setSuccessMessage("");
    }, [recipientOpen, recipientId]);

    // const submithandleBulkRecipient = async () => {
    //     setLoading(true);
    //     setNetworkError("");

    //     try {

    //         // const token = localStorage.getItem("assign_token");
    //         // const headers = { Authorization: `Bearer ${token}` };
    //         const response = await fetch(`/course/generate-certificate/${recipientId}`, "post", null);

    //         if (response.data.success === false) {
    //             setLoading(false);
    //             setNetworkError(response.data.message);
    //         }
    //         setLoading(false);
    //         setSuccessMessage(response.data.message);
    //         console.log(response.data, "42")
    //         setPdfUrl(response.data.pdfUrl);
    //         setGetCertificateData(response.data.recipient)
    //         // setRecipientOpen(false);


    //     } catch (err) {
    //         setLoading(false);
    //         if (err.response && err.response.data && err.response.data.message) {
    //             setNetworkError(err.response.data.message);
    //         } else {
    //             setNetworkError("Something Went Wrong. Please Try Again Later.");
    //         }
    //     }
    // };

    const addHandler = () => {
        // submithandleBulkRecipient();
    };
    const resetfield = () => {
        setNetworkError("");

    };


    return (
        <Transition.Root show={recipientOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setRecipientOpen}
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
                            <Dialog.Panel className="max-[400px]:w-[50%] max-[640px]:w-[90%] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 lg:w-[80%] sm:w-[90%] md:w-[80%] xl:w-[60%]">
                                <div className="flex flex-row justify-between items-center">
                                    <div className=" px-4 text-start  bg-white">
                                        <h2 className="text-gray-600 text-lg font-semibold">
                                            Get Recipient Certificates
                                        </h2>
                                    </div>
                                    <div className="px-4 py-3 sm:px-6  ">
                                        <button
                                            type="button"
                                            className="w-full sm:w-auto justify-center rounded-md border border-transparent bg-white px-1 py-1 text-base font-semibold text-gray-900  focus:outline-none  "
                                            onClick={() => {
                                                setRecipientOpen(false);
                                                resetfield();
                                            }}
                                            ref={cancelButtonRef}
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="ml-[7%] mb-6">
                                    <div class="px-2 py-4">
                                        <div class="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
                                            <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">Certificate Information</h1>
                                            <div class="text-center mb-4">
                                                <h2 class="text-xl font-semibold text-gray-700">{getCertificateData?.name}</h2>
                                                <p class="text-gray-500">{getCertificateData?.email}</p>
                                            </div>
                                            <div class="mb-4">
                                                <h3 class="text-lg font-semibold text-gray-800">Course: <span class="text-blue-600">{getCertificateData?.course?.name}</span></h3>
                                                <p class="text-gray-600">{getCertificateData?.course?.description}</p>
                                                <p class="text-gray-600">Tenure: <strong>{getCertificateData?.course?.tenureStart}</strong> to <strong>{getCertificateData?.course?.tenureEnd}</strong></p>
                                            </div>
                                            <div class="mb-4">
                                                <h3 class="text-lg font-semibold text-gray-800">QR Code</h3>
                                                <img src={getCertificateData?.qrCodeUrl} alt="QR Code" class="mx-auto w-32 h-32"/>
                                            </div>
                                            <div class="text-center">
                                                <a target="_blank" 
                                                href={`http://localhost:4000/id=${getCertificateData?.id}`} 
                                                 className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Download Certificate</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {pdfUrl && (
                                            <div>
                                                <p>Certificate is ready!</p>
                                                <a href={pdfUrl} download target="_blank">
                                                    <button>Download Certificate</button>
                                                </a>
                                            </div>
                                        )}
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

                                                <>Get </>
                                            )}
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex ml-[4%] w-[92%] justify-center rounded-md  px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:ml-3 sm:w-auto mt-[15px] bg-white hover:bg-gray-50  "
                                        onClick={() => {
                                            resetfield();
                                            setRecipientOpen(false);
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