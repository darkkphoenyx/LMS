import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

const books = [
  {
    imageUrl:
      "https://img.perlego.com/book-covers/598007/9780062416216_300_450.webp",
    name: "The Alchemist",
    edition: "25th Anniversary",
    author: "Paulo Coelho",
    price: 14.99,
    genre: "Fiction",
    availableQuantity: 50,
    soldUnit: 150000,
  },
  {
    imageUrl:
      "https://www.curiosasociety.com/cdn/shop/products/HPBoxSet_Soft_Front.jpg?v=1571439832",
    name: "Harry Potter Series (1-7 Bundle)",
    edition: "Special Edition",
    author: "J.K. Rowling",
    price: 89.99,
    genre: "Fantasy",
    availableQuantity: 20,
    soldUnit: 500000,
  },
  {
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630683326i/10534.jpg",
    name: "The Art of War",
    edition: "Classic Edition",
    author: "Sun Tzu",
    price: 10.0,
    genre: "Philosophy",
    availableQuantity: 80,
    soldUnit: 200000,
  },
  {
    imageUrl:
      "https://archive.org/services/img/george-orwell-1984_202309/full/pct:200/0/default.jpg",
    name: "1984",
    edition: "Platinum Edition",
    author: "George Orwell",
    price: 13.5,
    genre: "Dystopian",
    availableQuantity: 35,
    soldUnit: 300000,
  },
  {
    imageUrl:
      "https://grey.com.np/cdn/shop/products/book-cover-To-Kill-a-Mockingbird-many-1961.webp?v=1669894816",
    name: "To Kill a Mockingbird",
    edition: "60th Anniversary",
    author: "Harper Lee",
    price: 15.75,
    genre: "Classic",
    availableQuantity: 40,
    soldUnit: 250000,
  },
  {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/960px-The_Great_Gatsby_Cover_1925_Retouched.jpg",
    name: "The Great Gatsby",
    edition: "Deluxe Edition",
    author: "F. Scott Fitzgerald",
    price: 11.99,
    genre: "Classic",
    availableQuantity: 45,
    soldUnit: 230000,
  },
  {
    imageUrl:
      "https://media.thuprai.com/__sized__/front_covers/think-and-grow-rich-f.jpg-thumbnail-280x405-70.jpg",
    name: "Think and Grow Rich",
    edition: "Updated Edition",
    author: "Napoleon Hill",
    price: 12.5,
    genre: "Self-help",
    availableQuantity: 60,
    soldUnit: 180000,
  },
  {
    imageUrl:
      "https://media.thuprai.com/products/Sapiens__A_Brief_History_of_Humankind.jpg",
    name: "Sapiens: A Brief History of Humankind",
    edition: "Illustrated Edition",
    author: "Yuval Noah Harari",
    price: 19.99,
    genre: "History",
    availableQuantity: 30,
    soldUnit: 400000,
  },
  {
    imageUrl:
      "https://booksmandala.com/_next/image?url=https%3A%2F%2Fbooks.bizmandala.com%2Fmedia%2Fbooks%2F9780062641540%2F9780062641540-9434.webp&w=3840&q=75",
    name: "The Subtle Art of Not Giving a F*ck",
    edition: "Original",
    author: "Mark Manson",
    price: 17.99,
    genre: "Self-help",
    availableQuantity: 55,
    soldUnit: 350000,
  },
  {
    imageUrl:
      "https://img1.od-cdn.com/ImageType-400/0293-1/%7BC9B54C84-0369-49C5-A0B3-98E3353A2129%7DIMG400.JPG",
    name: "The Hobbit",
    edition: "Collector's Edition",
    author: "J.R.R. Tolkien",
    price: 20.0,
    genre: "Fantasy",
    availableQuantity: 25,
    soldUnit: 450000,
  },
];

import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Slider } from "../ui/slider";

export function CaroselLeft() {
  const [isHovered, setIsHovered] = React.useState(false);
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (isHovered) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        plugin.current.reset();
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovered]);
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CarouselContent>
        {books.map((book, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="p-1 h-full">
              <Card className="h-full w-full flex flex-col rounded-none">
                <CardContent className="flex flex-col items-center justify-between p-4 space-y-4 flex-grow">
                  <img
                    src={book.imageUrl}
                    alt={book.name}
                    className="w-32 h-48 object-cover rounded"
                  />
                  <div className="space-y-1 w-full">
                    <p className="text-red-500 font-medium uppercase text-sm">
                      {book.edition}
                    </p>
                    <h3 className="text-2xl font-bold">{book.name}</h3>
                    <p className="text-sm text-gray-600 font-semibold">
                      {book.author}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold text-green-600">
                        ${book.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-700 font-semibold">
                        <span className="text-blue-500 font-medium mr-1">
                          Genre:
                        </span>
                        {book.genre}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2 font-semibold">
                      <p>Copies Sold: {book.soldUnit}</p>
                      <p>Available: {book.availableQuantity}</p>
                    </div>
                  </div>
                  <Slider
                    defaultValue={[100 - book.availableQuantity]}
                    max={100}
                    step={0}
                    className="mt-auto w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-36 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-2 top-36 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
