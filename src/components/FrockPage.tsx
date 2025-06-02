import React from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

const FrockPage = () => {
  const { categoryName } = useParams();

  const frockSubcategories = [
    { name: 'Carnival Frocks', count: 3 },
    { name: 'Casual Frocks', count: 9 },
    { name: 'Coastal Frocks', count: 4 },
    { name: 'Evening Frocks', count: 6 },
    { name: 'Festive Frocks', count: 8 },
    { name: 'Formal Frocks', count: 7 },
    { name: 'Party Frocks', count: 5 },
    { name: 'Wedding Frocks', count: 2 },
  ].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

  return (
    <div className="category-container">
      <h2 className="category-heading">{categoryName?.toUpperCase()}</h2>
      <div className="subcategory-section">
        <h3>Frocks</h3>
        <div className="subcategory-grid">
          {frockSubcategories.map((subcategory) => (
            <div key={subcategory.name} className="subcategory-card">
              <span className="subcategory-count">{subcategory.count}</span>
              <span className="subcategory-name">{subcategory.name}</span>
            </div>
          ))}
        </div>
      </div>
      <p>Show products for {categoryName}</p>
      {/* Add product listing logic here */}
    </div>
  );
};

export default FrockPage;