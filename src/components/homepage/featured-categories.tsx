import { Link } from "react-router";
import { SlArrowRight } from "react-icons/sl";
import FeaturedCategoriesCarousel from "../carousel/feat-category-carousel";
import CardComponent from "../cards/feat-card";
import { cardsData } from "../../const/data/feat-card";
const FeaturedCategories: React.FC = () => {
  return (
    <div className="pr-6 py-20">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="header1">Featured Categories</h2>
        <Link to={"/allCategories"}>
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
      <div className="flex w-full gap-4 mt-12 border-none">
        {cardsData.map(({ color, heading1, heading2, imgUrl }, index) => (
          <CardComponent
            key={index}
            color={color}
            heading1={heading1}
            heading2={heading2}
            imgUrl={imgUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
