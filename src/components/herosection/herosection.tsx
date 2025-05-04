import { CaroselLeft } from "../carousel/carousel-left";
import { CaroselMiddle } from "../carousel/carousel-middle";

const HeroSection = () => {
  return (
    <div className="flex flex-wrap w-full px-12 gap-6">
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
