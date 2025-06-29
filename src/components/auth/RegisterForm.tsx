import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { 
  User, 
  Mail, 
  Lock, 
  AlertCircle, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Building,
  ArrowRight,
  UserPlus
} from 'lucide-react';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { showSuccess, showError } = useToast();

  const departments = [
    'Engineering',
    'Human Resources',
    'Sales',
    'Marketing',
    'Finance',
    'Operations',
    'Customer Support',
    'IT',
    'Legal',
    'Other'
  ];

  const validateField = (name: string, value: string) => {
    const errors: Record<string, string> = {};
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          errors.firstName = 'First name is required';
        } else if (value.trim().length < 2) {
          errors.firstName = 'First name must be at least 2 characters';
        } else if (value.trim().length > 50) {
          errors.firstName = 'First name must be less than 50 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          errors.firstName = 'First name can only contain letters';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          errors.lastName = 'Last name is required';
        } else if (value.trim().length < 2) {
          errors.lastName = 'Last name must be at least 2 characters';
        } else if (value.trim().length > 50) {
          errors.lastName = 'Last name must be less than 50 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          errors.lastName = 'Last name can only contain letters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else if (value.length > 100) {
          errors.email = 'Email must be less than 100 characters';
        }
        break;
      case 'password':
        if (!value) {
          errors.password = 'Password is required';
        } else if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        } else if (value.length > 100) {
          errors.password = 'Password must be less than 100 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
        }
        break;
      case 'department':
        if (!value) {
          errors.department = 'Please select your department';
        }
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError(null);
    }
    
    // Validate if field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
    
    // Special case: revalidate confirmPassword when password changes
    if (name === 'password' && touched.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  };

  const handleFieldBlur = (name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Validate all fields
    const validations = [
      validateField('firstName', formData.firstName),
      validateField('lastName', formData.lastName),
      validateField('email', formData.email),
      validateField('password', formData.password),
      validateField('confirmPassword', formData.confirmPassword),
      validateField('department', formData.department),
    ];
    
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      department: true,
    });
    
    if (!validations.every(Boolean)) {
      setSubmitError('Please fix the errors above before submitting');
      return;
    }

    setLoading(true);
    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      showSuccess(
        'Registration Successful!',
        'Your account has been created. You can now sign in with your credentials.'
      );
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
      });
      setTouched({});
      setFieldErrors({});
      
    } catch (error: any) {
      console.error('Registration failed:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setSubmitError(errorMessage);
      showError('Registration Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getFieldStatus = (fieldName: string, value: string) => {
    if (!touched[fieldName]) return 'default';
    if (fieldErrors[fieldName]) return 'error';
    if (value && !fieldErrors[fieldName]) return 'success';
    return 'default';
  };

  const getInputClasses = (fieldName: string, value: string) => {
    const status = getFieldStatus(fieldName, value);
    const baseClasses = "w-full pl-11 pr-12 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200";
    
    switch (status) {
      case 'error':
        return `${baseClasses} border-red-300 focus:ring-red-500 bg-red-50`;
      case 'success':
        return `${baseClasses} border-green-300 focus:ring-green-500 bg-green-50`;
      default:
        return `${baseClasses} border-gray-200 focus:ring-indigo-500`;
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 4) return { strength, label: 'Medium', color: 'bg-yellow-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Join HR Helpdesk</h2>
          <p className="text-gray-600 text-lg">Create your account to get started</p>
        </div>

        <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-white/20">
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-700 text-sm font-medium">Registration Error</p>
                <p className="text-red-600 text-sm mt-1">{submitError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                    onBlur={(e) => handleFieldBlur('firstName', e.target.value)}
                    className={getInputClasses('firstName', formData.firstName)}
                    placeholder="Enter your first name"
                    autoComplete="given-name"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getFieldStatus('firstName', formData.firstName) === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {getFieldStatus('firstName', formData.firstName) === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
                {fieldErrors.firstName && (
                  <p className="text-red-600 text-sm mt-2 flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {fieldErrors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                    onBlur={(e) => handleFieldBlur('lastName', e.target.value)}
                    className={getInputClasses('lastName', formData.lastName)}
                    placeholder="Enter your last name"
                    autoComplete="family-name"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getFieldStatus('lastName', formData.lastName) === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {getFieldStatus('lastName', formData.lastName) === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
                {fieldErrors.lastName && (
                  <p className="text-red-600 text-sm mt-2 flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {fieldErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={(e) => handleFieldBlur('email', e.target.value)}
                  className={getInputClasses('email', formData.email)}
                  placeholder="Enter your work email"
                  autoComplete="email"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {getFieldStatus('email', formData.email) === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {getFieldStatus('email', formData.email) === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
              {fieldErrors.email && (
                <p className="text-red-600 text-sm mt-2 flex items-center animate-slide-up">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Department Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={formData.department}
                  onChange={(e) => handleFieldChange('department', e.target.value)}
                  onBlur={(e) => handleFieldBlur('department', e.target.value)}
                  className={getInputClasses('department', formData.department)}
                >
                  <option value="">Select your department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {getFieldStatus('department', formData.department) === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {getFieldStatus('department', formData.department) === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
              {fieldErrors.department && (
                <p className="text-red-600 text-sm mt-2 flex items-center animate-slide-up">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {fieldErrors.department}
                </p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleFieldChange('password', e.target.value)}
                    onBlur={(e) => handleFieldBlur('password', e.target.value)}
                    className={getInputClasses('password', formData.password)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    {getFieldStatus('password', formData.password) === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {getFieldStatus('password', formData.password) === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Password strength</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength.label === 'Strong' ? 'text-green-600' :
                        passwordStrength.label === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.strength / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {fieldErrors.password && (
                  <p className="text-red-600 text-sm mt-2 flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                    onBlur={(e) => handleFieldBlur('confirmPassword', e.target.value)}
                    className={getInputClasses('confirmPassword', formData.confirmPassword)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    {getFieldStatus('confirmPassword', formData.confirmPassword) === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {getFieldStatus('confirmPassword', formData.confirmPassword) === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-2 flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || Object.keys(fieldErrors).some(key => fieldErrors[key])}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create Account
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors inline-flex items-center"
              >
                Sign in here
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;