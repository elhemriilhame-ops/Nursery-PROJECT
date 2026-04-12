import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { FLOWERS, PLANTS, OILS, GUIDES } from '../data/mockData';

const BASE_URL = 'http://127.0.0.1:5000'; // Using IP for better local reach

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [prodRes, guideRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/products`),
        axios.get(`${BASE_URL}/api/guides`)
      ]);
      
      const dbProducts = (prodRes.data || []).map(p => ({ 
        ...p, 
        id: p._id || p.id,
        type: p.type || 'Flowers',
        image: p.image || 'https://images.unsplash.com/photo-1501004318641-739e828a1751?auto=format&fit=crop&w=800&q=80'
      }));

      const dbGuides = (guideRes.data || []).map(g => ({ ...g, id: g._id || g.id }));

      // ALWAYS merge with mock data to keep the "bdaya statique" products
      const allProducts = [
        ...dbProducts,
        ...FLOWERS.map(p => ({ ...p, type: 'Flowers', isMock: true })),
        ...PLANTS.map(p => ({ ...p, type: 'Plants', isMock: true })),
        ...OILS.map(p => ({ ...p, type: 'Oils', isMock: true }))
      ];

      const allGuides = [
        ...dbGuides,
        ...GUIDES.map(g => ({ ...g, isMock: true }))
      ];

      setProducts(allProducts);
      setGuides(allGuides);
      console.log(`Synchronization complete: ${dbProducts.length} live and ${allProducts.length - dbProducts.length} catalogue items merged.`);
    } catch (err) {
      console.warn('Backend link unstable, using emergency fallback.', err.message);
      setError('Live connection failed. Using local archives.');
      setProducts([
        ...FLOWERS.map(p => ({ ...p, type: 'Flowers', isMock: true })),
        ...PLANTS.map(p => ({ ...p, type: 'Plants', isMock: true })),
        ...OILS.map(p => ({ ...p, type: 'Oils', isMock: true }))
      ]);
      setGuides(GUIDES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Helpers to get specific types
  const getFlowers = () => products.filter(p => p.type === 'Flowers');
  const getPlants = () => products.filter(p => p.type === 'Plants');
  const getOils = () => products.filter(p => p.type === 'Oils');
  const getFeaturedProducts = () => products.filter(p => p.featured);
  const getFeaturedGuides = () => guides.filter(g => g.featured);

  return (
    <ProductContext.Provider value={{ 
      products, 
      guides, 
      loading, 
      error, 
      refreshData: fetchAllData,
      getFlowers,
      getPlants,
      getOils,
      getFeaturedProducts,
      getFeaturedGuides
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
