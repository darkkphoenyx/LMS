import React from "react";
import { Books } from "../../intefaces/Books";
import { Card, CardContent } from "../ui/card";

const CategoryCard: React.FC<Books> = ({
  author,
  imageUrl,
  name,
  edition,
  price,
}) => {
  return (
    <Card className="rounded-none w-[200px] h-full hover:scale-103 transition-all">
      <CardContent className="flex flex-col justify-between p-2 space-y-2 h-full">
        <img
          src={imageUrl}
          alt={name}
          className="w-24 h-32 object-cover rounded self-center"
        />
        <div className="w-full pl-2">
          <p className="text-red-500 font-medium uppercase text-[12px]">
            {edition}
          </p>
          <h3 className="font-bold">{name}</h3>
          <p className="text-[12px] text-gray-500">{author}</p>
          <p className="font-semibold">${price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
