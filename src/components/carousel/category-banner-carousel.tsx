import React from "react";
import { booksData } from "../../const/data/books-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CategoryCard from "../cards/category-card";
import { Link } from "react-router";

interface CategoryBannerCarousel {
  category: string;
}

const CategoryBannerCarouselBanner: React.FC<CategoryBannerCarousel> = ({
  category,
}) => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="ml-1 gap-x-0.5">
        {booksData
          .filter(({ genre }) => genre === category)
          .map((book, index) => (
            <CarouselItem
              key={index}
              className="pl-1 sm:basis-1/2 md:basis-1/3"
            >
              <div className="p-1 h-full">
                <Link to={`/book-details/${encodeURIComponent(book.name)}`}>
                  <CategoryCard {...book} />
                </Link>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <div className="absolute -top-12 right-0 flex space-x-2 p-2 z-10">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </div>
    </Carousel>
  );
};

export default CategoryBannerCarouselBanner;
