import axios from 'axios';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

export interface GoogleBook {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        publishedDate?: string;
        description?: string;
        pageCount?: number;
        categories?: string[];
        imageLinks?: {
            thumbnail?: string;
            smallThumbnail?: string;
        };
        averageRating?: number;
    };
}

export interface SearchResults {
    items: GoogleBook[];
    totalItems: number;
}

export const searchBooks = async (query: string, startIndex = 0): Promise<SearchResults> => {
    try {
        const response = await axios.get(GOOGLE_BOOKS_API_URL, {
            params: {
                q: query,
                startIndex,
                maxResults: 20,
                projection: 'full',
            },
        });

        const data = response.data as SearchResults;
        return data;
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
};

export const getBookById = async (bookId: string): Promise<GoogleBook> => {
    try {
        const response = await axios.get(`${GOOGLE_BOOKS_API_URL}/${bookId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching book details:', error);
        throw error;
    }
};

export const formatBookData = (book: GoogleBook) => {
    // Create a function to strip HTML tags from description
    const stripHtmlTags = (html: string): string => {
        // First create a temporary DOM element
        const tempElement = document.createElement('div');
        // Set its HTML content to our description
        tempElement.innerHTML = html;
        // Return the text content which will be free of HTML tags
        return tempElement.textContent || tempElement.innerText || 'No description available.';
    };

    return {
        id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.[0] || 'Unknown Author',
        cover: book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') ||
            'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80',
        description: book.volumeInfo.description 
            ? stripHtmlTags(book.volumeInfo.description) 
            : 'No description available.',
        genre: book.volumeInfo.categories?.[0] || 'Uncategorized',
        rating: book.volumeInfo.averageRating || 0,
        pages: book.volumeInfo.pageCount || 0,
        publishDate: book.volumeInfo.publishedDate || 'Unknown',
    };
};