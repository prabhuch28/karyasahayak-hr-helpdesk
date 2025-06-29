import { useState, useEffect } from 'react';
import { phoneAPI, type Phone } from '../services/api';

interface SearchFilters {
  phoneType: string;
  brand: string;
  priceRange: string;
  minRating?: number;
}

export const usePhones = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllPhones = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await phoneAPI.getAllPhones();
      setPhones(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch phones');
    } finally {
      setLoading(false);
    }
  };

  const searchPhones = async (filters: SearchFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const searchParams = {
        brand: filters.brand || undefined,
        type: filters.phoneType || undefined,
        priceRange: filters.priceRange || undefined,
        minRating: filters.minRating || undefined,
      };
      
      const data = await phoneAPI.searchPhones(searchParams);
      setPhones(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to search phones');
    } finally {
      setLoading(false);
    }
  };

  const getPhoneById = async (id: string): Promise<Phone | null> => {
    try {
      setError(null);
      return await phoneAPI.getPhoneById(id);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch phone details');
      return null;
    }
  };

  useEffect(() => {
    fetchAllPhones();
  }, []);

  return {
    phones,
    loading,
    error,
    fetchAllPhones,
    searchPhones,
    getPhoneById,
  };
};