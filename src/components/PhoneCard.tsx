import React from 'react';
import { Star, Heart, ShoppingCart, Zap, Camera, Smartphone, Cpu, Battery } from 'lucide-react';
import { Phone } from '../types/Phone';

interface PhoneCardProps {
  phone: Phone;
  onViewDetails: (phone: Phone) => void;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone, onViewDetails }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock':
        return 'text-emerald-600 bg-emerald-50';
      case 'limited':
        return 'text-amber-600 bg-amber-50';
      case 'out-of-stock':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'in-stock':
        return 'In Stock';
      case 'limited':
        return 'Limited Stock';
      case 'out-of-stock':
        return 'Out of Stock';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-gray-100">
      <div className="relative">
        <img 
          src={phone.image} 
          alt={phone.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(phone.availability)}`}>
            {getAvailabilityText(phone.availability)}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg">
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        {phone.originalPrice && phone.originalPrice > phone.price && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
              {Math.round((1 - phone.price / phone.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {phone.name}
            </h3>
            <p className="text-gray-600 text-sm">{phone.brand} • {phone.type}</p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-gray-700 ml-1">{phone.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({phone.reviews.toLocaleString()})</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Smartphone className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="truncate">{phone.specifications.display.split(' ')[0]}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Cpu className="w-4 h-4 mr-2 text-purple-500" />
            <span className="truncate">{phone.specifications.ram}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Camera className="w-4 h-4 mr-2 text-emerald-500" />
            <span className="truncate">{phone.specifications.camera.split(' ')[0]}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Battery className="w-4 h-4 mr-2 text-blue-500" />
            <span className="truncate">{phone.specifications.battery}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {phone.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full font-medium"
            >
              {feature}
            </span>
          ))}
          {phone.features.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{phone.features.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{formatPrice(phone.price)}</span>
              {phone.originalPrice && phone.originalPrice > phone.price && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {formatPrice(phone.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => onViewDetails(phone)}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Zap className="w-4 h-4 mr-2" />
            View Details
          </button>
          <button className="px-4 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-200 flex items-center justify-center">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;