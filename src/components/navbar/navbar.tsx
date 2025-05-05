import { Link, useLocation, useNavigate } from "react-router-dom";
import NavElements from "./navbar-elements";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useState } from "react";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 200);
  };

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const isActive = (path: string): string => {
    return location.pathname === path ? "text-indigo-600" : "text-indigo-900";
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <div className="py-8 max-w-7xl mx-auto flex gap-12 px-4 md:px-2 justify-between md:justify-start">
          <h2 className="text-3xl md:text-4xl font-bold cursor-pointer text-indigo-900">
            BookWorm
          </h2>
          <div className="hidden md:block">
            <NavElements />
          </div>
          {!isMobile ? (
            <GiHamburgerMenu
              fontSize={36}
              className="text-indigo-900 md:hidden cursor-pointer absolute right-5 top-9"
              onClick={toggleMobileMenu}
            />
          ) : (
            <ImCross
              fontSize={30}
              className="text-indigo-900 md:hidden cursor-pointer absolute right-5 top-9"
              onClick={toggleMobileMenu}
            />
          )}
        </div>

        {isMobile && (
          <div className="mobile px-4 pb-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to={"/"}
                  className={`font-medium text-lg ${isActive("/")}`}
                  onClick={() => handleNavigation("/")}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to={"/shop"}
                  className={`font-medium text-lg ${isActive("/books")}`}
                  onClick={() => handleNavigation("/books")}
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className={`font-medium text-lg ${isActive("/about")}`}
                  onClick={() => handleNavigation("/about")}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/categories"}
                  className={`font-medium text-lg ${isActive("/categories")}`}
                  onClick={() => handleNavigation("/categories")}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className={`font-medium text-lg ${isActive("/contact")}`}
                  onClick={() => handleNavigation("/contact")}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
