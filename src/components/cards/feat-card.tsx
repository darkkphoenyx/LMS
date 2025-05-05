import { FeatCard } from "../../intefaces/FeatCard";
import { Button } from "../ui/button";
import { Card as CardUI } from "../ui/card";

const CardComponent: React.FC<FeatCard> = ({
  color,
  heading1,
  heading2,
  imgUrl,
}) => {
  return (
    <CardUI
      className="pl-12 items-start text-white gap-2 rounded-none w-full relative h-[310px] pt-9 shadow-sm hover:scale-102 transition-all"
      style={{ backgroundColor: color }}
    >
      <h2 className="text-2xl md:text-3xl font-medium">{heading1}</h2>
      <p className="text-2xl md:text-3xl">{heading2}</p>
      <Button
        style={{
          color: color,
        }}
        className="button4 mt-8"
      >
        Shop Now
      </Button>
      <img
        className="h-40 md:h-48 absolute right-10 bottom-10 shadow-sm"
        src={imgUrl}
        alt={heading1}
      />
    </CardUI>
  );
};

export default CardComponent;
