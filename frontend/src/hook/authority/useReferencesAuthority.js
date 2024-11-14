import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../redux/reducer/referencesReducer';

const useReferencesAuthority = () => {
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
    dispatch(Actions.getReferencesRequestRoleAuthority());
  };

  return { referencesState, getReferences, authState, inputDataState };
};

export default useReferencesAuthority;
