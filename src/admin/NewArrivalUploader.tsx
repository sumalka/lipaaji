import React, { useState, useEffect } from 'react';

const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "new_arrivals");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dk1thw6tq/image/upload", {
      method: "POST",
      body: data,
    });
    if (!res.ok) throw new Error("Upload failed");
    const json = await res.json();
    return json.secure_url;
  } catch (err) {
    console.error("Cloudinary Upload Failed", err);
    return null;
  }
};

const NewArrivalUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('new-arrivals');
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !price || (!image && editingId === null)) {
      setError('Please fill all fields and upload an image.');
      return;
    }

    const updateItems = (imgUrl?: string) => {
      const updatedItems = items.map(item =>
        item.id === editingId
          ? { ...item, name, price, imageUrl: imgUrl || item.imageUrl }
          : item
      );
      setItems(updatedItems);
      localStorage.setItem('new-arrivals', JSON.stringify(updatedItems));
      resetForm();
    };

    if (editingId !== null) {
      if (image) {
        const uploadedUrl = await uploadToCloudinary(image);
        if (!uploadedUrl) {
          setError('Image upload failed. Please try again.');
          return;
        }
        updateItems(uploadedUrl);
      } else {
        updateItems();
      }
      return;
    }

    const imageUrl = await uploadToCloudinary(image!);
    if (!imageUrl) {
      setError('Image upload failed. Please try again.');
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      price,
      imageUrl,
    };
    const updated = [...items, newItem];
    localStorage.setItem('new-arrivals', JSON.stringify(updated));
    setItems(updated);
    resetForm();
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setPreview(item.imageUrl);
    setImage(null);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setImage(null);
    setPreview(null);
    setName('');
    setPrice('');
    setEditingId(null);
    setError('');
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <form onSubmit={handleSubmit} style={{
        padding: '2rem',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <h2>{editingId ? 'Edit Item' : 'Add New Arrival'}</h2>

        {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Product Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" style={{ width: '100%', marginTop: '1rem', borderRadius: '8px' }} />}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Product Name:</label>
          <input
            type="text"
            value={name}
            placeholder="E.g. Summer Dress"
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price:</label>
          <input
            type="text"
            value={price}
            placeholder="E.g. $59.99"
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button type="submit" style={{
          padding: '0.75rem',
          backgroundColor: '#002f9d',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          {editingId ? 'Update Item' : 'Add to New Arrivals'}
        </button>
      </form>

      {items.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>New Arrivals List</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Image</th>
                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Price</th>
                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '60px', borderRadius: '5px' }} />
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{item.name}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{item.price}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    <button onClick={() => handleEdit(item)} style={{ padding: '0.4rem 0.7rem', backgroundColor: '#002f9d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewArrivalUploader;
