import React from 'react';

function DataItem({ item, index }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={index % 2 === 0 ? 'https://via.placeholder.com/150/0000FF/808080?text=Even' : 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Odd'}
        alt={item.title}
        loading="lazy"
        className="w-full h-48 object-cover aspect-w-16 aspect-h-9"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-3">{item.title}</h2>
        <p className="text-gray-500">{new Date(item.published_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default DataItem;
