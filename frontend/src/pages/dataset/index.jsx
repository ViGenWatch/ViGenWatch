import React from 'react';
import LayoutComponent from '../../components/layout';
import DirectoryTree from '../../components/directoryTree';
import { useSelector } from 'react-redux';
const DatasetPage = () => {
  const state = useSelector((state) => state.treeState);
  console.log(state);
  return (
    <LayoutComponent>
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <DirectoryTree />
      </div>
    </LayoutComponent>
  );
};

export default DatasetPage;
