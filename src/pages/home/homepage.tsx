import "../../index.css";
import HeroSection from "../../components/homepage/herosection";
import FeaturedCategories from "../../components/homepage/featured-categories";
import CategoryBanner from "../../components/homepage/category-banner";

const Homepage = () => {
  return (
    <div className="space-y-20">
      <div className="max-w-7xl mx-auto">
        <HeroSection />
      </div>
      {/* most popular for food and drinks books */}
      <div className="my-20 max-w-7xl mx-auto ">
        <CategoryBanner
          heading1="Most Popular For Food and Drinks books"
          boxHeading1="Discount On"
          boxHeading2="Food and Drinks Books"
          buttonValue="Shop Now"
          category="Food & Drinks"
          boxImageUrl="https://images.unsplash.com/photo-1454117096348-e4abbeba002c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JheSUyMHBhdHRlcm58ZW58MHx8MHx8fDA%3D"
        />
      </div>

      <div className="bg-[#ffefe4] ">
        <FeaturedCategories />
      </div>
      {/* biographies category */}
      <div className=" my-20 max-w-7xl mx-auto">
        <CategoryBanner
          heading1="Biographies Books"
          boxHeading1="All Biographies"
          boxHeading2="Discount 30%"
          buttonValue="Shop Now"
          category="Biographies"
          boxImageUrl="https://wallpapers.com/images/featured/1920x1080-marble-background-gwnrajlrlpa5veiq.jpg"
          boxColor="white"
        />
      </div>
    </div>
  );
};

export default Homepage;
