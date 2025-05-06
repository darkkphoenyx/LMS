import { useParams, Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Star } from "lucide-react";
import { booksData } from "../../const/data/books-data";

export default function BookDetails() {
  const { name } = useParams();
  const book = booksData.find((item) => item.name === name);

  if (!book) {
    return (
      <div className="flex items-center justify-center max-w-7xl mx-auto flex-col pt-12">
        <img
          className="h-40 md:h-full"
          src="https://static.vecteezy.com/system/resources/thumbnails/007/128/270/small_2x/404-error-icon-free-vector.jpg"
          alt="Not Found"
        />
        <p className="font-extrabold text-4xl md:text-7xl">Not Found</p>
      </div>
    );
  }

  // Example: Render 4 static rating stars
  const renderStars = (rating = 5) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  // Get related books (same genre, excluding current book)
  const relatedBooks = booksData
    .filter((item) => item.genre === book.genre && item.name !== book.name)
    .slice(0, 4);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Breadcrumbs Section */}
      <div className="bg-[#f0f0f0] py-8 mb-4 text-center">
        <h2 className="text-5xl font-extrabold mb-4">
          Book <span className="text-[#002fff]">Details</span>
        </h2>

        <div className="flex justify-center">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <Link to="/books" className="text-blue-600 hover:underline">
              Books
            </Link>
            <Typography color="textPrimary">{book.name}</Typography>
          </Breadcrumbs>
        </div>
      </div>

      {/* Book Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="lg:h-[450px] p-2 rounded-lg shadow-md overflow-hidden">
          <img
            src={book.imageUrl}
            alt={book.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="space-y-4 px-8">
          <h1 className="text-3xl font-bold">{book.name}</h1>
          <div className="flex items-center space-x-2">
            {renderStars(book.rating)}
            <span className="text-sm text-gray-600">
              ({book.soldUnit.toLocaleString()} sold)
            </span>
          </div>
          <p className="text-gray-600">Author: {book.author}</p>
          <p className="text-gray-600">Genre: {book.genre}</p>
          <p className="text-sm text-gray-500 italic">
            Edition: {book.edition}
          </p>
          <p className="text-xl font-semibold text-green-600">
            ${book.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Available Quantity: {book.availableQuantity}
          </p>
          <div className="flex space-x-4 mt-4">
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 flex items-center space-x-2 cursor-pointer">
              <span>Borrow</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2 cursor-pointer">
              <LocalMallIcon />
              <span>Buy Now</span>
            </button>
            <button className="text-gray-400 hover:text-red-500">
              <FavoriteIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Related Books */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Related Books</h2>

        {relatedBooks.length === 0 ? (
          <p className="text-gray-500">No related books available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedBooks.map((related, idx) => (
              <Link
                key={idx}
                to={`/book-details/${encodeURIComponent(related.name)}`}
                className="border p-3 rounded hover:shadow-md"
              >
                <img
                  src={related.imageUrl}
                  alt={related.name}
                  className="w-full h-48 object-contain"
                />
                <h3 className="text-sm font-medium mt-2">{related.name}</h3>
                <p className="text-xs text-gray-500">{related.author}</p>
                <p className="text-sm font-semibold text-green-600">
                  ${related.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
