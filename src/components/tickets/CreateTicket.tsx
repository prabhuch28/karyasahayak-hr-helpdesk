import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketsAPI } from '../../services/api';
import { ArrowLeft, Send, AlertCircle, CheckCircle, Info } from 'lucide-react';

const CreateTicket: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'MEDIUM',
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const categories = [
    { value: 'PTO', label: 'PTO / Time Off', description: 'Vacation requests, sick leave, personal time' },
    { value: 'PAYROLL', label: 'Payroll', description: 'Salary questions, tax forms, direct deposit' },
    { value: 'POLICY', label: 'Policy Questions', description: 'Company policies, procedures, guidelines' },
    { value: 'BENEFITS', label: 'Benefits', description: 'Health insurance, retirement, employee perks' },
    { value: 'OTHER', label: 'Other', description: 'General HR inquiries and support' },
  ];

  const priorities = [
    { value: 'LOW', label: 'Low', color: 'bg-gray-100 text-gray-800', description: 'Non-urgent, can wait' },
    { value: 'MEDIUM', label: 'Medium', color: 'bg-blue-100 text-blue-800', description: 'Standard priority' },
    { value: 'HIGH', label: 'High', color: 'bg-orange-100 text-orange-800', description: 'Needs attention soon' },
    { value: 'URGENT', label: 'Urgent', color: 'bg-red-100 text-red-800', description: 'Immediate attention required' },
  ];

  const validateField = (name: string, value: string) => {
    const errors: Record<string, string> = {};
    
    switch (name) {
      case 'title':
        if (!value.trim()) {
          errors.title = 'Title is required';
        } else if (value.trim().length < 5) {
          errors.title = 'Title must be at least 5 characters';
        } else if (value.trim().length > 100) {
          errors.title = 'Title must be less than 100 characters';
        }
        break;
      case 'description':
        if (!value.trim()) {
          errors.description = 'Description is required';
        } else if (value.trim().length < 10) {
          errors.description = 'Description must be at least 10 characters';
        } else if (value.trim().length > 2000) {
          errors.description = 'Description must be less than 2000 characters';
        }
        break;
      case 'category':
        if (!value) {
          errors.category = 'Please select a category';
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
  };

  const handleFieldBlur = (name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Validate all fields
    const titleValid = validateField('title', formData.title);
    const descriptionValid = validateField('description', formData.description);
    const categoryValid = validateField('category', formData.category);
    
    setTouched({ title: true, description: true, category: true, priority: true });
    
    if (!titleValid || !descriptionValid || !categoryValid) {
      setSubmitError('Please fix the errors above before submitting');
      return;
    }

    setLoading(true);
    try {
      const ticket = await ticketsAPI.create(formData);
      navigate(`/tickets/${ticket.id}`);
    } catch (error: any) {
      console.error('Failed to create ticket:', error);
      setSubmitError(
        error.response?.data?.message || 
        'Failed to create ticket. Please try again.'
      );
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
    const baseClasses = "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200";
    
    switch (status) {
      case 'error':
        return `${baseClasses} border-red-300 focus:ring-red-500 bg-red-50`;
      case 'success':
        return `${baseClasses} border-green-300 focus:ring-green-500 bg-green-50`;
      default:
        return `${baseClasses} border-gray-200 focus:ring-indigo-500 bg-white`;
    }
  };

  const getCharacterCount = (text: string, max: number) => {
    const remaining = max - text.length;
    const isNearLimit = remaining <= max * 0.1;
    const isOverLimit = remaining < 0;
    
    return (
      <span className={`text-xs ${isOverLimit ? 'text-red-500' : isNearLimit ? 'text-orange-500' : 'text-gray-500'}`}>
        {text.length}/{max}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Ticket</h1>
          <p className="text-gray-600 mt-1">Submit your HR request and get help from our team</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-700 text-sm font-medium">Submission Error</p>
              <p className="text-red-600 text-sm mt-1">{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                onBlur={(e) => handleFieldBlur('title', e.target.value)}
                className={getInputClasses('title', formData.title)}
                placeholder="Brief description of your request (e.g., 'PTO Request for December')"
                maxLength={100}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getFieldStatus('title', formData.title) === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {getFieldStatus('title', formData.title) === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                {fieldErrors.title && (
                  <p className="text-red-600 text-sm flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {fieldErrors.title}
                  </p>
                )}
              </div>
              {getCharacterCount(formData.title, 100)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <div className="space-y-3">
                {categories.map((category) => (
                  <label
                    key={category.value}
                    className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.category === category.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={formData.category === category.value}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-start">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 mt-0.5 ${
                        formData.category === category.value
                          ? 'border-indigo-500 bg-indigo-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.category === category.value && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{category.label}</div>
                        <div className="text-sm text-gray-600">{category.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {fieldErrors.category && (
                <p className="text-red-600 text-sm mt-2 flex items-center animate-slide-up">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {fieldErrors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priority
              </label>
              <div className="space-y-3">
                {priorities.map((priority) => (
                  <label
                    key={priority.value}
                    className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.priority === priority.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority.value}
                      checked={formData.priority === priority.value}
                      onChange={(e) => handleFieldChange('priority', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          formData.priority === priority.value
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.priority === priority.value && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{priority.label}</div>
                          <div className="text-sm text-gray-600">{priority.description}</div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${priority.color}`}>
                        {priority.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <div className="relative">
              <textarea
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                onBlur={(e) => handleFieldBlur('description', e.target.value)}
                rows={6}
                className={getInputClasses('description', formData.description)}
                placeholder="Please provide detailed information about your request. Include any relevant dates, amounts, or specific questions you have..."
                maxLength={2000}
              />
              <div className="absolute top-3 right-3">
                {getFieldStatus('description', formData.description) === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {getFieldStatus('description', formData.description) === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                {fieldErrors.description && (
                  <p className="text-red-600 text-sm flex items-center animate-slide-up">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {fieldErrors.description}
                  </p>
                )}
              </div>
              {getCharacterCount(formData.description, 2000)}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">What happens next?</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your ticket will be reviewed by our HR team. You'll receive updates via email and can track progress in your dashboard. Most requests are handled within 24-48 hours.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || Object.keys(fieldErrors).some(key => fieldErrors[key])}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Create Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;