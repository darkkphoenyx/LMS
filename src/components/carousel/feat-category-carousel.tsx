import { Card, CardContent } from "../../components/ui/card";
import { TbPhoto } from "react-icons/tb";
import { IoFastFoodSharp } from "react-icons/io5";
import { GiClover } from "react-icons/gi";
import { FaStethoscope } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";
import { FaRunning } from "react-icons/fa";
import { FaSnowman } from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

const icons = [
  {
    name: "Arts & Photography",
    Icon: TbPhoto,
    fillColor: "#6B46C1",
    strokeColor: "#FFFFFF",
  },
  {
    name: "Food & Drinks",
    Icon: IoFastFoodSharp,
    fillColor: "#ECC94B",
    strokeColor: "#fff",
  },
  {
    name: "Romance",
    Icon: GiClover,
    fillColor: "#FF0000",
    strokeColor: "#fff",
  },
  {
    name: "Health",
    Icon: FaStethoscope,
    fillColor: "#00FFFF",
    strokeColor: "#fff",
  },
  {
    name: "Biography",
    Icon: IoIosPaper,
    fillColor: "#FC6C85",
    strokeColor: "#fff",
  },
  {
    name: "Sports",
    Icon: FaRunning,
    fillColor: "#ECC94B",
    strokeColor: "#fff",
  },
  {
    name: "Children",
    Icon: FaSnowman,
    fillColor: "#FF0000",
    strokeColor: "#fff",
  },
];

export function FeaturedCategoriesCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {icons.map(({ name, Icon, strokeColor, fillColor }, index) => (
          <CarouselItem
            key={index}
            className="pl-1 md:basis-1/4 lg:basis-1/5 xl:basis-1/5"
          >
            <div className="p-1">
              <Card className="flex flex-col items-center justify-center h-32 bg-transparent border-none shadow-none cursor-pointer hover:scale-110 transition-all">
                <CardContent className="flex flex-col items-center justify-center gap-3">
                  <Icon
                    className="text-6xl"
                    style={{
                      fill: fillColor,
                      stroke: strokeColor,
                    }}
                  />
                  <span className="mt-2 text-xl font-bold">{name}</span>{" "}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-1" />
      <CarouselNext className="absolute -right-1" />
    </Carousel>
  );
}
