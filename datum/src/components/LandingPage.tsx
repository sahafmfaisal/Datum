import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, Users, Sparkles } from 'lucide-react';

export function LandingPage() {

  useEffect(() => {
    const handleScroll = () => {
      const books = document.querySelectorAll('.floating-book');
      books.forEach((book, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = window.scrollY * speed;
        (book as HTMLElement).style.transform = `translateY(${yPos}px) rotate(${yPos * 0.1}deg)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-purple-700 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-book absolute opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              <BookOpen size={32 + Math.random() * 32} />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in">
            Your Journey Through
            <span className="block text-yellow-300">Infinite Stories</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 animate-fade-in-delay">
            Discover your next favorite book with AI-powered recommendations
            tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Link
              to="/register"
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              Start Your Journey
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-lg backdrop-blur-sm transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Discover the Magic of Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                AI-Powered Recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get personalized book suggestions based on your reading preferences and history.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Community Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with fellow readers and share your thoughts on your favorite books.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Track Your Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Keep track of your reading journey and earn achievements along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Begin Your Reading Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of readers who have already discovered their next favorite book through Datum.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}