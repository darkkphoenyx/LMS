import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
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

  return (
    <footer className="bg-indigo-900 text-white py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-4">© 2025 BookWorm. All rights reserved.</p>
        <ul className="flex justify-center space-x-4 mb-4">
          <li>
            <Link
              to={"/"}
              className="hover:underline"
              onClick={() => handleNavigation("/")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/about"}
              className="hover:underline"
              onClick={() => handleNavigation("/about")}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={"/shop"}
              className="hover:underline"
              onClick={() => handleNavigation("/shop")}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to={"/categories"}
              className="hover:underline"
              onClick={() => handleNavigation("/categories")}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to={"/contact"}
              className="hover:underline"
              onClick={() => handleNavigation("/contact")}
            >
              Contact
            </Link>
          </li>
        </ul>
        <p>Chabahil, Kathmandu | Phone: (+977) 123-4567</p>
      </div>
    </footer>
  );
};

export default Footer;
