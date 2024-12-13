import { Link } from 'react-router-dom';
import { Flame, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Flame className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Rozin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t('Features')}
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t('Pricing')}
            </a>
            <Link to="/signin" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t('Sign In')}
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              {t('Get Started')}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 py-3 space-y-3">
              <a
                href="#features"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('Features')}
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('Pricing')}
              </a>
              <Link
                to="/signin"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('Sign In')}
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 text-base font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('Get Started')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}