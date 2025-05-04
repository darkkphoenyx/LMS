import { Outlet } from "react-router";
import Navbar from "./components/navbar/navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
