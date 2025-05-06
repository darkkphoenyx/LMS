import { Link } from "react-router";
import { SlArrowRight } from "react-icons/sl";
import FeaturedCategoriesCarousel from "../carousel/feat-category-carousel";
import CardComponent from "../cards/feat-card";
import { cardsData } from "../../const/data/feat-card";
const FeaturedCategories: React.FC = () => {
  return (
    <div className="py-20 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-center md:justify-between flex-wrap md:flex-nowrap flex-col md:flex-row">
        <h2 className="header1">Featured Categories</h2>
        <Link to={"/books"}>
          <p className="text-red-500 gap-2 flex items-center">
            All Categories
            <SlArrowRight style={{ strokeWidth: 2 }} />
          </p>
        </Link>
      </div>

      {/* Middle Categories Section (Carousel) */}
      <div className="py-8">
        <FeaturedCategoriesCarousel />
      </div>

      {/* Featured Cards Section */}
      <div className="flex w-full gap-4 mt-12 border-none flex-wrap md:flex-nowrap px-4 md:px-0">
        {cardsData.map((card) => (
          <CardComponent {...card} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
