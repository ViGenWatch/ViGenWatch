import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../redux/reducer/referencesReducer';
import { deleteReferenceFolder } from '../../service/reference';
import { ActionsInputData } from '../../redux/reducer/inputDataReducer';

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

  const updateRequireStatus = (referenceId, status) => {
    dispatch(Actions.updateStatusRequestRoleAuthority({ referenceId, status }));
  };

  const deleteReference = async (referenceId) => {
    dispatch(ActionsInputData.removeSelectReference());
    await deleteReferenceFolder(referenceId);
    getReferences();
  };

  return { referencesState, getReferences, authState, inputDataState, updateRequireStatus, deleteReference };
};

export default useReferencesAuthority;
