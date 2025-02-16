import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { BookCarousel } from './components/BookCarousel';
import { AuthForm } from './components/AuthForm';
import { OnboardingForm } from './components/OnboardingForm';
import { BookDetail } from './components/BookDetail';
import { UserProfile } from './components/UserProfile';
import { LandingPage } from './components/LandingPage';
import { useStore } from './lib/store';
import { supabase } from './lib/supabase';

const MOCK_BOOKS = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    rating: 4.5,
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    genre: 'Literary Fiction',
    publishDate: '2020-08-13',
    pages: 304,
    reviews: [
      {
        id: '1',
        user: {
          name: 'Alice Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        },
        rating: 5,
        content: 'A beautiful and thought-provoking story about the choices we make in life.',
        helpful: 42,
        date: '2024-02-15',
      },
    ],
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    cover: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=400&h=600&fit=crop',
    rating: 4.8,
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.',
    genre: 'Science Fiction',
    publishDate: '1965-08-01',
    pages: 412,
    reviews: [],
  },
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
    rating: 4.7,
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish.',
    genre: 'Science Fiction',
    publishDate: '2021-05-04',
    pages: 496,
    reviews: [],
  },
  {
    id: '4',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    rating: 4.6,
    description: 'A tale of gods, kings, immortal fame, and the human heart, The Song of Achilles is a dazzling literary feat.',
    genre: 'Historical Fiction',
    publishDate: '2011-09-20',
    pages: 378,
    reviews: [],
  },
  {
    id: '5',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    rating: 4.3,
    description: 'From her place in the store, Klara, an Artificial Friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse.',
    genre: 'Literary Fiction',
    publishDate: '2021-03-02',
    pages: 303,
    reviews: [],
  },
];

function App() {
  const { user, setUser } = useStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <main className="container mx-auto px-4 py-8">
                  <section className="mb-12">
                    <div className="max-w-4xl">
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Welcome back, {user.email?.split('@')[0]}
                      </h1>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        Discover new stories tailored just for you
                      </p>
                    </div>
                  </section>

                  <section className="space-y-12">
                    <BookCarousel title="Books You'll Love" books={MOCK_BOOKS} />
                    <BookCarousel title="Trending Now" books={MOCK_BOOKS} />
                    <BookCarousel title="New Releases" books={MOCK_BOOKS} />
                  </section>
                </main>
              ) : (
                <LandingPage />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : (
                <div className="container mx-auto px-4 py-8">
                  <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Sign In to Datum
                    </h2>
                    <AuthForm type="login" />
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/register"
            element={
              user ? <Navigate to="/onboarding" /> : (
                <div className="container mx-auto px-4 py-8">
                  <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Create your Datum account
                    </h2>
                    <AuthForm type="register" />
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              !user ? <Navigate to="/login" /> : (
                <div className="container mx-auto px-4 py-8">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Tell us about your reading preferences
                    </h2>
                    <OnboardingForm />
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/book/:id"
            element={
              <BookDetail book={MOCK_BOOKS[0]} />
            }
          />
          <Route
            path="/profile"
            element={
              !user ? <Navigate to="/login" /> : <UserProfile />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;