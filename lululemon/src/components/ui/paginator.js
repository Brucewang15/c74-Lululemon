import React from 'react';
import './paginator.css';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`paginator-button ${i === currentPage ? 'active' : ''}`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="paginator">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="paginator-button nav-button"
      >
        Previous
      </button>
      {pageNumbers}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="paginator-button nav-button"
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;