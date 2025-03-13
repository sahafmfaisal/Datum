import React, { useState, useEffect } from 'react';
import { BookCard } from './BookCard';
import { searchBooks, formatBookData } from '../lib/googleBooks';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function BookList() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Parse query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      searchBooksHandler(searchQuery);
    } else {
      // Initial popular books load
      searchBooksHandler('bestsellers fiction 2024');
    }
  }, [location.search]);

  const searchBooksHandler = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const results = await searchBooks(searchQuery);
      if (results && results.items) {
        const formattedBooks = results.items.map(formatBookData);
        setBooks(formattedBooks);
      } else {
        setBooks([]);
      }
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchBooksHandler(query);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books by title, author, or genre..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="loading-book"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 dark:text-red-400 py-10">
          {error}
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {query ? 'Search Results' : 'Popular Books'}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
                rating={book.rating}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}