import { CaroselLeft } from "./carosel-left";

const HeroSection = () => {
  return (
    <div className="flex bg-yellow-400 w-full px-12 gap-12">
      <div className="bg-blue-400 w-full">div 1</div>
      <div className="bg-green-400 w-full">div 2</div>
      <div>
        <CaroselLeft />
      </div>
    </div>
  );
};

export default HeroSection;
