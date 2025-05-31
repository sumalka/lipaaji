import React, { useState } from 'react';

const NewArrivalUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !name || !price) return alert('Please fill all fields');

    const reader = new FileReader();
    reader.onload = () => {
      const existing = JSON.parse(localStorage.getItem('new-arrivals') || '[]');
      const newItem = {
        id: Date.now(),
        name,
        price,
        imageUrl: reader.result,
      };
      localStorage.setItem('new-arrivals', JSON.stringify([...existing, newItem]));
      alert('New item added to New Arrivals!');
      setImage(null);
      setPreview(null);
      setName('');
      setPrice('');
    };
    reader.readAsDataURL(image);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: 400,
      padding: '2rem',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>Add New Arrival</h2>

      <label>Product Image:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: '100%', marginTop: '1rem', borderRadius: '8px' }} />}

      <label style={{ marginTop: '1rem' }}>Product Name:</label>
      <input
        type="text"
        value={name}
        placeholder="E.g. Summer Dress"
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />

      <label>Price:</label>
      <input
        type="text"
        value={price}
        placeholder="E.g. $59.99"
        onChange={(e) => setPrice(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />

      <button type="submit" style={{
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#002f9d',
        color: 'white',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Add to New Arrivals
      </button>
    </form>
  );
};

export default NewArrivalUploader;
