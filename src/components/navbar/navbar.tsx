import NavElements from "./navbar-elements";

const Navbar = () => {
  return (
    <>
      <div className=" sticky top-0 z-50 bg-white">
        <div className="py-8 max-w-7xl mx-auto flex gap-12 px-2 md:px-2">
          <h2 className="text-4xl font-bold cursor-pointer text-indigo-900">
            BookWorm
          </h2>
          <div className="hidden md:block">
            <NavElements />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
