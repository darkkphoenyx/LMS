import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import CategoryBannerCarouselBanner from "../carousel/category-banner-carousel";
import { CategoryBannerInterface } from "../../intefaces/CategoryBanner";

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
    <div>
      <h2 className="header1">{heading1}</h2>
      <div className="flex items-center w-full space-x-4">
        <div
          className="w-[35%] bg-center bg-cover shadow-sm h-[300px]"
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
            <Button className="button2 bg-black">{buttonValue}</Button>
          </Card>
        </div>
        <div className="w-2/3">
          <CategoryBannerCarouselBanner category={category} />
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
