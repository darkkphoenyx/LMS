import { Link } from "react-router";
import { SlArrowRight } from "react-icons/sl";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import FeaturedCategoriesCarousel from "../carousel/feat-category-carousel";

const cards = [
  {
    heading1: "Coloring Books",
    heading2: "for adults",
    color: "#fd5c63",
    image:
      "https://raketcontent.com/1/Colorful_Modern_Drawing_and_Coloring_Kids_Book_Cover_0416be4e7b.png",
  },
  {
    heading1: "New Books",
    heading2: "Available",
    color: "#4169E1",
    image:
      "https://www.boredpanda.com/blog/wp-content/uploads/2023/05/gg-64707faab5d03__700.jpg",
  },
  {
    heading1: "Monthly Seleted",
    heading2: "Books",
    color: "#E8A317",
    image:
      "https://www.papertrue.com/blog/wp-content/uploads/2023/11/36getintrouble.jpg",
  },
];

const FeaturedCategories = () => {
  return (
    <div className="pr-6 py-20">
      <div className="flex items-center justify-between">
        <h2 className="header1">Featured Categories</h2>
        <Link to={"/allCategories"}>
          <p className="text-red-500 gap-2 flex items-center">
            All Categories
            <SlArrowRight style={{ strokeWidth: 2 }} />
          </p>
        </Link>
      </div>
      {/* middle categories is being renedered from this component */}
      <div className="py-8">
        <FeaturedCategoriesCarousel />
      </div>
      <div className="flex w-full gap-4 mt-12 border-none">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="pl-12 items-start text-white gap-2 rounded-none w-full relative h-[310px] pt-9 shadow-sm hover:scale-102 transition-all"
            style={{ background: `${card.color}` }}
          >
            <h2 className="text-3xl font-medium">{card.heading1}</h2>
            <p className="text-3xl">{card.heading2}</p>
            <Button
              style={{
                color: `${card.color}`,
              }}
              className="button4 mt-8"
            >
              Shop Now
            </Button>
            <img
              className="h-56 absolute right-20 bottom-10"
              src={card.image}
              alt={card.heading1}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
