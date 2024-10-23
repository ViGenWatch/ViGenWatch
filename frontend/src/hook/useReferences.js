import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../redux/reducer/referencesReducer';

const useReferences = () => {
  const dispatch = useDispatch();
  const referencesState = useSelector((state) => state.references);

  useEffect(() => {
    if (!referencesState.references) {
      dispatch(Actions.getReferencesRequest());
    }
  }, []);

  return { referencesState };
};

export default useReferences;
