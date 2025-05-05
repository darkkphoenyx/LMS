import { Outlet } from "react-router";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
