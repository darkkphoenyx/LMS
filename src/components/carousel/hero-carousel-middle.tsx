import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Button } from "../ui/button";
import { HeroCarouselMiddleData } from "../../const/hero-carousel-middle-data";

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
      <CarouselContent>
        {HeroCarouselMiddleData.map((data, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-[500px] ">
              <div
                className="absolute inset-0 bg-cover bg-center "
                style={{ backgroundImage: `url(${data.imageUrl})` }}
              ></div>

              <div className="absolute inset-0 bg-black opacity-50 "></div>

              <div className="relative ml-16 z-10 gap-4 flex flex-col items-start justify-center text-white h-full ">
                <h2 className="uppercase text-white font-semibold">
                  Only this week
                </h2>
                <h2 className="text-white text-6xl ">
                  {data.heading1}
                  <span className="font-bold">{data.heading2}</span>
                </h2>
                <Button className="button3">Shop Now</Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
