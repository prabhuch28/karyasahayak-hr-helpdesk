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
      gradient: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50 border-primary-200 hover:bg-primary-100'
    },
    {
      role: 'HR Manager',
      name: 'Priya Patel',
      email: 'priya.patel@company.com',
      password: 'password123',
      department: 'Human Resources',
      city: 'Mumbai',
      description: 'Manage all tickets, respond to requests',
      gradient: 'from-success-500 to-success-600',
      bgColor: 'bg-success-50 border-success-200 hover:bg-success-100'
    },
    {
      role: 'Admin',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@company.com',
      password: 'password123',
      department: 'IT',
      city: 'Delhi',
      description: 'Full system access, user management',
      gradient: 'from-secondary-500 to-secondary-600',
      bgColor: 'bg-secondary-50 border-secondary-200 hover:bg-secondary-100'
    },
    {
      role: 'Employee',
      name: 'Anita Singh',
      email: 'anita.singh@company.com',
      password: 'password123',
      department: 'Finance',
      city: 'Pune',
      description: 'Finance team member',
      gradient: 'from-warning-500 to-warning-600',
      bgColor: 'bg-warning-50 border-warning-200 hover:bg-warning-100'
    },
    {
      role: 'Employee',
      name: 'Vikram Reddy',
      email: 'vikram.reddy@company.com',
      password: 'password123',
      department: 'Sales',
      city: 'Hyderabad',
      description: 'Sales team member',
      gradient: 'from-brand-teal to-primary-500',
      bgColor: 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
    },
    {
      role: 'Employee',
      name: 'Kavya Nair',
      email: 'kavya.nair@company.com',
      password: 'password123',
      department: 'Marketing',
      city: 'Chennai',
      description: 'Marketing team member',
      gradient: 'from-brand-pink to-secondary-500',
      bgColor: 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 gradient-brand rounded-2xl sm:rounded-3xl shadow-brand animate-bounce-gentle">
              <HelpCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-2 sm:mb-4">
            <span className="bg-gradient-to-r from-brand-orange to-error-500 bg-clip-text text-transparent">
              Karya
            </span>
            <span className="text-neutral-900">Sahayak</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 mb-1 sm:mb-2">Smart HR Helpdesk</p>
          <p className="text-base sm:text-lg text-neutral-500">Your intelligent employee support companion</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Quick Login Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Quick Demo Login</h2>
              <p className="text-neutral-600 text-base sm:text-lg">Click any employee below to instantly sign in</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {demoUsers.map((user, index) => (
                <button
                  key={index}
                  onClick={() => quickLogin(user.email, user.password)}
                  disabled={loading}
                  className={`w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:shadow-medium transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none ${user.bgColor} animate-fade-in card-hover-subtle`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left flex-1 min-w-0">
                      <div className="flex items-center mb-2 sm:mb-3">
                        <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r ${user.gradient} mr-2 sm:mr-3 animate-pulse-slow flex-shrink-0`}></div>
                        <h3 className="text-sm sm:text-lg font-bold text-neutral-900 truncate">{user.role}</h3>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-neutral-800 mb-1 truncate">{user.name}</p>
                      <div className="flex items-center text-xs sm:text-sm text-neutral-600 mb-1">
                        <Building className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{user.department}</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-neutral-600 mb-1 sm:mb-2">
                        <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{user.city}</span>
                      </div>
                      <p className="text-xs text-neutral-600 line-clamp-2">{user.description}</p>
                    </div>
                    <div className="flex items-center ml-3 sm:ml-4">
                      {loading ? (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary-200">
              <p className="text-sm font-medium text-primary-700 mb-2">
                🚀 No registration required • Instant access • Full demo experience
              </p>
              <p className="text-xs text-primary-600">
                Experience KaryaSahayak with real-world scenarios and Indian employee data
              </p>
            </div>
          </div>

          {/* Manual Login Section */}
          <div className="glass-effect rounded-xl sm:rounded-2xl shadow-brand p-6 sm:p-8 border border-white/30 animate-slide-up">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">Manual Login</h2>
              <p className="text-neutral-600 text-sm sm:text-base">Or enter credentials manually</p>
            </div>

            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 notification-error rounded-xl flex items-start animate-fade-in">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-error-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-error-700 text-sm font-medium">Login Failed</p>
                  <p className="text-error-600 text-xs sm:text-sm mt-1">Please use the demo credentials or try again</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-primary pl-10 sm:pl-11"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-primary pl-10 sm:pl-11 pr-10 sm:pr-11"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LogIn className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Sign In
                  </div>
                )}
              </button>
            </form>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-neutral-200">
              <div className="bg-neutral-50 rounded-xl p-3 sm:p-4">
                <h4 className="text-sm font-semibold text-neutral-700 mb-2 sm:mb-3">Sample Credentials:</h4>
                <div className="space-y-1 sm:space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Employee:</span>
                    <span className="font-mono text-neutral-800 text-xs truncate ml-2">arjun.sharma@company.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">HR Manager:</span>
                    <span className="font-mono text-neutral-800 text-xs truncate ml-2">priya.patel@company.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Admin:</span>
                    <span className="font-mono text-neutral-800 text-xs truncate ml-2">rajesh.kumar@company.com</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-neutral-200">
                    <span className="text-neutral-600">Password:</span>
                    <span className="font-mono text-neutral-800 text-xs">password123</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-neutral-600 text-sm">
                Need an account?{' '}
                <Link
                  to="/register"
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
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
