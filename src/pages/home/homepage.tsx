import "../../index.css";
import HeroSection from "../../components/homepage/herosection";
import FeaturedCategories from "../../components/homepage/featured-categories";
import CategoryBanner from "../../components/homepage/category-banner";

const Homepage = () => {
  return (
    <div className="space-y-20">
      <div className="px-12">
        <HeroSection />
      </div>
      <div className="px-12">
        <CategoryBanner
          heading1="Most Popular For Food and Drinks books"
          boxHeading1="Discount On"
          boxHeading2="Food and Drinks Books"
          buttonValue="Shop Now"
          category="Food & Drinks"
        />
      </div>
      <div className="bg-[#ffefe4] px-12">
        <FeaturedCategories />
      </div>
    </div>
  );
};

export default Homepage;
