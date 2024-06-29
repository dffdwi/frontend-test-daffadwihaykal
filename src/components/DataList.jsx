import React from 'react';
import DataItem from './DataItem';

function DataList({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <DataItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

export default DataList;
