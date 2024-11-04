import { ControlHeader } from '@khaitd0340/auspice/src/components/controls/controlHeader';
import { useTranslation } from 'react-i18next';
import CustomSelect from '@khaitd0340/auspice/src/components/controls/customSelect';
import useExecution from '../../hook/useExecution';
import { Execution } from '../../redux/reducer/executionReducer';

const ChooseDataset: React.FC = () => {
  const { t } = useTranslation();
  const { executionsState, onSelectExecutionHandle } = useExecution();
  const { executions, executionSelected } = executionsState;
  const props = {
    value: executionSelected && {
      label: executionSelected.executionName,
      value: executionSelected.executionId
    },
    options: executions.map((execution: Execution) => ({
      label: execution.executionName,
      value: execution.executionId
    })),
    isClearable: false,
    isSearchable: false,
    isMulti: false,
    onChange: onSelectExecutionHandle
  };
  return (
    <>
      <ControlHeader title={t('sidebar:Dataset')} />
      <div style={{ width: '220px', fontSize: '14px' }}>
        <CustomSelect {...props} />
      </div>
    </>
  );
};

export default ChooseDataset;
