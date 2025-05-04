import { CaroselLeft } from "./carousel-left";
import { CaroselMiddle } from "./carousel-middle";

const HeroSection = () => {
  return (
    <div className="flex  w-full px-12 gap-6">
      <div className="bg-blue-400 w-1/2">div 1</div>
      <div className="bg-green-900 w-[700px] min-h-max ">
        <CaroselMiddle />
      </div>
      <div>
        <CaroselLeft />
      </div>
    </div>
  );
};

export default HeroSection;
