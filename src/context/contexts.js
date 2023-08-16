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

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}