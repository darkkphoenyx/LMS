import { Card, CardContent } from "../ui/card";
import { Books } from "../../intefaces/Books";

const HeroLeftCard: React.FC<Books> = ({
  imageUrl,
  author,
  availableQuantity,
  edition,
  genre,
  name,
  price,
  soldUnit,
}) => {
  return (
    <Card className="h-full w-full flex flex-col rounded-none">
      <CardContent className="flex flex-col items-center justify-between p-4 space-y-4 flex-grow">
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-48 object-cover rounded"
        />
        <div className="space-y-1 w-full">
          <p className="text-red-500 font-medium uppercase text-sm">
            {edition}
          </p>
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-sm text-gray-600 font-semibold">{author}</p>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-green-600">
              ${price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              <span className="text-blue-500 font-medium mr-1">Genre:</span>
              {genre}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2 font-semibold">
            <p>Copies Sold: {soldUnit}</p>
            <p>Available: {availableQuantity}</p>
          </div>
        </div>
        <div className="w-full h-3 bg-red-100 rounded-2xl overflow-hidden">
          <div
            className="h-3 bg-red-500 rounded-2xl transition-all duration-300"
            style={{ width: `${100 - availableQuantity}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};
export default HeroLeftCard;
