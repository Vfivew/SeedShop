import React, { useState } from 'react';
import {toggleFilterHit,
  toggleFilterNew,
  toggleFilterDiscount,
  setSeedProducerFilter,
  setSeedFilters,
} from '../../reducers/SeedProductReducer';

import './Filters.css';

const Filters = ({ seedFilters, dispatch, uniqueProducers, uniqueProductTypes,}) => {

  const [showFilters, setShowFilters] = useState(false);

  const handleProductTypeToggle = (productType) => {
    const updatedselectedProductTypes = seedFilters.selectedProductTypes.includes(productType)
      ? seedFilters.selectedProductTypes.filter((v) => v !== productType)
      : [...seedFilters.selectedProductTypes, productType];

    dispatch(
      setSeedFilters({
        ...seedFilters,
        selectedProductTypes: updatedselectedProductTypes,
      })
    );
  };


  return (
    <div>
      <button className="toggle-filters-button" onClick={() => setShowFilters(!showFilters)}>
        Фильтры
      </button>
     <div className={`filters ${showFilters ? 'show' : ''}`}>
      <h3 className='filters-title'>Насіння овочів</h3>
      <div className='seed-list-filter'>
        <label className={`filter ${seedFilters.hit ? 'active' : ''}`}>
          <input
            className='seed-list-filter-cheakbox'
            type="checkbox"
            checked={seedFilters.hit}
            onChange={() => dispatch(toggleFilterHit())}
          />
          Хіт
        </label>
        <label className={`filter ${seedFilters.new ? 'active' : ''}`}>
          <input
            className='seed-list-filter-cheakbox'
            type="checkbox"
            checked={seedFilters.new}
            onChange={() => dispatch(toggleFilterNew())}
          />
          Новинка
        </label>
        <label className={`filter ${seedFilters.discount ? 'active' : ''}`}>
          <input
            className='seed-list-filter-cheakbox'
            type="checkbox"
            checked={seedFilters.discount}
            onChange={() => dispatch(toggleFilterDiscount())}
          />
          Знижка
        </label>
      </div>

      <h3 className='filters-title'>Вид культури</h3>
      <div className='seed-list-filter'>
        {uniqueProductTypes.map((productType, index) => (
          <label className='seed-list-filter-item' key={index}>
            <input
              type="checkbox"
              className='seed-list-filter-cheakbox'
              checked={seedFilters.selectedProductTypes.includes(productType)}
              onChange={() => handleProductTypeToggle(productType)}
            />
            {productType}
          </label>
        ))}
      </div>
      <h3 className='filters-title'>Виробник</h3>
      <select
        className='select-filter'
        onChange={(e) => dispatch(setSeedProducerFilter(e.target.value))}
      >
        <option value="">Оберіть виробника</option>
        {uniqueProducers.map((producer, index) => (
          <option key={index} value={producer}>
            {producer}
          </option>
        ))}
      </select>
        <button className="toggle-filters-button" onClick={() => setShowFilters(!showFilters)}>
        Назад
      </button>
      </div>
    </div>
  );
};

export default Filters;