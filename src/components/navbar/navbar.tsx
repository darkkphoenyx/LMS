import NavElements from "./navbar-elements";

const Navbar = () => {
  return (
    <>
      <div className="py-8 max-w-7xl mx-auto flex gap-12">
        <h2 className="text-3xl font-bold cursor-pointer">BookWorm</h2>
        <NavElements />
      </div>
    </>
  );
};

export default Navbar;
