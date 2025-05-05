import FeaturedCategories from "../../components/homepage/featured-categories";
import HeroSection from "../../components/homepage/herosection";
import MostPopularBooks from "../../components/homepage/most-popular-books";

import "../../index.css";
const Homepage = () => {
  return (
    <div className="px-12 space-y-20">
      <HeroSection />
      <MostPopularBooks />
      <FeaturedCategories />
    </div>
  );
};

export default Homepage;
