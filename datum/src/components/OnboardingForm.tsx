import React, { useState } from 'react';
import { useStore } from '../lib/store';

const GENRES = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction',
  'Fantasy', 'Romance', 'Thriller', 'Horror', 'Biography',
  'History', 'Science', 'Technology', 'Self-Help', 'Poetry'
];

const READING_LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' }
];

export function OnboardingForm() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [readingLevel, setReadingLevel] = useState('intermediate');
  const setPreferences = useStore((state) => state.setPreferences);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreferences({
      genres: selectedGenres,
      readingLevel,
    });
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Select your favorite genres
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GENRES.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => toggleGenre(genre)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedGenres.includes(genre)
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Select your reading level
        </h3>
        <div className="flex gap-4">
          {READING_LEVELS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setReadingLevel(id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${readingLevel === id
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Save Preferences
      </button>
    </form>
  );
}