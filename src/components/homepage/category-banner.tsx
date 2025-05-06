import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import CategoryBannerCarouselBanner from "../carousel/category-banner-carousel";
import { CategoryBannerInterface } from "../../intefaces/CategoryBanner";
import CaroselLeft from "../carousel/hero-carousel-left";
import { Link } from "react-router";

const CategoryBanner: React.FC<CategoryBannerInterface> = ({
  heading1,
  boxHeading1,
  boxHeading2,
  buttonValue,
  category,
  boxImageUrl,
  boxColor,
}) => {
  return (
    <div className="w-full">
      <h2 className="header1">{heading1}</h2>
      <div className="flex items-center w-full space-x-4 flex-wrap md:flex-nowrap justify-center">
        <div
          className="w-full bg-center bg-cover shadow-sm h-[300px] mx-4 md:mx-0"
          style={{ backgroundImage: `url(${boxImageUrl})` }}
        >
          <Card className="bg-transparent rounded-none backdrop-blur-xs border-none h-full flex items-start justify-start p-12">
            <CardTitle
              style={{ color: `${boxColor}` }}
              className="text-3xl font-bold"
            >
              {boxHeading1}
            </CardTitle>
            <CardDescription
              style={{ color: `${boxColor}` }}
              className="text-2xl font-medium text-black"
            >
              {boxHeading2}
            </CardDescription>
            <Link to={"/books"}>
              <Button className="button2 bg-black">{buttonValue}</Button>
            </Link>
          </Card>
        </div>
        <div className="hidden md:flex md:flex-grow w-1/2 ">
          <CategoryBannerCarouselBanner category={category} />
        </div>
        <div className="block md:hidden w-full ml-[7%] mt-16">
          <CaroselLeft category={category} />
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
