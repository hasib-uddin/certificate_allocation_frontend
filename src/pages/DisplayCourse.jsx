import React, { useEffect } from "react";
import { useState } from "react";
import { fetch } from "../service/utils";
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import AddTemplateAndBadge from "../components/modals/AddTemplateAndBadge";

function DisplayCourse(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [getCourseData, setGetCourseData] = useState([]);

const [patientId, setPatientId]=useState();
  const [templateOpen, setTemplateOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatient, setFilteredPatient] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase() || "";
    setSearchQuery(query);

    const filtered =
      getCourseData &&
      getCourseData.length > 0 &&
      getCourseData?.filter((crs) =>
        crs?.coursName?.toLowerCase().includes(query)
      );
    setFilteredPatient(filtered);
  };

  const getCourseDetails = async (e) => {
    setIsLoading(true);
    setNetworkError("");

    try {
    //   const token = localStorage.getItem("beenayi_token");
    //   const headers = { Authorization: `Bearer ${token}` };
    
      const response = await fetch("/course/get_course", "get", null);
      setIsLoading(false);
      if (response.data.success === false) {
        setIsLoading(false);
        setNetworkError(response.data.message);
      } else {
        console.log(response.data.data,"48")
        setGetCourseData(response.data.data);
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
    getCourseDetails();
  }, []);
  return (
    <>
      <div className="text-center font-semibold leading-30 mt-2 " style={{ fontSize: "30px" }}></div>
      <section className="px-20 pt-4 pb-20">

        <div className="inline-block w-full  border-[1px] border-gray-300 overflow-auto">
          <div className="overflow-auto">
            <div className="flex min-w-full  items-center justify-between py-2 mb-3 bg-[#0091b4]">
              <div className="font-semibold text-lg px-3 text-white ">
                Course List
              </div>

              <Link to="/" className="mr-10">
                <button
                  className="px-3 py-[6px]  text-base font-medium text-white bg-blue-900 rounded-md shadow-md focus:outline-none focus:ring-2"

                >
                  Add Course
                </button>
              </Link>
            </div>
            {/* <div className="flex min-w-full items-center justify-end  mb-2">
              <div className="border-[1px] border-[#0091b4] w-[30%] rounded-[4px] mr-10">
                <input
                  type="text"
                  placeholder="Search Course Name..."
                  className="px-2 py-[5px] rounded-[4px] w-full "
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

            </div> */}
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
                  Course Name
                  </th>
                  <th scope="col" className="w-[30%] text-center font-medium">
                  Description
                  </th>
                  <th scope="col" className="w-[13%]  font-medium">
                    Start Date
                  </th>
                  <th scope="col" className="w-[13%] text-center  font-medium">
                    End Date
                  </th>
                  {/* <th scope="col" className="w-[10%]  text-center font-medium">
                    Payment
                  </th> */}
                  <th scope="col" className="w-[15%] text-center  font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {getCourseData &&
              getCourseData.length > 0 &&
              getCourseData?.map((crs, ind) => {
                return (
                  <tr key={ind}>
                  <td scope="row" className="text-center border-[1px]">{ind + 1}</td>
                  <td className="text-center border-[1px]">
                    {crs?.courseId}
                  
                  </td>
                  <td className="text-center border-[1px]">{crs.coursName}</td>
                  <td className="text-start border-[1px]" >{crs.description}</td>
                  <td className="text-center border-[1px]">{crs.tenureStart}</td>
                  <td className="text-center border-[1px]">{crs.tenureEnd}</td>

                  <td className="text-center border-[1px]">
                    <div className="flex justify-center items-center space-x-2">
                      <PlusCircleIcon
                        className="w-6 h-6 mx-2 text-blue-500 hover:text-blue-800 cursor-pointer"
                        onClick={() => { setTemplateOpen(true); setCourseId(crs?._id)}}
                      />
                      {/* <TrashIcon
                        className="w-4 h-4 mx-2 text-red-500 hover:text-red-800 cursor-pointer"
                        onClick={() => {setPatientId(pst._id); setDeleteRegForm(true)}}
                      /> */}
                      
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
   
      <AddTemplateAndBadge
      templateOpen={templateOpen}
      setTemplateOpen={setTemplateOpen}
      courseId={courseId}
      />
    </>
  );
}

export default DisplayCourse;
