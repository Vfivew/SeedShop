import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const storedProduct = localStorage.getItem('selectedProduct');
  const initialProduct = storedProduct ? JSON.parse(storedProduct) : null;

  const [selectedProduct, setSelectedProduct] = useState(initialProduct);

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

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserEmail('');
  };

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct, isAuthenticated, setIsAuthenticated, userEmail, setUserEmail, handleLogout }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}