import CaroselLeft from "../carousel/hero-carousel-left";
import { CaroselMiddle } from "../carousel/hero-carousel-middle";

const HeroSection = () => {
  return (
    <div className="flex w-full gap-6 flex-wrap lg:flex-nowrap items-center justify-center">
      <div className="w-full md:w-[73%] min-h-max ">
        <CaroselMiddle />
      </div>
      <div>
        <CaroselLeft />
      </div>
    </div>
  );
};

export default HeroSection;
