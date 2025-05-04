import HeroSection from "../../components/herosection/herosection";
import MostPopularBooks from "../../components/herosection/most-popular-books";

import "../../index.css";
const Homepage = () => {
  return (
    <div className="gap-8">
      <HeroSection />
      <div className="p-12 space-y-6">
        <h2 className="text-3xl font-medium">
          Most Popular For Food and Drinks books
        </h2>
        <MostPopularBooks />
      </div>
    </div>
  );
};

export default Homepage;
