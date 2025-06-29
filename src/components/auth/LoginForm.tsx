import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { User, Lock, AlertCircle, HelpCircle, Eye, EyeOff, LogIn, Zap, MapPin, Building } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();
  const { showSuccess } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      showSuccess('Welcome to KaryaSahayak!', 'You have successfully signed in to your account.');
    }
  };

  const quickLogin = async (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    const success = await login(userEmail, userPassword);
    if (success) {
      showSuccess('Welcome to KaryaSahayak!', 'You have successfully signed in.');
    }
  };

  const demoUsers = [
    {
      role: 'Employee',
      name: 'Arjun Sharma',
      email: 'arjun.sharma@company.com',
      password: 'password123',
      department: 'Engineering',
      city: 'Bangalore',
      description: 'Create tickets, view your requests',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      role: 'HR Manager',
      name: 'Priya Patel',
      email: 'priya.patel@company.com',
      password: 'password123',
      department: 'Human Resources',
      city: 'Mumbai',
      description: 'Manage all tickets, respond to requests',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      role: 'Admin',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@company.com',
      password: 'password123',
      department: 'IT',
      city: 'Delhi',
      description: 'Full system access, user management',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      role: 'Employee',
      name: 'Anita Singh',
      email: 'anita.singh@company.com',
      password: 'password123',
      department: 'Finance',
      city: 'Pune',
      description: 'Finance team member',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      role: 'Employee',
      name: 'Vikram Reddy',
      email: 'vikram.reddy@company.com',
      password: 'password123',
      department: 'Sales',
      city: 'Hyderabad',
      description: 'Sales team member',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50 border-teal-200 hover:bg-teal-100'
    },
    {
      role: 'Employee',
      name: 'Kavya Nair',
      email: 'kavya.nair@company.com',
      password: 'password123',
      department: 'Marketing',
      city: 'Chennai',
      description: 'Marketing team member',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg animate-bounce">
              <HelpCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Karya
            </span>
            <span className="text-gray-900">Sahayak</span>
          </h1>
          <p className="text-2xl text-gray-600 mb-2">Smart HR Helpdesk</p>
          <p className="text-lg text-gray-500">Your intelligent employee support companion</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Login Section - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quick Demo Login</h2>
              <p className="text-gray-600 text-lg">Click any employee below to instantly sign in</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoUsers.map((user, index) => (
                <button
                  key={index}
                  onClick={() => quickLogin(user.email, user.password)}
                  disabled={loading}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none ${user.bgColor} animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left flex-1">
                      <div className="flex items-center mb-3">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${user.color} mr-3 animate-pulse`}></div>
                        <h3 className="text-lg font-bold text-gray-900">{user.role}</h3>
                      </div>
                      <p className="text-base font-semibold text-gray-800 mb-1">{user.name}</p>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Building className="w-3 h-3 mr-1" />
                        <span>{user.department}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{user.city}</span>
                      </div>
                      <p className="text-xs text-gray-600">{user.description}</p>
                    </div>
                    <div className="flex items-center ml-4">
                      {loading ? (
                        <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Zap className="w-8 h-8 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <p className="text-sm text-blue-700 font-medium mb-2">
                🚀 No registration required • Instant access • Full demo experience
              </p>
              <p className="text-xs text-blue-600">
                Experience KaryaSahayak with real-world scenarios and Indian employee data
              </p>
            </div>
          </div>

          {/* Manual Login Section */}
          <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-white/20 animate-slide-up">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Manual Login</h2>
              <p className="text-gray-600">Or enter credentials manually</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-700 text-sm font-medium">Login Failed</p>
                  <p className="text-red-600 text-sm mt-1">Please use the demo credentials or try again</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </div>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Sample Credentials:</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Employee:</span>
                    <span className="font-mono text-gray-800">arjun.sharma@company.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">HR Manager:</span>
                    <span className="font-mono text-gray-800">priya.patel@company.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Admin:</span>
                    <span className="font-mono text-gray-800">rajesh.kumar@company.com</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Password:</span>
                    <span className="font-mono text-gray-800">password123</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Need an account?{' '}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;