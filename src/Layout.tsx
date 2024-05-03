import { Outlet } from "react-router-dom";
import { ApiCall } from "./utils";
import { Header } from "./Components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./types/state.js";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const hamburger = useSelector((state: RootState) => state.features.hamburger);
  const location = useLocation();
  const [isSecurePage, setIsSecurePage] = useState(false);

  useEffect(() => {
    const sendData = async () => {
      try {
        await ApiCall({
          url: "/api/v1/healthcheck",
          method: "GET",
          data: {},
          debounceTime: 1000,
        });
      } catch (error) {}
    };
    sendData();
  }, []);
  useEffect(() => {
    if (
      location.pathname === "/forgot-password" ||
      /^\/reset-password\/[^/]*$/.test(location.pathname) ||
      /^\/email-verification\/[^/]*$/.test(location.pathname) ||
      location.pathname === "/email-verification"
    ) {
      setIsSecurePage(true);
    } else {
      setIsSecurePage(false);
    }
  }, [location]);

  return (
    <>
      {!isSecurePage && <Header />}
      {hamburger ? "" : <Outlet />}
    </>
  );
};

export default Layout;
