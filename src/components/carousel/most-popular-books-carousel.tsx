import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const books = [
  {
    imageUrl: "https://images.penguinrandomhouse.com/cover/9780399582752",
    name: "Salt, Fat, Acid, Heat",
    edition: "1st Edition",
    author: "Samin Nosrat",
    price: 25.99,
    genre: "Food & Drinks",
    availableQuantity: 30,
    soldUnit: 200000,
  },
  {
    imageUrl: "https://m.media-amazon.com/images/I/515afUMn3aL.jpg",
    name: "The Food Lab",
    edition: "Illustrated Edition",
    author: "J. Kenji López-Alt",
    price: 35.0,
    genre: "Food & Drinks",
    availableQuantity: 15,
    soldUnit: 300000,
  },
  {
    imageUrl:
      "https://m.media-amazon.com/images/I/71-p1Bb9LvL._AC_UF1000,1000_QL80_.jpg",
    name: "How to Cook Everything",
    edition: "Updated Edition",
    author: "Mark Bittman",
    price: 29.95,
    genre: "Food & Drinks",
    availableQuantity: 40,
    soldUnit: 250000,
  },
  {
    imageUrl: "https://images.penguinrandomhouse.com/cover/9781607747208",
    name: "Plenty",
    edition: "Hardcover",
    author: "Yotam Ottolenghi",
    price: 32.5,
    genre: "Food & Drinks",
    availableQuantity: 20,
    soldUnit: 150000,
  },
  {
    imageUrl: "https://images.penguinrandomhouse.com/cover/9780399580949",
    name: "Cocktail Codex",
    edition: "1st Edition",
    author: "Alex Day, Nick Fauchald",
    price: 30.0,
    genre: "Food & Drinks",
    availableQuantity: 25,
    soldUnit: 180000,
  },
  {
    imageUrl:
      "https://m.media-amazon.com/images/I/91ElCTiJSSL._AC_UF1000,1000_QL80_.jpg",
    name: "Half Baked Harvest Super Simple",
    edition: "Illustrated",
    author: "Tieghan Gerard",
    price: 28.0,
    genre: "Food & Drinks",
    availableQuantity: 35,
    soldUnit: 220000,
  },
  {
    imageUrl: "https://images.penguinrandomhouse.com/cover/9781607745259",
    name: "The Beer Bible",
    edition: "Revised Edition",
    author: "Jeff Alworth",
    price: 21.0,
    genre: "Food & Drinks",
    availableQuantity: 18,
    soldUnit: 120000,
  },
  {
    imageUrl: "https://images.penguinrandomhouse.com/cover/9780399578007",
    name: "The Flavor Bible",
    edition: "Hardcover",
    author: "Karen Page",
    price: 35.5,
    genre: "Food & Drinks",
    availableQuantity: 27,
    soldUnit: 160000,
  },
  {
    imageUrl: "https://images.penguinrandomhouse.com/cover/9781607747307",
    name: "Mastering the Art of French Cooking",
    edition: "50th Anniversary",
    author: "Julia Child",
    price: 40.0,
    genre: "Food & Drinks",
    availableQuantity: 22,
    soldUnit: 350000,
  },
  {
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1489020472i/34515463.jpg",
    name: "Cravings",
    edition: "Deluxe Edition",
    author: "Chrissy Teigen",
    price: 26.0,
    genre: "Food & Drinks",
    availableQuantity: 30,
    soldUnit: 210000,
  },
];
export function MostPopularBooksCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="ml-1 gap-x-0.5">
        {books.map((book, index) => (
          <CarouselItem
            key={index}
            className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1 h-full">
              <Card className="rounded-none w-[200px] h-full">
                <CardContent className="flex flex-col justify-between p-2 space-y-2 h-full">
                  <img
                    src={book.imageUrl}
                    alt={book.name}
                    className="w-24 h-32 object-cover rounded self-center"
                  />
                  <div className="w-full ml-8">
                    <p className="text-red-500 font-medium uppercase text-[12px]">
                      {book.edition}
                    </p>
                    <h3 className="font-bold">{book.name}</h3>
                    <p className="text-[12px] text-gray-500">{book.author}</p>
                    <p className="font-semibold">${book.price.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute -top-12 right-0 flex space-x-2 p-2 z-10">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </div>
    </Carousel>
  );
}
