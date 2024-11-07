import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../redux/reducer/directoryTreeReducer';
import { getContentFile } from '../service/directoryTree';
const useDirectoryTree = () => {
  const dispatch = useDispatch();
  const directoryTreeState = useSelector((state) => state.directoryTree);
  const authState = useSelector((state) => state.auth);
  const [contentFile, setContentFile] = useState(null);

  useEffect(() => {
    dispatch(Actions.getNodeDataRequest(authState.user.userName));
  }, []);

  const onNameClick = async (defaultOnClick, params) => {
    const { path, type, isOpen } = params;
    if (type === 'file') {
      const content = await getContentFile(path);
      if (content) {
        setContentFile(content);
      }
    } else {
      defaultOnClick(isOpen);
    }
  };

  return { directoryTreeState, onNameClick, contentFile };
};

export default useDirectoryTree;
