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
}) => {
  return (
    <div>
      <h2 className="header1">{heading1}</h2>
      <div className="flex items-center w-full space-x-4">
        <div className="w-[35%] bg-[url(https://images.unsplash.com/photo-1454117096348-e4abbeba002c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JheSUyMHBhdHRlcm58ZW58MHx8MHx8fDA%3D)] bg-center bg-cover shadow-sm h-[300px]">
          <Card className="bg-transparent rounded-none backdrop-blur-xs border-none h-full flex items-start justify-start p-12">
            <CardTitle className="text-3xl font-bold">{boxHeading1}</CardTitle>
            <CardDescription className="text-2xl font-medium text-black">
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
