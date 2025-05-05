import { CaroselLeft } from "../carousel/hero-carousel-left";
import { CaroselMiddle } from "../carousel/hero-carousel-middle";

const HeroSection = () => {
  return (
    <div className="flex flex-wrap w-full gap-6">
      <div className="w-[80%] min-h-max ">
        <CaroselMiddle />
      </div>
      <div>
        <CaroselLeft />
      </div>
    </div>
  );
};

export default HeroSection;
