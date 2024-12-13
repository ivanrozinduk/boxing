import React from 'react';
import { Flame, Heart, Medal, Menu, LogOut, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              <span className="ml-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                Rozin
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-amber-500">
                <Flame className="h-5 w-5" />
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center space-x-1 text-red-500">
                <Heart className="h-5 w-5" />
                <span className="font-semibold">5</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-500">
                <Medal className="h-5 w-5" />
                <span className="font-semibold">Silver</span>
              </div>
            </div>
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
              <span>{t('Sign Out')}</span>
            </button>
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-gray-100 py-2">
            <div className="flex justify-around py-3">
              <div className="flex items-center space-x-1 text-amber-500">
                <Flame className="h-5 w-5" />
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center space-x-1 text-red-500">
                <Heart className="h-5 w-5" />
                <span className="font-semibold">5</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-500">
                <Medal className="h-5 w-5" />
                <span className="font-semibold">Silver</span>
              </div>
            </div>
            <div className="flex justify-center space-x-4 py-3 border-t border-gray-100">
              <LanguageSwitcher />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>{t('auth.signOut')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}