/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncFetchIdeas } from '../states/ideas/action';
import DataList from './DataList';
import Pagination from './Pagination';

function FetchData() {
  const dispatch = useDispatch();
  const ideas = useSelector((state) => state.ideas) || [];
  const [sortOrder, setSortOrder] = React.useState('newest');
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    dispatch(asyncFetchIdeas());
  }, [dispatch]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const sortedData = [...ideas].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.published_at) - new Date(a.published_at);
    }
    return new Date(a.published_at) - new Date(b.published_at);
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (ideas.length === 0) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center">
          <span className="mr-2">Sort by:</span>
          <select value={sortOrder} onChange={handleSortChange} className="p-2 border rounded-md">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
        <label className="flex items-center">
          <span className="mr-2">Show per page:</span>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="p-2 border rounded-md">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>
      <div className="mb-4">
        <span>
          Showing
          {paginatedData.length}
          {' '}
          of
          {ideas.length}
          {' '}
          items
        </span>
      </div>
      {paginatedData.length === 0 ? (
        <div className="text-center py-8">No data available</div>
      ) : (
        <div>
          <DataList data={paginatedData} />
          <Pagination
            totalItems={sortedData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default FetchData;
