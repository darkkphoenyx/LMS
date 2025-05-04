import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

const books = [
  {
    imageUrl:
      "https://t3.ftcdn.net/jpg/07/13/74/96/360_F_713749661_Q7wTk8TyKsG9z9nsV7MM2QpRYALmnNZd.jpg",
    heading1: "Big",
    heading2: "Sales",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9vayUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
    heading1: "Mega",
    heading2: "Trials",
  },
  {
    imageUrl:
      "https://t4.ftcdn.net/jpg/02/10/91/07/360_F_210910762_Gxc4ZcJ5Jr2v9mo3GxoxLf0rEmk7RNYX.jpg",
    heading1: "Banger",
    heading2: "Collection",
  },
  {
    imageUrl:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/book-themed-zoom-meeting-background-design-template-e8610c3150af35d95e98372166145b40_screen.jpg?ts=1698303195",
    heading1: "Ultimate",
    heading2: "Collection",
  },
];

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";

export function CaroselMiddle() {
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
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CarouselContent className="">
        {books.map((book, index) => (
          <CarouselItem key={index} className="">
            <div className="relative w-full h-[500px] ">
              <div
                className="absolute inset-0 bg-cover bg-center "
                style={{ backgroundImage: `url(${book.imageUrl})` }}
              ></div>

              <div className="absolute inset-0 bg-black opacity-50 "></div>

              <div className="relative ml-16 z-10 gap-4 flex flex-col items-start justify-center text-white h-full ">
                <h2 className="uppercase text-white font-semibold">
                  Only this week
                </h2>
                <h2 className="text-white text-6xl ">
                  {book.heading1}{" "}
                  <span className="font-bold">{book.heading2}</span>
                </h2>
                <Button className="button3">Shop Now</Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
