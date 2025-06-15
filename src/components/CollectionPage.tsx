import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Adjust path

interface Accessory {
  id: string;
  collection_name: string;
  name: string;
  price: string;
  original_price: string | null;
  image_url: string;
  payment: string;
  discount: string | null;
}

const CollectionPage = () => {
  const [collectionsData, setCollectionsData] = useState<{ [key: string]: Accessory[] }>({
    'coco-beach': [],
    'summer-shoreline': [],
    'sunset-tropics': [],
  });

  useEffect(() => {
    const fetchCollections = async () => {
      const { data, error } = await supabase.from('collections_items').select('*');
      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        const organizedData: { [key: string]: Accessory[] } = {
          'coco-beach': [],
          'summer-shoreline': [],
          'sunset-tropics': [],
        };
        data.forEach((item) => {
          organizedData[item.collection_name].push(item);
        });
        setCollectionsData(organizedData);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {Object.entries(collectionsData).map(([collectionKey, accessories]) => (
        <div key={collectionKey} className="mb-12">
          <h2 className="text-3xl font-bold text-[#002f9d] mb-8">
            {collectionKey.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.length > 0 ? (
              accessories.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden text-center relative">
                  {item.discount && (
                    <span className="inline-block bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-tl-2xl rounded-br-2xl absolute mt-2 ml-2">
                      {item.discount}
                    </span>
                  )}
                  <img src={item.image_url} alt={item.name} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-700">
                      {item.price} {item.original_price && <span className="line-through text-gray-500">{item.original_price}</span>}
                    </p>
                    <p className="text-sm text-gray-500">{item.payment}</p>
                    <div className="flex justify-center mt-2">
                      <span className="w-3 h-3 bg-black rounded-full mr-2"></span>
                      <span className="w-3 h-3 bg-white rounded-full mr-2"></span>
                      <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No items added to this collection yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionPage;