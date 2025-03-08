import { BookCard } from './BookCard';

const SAMPLE_BOOKS = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
  },
  {
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
  },
  {
    id: '4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
  },
  {
    id: '5',
    title: 'Dune',
    author: 'Frank Herbert',
    cover: 'https://images.unsplash.com/photo-1608229191360-7064b0afa639?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
  },
];

export function BookList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Recommended Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {SAMPLE_BOOKS.map((book) => (
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
    </div>
  );
}