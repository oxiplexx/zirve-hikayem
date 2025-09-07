import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkımda', href: '/about' },
    { name: 'İletişim', href: '/contact' },
    { name: 'Admin', href: '/admin', protected: true }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="zirve-logo-container">
            <img 
              src="https://customer-assets.emergentagent.com/job_zirvehikayeleri/artifacts/u9h2xa09_Logo1.png" 
              alt="Zirve Hikayem Logo"
              className="zirve-logo-image"
            />
            <span className="text-xl font-bold zirve-text-gradient">Zirve Hikayem</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              if (item.protected && !isAuthenticated) {
                return null;
              }
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'zirve-nav-active border-b-2'
                      : 'text-slate-600 hover:text-purple-600 hover:border-b-2 hover:border-purple-300'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            
            {/* User Menu */}
            {isAuthenticated && user && (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-slate-700">{user.full_name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-600 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Çıkış
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-purple-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                if (item.protected && !isAuthenticated) {
                  return null;
                }
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                      isActive(item.href)
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Mobile User Menu */}
              {isAuthenticated && user && (
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <div className="px-3 py-2 text-sm text-slate-700">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-purple-600" />
                      <span>{user.full_name}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-2 inline" />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;