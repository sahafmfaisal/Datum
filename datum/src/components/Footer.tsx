import { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Github, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

export function Footer() {
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const htmlElement = document.documentElement;
        
        const updateDarkMode = () => {
            setIsDark(htmlElement.classList.contains('dark'));
        };

        const observer = new MutationObserver(updateDarkMode);
        observer.observe(htmlElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        updateDarkMode();

        // Cleanup
        return () => observer.disconnect();
    }, []);

    // Helper function to render either ScrollLink or regular Link based on current page
    const renderNavLink = (to, scrollTo, label) => {
        if (isHomePage && scrollTo) {
            return (
                <ScrollLink
                    to={scrollTo}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                >
                    {label}
                </ScrollLink>
            );
        } else {
            return (
                <Link to={to} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    {label}
                </Link>
            );
        }
    };

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link to="/" className="mr-4 inline-block">
                            <img
                                src={isDark ? "/images/white.svg" : "/images/black.svg"}
                                alt="Logo"
                                className="h-8 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400">
                            Discover your next favorite book with personalised recommendations.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="https://instagram.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="https://github.com/sahafmfaisal/Datum" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <Github className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                {renderNavLink("/browse", "browse", "Browse")}
                            </li>
                            <li>
                                {renderNavLink("/reading-list", "reading-list", "Reading List")}
                            </li>
                            <li>
                                {renderNavLink("/recommendations", "recommendations", "Recommendations")}
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Newsletter
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Subscribe to our newsletter for the latest book recommendations.
                        </p>
                        <form className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 min-w-0 px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Mail className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-center text-gray-400 dark:text-gray-600">
                        © {new Date().getFullYear()} DATUM. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}