import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { HeroCarouselMiddleData } from "../../const/data/hero-carousel-middle-data";
import HeroMiddleCard from "../cards/hero-middle-card";

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
            <HeroMiddleCard {...data} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
