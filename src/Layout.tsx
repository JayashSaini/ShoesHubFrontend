import { Outlet } from "react-router-dom";
import { ApiCall } from "./utils";
import { useEffect } from "react";
const Layout = () => {
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
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
