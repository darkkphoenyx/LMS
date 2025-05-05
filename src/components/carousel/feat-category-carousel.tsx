import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { FeaturedCategoriesCarouselData } from "../../const/feat-category-data";
import FeaturedCategoryCard from "../cards/feat-category-card";

const FeaturedCategoriesCarousel: React.FC = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {FeaturedCategoriesCarouselData.map(
          ({ name, Icon, strokeColor, fillColor }, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/4 lg:basis-1/5 xl:basis-1/5"
            >
              <div className="p-1">
                <FeaturedCategoryCard
                  name={name}
                  Icon={Icon}
                  strokeColor={strokeColor}
                  fillColor={fillColor}
                />
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-1" />
      <CarouselNext className="absolute -right-1" />
    </Carousel>
  );
};

export default FeaturedCategoriesCarousel;
