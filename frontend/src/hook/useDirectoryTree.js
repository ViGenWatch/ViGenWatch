import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../redux/reducer/directoryTreeReducer';
const useDirectoryTree = () => {
  const dispatch = useDispatch();
  const directoryTreeState = useSelector((state) => state.directoryTree);
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(Actions.getNodeDataRequest(authState.user.userName));
  }, []);

  return { directoryTreeState };
};

export default useDirectoryTree;
