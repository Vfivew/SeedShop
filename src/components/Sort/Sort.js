import React from 'react';

const Sort = ({ activeSort, handleSortClick, sortedProducts }) => {
  const handleSort = (sortMethod) => {
    if (sortMethod === 'cheap') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortMethod === 'expensive') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortMethod === 'popular') {
      sortedProducts.sort((a, b) => b.sold - a.sold);
    } else if (sortMethod === 'name') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    handleSortClick(sortMethod);
  };

  return (
    <div className='sort'>
      <h3 className='sort'>Сортування за:</h3>
      <div className='sort-selection'>
        <button
          type='button'
          className={activeSort === 'cheap' ? 'active' : ''}
          onClick={() => handleSort('cheap')}
        >
          Спочатку дешевші
        </button>
        <button
          type='button'
          className={activeSort === 'expensive' ? 'active' : ''}
          onClick={() => handleSort('expensive')}
        >
          Спочатку дорожчі
        </button>
        <button
          type='button'
          className={activeSort === 'popular' ? 'active' : ''}
          onClick={() => handleSort('popular')}
        >
          За популярністю
        </button>
        <button
          type='button'
          className={activeSort === 'name' ? 'active' : ''}
          onClick={() => handleSort('name')}
        >
          За назвою
        </button>
      </div>
    </div>
  );
};

export default Sort;