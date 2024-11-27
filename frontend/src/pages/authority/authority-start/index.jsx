import React, { useState } from 'react';
import AuthorityLayout from '../../../components/AuthorityLayout';
import StartComponent from '../../../components/Start';
import { LOADING } from '../../../components/loading';

const AuthorityStart = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };
  return (
    <AuthorityLayout index={1}>
      {!loading ? <StartComponent handleLoading={handleLoading} /> : <LOADING />}
    </AuthorityLayout>
  );
};

export default AuthorityStart;
