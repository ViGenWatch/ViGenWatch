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
      getReferences(authState.user.id);
    }
  }, []);

  const getReferences = (data) => {
    dispatch(Actions.getReferencesRequest(data));
  };

  return { referencesState, getReferences, authState, inputDataState };
};

export default useReferences;
