import FeaturedCategories from "../../components/homepage/featured-categories";
import HeroSection from "../../components/homepage/herosection";
import MostPopularBooks from "../../components/homepage/most-popular-books";

import "../../index.css";
const Homepage = () => {
  return (
    <div className="space-y-20">
      <div className="px-12">
        <HeroSection />
      </div>
      <div className="px-12">
        <MostPopularBooks />
      </div>
      <div className="bg-[#ffefe4] px-12">
        <FeaturedCategories />
      </div>
    </div>
  );
};

export default Homepage;
