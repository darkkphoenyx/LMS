import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { booksData } from "../../const/data/books-data";
import HeroLeftCard from "../cards/hero-left-card";

interface CaroselLeftType {
  category?: string;
}

const CaroselLeft: React.FC<CaroselLeftType> = ({ category }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (isHovered) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        plugin.current.reset();
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovered]);
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CarouselContent>
        {booksData
          .filter((book) => (category ? book.genre === category : true))
          .slice(0, 10)
          .map((book, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="p-1 h-full">
                <HeroLeftCard {...book} />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-36 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-2 top-36 -translate-y-1/2 z-10" />
    </Carousel>
  );
};

export default CaroselLeft;
