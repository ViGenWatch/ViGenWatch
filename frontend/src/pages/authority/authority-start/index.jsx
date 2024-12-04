import React, { useState } from 'react';
import AuthorityLayout from '../../../components/AuthorityLayout';
import StartComponent from '../../../components/Start';
import { LOADING } from '../../../components/loading';
import useUploadExecution from '../../../hook/useUploadExecution';

const AuthorityStart = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };
  const { handleStartUpload, inputDataState, referencesState, progress } = useUploadExecution(handleLoading);
  return (
    <AuthorityLayout index={1}>
      {!loading ? (
        <StartComponent
          handleStartUpload={handleStartUpload}
          inputDataState={inputDataState}
          referencesState={referencesState}
          progress={progress}
        />
      ) : (
        <LOADING />
      )}
    </AuthorityLayout>
  );
};

export default AuthorityStart;
