import React, { useEffect, useState, useRef } from 'react';
import { Element } from 'react-scroll';
import { BookCarousel } from './BookCarousel';
import { searchBooks, formatBookData } from '../lib/googleBooks';

export function HomePage() {
    const [popularBooks, setPopularBooks] = useState([]);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [readingList, setReadingList] = useState([]);
    const [loading, setLoading] = useState({
        popular: true,
        recommended: true,
        readingList: true,
    });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Fetch popular books
                const popularResults = await searchBooks('bestsellers 2024');
                setPopularBooks(popularResults.items.map(formatBookData));
                setLoading(prev => ({ ...prev, popular: false }));

                // Fetch recommended books (based on different genres)
                const recommendedResults = await searchBooks('award winning fiction');
                setRecommendedBooks(recommendedResults.items.map(formatBookData));
                setLoading(prev => ({ ...prev, recommended: false }));

                // Fetch reading list (could be personalized in the future)
                const readingListResults = await searchBooks('classic literature');
                setReadingList(readingListResults.items.map(formatBookData));
                setLoading(prev => ({ ...prev, readingList: false }));
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 space-y-12">
            <Element name="browse" className="scroll-mt-16">
                <BookCarousel
                    title="Popular Books"
                    books={popularBooks}
                    loading={loading.popular}
                />
            </Element>

            <Element name="recommendations" className="scroll-mt-16">
                <BookCarousel
                    title="Recommended for You"
                    books={recommendedBooks}
                    loading={loading.recommended}
                />
            </Element>

            <Element name="reading-list" className="scroll-mt-16">
                <BookCarousel
                    title="Your Reading List"
                    books={readingList}
                    loading={loading.readingList}
                />
            </Element>
        </div>
    );
}