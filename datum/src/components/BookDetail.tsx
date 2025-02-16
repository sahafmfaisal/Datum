import React from 'react';
import { Star, BookOpen, BookmarkPlus, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  content: string;
  helpful: number;
  date: string;
}

interface BookDetailProps {
  book: {
    id: string;
    title: string;
    author: string;
    cover: string;
    rating: number;
    description: string;
    genre: string;
    publishDate: string;
    pages: number;
    reviews: Review[];
  };
}

export function BookDetail({ book }: BookDetailProps) {
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

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Reviews
            </h2>
            <div className="space-y-6">
              {book.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 dark:border-gray-800 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {review.user.name}
                        </p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {review.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <MessageSquare className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}