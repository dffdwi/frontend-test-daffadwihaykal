/* eslint-disable react/button-has-type */
import React from 'react';

function Pagination({
  totalItems, itemsPerPage, currentPage, handlePageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`px-4 py-2 border rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
