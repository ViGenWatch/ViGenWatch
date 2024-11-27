import React, { useState } from 'react';
import LayoutComponent from '../../../components/Layout';
import { LOADING } from '../../../components/loading';
import StartComponent from '../../../components/Start';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };
  return (
    <LayoutComponent index={1}>
      {!loading ? <StartComponent handleLoading={handleLoading} /> : <LOADING />}
    </LayoutComponent>
  );
};

export default HomePage;
