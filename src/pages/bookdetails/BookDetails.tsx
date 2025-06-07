import { useParams, Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Typography, Dialog, DialogContent } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Star, AlertCircle } from "lucide-react";
import { booksData } from "../../const/data/books-data";
import { useState } from "react";
import BorrowForm from "../../components/BorrowForm";
import BuyForm from "../../components/BuyForm";

export default function BookDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const book = booksData.find((item) => item.name === name);
  const [borrowFormOpen, setBorrowFormOpen] = useState(false);
  const [buyFormOpen, setBuyFormOpen] = useState(false);
  const [adminWarningOpen, setAdminWarningOpen] = useState(false);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const handleBorrowClick = () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      navigate("/login", { 
        state: { 
          from: `/book-details/${encodeURIComponent(name || "")}`,
          message: "Please log in to borrow books" 
        } 
      });
      return;
    }

    if (user.role === "ADMIN") {
      // Show the admin warning modal
      setAdminWarningOpen(true);
      return;
    }

    setBorrowFormOpen(true);
  };

  const handleBuyClick = () => {
    if (!user) {
      navigate("/login", { 
        state: { 
          from: `/book-details/${encodeURIComponent(name || "")}`,
          message: "Please log in to purchase books" 
        } 
      });
      return;
    }

    setBuyFormOpen(true);
  };

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
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Breadcrumbs Section */}
      <div className="bg-[#f0f0f0] py-4 md:py-8 mb-4 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
          Book <span className="text-[#002fff]">Details</span>
        </h2>

        <div className="flex justify-center">
          <Breadcrumbs aria-label="breadcrumb" className="text-sm md:text-base">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <Link to="/books" className="text-blue-600 hover:underline">
              Books
            </Link>
            <Typography color="textPrimary" className="truncate max-w-[200px] md:max-w-none">
              {book.name}
            </Typography>
          </Breadcrumbs>
        </div>
      </div>

      {/* Book Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 md:mb-16">
        <div className="lg:h-[450px] p-2 rounded-lg shadow-md overflow-hidden bg-white">
          <img
            src={book.imageUrl}
            alt={book.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="space-y-4 px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl font-bold break-words">{book.name}</h1>
          <div className="flex items-center space-x-2">
            {renderStars(book.rating)}
            <span className="text-sm text-gray-600">
              ({book.soldUnit.toLocaleString()} sold)
            </span>
          </div>
          <div className="space-y-2 py-2">
            <p className="text-gray-600 flex items-center gap-2">
              <span className="font-medium min-w-[80px]">Author:</span>
              <span>{book.author}</span>
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="font-medium min-w-[80px]">Genre:</span>
              <span>{book.genre}</span>
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="font-medium min-w-[80px]">Edition:</span>
              <span className="italic">{book.edition}</span>
            </p>
          </div>
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold text-green-600">
                ${book.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Available: {book.availableQuantity}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:justify-start">
              <button
                onClick={handleBorrowClick}
                className="bg-black text-white w-full sm:w-32 px-4 py-2.5 rounded-lg hover:bg-gray-900 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Borrow</span>
              </button>
              <button 
                onClick={handleBuyClick}
                className="bg-blue-600 text-white w-full sm:w-32 px-4 py-2.5 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LocalMallIcon />
                <span>Buy Now</span>
              </button>
              <button 
                className="text-gray-400 hover:text-red-500 p-2.5 border border-gray-200 rounded-lg hover:border-red-200 transition-colors cursor-pointer"
              >
                <FavoriteIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Books */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Related Books</h2>

        {relatedBooks.length === 0 ? (
          <p className="text-gray-500">No related books available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {relatedBooks.map((related, idx) => (
              <Link
                key={idx}
                to={`/book-details/${encodeURIComponent(related.name)}`}
                className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-white"
              >
                <div className="aspect-[3/4] mb-3">
                  <img
                    src={related.imageUrl}
                    alt={related.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium line-clamp-2 mb-1">{related.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{related.author}</p>
                <p className="text-sm font-semibold text-green-600">
                  ${related.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Admin Warning Modal */}
      <Dialog
        open={adminWarningOpen}
        onClose={() => setAdminWarningOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent className="p-6">
          <div className="flex items-center gap-3 text-amber-600 mb-4">
            <AlertCircle className="w-6 h-6" />
            <span className="font-medium">Admin Notice</span>
          </div>
          <p className="text-gray-600">
            As an admin, you cannot borrow books. This feature is only available for regular users.
          </p>
        </DialogContent>
      </Dialog>

      {user && user.role === "USER" && (
        <>
          <BorrowForm
            open={borrowFormOpen}
            onClose={() => setBorrowFormOpen(false)}
            bookName={book.name}
          />
          <BuyForm
            open={buyFormOpen}
            onClose={() => setBuyFormOpen(false)}
            bookName={book.name}
            price={book.price}
          />
        </>
      )}
    </div>
  );
}
