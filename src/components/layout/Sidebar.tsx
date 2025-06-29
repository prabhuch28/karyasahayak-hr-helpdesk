import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Ticket,
  BookOpen,
  Settings,
  HelpCircle,
  Plus,
  Users,
  BarChart3,
  Zap,
  Star,
  MapPin,
  Building
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { 
      to: '/dashboard', 
      icon: LayoutDashboard, 
      label: 'Dashboard',
      description: 'Overview & stats'
    },
    { 
      to: '/tickets', 
      icon: Ticket, 
      label: 'My Tickets',
      description: 'View your requests'
    },
    { 
      to: '/tickets/new', 
      icon: Plus, 
      label: 'New Ticket',
      description: 'Create request',
      highlight: true
    },
    { 
      to: '/knowledge', 
      icon: BookOpen, 
      label: 'Knowledge Base',
      description: 'Help articles'
    },
  ];

  if (user?.role === 'ADMIN' || user?.role === 'HR') {
    navItems.push({ 
      to: '/admin', 
      icon: Settings, 
      label: 'Admin Panel',
      description: 'System management'
    });
  }

  const quickStats = [
    { label: 'Open Tickets', value: '5', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'This Month', value: '18', color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Avg Response', value: '1.5h', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ];

  return (
    <div className="w-72 bg-white/90 backdrop-blur-xl shadow-xl border-r border-gray-200/50 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Karya
              </span>
              <span className="text-gray-900">Sahayak</span>
            </h1>
            <p className="text-sm text-gray-600">Smart HR Support</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 animate-slide-up ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-[1.02]'
                  : item.highlight
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 hover:from-green-100 hover:to-emerald-100 border border-green-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center flex-1">
              <item.icon className={`w-5 h-5 mr-3 ${
                location.pathname === item.to 
                  ? 'text-white' 
                  : item.highlight 
                  ? 'text-green-600' 
                  : 'text-gray-500 group-hover:text-gray-700'
              }`} />
              <div>
                <div className="font-semibold">{item.label}</div>
                <div className={`text-xs ${
                  location.pathname === item.to 
                    ? 'text-white/80' 
                    : item.highlight 
                    ? 'text-green-600/80' 
                    : 'text-gray-500'
                }`}>
                  {item.description}
                </div>
              </div>
            </div>
            {item.highlight && (
              <Star className="w-4 h-4 text-green-500 animate-pulse" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200/50">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
        <div className="space-y-2">
          {quickStats.map((stat, index) => (
            <div key={index} className={`flex items-center justify-between p-3 ${stat.bgColor} rounded-xl transition-all duration-200 hover:shadow-md`}>
              <span className="text-xs text-gray-700 font-medium">{stat.label}</span>
              <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <div className="flex items-center text-xs text-gray-600 mb-1">
              <Building className="w-3 h-3 mr-1" />
              <span>{user?.department}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600 mb-2">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{(user as any)?.city || 'India'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                user?.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                user?.role === 'HR' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {user?.role}
              </span>
              <Zap className="w-3 h-3 text-green-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;