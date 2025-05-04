import { Button } from "../../components/ui/button";
import { Card, CardDescription, CardTitle } from "../../components/ui/card";
import { MostPopularBooksCarousel } from "../carousel/most-popular-books-carousel";

const MostPopularBooks = () => {
  return (
    <div className="flex items-center w-full space-x-6">
      <div className="w-[35%] bg-[url(https://images.unsplash.com/photo-1454117096348-e4abbeba002c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JheSUyMHBhdHRlcm58ZW58MHx8MHx8fDA%3D)] bg-center bg-cover shadow-sm h-[300px]">
        <Card className="bg-transparent rounded-none backdrop-blur-xs border-none h-full flex items-start justify-start p-12">
          <CardTitle className="text-3xl font-bold">Discount On</CardTitle>
          <CardDescription className="text-2xl font-medium text-black">
            Food and Drinks Books
          </CardDescription>
          <Button className="button2 bg-black">Shop Now</Button>
        </Card>
      </div>
      <div className="w-2/3">
        <MostPopularBooksCarousel />
      </div>
    </div>
  );
};

export default MostPopularBooks;
