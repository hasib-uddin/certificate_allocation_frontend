/** @format */

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { api_url, fetch } from "../service/utils";

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const verifyToken = async (token) => {
    try {
      setIsLoading(true);
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch(`${api_url}/token-info`, "post", null, headers);
      setIsLoading(false);
      if (!response.data.ok) {
        setIsLoading(false);
        localStorage.removeItem("assign_token");
        return;
      } else {
        setIsLoading(false);
        const { tokenData } = response.data;
        const userInfo = tokenData;
      }
    } catch (err) {
      setIsLoading(false);
      localStorage.removeItem("assign_token");
    }
  };
  const token = localStorage.getItem("assign_token");

  useEffect(() => {
    const token = localStorage.getItem("assign_token");
    if (!token) {
      setIsLoading(false);
      localStorage.removeItem("assign_token");
    } else {
      verifyToken(token);
    }
  }, [token]);

  return (
    // <RemoveAdmin>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    // </RemoveAdmin>
  );
};

export default Layout;
