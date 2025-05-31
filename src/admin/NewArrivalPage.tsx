import React from 'react';
import AdminLayout from './AdminLayout';
import NewArrivalUploader from './NewArrivalUploader';

const NewArrivalPage = () => {
  return (
    <AdminLayout>
      <NewArrivalUploader />
    </AdminLayout>
  );
};

export default NewArrivalPage;