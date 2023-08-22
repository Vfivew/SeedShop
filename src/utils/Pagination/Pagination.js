import React from 'react';

import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='pagination-btn'
      >
        Назад
      </button>
      <div className="page-indicator">
        Сторінка {currentPage} з {totalPages}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='pagination-btn'
      >
        Вперед
      </button>
    </div>
  );
}

export default Pagination;