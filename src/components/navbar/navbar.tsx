import { Link, useLocation, useNavigate } from "react-router-dom";
import NavElements from "./navbar-elements";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { IoSearchOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import UserAvatar from "../UserAvatar";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Load user data on mount and when localStorage changes
  useEffect(() => {
    const loadUserData = () => {
      const userString = localStorage.getItem("user");
      if (userString) {
        const userData = JSON.parse(userString);
        setUser({
          name: userData.name,
          email: userData.email
        });
      } else {
        setUser(null);
      }
    };

    // Load initial data
    loadUserData();

    // Add event listener for storage changes
    window.addEventListener('storage', loadUserData);

    return () => {
      window.removeEventListener('storage', loadUserData);
    };
  }, []);

  const handleSignOut = () => {
    setUser(null);
  };

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
        <div className="py-8 max-w-7xl mx-auto flex gap-12 px-4 md:px-0 justify-between md:justify-start">
          <Link to={"/"} onClick={() => handleNavigation("/")}>
            <h2 className="text-3xl md:text-4xl font-bold cursor-pointer text-indigo-900">
              BookWorm
            </h2>
          </Link>
          <div className="hidden md:block">
            <NavElements />
          </div>
          <div className="hidden lg:flex gap-10">
            <div className="flex items-center justify-between border rounded-sm px-4 text-gray-400">
              <input
                className="outline-none p-2"
                type="text"
                placeholder="Search..."
              />
              <IoSearchOutline fontSize={28} />
            </div>
            <div className="flex items-center gap-4">
              <FaHeart className="cursor-pointer text-gray-400" fontSize={28} />
              <IoMdCart className="cursor-pointer" fontSize={30} />
            </div>
            <div className="flex items-center">
              {user ? (
                <UserAvatar 
                  name={user.name} 
                  email={user.email} 
                  onSignOut={handleSignOut}
                />
              ) : (
                <Link to={"/login"}>
                  <Button className="button1">Login</Button>
                </Link>
              )}
            </div>
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
            <ul className="space-y-4 text-center">
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
                  to={"/books"}
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
                  to={"/contact"}
                  className={`font-medium text-lg ${isActive("/contact")}`}
                  onClick={() => handleNavigation("/contact")}
                >
                  Contact
                </Link>
              </li>
              <li className="flex justify-center">
                {user ? (
                  <UserAvatar 
                    name={user.name} 
                    email={user.email}
                    onSignOut={handleSignOut}
                    isMobile={true}
                  />
                ) : (
                  <Link to={"/login"}>
                    <Button className="button1">Login</Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
