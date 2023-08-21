import React, { createContext, useContext, useState, useEffect } from 'react';
import useFetchData from '../hook/useFetchData';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const storedProduct = localStorage.getItem('selectedProduct');
  const initialProduct = storedProduct ? JSON.parse(storedProduct) : null;

  const [selectedProduct, setSelectedProduct] = useState(initialProduct);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserEmail('');
  };

  useEffect(() => {
    if (selectedProduct) {
      localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    } else {
      localStorage.removeItem('selectedProduct');
    }
  }, [selectedProduct]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('isAuthenticated');
    const savedUserEmail = localStorage.getItem('userEmail');

    if (savedAuthStatus === 'true') {
      setIsAuthenticated(true);
      setUserEmail(savedUserEmail);
    }
  }, []);

  const { data: products, loading, error } = useFetchData('https://raw.githubusercontent.com/Vfivew/DataSeedShop/main/data.json');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct, isAuthenticated, setIsAuthenticated, userEmail, setUserEmail, products, handleLogout }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}