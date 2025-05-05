import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Slider } from "../ui/slider";
import { booksData } from "../../const/books-data";

export function CaroselLeft() {
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
        {booksData.map((book, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="p-1 h-full">
              <Card className="h-full w-full flex flex-col rounded-none">
                <CardContent className="flex flex-col items-center justify-between p-4 space-y-4 flex-grow">
                  <img
                    src={book.imageUrl}
                    alt={book.name}
                    className="w-32 h-48 object-cover rounded"
                  />
                  <div className="space-y-1 w-full">
                    <p className="text-red-500 font-medium uppercase text-sm">
                      {book.edition}
                    </p>
                    <h3 className="text-2xl font-bold">{book.name}</h3>
                    <p className="text-sm text-gray-600 font-semibold">
                      {book.author}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold text-green-600">
                        ${book.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-700 font-semibold">
                        <span className="text-blue-500 font-medium mr-1">
                          Genre:
                        </span>
                        {book.genre}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2 font-semibold">
                      <p>Copies Sold: {book.soldUnit}</p>
                      <p>Available: {book.availableQuantity}</p>
                    </div>
                  </div>
                  <Slider
                    defaultValue={[100 - book.availableQuantity]}
                    max={100}
                    step={0}
                    className="mt-auto w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-36 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-2 top-36 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
