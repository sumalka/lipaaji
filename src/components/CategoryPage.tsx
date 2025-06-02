import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{categoryName?.toUpperCase()}</h2>
      <p>Show products for {categoryName}</p>
      {/* Add product listing logic here */}
    </div>
  );
};

export default CategoryPage;