import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, LogOut, User, Settings, ChevronDown, Menu } from 'lucide-react';
import NotificationCenter from '../features/NotificationCenter';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-secondary-100 text-secondary-800';
      case 'HR':
        return 'bg-primary-100 text-primary-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <header className="glass-effect shadow-soft border-b border-white/30 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Search Bar - Hidden on mobile, shown on tablet+ */}
        <div className="hidden md:flex items-center flex-1 max-w-xl lg:max-w-2xl">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets, articles, employees..."
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-neutral-50/80 border border-neutral-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder-neutral-500 text-sm sm:text-base"
            />
          </form>
        </div>

        {/* Mobile Search Button */}
        <div className="md:hidden flex-1">
          <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4 ml-4 sm:ml-6">
          {/* Notifications */}
          <NotificationCenter />

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 hover:bg-neutral-100 rounded-lg sm:rounded-xl transition-all duration-200"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 gradient-primary rounded-lg sm:rounded-xl flex items-center justify-center shadow-medium">
                  <span className="text-white text-xs sm:text-sm font-bold">{getUserInitials()}</span>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-neutral-900 truncate max-w-32 lg:max-w-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getRoleColor(user?.role || '')}`}>
                      {user?.role}
                    </span>
                    <span className="text-xs text-neutral-500 hidden lg:inline truncate">
                      {user?.department}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-neutral-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''} hidden sm:block`} />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                {/* Mobile backdrop */}
                <div 
                  className="sm:hidden fixed inset-0 z-40" 
                  onClick={() => setShowUserMenu(false)}
                />
                
                <div className="absolute right-0 mt-2 w-64 sm:w-72 glass-effect rounded-xl sm:rounded-2xl shadow-brand border border-white/30 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-neutral-100">
                    <p className="text-sm font-semibold text-neutral-900 truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user?.role || '')}`}>
                        {user?.role}
                      </span>
                      <span className="text-xs text-neutral-500 truncate">{user?.department}</span>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <button className="w-full flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                      <User className="w-4 h-4 mr-3" />
                      Profile Settings
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      Preferences
                    </button>
                  </div>
                  
                  <div className="border-t border-neutral-100 pt-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      <div className="md:hidden mt-3">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-50/80 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder-neutral-500 text-sm"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
