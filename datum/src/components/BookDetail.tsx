import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, BookOpen, BookmarkPlus, ThumbsUp, MessageSquare } from 'lucide-react';
import { getBookById, formatBookData } from '../lib/googleBooks';

export function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) return;
      
      try {
        const bookData = await getBookById(id);
        setBook(formatBookData(bookData));
      } catch (err) {
        setError('Failed to load book details');
        console.error('Error loading book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading-book"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        {error || 'Book not found'}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-[2/3] md:sticky md:top-24">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              by {book.author}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 font-medium">{book.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 dark:text-gray-400">{book.genre}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 dark:text-gray-400">{book.pages} pages</span>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <BookOpen className="w-5 h-5" />
              Start Reading
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <BookmarkPlus className="w-5 h-5" />
              Save
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              About this book
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {book.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}