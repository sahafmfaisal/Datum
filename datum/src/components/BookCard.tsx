import React from 'react';
import { Star, BookOpen, BookmarkPlus } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  className?: string;
}

export function BookCard({ id, title, author, cover, rating, className }: BookCardProps) {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${id}`);
  };

  const handleReadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/book/${id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement bookmark functionality
    console.log('Bookmark clicked for:', title);
  };

  return (
    <div
      onClick={handleBookClick}
      className={cn(
        "group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer",
        className
      )}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={cover}
          alt={title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <button
              onClick={handleReadClick}
              className="text-white hover:text-yellow-400 transition-colors"
              aria-label="Read book"
            >
              <BookOpen className="w-5 h-5" />
            </button>
            <button
              onClick={handleBookmarkClick}
              className="text-white hover:text-yellow-400 transition-colors"
              aria-label="Bookmark book"
            >
              <BookmarkPlus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{author}</p>
        <div className="mt-2 flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}