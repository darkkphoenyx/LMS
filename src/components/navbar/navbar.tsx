import NavElements from "./navbar-elements";

const Navbar = () => {
  return (
    <>
      <div className="px-12 py-8 mx-auto flex gap-12">
        <h2 className="text-3xl font-bold cursor-pointer">BookWorm</h2>
        <NavElements />
      </div>
    </>
  );
};

export default Navbar;
