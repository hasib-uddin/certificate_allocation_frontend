import React, { useEffect } from "react";
import { useState } from "react";
import { fetch } from "../service/utils";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import AddTemplateAndBadge from "../components/modals/AddTemplateAndBadge";
import GetCertificates from "../components/modals/GetCertificates";
import AssignCourse from "../components/modals/AssignCourse";

function DisplayRecipient(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [networkError, setNetworkError] = useState("");
    const [getRecipientData, setGetRecipientData] = useState([]);

    const [recipientOpen, setRecipientOpen] = useState(false);
    const [courseOpen, setCourseOpen] = useState(false);


    const [recipientId, setRecipientId] = useState("");
    const [recipientDetaile, setRecipientDetaile] = useState("");


    const getRecipientDetails = async (e) => {
        setIsLoading(true);
        setNetworkError("");
        try {
            //   const token = localStorage.getItem("beenayi_token");
            //   const headers = { Authorization: `Bearer ${token}` };

            const response = await fetch("/recipients/get_recipient", "get", null);
            setIsLoading(false);
            if (response.data.success === false) {
                setIsLoading(false);
                setNetworkError(response.data.message);
            } else {
                setGetRecipientData(response.data.data);
            }
        } catch (err) {
            setIsLoading(false);
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong. Please try again later.";
            setNetworkError(errorMessage);
            console.log(err);
        }
    };

    useEffect(() => {
        getRecipientDetails();
    }, []);
// ================================get certificate===================================
const [getCertificateData, setGetCertificateData] = useState({});
const [loading, setLoading] = useState(false)
const [successMessage, setSuccessMessage] = useState("")
const submithandleBulkRecipient = async (crs) => {
    setLoading(true);
    setNetworkError("");
const recipientId = crs?._id
    try {

        // const token = localStorage.getItem("assign_token");
        // const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(`/course/generate-certificate/${recipientId}`, "post", null);

        if (response.data.success === false) {
            setLoading(false);
            setNetworkError(response.data.message);
        }
        setLoading(false);
        setSuccessMessage(response.data.message);
        console.log(response.data, "42")
        // setPdfUrl(response.data.pdfUrl);
        setGetCertificateData(response.data.recipient)
        setRecipientOpen(true); 
        setRecipientId(crs?._id);
        setRecipientDetaile(crs)


    } catch (err) {
        setLoading(false);
        if (err.response && err.response.data && err.response.data.message) {
            setNetworkError(err.response.data.message);
        } else {
            setNetworkError("Something Went Wrong. Please Try Again Later.");
        }
    }
};

    return (
        <>
            <div className="text-center font-semibold leading-30 mt-2 " style={{ fontSize: "30px" }}></div>
            <section className="px-20 pt-4 pb-20">

                <div className="inline-block w-full  border-[1px] border-gray-300 overflow-auto">
                    <div className="overflow-auto">
                        <div className="flex min-w-full  items-center justify-between py-2 mb-3 bg-[#0091b4]">
                            <div className="font-semibold text-lg px-3 text-white ">
                                Recipient List
                            </div>

                            <Link to="/" className="mr-10">
                                <button
                                    className="px-3 py-[6px]  text-base font-medium text-white bg-blue-900 rounded-md shadow-md focus:outline-none focus:ring-2"

                                >
                                    Add Course
                                </button>
                            </Link>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center h-screen items-center">
                                <PropagateLoader color="#36d7b7" loading={true} size={15} />
                            </div>
                        ) : networkError ? (
                            <div className="text-red-600 text-center mt-16 font-semibold">
                                {networkError}
                            </div>
                        ) : (
                            <table class="table table-hover ">
                                <thead className="bg-[#0091b4] text-white">
                                    <tr>
                                        <th scope="col" className="w-[3%] font-medium">
                                            #
                                        </th>
                                        <th scope="col" className="w-[5%] text-center font-medium">
                                            Course-Id
                                        </th>
                                        <th scope="col" className="w-[15%] font-medium">
                                            Full Name
                                        </th>
                                        <th scope="col" className="w-[30%] text-center font-medium">
                                            Email
                                        </th>

                                        <th scope="col" className="w-[30%] text-center  font-medium">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getRecipientData &&
                                        getRecipientData.length > 0 &&
                                        getRecipientData?.map((crs, ind) => {
                                            return (
                                                <tr key={ind}>
                                                    <td scope="row" className="text-center border-[1px]">{ind + 1}</td>
                                                    <td className="text-center border-[1px] py-3">
                                                        {crs?._id}

                                                    </td>
                                                    <td className="text-center border-[1px]">{crs.name}</td>
                                                    <td className="text-center border-[1px]" >{crs.email}</td>

                                                    <td className="text-center border-[1px]">
                                                        <div className="flex justify-center items-center space-x-2">
                                                            <div  >
                                                                <button className="px-2 text-white bg-blue-900 p-1 rounded-md cursor-pointer" onClick={() => { setCourseOpen(true); setRecipientId(crs?._id); setRecipientDetaile(crs) }}>
                                                                    Assign Course

                                                                </button>

                                                            </div>

                                                            <div  >
                                                                <button className="px-2 text-white bg-green-700 p-1 rounded-md cursor-pointer" onClick={() => {submithandleBulkRecipient(crs);}}>
                                                                    Get Certificate

                                                                </button>

                                                            </div>
                                                        </div>
                                                    </td>

                                                </tr>
                                            );
                                        })}

                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>

            <GetCertificates
                recipientOpen={recipientOpen}
                setRecipientOpen={setRecipientOpen}
                recipientId={recipientId}
                recipientDetaile={recipientDetaile}
                getCertificateData={getCertificateData}
            />
            <AssignCourse
             courseOpen={courseOpen}
             setCourseOpen={setCourseOpen}
             recipientId={recipientId}
             recipientDetaile={recipientDetaile}
            />
        </>
    );
}

export default DisplayRecipient;
