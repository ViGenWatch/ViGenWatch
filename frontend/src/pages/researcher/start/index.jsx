import React, { useState } from 'react';
import LayoutComponent from '../../../components/Layout';
import { LOADING } from '../../../components/loading';
import StartComponent from '../../../components/Start';
import useUploadExecution from '../../../hook/useUploadExecution';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };
  const { handleStartUpload, inputDataState, referencesState, progress } = useUploadExecution(handleLoading);
  return (
    <LayoutComponent index={1}>
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
    </LayoutComponent>
  );
};

export default HomePage;
