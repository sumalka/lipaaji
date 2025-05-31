import React from 'react';
import './NewArrivals.css';

const products = [
  {
    id: 1,
    name: 'Floral Summer Dress',
    price: '$49.99',
    image: '/assets/product1.jpg',
  },
  {
    id: 2,
    name: 'Linen Crop Top',
    price: '$34.99',
    image: '/assets/product2.jpg',
  },
  {
    id: 3,
    name: 'Elegant Maxi Skirt',
    price: '$59.99',
    image: '/assets/product3.jpg',
  },
];

const NewArrivals = () => {
  return (
    <section className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
