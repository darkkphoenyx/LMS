import { CaroselLeft } from "../carousel/hero-carousel-left";
import { CaroselMiddle } from "../carousel/hero-carousel-middle";

const HeroSection = () => {
  return (
    <div className="flex w-full gap-6">
      <div className="w-[73%] min-h-max ">
        <CaroselMiddle />
      </div>
      <div>
        <CaroselLeft />
      </div>
    </div>
  );
};

export default HeroSection;
