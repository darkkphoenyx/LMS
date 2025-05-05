import { booksData } from "../../const/data/books-data";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export function MostPopularBooksCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="ml-1 gap-x-0.5">
        {booksData
          .filter((book) => book.genre == "Food & Drinks")
          .map((book, index) => (
            <CarouselItem
              key={index}
              className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-1 h-full">
                <Card className="rounded-none w-[200px] h-full">
                  <CardContent className="flex flex-col justify-between p-2 space-y-2 h-full">
                    <img
                      src={book.imageUrl}
                      alt={book.name}
                      className="w-24 h-32 object-cover rounded self-center"
                    />
                    <div className="w-full ml-8">
                      <p className="text-red-500 font-medium uppercase text-[12px]">
                        {book.edition}
                      </p>
                      <h3 className="font-bold">{book.name}</h3>
                      <p className="text-[12px] text-gray-500">{book.author}</p>
                      <p className="font-semibold">${book.price.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
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
}
