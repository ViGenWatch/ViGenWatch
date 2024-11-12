import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../redux/reducer/referencesReducer';

const useReferences = () => {
  const dispatch = useDispatch();
  const referencesState = useSelector((state) => state.references);
  const authState = useSelector((state) => state.auth);
  const inputDataState = useSelector((state) => state.inputData);

  useEffect(() => {
    if (!referencesState.references) {
      getReferences();
    }
  }, []);

  const getReferences = () => {
    dispatch(Actions.getReferencesRequest());
  };

  const updateRequireStatus = (referenceId, status) => {
    dispatch(Actions.updateRequireStatusRequest({ referenceId, status }));
  };

  return { referencesState, getReferences, authState, inputDataState, updateRequireStatus };
};

export default useReferences;
