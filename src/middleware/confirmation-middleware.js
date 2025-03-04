import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { clearUser, setUser } from "../../redux/features/userSlice";
import { PropagateLoader } from "react-spinners";
import { api_admin_url } from "../../service/utils";

const ConfirmationMiddleware = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("assign_token");
    if (!token) {
      setIsLoading(false);
      setIsTokenValid(false);
      localStorage.removeItem("assign_token");
      dispatch(clearUser());
    } else {
      fetch(`${api_admin_url}/token-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data.ok) {
            setIsLoading(false);
            setIsTokenValid(false);
            dispatch(clearUser());
            localStorage.removeItem("assign_token");
          } else {
            setIsLoading(false);
            const { tokenData } = data;
            const userInfo = tokenData;
            setIsTokenValid(true);
            dispatch(setUser(userInfo));
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setIsTokenValid(false);
          localStorage.removeItem("assign_token");
          dispatch(clearUser());
        });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-40 mb-44">
        <PropagateLoader color="#36d7b7" loading={true} size={15} />
        <br />
      </div>
    );
  } else if (!isTokenValid) {
    return <Navigate to="/registrationDashboard" />;
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};

export default ConfirmationMiddleware;
