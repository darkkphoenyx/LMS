import { Link } from "react-router";

const FeaturedCategories = () => {
  return (
    <div>
      <h2 className="header1">Featured Categories</h2>
      <Link to={"/allCategories"}>
        <p className="text-red-500 text-sm">All Categories</p>
      </Link>
    </div>
  );
};

export default FeaturedCategories;
