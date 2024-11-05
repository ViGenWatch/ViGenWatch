import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../redux/reducer/executionReducer';
import { getResultJson } from '../service/execution';
import { auspiceStartClean } from '../actions/auspice/auspice.actions';
import { createAuspiceState } from '../actions/auspice/createAuspiceState';

const useExecution = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const executionsState = useSelector((state) => state.execution);
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    if (!executionsState.executionSelected) {
      dispatch(Actions.getExecutionsRequest(authState.user.id));
    }
    const fetchData = async () => {
      if (executionsState.executionSelected && executionsState.executionSelected.executionId) {
        const json = await getResultJson(executionsState.executionSelected.executionId);
        const auspiceState = createAuspiceState(json, dispatch);
        dispatch(auspiceStartClean(auspiceState));
      }
    };

    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [executionsState.executionSelected]);

  const onSelectExecutionHandle = (option) => {
    dispatch(Actions.changeSelectExecution({ value: option.value }));
  };

  return { executionsState, onSelectExecutionHandle, loading };
};

export default useExecution;
