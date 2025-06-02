import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

const uploadToCloudinary = async (file: File, retries = 3, timeout = 30000): Promise<string | null> => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "new-arrivals");
  data.append("folder", "new-arrivals");
  data.append("transformations", "q_auto:good,w_1920,h_1920,c_limit"); // Optimize quality, limit to 1920px

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const res = await fetch("https://api.cloudinary.com/v1_1/dk1thw6tq/image/upload", {
        method: "POST",
        body: data,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const json = await res.json();
      if (!res.ok || !json.secure_url) {
        console.error(`Upload failed (Attempt ${attempt}):`, json);
        if (attempt === retries) {
          alert(`❌ Image upload failed: ${json.error?.message || "Unknown error"}`);
          return null;
        }
        continue;
      }

      return json.secure_url;
    } catch (err: any) {
      console.error(`Cloudinary Upload Error (Attempt ${attempt}):`, err);
      if (err.name === 'AbortError') {
        if (attempt === retries) {
          alert("❌ Upload timed out. Please check your network and try again.");
          return null;
        }
      } else if (attempt === retries) {
        alert("❌ Network error while uploading image. Please try again.");
        return null;
      }
    }
  }
  return null;
};

const uploadJsonToCloudinary = async (items: any[], retries = 3, timeout = 30000): Promise<boolean> => {
  const jsonString = JSON.stringify(items);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const file = new File([blob], 'items.json', { type: 'application/json' });

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "new-arrivals");
  data.append("folder", "new-arrivals");
  data.append("public_id", "items"); // Fixed public_id to overwrite same file

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const res = await fetch("https://api.cloudinary.com/v1_1/dk1thw6tq/raw/upload", {
        method: "POST",
        body: data,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const json = await res.json();
      if (!res.ok) {
        console.error(`JSON upload failed (Attempt ${attempt}):`, json);
        if (attempt === retries) {
          alert(`❌ JSON upload failed: ${json.error?.message || "Unknown error"}`);
          return false;
        }
        continue;
      }
      return true;
    } catch (err: any) {
      console.error(`Cloudinary JSON Upload Error (Attempt ${attempt}):`, err);
      if (err.name === 'AbortError') {
        if (attempt === retries) {
          alert("❌ JSON upload timed out. Please check your network and try again.");
          return false;
        }
      } else if (attempt === retries) {
        alert("❌ Network error while uploading JSON. Please try again.");
        return false;
      }
    }
  }
  return false;
};

const fetchJsonFromCloudinary = async (): Promise<any[] | null> => {
  try {
    const res = await fetch('https://res.cloudinary.com/dk1thw6tq/raw/upload/new-arrivals/items.json');
    if (!res.ok) {
      if (res.status === 404) {
        return []; // Return empty array if JSON file doesn't exist yet
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Error fetching JSON from Cloudinary:', err);
    alert('❌ Failed to load items. Please try again later.');
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
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      const fetchedItems = await fetchJsonFromCloudinary();
      if (fetchedItems !== null) {
        setItems(fetchedItems);
      }
    };
    loadItems();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setError('Image too large (>15MB). Please select a smaller image.');
        return;
      }
      setIsProcessing(true);
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        setImage(compressedFile);
        setPreview(URL.createObjectURL(compressedFile));
        setIsProcessing(false);
      } catch (err) {
        setError('Image compression failed. Please try a smaller image.');
        setIsProcessing(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !price.trim() || (!image && editingId === null)) {
      setError('Please fill all fields and upload an image.');
      return;
    }

    setIsProcessing(true);

    const updateItems = async (imageUrl?: string) => {
      const updatedItems = items.map(item =>
        item.id === editingId
          ? { ...item, name, price, imageUrl: imageUrl || item.imageUrl }
          : item
      );
      const success = await uploadJsonToCloudinary(updatedItems);
      if (success) {
        setItems(updatedItems);
        // For future DB integration: updateItemInDatabase(updatedItems);
        resetForm();
      } else {
        setError('Failed to update items. Please try again.');
      }
      setIsProcessing(false);
    };

    if (editingId !== null) {
      if (image) {
        const uploadedUrl = await uploadToCloudinary(image);
        if (!uploadedUrl) {
          setError('Image upload failed. Please try again.');
          setIsProcessing(false);
          return;
        }
        await updateItems(uploadedUrl);
      } else {
        await updateItems();
      }
      return;
    }

    const imageUrl = await uploadToCloudinary(image!);
    if (!imageUrl) {
      setError('Image upload failed. Please try again.');
      setIsProcessing(false);
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      price,
      imageUrl,
    };
    const updatedItems = [...items, newItem];
    const success = await uploadJsonToCloudinary(updatedItems);
    if (success) {
      setItems(updatedItems);
      // For future DB integration: addItemToDatabase(newItem);
      resetForm();
    } else {
      setError('Failed to add item. Please try again.');
    }
    setIsProcessing(false);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setPreview(item.imageUrl);
    setImage(null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedItems = items.filter(item => item.id !== id);
      const success = await uploadJsonToCloudinary(updatedItems);
      if (success) {
        setItems(updatedItems);
        // For future DB integration: deleteItemFromDatabase(id);
        if (editingId === id) {
          resetForm();
        }
      } else {
        setError('Failed to delete item. Please try again.');
      }
    }
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
      <form style={{
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
          <label>Product Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} disabled={isProcessing} />
          {isProcessing && <div style={{ color: '#002f9d', marginTop: '0.5rem' }}>Processing image...</div>}
          {preview && <img src={preview} alt="Preview" style={{ width: '100%', marginTop: '1rem', borderRadius: '8px' }} />}
        </div>

        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            placeholder="E.g. Summer Dress"
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            disabled={isProcessing}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            placeholder="E.g. $59.99"
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            disabled={isProcessing}
          />
        </div>

        <button
          type="button"
          disabled={isProcessing}
          style={{
            padding: '0.75rem',
            backgroundColor: isProcessing ? '#ccc' : '#002f9d',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: isProcessing ? 'not-allowed' : 'pointer'
          }}
          onClick={handleSubmit}
        >
          {isProcessing ? 'Uploading...' : editingId ? 'Update Item' : 'Add to New Arrivals'}
        </button>
      </form>

      {items.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>New Arrivals List</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', border: '1px solid #ddd' }}>
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
                <tr key={item.id} style={{ border: '1px solid #ddd' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '60px', borderRadius: '5px' }} />
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{item.name}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{item.price}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                    <button
                      onClick={() => handleEdit(item)}
                      style={{ padding: '0.4rem 0.7rem', backgroundColor: '#002f9d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '0.5rem' }}
                      disabled={isProcessing}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{ padding: '0.4rem 0.7rem', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                      disabled={isProcessing}
                    >
                      Delete
                    </button>
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