import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { booksData } from "../../const/data/books-data";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

export default function BooksPage() {
  const [selectedGenre, setSelectedGenre] = useState("All book");
  const [visibleItems] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    fetchBooks();
  }, []);

  const filteredBooksData = booksData.filter((item) => {
    const matchesGenre =
      selectedGenre === "All book" || item.genre === selectedGenre;
    const matchesSearch =
      item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const pageCount = Math.ceil(filteredBooksData.length / visibleItems);
  const currentBooks = filteredBooksData.slice(
    currentPage * visibleItems,
    (currentPage + 1) * visibleItems
  );

  return (
    <div className="py-4 px-4 md:px-0 max-w-7xl mx-auto min-h-[73vh] flex flex-col">
      {/* Search and Genre Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full sm:w-2/3"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="All book">All Books</option>
          <option value="Fiction">Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Dystopian">Dystopian</option>
          <option value="Classic">Classic</option>
          <option value="Self-help">Self-help</option>
          <option value="History">History</option>
          <option value="Food & Drinks">Food & Drinks</option>
          <option value="Biographies">Biographies</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[44vh]">
          <ClipLoader size={50} color="#4F39F6" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBooks.map((book, index) => (
            <Link
              to={`/book-details/${encodeURIComponent(book.name)}`}
              key={index}
              className="text-sm text-blue-500"
            >
              <div className="border rounded-lg p-4 h-full flex flex-col justify-between shadow hover:shadow-lg transition">
                <img
                  src={book.imageUrl}
                  alt={book.name}
                  className="w-full h-60 object-contain mb-4 rounded"
                />
                <h2 className="text-lg font-semibold">{book.name}</h2>
                <p className="text-sm text-gray-600">Author: {book.author}</p>
                <p className="text-sm text-gray-500">{book.edition}</p>
                <p className="mt-2 font-bold text-green-600">
                  ${book.price.toFixed(2)}
                </p>
                <div className="flex gap-2 items-center mt-4">
                  <button className="bg-black w-full text-white px-2 py-2 rounded hover:bg-gray-900">
                    Borrow
                  </button>
                  <button className="bg-blue-600 w-full flex items-center justify-center text-white px-2 py-2 rounded hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center mt-auto pt-5">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  size="default"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(prev - 1, 0));
                  }}
                />
              </PaginationItem>

              {/* Mobile Pagination */}
              <div className="flex md:hidden">
                {Array.from({ length: pageCount }, (_, i) => i)
                  .filter((pageIndex) => {
                    const rangeStart = Math.max(0, currentPage - 3);
                    const rangeEnd = Math.min(pageCount, rangeStart + 4);
                    return pageIndex >= rangeStart && pageIndex < rangeEnd;
                  })
                  .map((pageIndex) => (
                    <PaginationItem key={pageIndex}>
                      <PaginationLink
                        href="#"
                        size="default"
                        isActive={pageIndex === currentPage}
                        className={
                          pageIndex === currentPage
                            ? "bg-indigo-600 text-white"
                            : ""
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(pageIndex);
                        }}
                      >
                        {pageIndex + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
              </div>

              {/* Desktop Pagination */}
              <div className="hidden md:flex">
                {Array.from({ length: pageCount }, (_, i) => i)
                  .filter((pageIndex) => {
                    const rangeStart = Math.max(0, currentPage - 5);
                    const rangeEnd = Math.min(pageCount, rangeStart + 6);
                    return pageIndex >= rangeStart && pageIndex < rangeEnd;
                  })
                  .map((pageIndex) => (
                    <PaginationItem key={pageIndex}>
                      <PaginationLink
                        href="#"
                        size="default"
                        isActive={pageIndex === currentPage}
                        className={
                          pageIndex === currentPage
                            ? "bg-indigo-600 text-white"
                            : ""
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(pageIndex);
                        }}
                      >
                        {pageIndex + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
              </div>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  size="default"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
