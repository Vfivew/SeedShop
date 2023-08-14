import React, { useState } from 'react';
import useFetchData from '../../hook/useFetchData';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../Cards/ProductCards';
import { setSortBy } from '../../reducers/productsReducer';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useFetchData('https://raw.githubusercontent.com/Vfivew/DataSeedShop/main/data.json');
  const sortBy = useSelector(state => state.products.sortBy);

  const [activeButton, setActiveButton] = useState('sold');

  const handleButtonClick = (value) => {
    setActiveButton(value);
    dispatch(setSortBy(value));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  let sortedAndFilteredProducts = [...products];
  if (sortBy === 'sold') {
    sortedAndFilteredProducts = sortedAndFilteredProducts.filter(product => product.sold > 9); // Фильтрация по продажам больше 9
    sortedAndFilteredProducts.sort((a, b) => b.sold - a.sold);
  } else if (sortBy === 'discount') {
    sortedAndFilteredProducts = sortedAndFilteredProducts.filter(product => product.discount);
    sortedAndFilteredProducts.sort((a, b) => b.discount - a.discount);
  } else if (sortBy === 'new') {
    sortedAndFilteredProducts = sortedAndFilteredProducts.filter(product => product.new);
  }

  return (
    <div className='main-product'>
      <div className="sort-buttons">
        <button
          className={activeButton === 'sold' ? 'active' : ''}
          onClick={() => handleButtonClick('sold')}
        >
          Хіт продаж
        </button>
        <button
          className={activeButton === 'new' ? 'active' : ''}
          onClick={() => handleButtonClick('new')}
        >
          Новинки
        </button>
        <button
          className={activeButton === 'discount' ? 'active' : ''}
          onClick={() => handleButtonClick('discount')}
        >
          Знижки
        </button>
      </div>
      <div className="product-list">
        {sortedAndFilteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
