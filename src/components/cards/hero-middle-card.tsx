import React from "react";
import { Button } from "../ui/button";
import { HeroCarouselMiddle } from "../../intefaces/HeroCarouselMiddle";

const HeroMiddleCard: React.FC<HeroCarouselMiddle> = ({
  heading1,
  heading2,
  imageUrl,
}) => {
  return (
    <div className="relative w-full h-[500px]">
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-50 "></div>

      <div className="relative ml-16 z-10 gap-4 flex flex-col items-start justify-center text-white h-full ">
        <h2 className="uppercase text-white font-semibold">Only this week</h2>
        <h2 className="text-white text-6xl ">
          {heading1}
          <span className="font-bold">{heading2}</span>
        </h2>
        <Button className="button3">Shop Now</Button>
      </div>
    </div>
  );
};

export default HeroMiddleCard;
