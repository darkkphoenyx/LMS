import { useState } from "react";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from 'react-router-dom';

export default function BooksPage() {
    const booksData = [
        {
            id: 1,
            imageUrl:"https://img.perlego.com/book-covers/598007/9780062416216_300_450.webp",
            name: "The Alchemist",
            edition: "25th Anniversary",
            author: "Paulo Coelho",
            price: 14.99,
            genre: "Fiction",
            availableQuantity: 50,
            soldUnit: 150000,
        },
        {
            id: 2,
            imageUrl:"https://www.curiosasociety.com/cdn/shop/products/HPBoxSet_Soft_Front.jpg?v=1571439832",
            name: "Harry Potter Series (1-7 Bundle)",
            edition: "Special Edition",
            author: "J.K. Rowling",
            price: 89.99,
            genre: "Fantasy",
            availableQuantity: 20,
            soldUnit: 500000,
        },
        {
            id: 3,
            imageUrl:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630683326i/10534.jpg",
            name: "The Art of War",
            edition: "Classic Edition",
            author: "Sun Tzu",
            price: 10.0,
            genre: "Philosophy",
            availableQuantity: 80,
            soldUnit: 200000,
        },
        {
            id: 4,
            imageUrl:"https://archive.org/services/img/george-orwell-1984_202309/full/pct:200/0/default.jpg",
            name: "1984",
            edition: "Platinum Edition",
            author: "George Orwell",
            price: 13.5,
            genre: "Dystopian",
            availableQuantity: 35,
            soldUnit: 300000,
        },
        {
            id: 5,
            imageUrl:"https://grey.com.np/cdn/shop/products/book-cover-To-Kill-a-Mockingbird-many-1961.webp?v=1669894816",
            name: "To Kill a Mockingbird",
            edition: "60th Anniversary",
            author: "Harper Lee",
            price: 15.75,
            genre: "Classic",
            availableQuantity: 40,
            soldUnit: 250000,
        },
        {
            id: 6,
            imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/960px-The_Great_Gatsby_Cover_1925_Retouched.jpg",
            name: "The Great Gatsby",
            edition: "Deluxe Edition",
            author: "F. Scott Fitzgerald",
            price: 11.99,
            genre: "Classic",
            availableQuantity: 45,
            soldUnit: 230000,
        },
        {
            id: 7,
            imageUrl:"https://media.thuprai.com/__sized__/front_covers/think-and-grow-rich-f.jpg-thumbnail-280x405-70.jpg",
            name: "Think and Grow Rich",
            edition: "Updated Edition",
            author: "Napoleon Hill",
            price: 12.5,
            genre: "Self-help",
            availableQuantity: 60,
            soldUnit: 180000,
        },
        {
            id: 8,
            imageUrl:"https://media.thuprai.com/products/Sapiens__A_Brief_History_of_Humankind.jpg",
            name: "Sapiens: A Brief History of Humankind",
            edition: "Illustrated Edition",
            author: "Yuval Noah Harari",
            price: 19.99,
            genre: "History",
            availableQuantity: 30,
            soldUnit: 400000,
        },
        {
            id: 9,
            imageUrl:"https://booksmandala.com/_next/image?url=https%3A%2F%2Fbooks.bizmandala.com%2Fmedia%2Fbooks%2F9780062641540%2F9780062641540-9434.webp&w=3840&q=75",
            name: "The Subtle Art of Not Giving a F*ck",
            edition: "Original",
            author: "Mark Manson",
            price: 17.99,
            genre: "Self-help",
            availableQuantity: 55,
            soldUnit: 350000,
        },
        {
            id: 10,
            imageUrl:"https://img1.od-cdn.com/ImageType-400/0293-1/%7BC9B54C84-0369-49C5-A0B3-98E3353A2129%7DIMG400.JPG",
            name: "The Hobbit",
            edition: "Collector's Edition",
            author: "J.R.R. Tolkien",
            price: 20.0,
            genre: "Fantasy",
            availableQuantity: 25,
            soldUnit: 450000,
        },
        // Food & Drinks (IDs 11–20)
        {
            id: 11,
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
            id: 12,
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
            id: 13,
            imageUrl: "https://m.media-amazon.com/images/I/71-p1Bb9LvL._AC_UF1000,1000_QL80_.jpg",
            name: "How to Cook Everything",
            edition: "Updated Edition",
            author: "Mark Bittman",
            price: 29.95,
            genre: "Food & Drinks",
            availableQuantity: 40,
            soldUnit: 250000,
        },
        {
            id: 14,
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
            id: 15,
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
            id: 16,
            imageUrl: "https://m.media-amazon.com/images/I/91ElCTiJSSL._AC_UF1000,1000_QL80_.jpg",
            name: "Half Baked Harvest Super Simple",
            edition: "Illustrated",
            author: "Tieghan Gerard",
            price: 28.0,
            genre: "Food & Drinks",
            availableQuantity: 35,
            soldUnit: 220000,
        },
        {
            id: 17,
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
            id: 18,
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
            id: 19,
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
            id: 20,
            imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1489020472i/34515463.jpg",
            name: "Cravings",
            edition: "Deluxe Edition",
            author: "Chrissy Teigen",
            price: 26.0,
            genre: "Food & Drinks",
            availableQuantity: 30,
            soldUnit: 210000,
        },
        // Biographies (IDs 21–30)
        {
            id: 21,
            imageUrl: "https://m.media-amazon.com/images/I/81cJTmFpG-L.jpg",
            name: "Becoming",
            edition: "Paperback Edition",
            author: "Michelle Obama",
            price: 18.99,
            genre: "Biographies",
            availableQuantity: 40,
            soldUnit: 500000,
        },
        {
            id: 22,
            imageUrl: "https://booksmandala.com/_next/image?url=https%3A%2F%2Fbooks.bizmandala.com%2Fmedia%2Fbooks%2F9780349140438%2F9780349140438-3607.webp&w=3840&q=75",
            name: "Steve Jobs",
            edition: "Anniversary Edition",
            author: "Walter Isaacson",
            price: 14.99,
            genre: "Biographies",
            availableQuantity: 50,
            soldUnit: 800000,
        },
        {
            id: 23,
            imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1560816565i/48855.jpg",
            name: "The Diary of a Young Girl",
            edition: "50th Anniversary Edition",
            author: "Anne Frank",
            price: 12.99,
            genre: "Biographies",
            availableQuantity: 60,
            soldUnit: 1200000,
        },
        {
            id: 24,
            imageUrl: "https://booksmandala.com/_next/image?url=https%3A%2F%2Fbooks.bizmandala.com%2Fmedia%2Fbooks%2F9780099511021%2F9780099511021-2779.webp&w=3840&q=75",
            name: "Educated",
            edition: "Hardcover Edition",
            author: "Tara Westover",
            price: 22.99,
            genre: "Biographies",
            availableQuantity: 70,
            soldUnit: 700000,
        },
        {
            id: 25,
            imageUrl: "https://media.thuprai.com/products/When_Breath_Becomes_Air.jpg",
            name: "When Breath Becomes Air",
            edition: "Hardcover Edition",
            author: "Paul Kalanithi",
            price: 16.99,
            genre: "Biographies",
            availableQuantity: 45,
            soldUnit: 350000,
        },
        {
            id: 26,
            imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1523542886i/7445.jpg",
            name: "The Glass Castle",
            edition: "Paperback Edition",
            author: "Jeannette Walls",
            price: 11.99,
            genre: "Biographies",
            availableQuantity: 50,
            soldUnit: 900000,
        },
        {
            id: 27,
            imageUrl: "https://media.thuprai.com/__sized__/products/9781471150388-thumbnail-280x405-70.jpg",
            name: "The Wright Brothers",
            edition: "Hardcover Edition",
            author: "David McCullough",
            price: 19.99,
            genre: "Biographies",
            availableQuantity: 40,
            soldUnit: 450000,
        },
        {
            id: 28,
            imageUrl: "https://m.media-amazon.com/images/I/81coyP8S-ZL.jpg",
            name: "The Immortal Life of Henrietta Lacks",
            edition: "Paperback Edition",
            author: "Rebecca Skloot",
            price: 14.99,
            genre: "Biographies",
            availableQuantity: 35,
            soldUnit: 1000000,
        },
        {
            id: 29,
            imageUrl: "https://media.thuprai.com/front_covers/dare-to-lead.jpg",
            name: "Dare to Lead",
            edition: "Hardcover Edition",
            author: "Brené Brown",
            price: 24.99,
            genre: "Biographies",
            availableQuantity: 30,
            soldUnit: 450000,
        },
        {
            id: 30,
            imageUrl: "https://booksmandala.com/_next/image?url=https%3A%2F%2Fbooks.bizmandala.com%2Fmedia%2Fbooks%2F9780062641540%2F9780062641540-9434.webp&w=3840&q=75",
            name: "The Subtle Art of Not Giving a F*ck",
            edition: "Updated Edition",
            author: "Mark Manson",
            price: 18.99,
            genre: "Biographies",
            availableQuantity: 25,
            soldUnit: 300000,
        }
    ];
    
    const [selectedGenre, setSelectedGenre] = useState("All book");
    const [visibleItems] = useState(booksData.length); // Initially show 8 items
    const [searchQuery, setSearchQuery] = useState(""); // Add a state for search

    // Filter items based on both Genre and search query
    const filteredbooksData = booksData.filter((item) => {
        const matchesGenre = selectedGenre === "All book" || item.genre === selectedGenre;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGenre && matchesSearch;
    });
    

    return (
            <div className="py-4 lg:px-24 md:px-16 px-8">
                {/* Search and Genre Filter */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border p-2 rounded w-full sm:w-2/2"
                    />
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="border p-2 rounded"
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
        
                {/* Book Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredbooksData.slice(0, visibleItems).map((book, index) => (
                        <Link to={`/book-details/${encodeURIComponent(book.name)}`} className="text-sm text-blue-500">
                            <div key={index} className="border rounded-lg p-4 h-full flex flex-col justify-between shadow hover:shadow-lg transition">
                                <img src={book.imageUrl} alt={book.name} className="w-full h-60 object-contain mb-4 rounded" />
                                <h2 className="text-lg font-semibold">{book.name}</h2>
                                <p className="text-sm text-gray-600">Author: {book.author}</p>
                                <p className="text-sm text-gray-500">{book.edition}</p>
                                <p className="mt-2 font-bold text-green-600">${book.price.toFixed(2)}</p>
                                <div className="flex gap-2 items-center mt-4">
                                    <button 
                                        className="bg-black w-full text-white px-2 py-2 rounded hover:bg-gray-900"
                                    >
                                        Borrow
                                    </button>
                                    <button 
                                        className="bg-blue-600 w-full flex items-center justify-center text-white px-2 py-2 rounded hover:bg-blue-700"
                                    >
                                        <LocalMallIcon fontSize="small" className="mr-1" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
}
