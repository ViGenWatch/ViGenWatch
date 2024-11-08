import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../redux/reducer/directoryTreeReducer';
import { downloadFile, getContentFile } from '../service/directoryTree';
const useDirectoryTree = () => {
  const dispatch = useDispatch();
  const directoryTreeState = useSelector((state) => state.directoryTree);
  const [contentFile, setContentFile] = useState(null);

  useEffect(() => {
    dispatch(Actions.getNodeDataRequest());
  }, []);

  const onNameClick = async (defaultOnClick, params, setNodeSelected) => {
    const { path, type, isOpen } = params;
    if (type === 'file') {
      const content = await getContentFile(path);
      if (content) {
        setContentFile({ content, path });
      }
      setNodeSelected(path);
    } else {
      defaultOnClick(isOpen);
    }
  };

  const onDownloadFile = async () => {
    if (contentFile) {
      await downloadFile(contentFile.path);
    }
  };

  return { directoryTreeState, onNameClick, contentFile, onDownloadFile };
};

export default useDirectoryTree;
