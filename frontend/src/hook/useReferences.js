import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../redux/reducer/referencesReducer';
import { deleteReferenceFolder } from '../service/reference';
import { ActionsInputData } from '../redux/reducer/inputDataReducer';

const useReferences = () => {
  const dispatch = useDispatch();
  const referencesState = useSelector((state) => state.references);

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

  const deleteReference = async (referenceId) => {
    dispatch(ActionsInputData.removeSelectReference());
    await deleteReferenceFolder(referenceId);
    getReferences();
  };

  return { referencesState, getReferences, updateRequireStatus, deleteReference };
};

export default useReferences;
