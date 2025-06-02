import React from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

const FrockPage = () => {
  const { categoryName } = useParams();

  const frockSubcategories = [
    'Carnival Frocks',
    'Casual Frocks',
    'Coastal Frocks',
    'Evening Frocks',
    'Festive Frocks',
    'Formal Frocks',
    'Party Frocks',
    'Wedding Frocks',
  ].sort((a, b) => a.localeCompare(b)); // Sort alphabetically

  return (
    <div className="category-container">
      <h2 className="category-heading">{categoryName?.toUpperCase()}</h2>
      <div className="subcategory-section">
        <h3>Frocks</h3>
        <div className="subcategory-grid">
          {frockSubcategories.map((subcategory) => (
            <div key={subcategory} className="subcategory-card">
              <span className="subcategory-name">{subcategory}</span>
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