
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface Accessory {
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  payment: string;
  discount?: string;
}

const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET!);
  formData.append('folder', process.env.REACT_APP_CLOUDINARY_FOLDER!);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) throw new Error('Cloudinary upload failed');
  return (await response.json()).secure_url;
};

const AdminDashboard = () => {
  const [formData, setFormData] = useState<Accessory>({
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    payment: '',
    discount: '',
  });
  const [selectedCollection, setSelectedCollection] = useState('coco-beach');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };

  // Update the handleSubmit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (!imageFile) throw new Error('Please select an image');
    
    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(imageFile);
    
    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) throw new Error('Not authenticated');

    // Send to backend
    const response = await fetch(`${process.env.REACT_APP_API_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        name: formData.name,
        price: parseFloat(formData.price.replace(/[^0-9.]/g, '')),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice.replace(/[^0-9.]/g, '')) : undefined,
        imageUrl,
        payment: formData.payment,
        discount: formData.discount,
        collection: selectedCollection
      })
    });

    if (!response.ok) throw new Error(await response.text());
    
    alert('Item added successfully!');
    navigate('/collections');
  } catch (error) {
    console.error('Submission error:', error);
    alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-[#002f9d] mb-6">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="collection"
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="coco-beach">Coco Beach</option>
          <option value="summer-shoreline">Summer Shoreline</option>
          <option value="sunset-tropics">Sunset Tropics</option>
        </select>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price (e.g., Rs 1,560)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="originalPrice"
          value={formData.originalPrice}
          onChange={handleChange}
          placeholder="Original Price (e.g., Rs 1,950)"
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          placeholder="Payment Option (e.g., or 3 payments of Rs 520 with mintpay or KOKO)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="Discount (e.g., SAVE 20%)"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-[#002f9d] text-white rounded">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;