import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './lib/store';
import { supabase } from './lib/supabase';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AuthForm } from './components/AuthForm';
import { OnboardingForm } from './components/OnboardingForm';
import { UserProfile } from './components/UserProfile';
import { BookList } from './components/BookList';
import { BookDetail } from './components/BookDetail';
import { HomePage } from './components/HomePage';

function App() {
  const { user, setUser } = useStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              user ? <HomePage /> : <LandingPage />
            } />
            <Route path="/login" element={user ? <Navigate to="/" /> : (
              <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="auth-background absolute inset-0"></div>
                <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl relative z-10">
                  <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                      Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Sign in to your account to continue
                    </p>
                  </div>
                  <AuthForm type="login" />
                </div>
              </div>
            )} />
            <Route path="/register" element={user ? <Navigate to="/" /> : (
              <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="auth-background absolute inset-0"></div>
                <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl relative z-10">
                  <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                      Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Join our community of book lovers
                    </p>
                  </div>
                  <AuthForm type="register" />
                </div>
              </div>
            )} />
            <Route path="/onboarding" element={user ? <OnboardingForm /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
            <Route path="/books" element={user ? <BookList /> : <Navigate to="/login" />} />
            <Route path="/book/:id" element={user ? <BookDetail /> : <Navigate to="/login" />} />
            <Route path="/search" element={user ? <BookList /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;