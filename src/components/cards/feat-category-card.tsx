import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { FeaturedCategory } from "../../intefaces/FeaturedCategories";

const FeaturedCategoryCard: React.FC<FeaturedCategory> = ({
  name,
  Icon,
  fillColor,
  strokeColor,
}) => {
  return (
    <Card className="flex flex-col items-center justify-center h-32 bg-transparent border-none shadow-none cursor-pointer hover:scale-110 transition-all">
      <CardContent className="flex flex-col items-center justify-center gap-3">
        <Icon
          className="text-6xl"
          style={{
            fill: fillColor,
            stroke: strokeColor,
          }}
        />
        <span className="mt-2 md:text-xl font-bold text-center">{name}</span>
      </CardContent>
    </Card>
  );
};

export default FeaturedCategoryCard;
